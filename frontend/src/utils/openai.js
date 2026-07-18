import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
// Groq API
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
// =======================================
// POLICY PARSER
// =======================================

export async function parsePolicy(text) {

  const policyText = text.slice(0, 12000);

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    temperature: 0,

    response_format: {
      type: "json_object",
    },

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
  });

  return JSON.parse(response.choices[0].message.content);
}

// =======================================
// IMAGE -> BASE64
// =======================================

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

`

  });



  // Add reference image first
  if (referenceBase64) {

    imageContent.push({

      type:"image_url",

      image_url:{
        url:`data:${referenceImage.type};base64,${referenceBase64}`
      }

    });

  }



  // Add new uploaded image

  imageContent.push({

    type:"image_url",

    image_url:{
      url:`data:${file.type};base64,${base64}`
    }

  });



  const response = await openrouter.chat.completions.create({

    model:"google/gemini-2.5-flash",

    temperature:0,

    max_tokens:1000,

    response_format:{
      type:"json_object"
    },


    messages:[

      {
        role:"system",

        content:`
You are a strict insurance vehicle verification AI.
Never approve a different vehicle.
`
      },


      {
        role:"user",

        content:imageContent

      }

    ]

  });



  const content = response.choices[0].message.content;


  console.log(content);



  try {

    return JSON.parse(content);

  }

  catch(err){

    console.error(content);

    throw new Error(
      "Gemini returned invalid JSON"
    );

  }

}