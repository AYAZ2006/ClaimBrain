import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true,
});
const openrouter = new OpenAI({
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

// --- Retry helper for Groq rate limits ---
async function callGroqWithRetry(requestFn, maxRetries = 3) {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await requestFn();
    } catch (err) {
      const isRateLimit = err?.status === 429 || err?.message?.includes("Rate limit");
      if (!isRateLimit || attempt === maxRetries - 1) {
        throw err;
      }
      const match = err?.message?.match(/try again in ([\d.]+)s/);
      const waitSeconds = match ? parseFloat(match[1]) : (attempt + 1) * 3;
      console.warn(`Rate limited. Retrying in ${waitSeconds}s... (attempt ${attempt + 1}/${maxRetries})`);
      await new Promise((resolve) => setTimeout(resolve, (waitSeconds + 0.5) * 1000));
      attempt++;
    }
  }
}

export async function parsePolicy(text) {
  const policyText = text.slice(0, 6000);

  const response = await callGroqWithRetry(() =>
    client.chat.completions.create({
      model: "openai/gpt-oss-120b",
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `
You are an AI that extracts information from car insurance policies.

Return ONLY valid JSON.
`,
        },
        {
          role: "user",
          content: `
Extract

{
  "policyNumber":"",
  "ownerName":"",
  "vehicleNumber":"",
  "company":"",
  "vehicleModel":"",
  "engineNumber":"",
  "chassisNumber":"",
  "idv":"",
  "premium":"",
  "startDate":"",
  "endDate":"",
  "nominee":"",
  "address":"",
  "phone":"",
  "email":""
}
Rules:
1. startDate = earliest policy start date mentioned.
2. endDate = LATEST expiry/end date found anywhere in the policy.
3. If multiple expiry dates exist (Own Damage, Third Party, Motor Liability, Add-on, etc.), ALWAYS choose the date that is furthest in the future as endDate.
4. Never choose the first expiry date if a later expiry date exists.
5. Keep dates exactly as written in the policy.

Policy:

${policyText}
`,
        },
      ],
    })
  );

  return JSON.parse(response.choices[0].message.content);
}

export async function checkDamageCoverage(damages, policyText) {
  const trimmedPolicy = policyText.slice(0, 6000);

  const damageList = damages.map((d, i) => `${i + 1}. ${d.part} - ${d.damage}`).join("\n");

  const response = await callGroqWithRetry(() =>
    client.chat.completions.create({
      model: "openai/gpt-oss-120b",
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `
You are an experienced Indian motor insurance claims adjuster.

Return ONLY valid JSON. No markdown, no preamble, no explanation outside the JSON.

IMPORTANT CONTEXT ABOUT HOW INDIAN MOTOR POLICIES ARE WRITTEN:
Indian car insurance policies almost never list specific damage types (like "dent", "scratch", "crack") by name.
Instead, "Section I - Own Damage" (or "Own Damage cover") generically covers physical/accidental damage to the
insured's own vehicle — this includes dents, scratches, panel damage, broken parts, etc. — UNLESS that specific
damage is explicitly excluded (e.g. wear and tear, mechanical breakdown, consequential loss, damage while
driving without a valid license, damage during excluded use like racing/hire).

So when deciding coverage for a physical damage type like a dent or scratch:
1. If the policy has an active Own Damage / Section I cover, treat ordinary accidental body damage (dents,
   scratches, panel dents, bumper damage, etc.) as COVERED under that section by default.
2. Only mark it "notCovered" if the policy explicitly excludes that type of damage or the circumstances under
   which it occurred (e.g. wear and tear, mechanical/electrical breakdown not from an accident, consequential
   damage, or a listed exclusion clause).
3. Mention relevant add-ons if they apply (e.g. Nil Depreciation reduces depreciation deduction on replaced
   parts, Engine Protect covers engine-specific water/oil damage, Consumables covers repair consumables).
4. Only use "unclear" if the damage type is genuinely ambiguous or ambiguous as to which section applies (e.g.
   engine internals, electronics, or something not clearly physical body damage).
5. Do not invent coverage that isn't reasonably implied by the policy's structure — this is about applying the
   policy's actual logic, not guessing favorably.
`,
        },
        {
          role: "user",
          content: `
Detected Damages:
${damageList}

Policy Text:
${trimmedPolicy}

Return JSON in this exact format:

{
  "results": [
    {
      "part": "",
      "damage": "",
      "status": "covered" | "notCovered" | "unclear",
      "reason": ""
    }
  ],
  "allCovered": true
}

Rules:
1. "status" must be exactly one of: "covered", "notCovered", "unclear".
2. "reason" should be one short sentence explaining why, referencing the relevant section or clause.
3. "allCovered" = true ONLY IF every damage has status "covered".
4. Keep the same order as the input damage list.
`,
        },
      ],
    })
  );

  const rawContent = response.choices[0].message.content;
  const cleaned = rawContent.replace(/```json\s*|\s*```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("checkDamageCoverage: failed to parse model output. Raw content was:", rawContent);
    throw new Error("Coverage checker returned invalid JSON — see console for raw model output.");
  }
}

export async function estimateClaimPayout(damages, policyText, coverageResults) {
  const trimmedPolicy = policyText.slice(0, 6000);

  const damageList = damages
    .map((d, i) => {
      const verdict = coverageResults?.results?.[i];
      const sizeInfo =
        d.areaPercent != null && !isNaN(d.areaPercent)
          ? `${d.severity} severity (~${Number(d.areaPercent).toFixed(1)}% of panel/image area)`
          : "Severity unknown (no size data)";
      return `${i + 1}. ${d.part} - ${d.damage} | ${sizeInfo} | Detection Confidence: ${d.confidence} | Coverage: ${verdict?.status || "unknown"}`;
    })
    .join("\n");

  const response = await callGroqWithRetry(() =>
    client.chat.completions.create({
      model: "openai/gpt-oss-120b",
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `
You are an experienced Indian motor insurance claims estimator.

Return ONLY valid JSON. No markdown, no preamble.

You will be given a list of detected vehicle damages, each with a SEVERITY level (Minor/Moderate/Major)
based on the measured area of the damage relative to the panel/image, along with coverage status and the
full policy text (IDV, compulsory deductible, add-ons).

CRITICAL PRICING RULE:
Repair cost MUST scale with severity, not just damage type. Two dents of the same type but different
severities should get noticeably different cost ranges. As a rough general guide for a mid-size Indian
hatchback/SUV panel repair (adjust based on your judgement of the specific part and damage type):
- Minor severity (small dent/scratch, touch-up or minor panel work): lower end of typical repair cost range
- Moderate severity (visible dent/scratch needing panel beating + repaint): mid-range cost
- Major severity (large dent, deep damage, possible panel replacement): higher end, potentially full panel replacement cost

Also factor in:
1. Whether Nil Depreciation is active (no depreciation deduction on replaced parts if so).
2. The compulsory deductible, always subtracted from the total.
3. Only estimate payout for damages marked "covered". "notCovered" = 0 payout. "unclear" = cautious estimate, flagged as uncertain.
4. This is an ESTIMATE only, not a claim guarantee — keep figures as ranges.
5. Do not fabricate policy clauses. Base deductible/add-on logic strictly on the policy text provided.
6. Never assign the same estimated cost to two damages that have different severities.
`,
        },
        {
          role: "user",
          content: `
Detected Damages (with severity):
${damageList}

Policy Text:
${trimmedPolicy}

Return JSON in this exact format:

{
  "items": [
    {
      "part": "",
      "damage": "",
      "severity": "Minor" | "Moderate" | "Major" | "Unknown",
      "coverageStatus": "covered" | "notCovered" | "unclear",
      "estimatedRepairCost": "e.g. ₹1,200 - ₹2,000",
      "payoutNote": "one short sentence explaining the estimate, referencing severity"
    }
  ],
  "deductibleApplied": "e.g. ₹1,000",
  "nilDepreciationApplied": true,
  "estimatedTotalPayout": "e.g. ₹3,500 - ₹6,000",
  "disclaimer": "This is an approximate estimate based on typical repair costs and is not a guaranteed claim amount. Final payout is determined by the insurer's surveyor."
}

Rules:
1. Keep the same order as the input damage list in "items".
2. estimatedRepairCost and estimatedTotalPayout must be INR ranges, not single numbers.
3. "estimatedTotalPayout" must reflect the sum across covered items only, after deductible, with add-ons applied where relevant.
4. Damages with different severities must NOT receive identical cost ranges.
`,
        },
      ],
    })
  );

  const rawContent = response.choices[0].message.content;
  const cleaned = rawContent.replace(/```json\s*|\s*```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("estimateClaimPayout: failed to parse model output. Raw content was:", rawContent);
    throw new Error("Payout estimator returned invalid JSON — see console for raw model output.");
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// =======================================
// VERIFY VEHICLE IMAGE (Nano Banana 2 Lite)
// =======================================

export async function verifyVehicleImage(
  file,
  expectedView,
  policyVehicleNumber,
  referenceImage = null
) {
  const image = await fileToBase64(file);
  const base64 = image.split(",")[1];

  let referenceBase64 = null;

  if (referenceImage) {
    const refImage = await fileToBase64(referenceImage);
    referenceBase64 = refImage.split(",")[1];
  }

  const imageContent = [];

  imageContent.push({
    type: "text",
    text: `
You are an AI vehicle inspection system for insurance claims.

You have to verify whether the uploaded vehicle image belongs to the SAME vehicle.

IMPORTANT:

If a reference image is provided:

IMAGE 1 = Previously verified vehicle.
IMAGE 2 = New uploaded vehicle.

Compare IMAGE 1 and IMAGE 2.

Reject if:

- Different vehicle
- Different registration number
- Different car model
- Different color
- Different body shape
- Different vehicle identity

Do not accept only because the view matches.

A rear image of another car MUST be rejected.

Tasks:

1. Detect the view of IMAGE 2.
2. Check if IMAGE 2 is the same vehicle as IMAGE 1.
3. Detect number plate.
4. Read registration number.
5. Compare with policy vehicle number.
6. Verify expected view.

Expected Vehicle View:
${expectedView}

Policy Vehicle Number:
${policyVehicleNumber}

STRICT ACCEPTANCE RULE:

accepted = true ONLY IF:

sameVehicle = true
AND
vehicleMatched = true
AND
viewMatched = true

Return ONLY JSON:

{
  "expectedView":"",
  "detectedView":"",
  "viewMatched":false,
  "numberPlateVisible":false,
  "detectedVehicleNumber":"",
  "vehicleMatched":false,
  "sameVehicle":false,
  "confidence":0,
  "accepted":false,
  "message":""
}
`,
  });

  if (referenceBase64) {
    imageContent.push({
      type: "image_url",
      image_url: {
        url: `data:${referenceImage.type};base64,${referenceBase64}`,
      },
    });
  }

  imageContent.push({
    type: "image_url",
    image_url: {
      url: `data:${file.type};base64,${base64}`,
    },
  });

  const response = await openrouter.chat.completions.create({
    model: "google/gemini-2.5-flash",
    temperature: 0,
    max_tokens: 1000,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `
You are a strict insurance vehicle verification AI.
Never approve a different vehicle.
`,
      },
      {
        role: "user",
        content: imageContent,
      },
    ],
  });

  const content = response.choices[0].message.content;
  console.log(content);

  try {
    return JSON.parse(content);
  } catch (err) {
    console.error(content);
    throw new Error("Gemini returned invalid JSON");
  }
}