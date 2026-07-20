import React from "react";
import Navbar from "./Navbar";
import {
  ShieldCheck,
  ShieldX,
  FileCheck2,
  IndianRupee,
  Calculator,
  Bot,
} from "lucide-react";

function Claim() {

  const policyCovered = [
    "Front Bumper",
    "Rear Bumper",
    "Windshield",
    "Bonnet",
    "Headlights",
  ];

  const policyNotCovered = [
    "Tyres",
    "Engine",
    "Battery",
  ];

  const detectedDamage = [
    "Front Bumper",
    "Bonnet",
    "Tyre",
  ];

  const coveredDamage = [
    "Front Bumper",
    "Bonnet",
  ];

  const notCoveredDamage = [
    "Tyre",
  ];

  const repairCosts = [
    {
      part: "Front Bumper",
      cost: "₹5,500",
    },
    {
      part: "Bonnet",
      cost: "₹8,000",
    },
    {
      part: "Windshield",
      cost: "₹12,000",
    },
    {
      part: "Headlight",
      cost: "₹6,000",
    },
    {
      part: "Mirror",
      cost: "₹2,000",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="text-center mb-12">

          <div className="inline-flex items-center gap-3 bg-white shadow border rounded-full px-8 py-4">

            <Bot
              size={30}
              className="text-pink-500"
            />

            <h1 className="text-4xl font-bold">
              AI Claim Assessment
            </h1>

          </div>

          <p className="text-lg text-gray-500 mt-5">
            Coverage Verification, Repair Cost Estimation &
            AI Claim Amount Prediction
          </p>

        </div>
        {/* ======================= COVERAGE VERIFICATION ======================= */}

<div className="grid lg:grid-cols-2 gap-8">

  {/* Policy Coverage */}

  <div className="bg-white rounded-3xl shadow-lg border p-8">

    <div className="flex items-center gap-3 mb-6">
      <FileCheck2 size={28} className="text-pink-500" />

      <div>
        <h2 className="text-2xl font-bold">
          Insurance Coverage Verification
        </h2>

        <p className="text-gray-500 text-sm">
          Compare detected damages with policy coverage
        </p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6">

      {/* Covered */}

      <div className="rounded-2xl border border-green-200 bg-green-50 p-5">

        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="text-green-600" />
          <h3 className="font-bold text-green-700">
            Policy Covers
          </h3>
        </div>

        <div className="space-y-3">

          {policyCovered.map((item) => (

            <div
              key={item}
              className="flex items-center gap-2"
            >
              <span className="text-green-600 font-bold">
                ✓
              </span>

              <span>{item}</span>

            </div>

          ))}

        </div>

      </div>

      {/* Not Covered */}

      <div className="rounded-2xl border border-red-200 bg-red-50 p-5">

        <div className="flex items-center gap-2 mb-4">
          <ShieldX className="text-red-600" />

          <h3 className="font-bold text-red-700">
            Policy Does NOT Cover
          </h3>

        </div>

        <div className="space-y-3">

          {policyNotCovered.map((item) => (

            <div
              key={item}
              className="flex items-center gap-2"
            >
              <span className="text-red-600 font-bold">
                ✗
              </span>

              <span>{item}</span>

            </div>

          ))}

        </div>

      </div>

    </div>

  </div>

  {/* Coverage Result */}

  <div className="bg-white rounded-3xl shadow-lg border p-8">

    <h2 className="text-2xl font-bold mb-6">
      Coverage Result
    </h2>

    <div className="mb-6">

      <h3 className="font-semibold text-lg mb-4">
        Detected Damage
      </h3>

      <div className="flex flex-wrap gap-3">

        {detectedDamage.map((item) => (

          <span
            key={item}
            className="px-4 py-2 rounded-full bg-gray-100"
          >
            {item}
          </span>

        ))}

      </div>

    </div>

    <div className="grid md:grid-cols-2 gap-6">

      {/* Covered */}

      <div className="rounded-2xl border border-green-200 bg-green-50 p-5">

        <h3 className="font-bold text-green-700 mb-4">
          Covered
        </h3>

        <div className="space-y-3">

          {coveredDamage.map((item) => (

            <div
              key={item}
              className="flex items-center gap-2"
            >
              <span className="text-green-600 font-bold">
                ✓
              </span>

              <span>{item}</span>

            </div>

          ))}

        </div>

      </div>

      {/* Not Covered */}

      <div className="rounded-2xl border border-red-200 bg-red-50 p-5">

        <h3 className="font-bold text-red-700 mb-4">
          Not Covered
        </h3>

        <div className="space-y-3">

          {notCoveredDamage.map((item) => (

            <div
              key={item}
              className="flex items-center gap-2"
            >
              <span className="text-red-600 font-bold">
                ✗
              </span>

              <span>{item}</span>

            </div>

          ))}

        </div>

      </div>

    </div>

  </div>

</div>
{/* ======================= REPAIR COST ======================= */}

<div className="grid lg:grid-cols-2 gap-8 mt-10">

  {/* Cost Database */}

  <div className="bg-white rounded-3xl shadow-lg border p-8">

    <div className="flex items-center gap-3 mb-6">

      <IndianRupee
        size={28}
        className="text-green-600"
      />

      <div>

        <h2 className="text-2xl font-bold">
          Repair Cost Estimation
        </h2>

        <p className="text-gray-500 text-sm">
          AI Repair Cost Database
        </p>

      </div>

    </div>

    <table className="w-full">

      <thead>

        <tr className="border-b">

          <th className="text-left py-3">
            Part
          </th>

          <th className="text-right py-3">
            Estimated Cost
          </th>

        </tr>

      </thead>

      <tbody>

        {repairCosts.map((item) => (

          <tr
            key={item.part}
            className="border-b"
          >

            <td className="py-4">
              {item.part}
            </td>

            <td className="py-4 text-right font-semibold text-green-600">
              {item.cost}
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

  {/* AI Result */}

  <div className="bg-white rounded-3xl shadow-lg border p-8 flex flex-col justify-center">

    <Calculator
      className="text-pink-500 mb-5"
      size={45}
    />

    <h2 className="text-2xl font-bold">
      Estimated Repair Cost
    </h2>

    <div className="mt-8 text-6xl font-bold text-green-600">
      ₹27,500
    </div>

    <p className="mt-5 text-gray-600 leading-7">
      Based on the detected damages and the
      repair cost database, ClaimBrain AI
      estimates that repairing the vehicle
      will cost approximately ₹27,500.
    </p>

  </div>

</div>
{/* ======================= CLAIM AMOUNT PREDICTION ======================= */}

<div className="mt-10 bg-white rounded-3xl shadow-lg border p-8">

  <div className="flex items-center gap-3 mb-8">
    <Bot size={32} className="text-pink-500" />

    <div>
      <h2 className="text-3xl font-bold">
        AI Claim Amount Prediction
      </h2>

      <p className="text-gray-500">
        Estimated claim amount after deductible and depreciation
      </p>
    </div>
  </div>

  <div className="grid lg:grid-cols-2 gap-10">

    {/* Formula */}

    <div className="rounded-2xl border bg-gray-50 p-8">

      <h3 className="text-2xl font-bold mb-8">
        Formula
      </h3>

      <div className="space-y-5 text-xl font-semibold">

        <div className="flex justify-between">
          <span>Estimated Repair Cost</span>
          <span className="text-green-600">
            ₹27,500
          </span>
        </div>

        <div className="text-center text-2xl">
          −
        </div>

        <div className="flex justify-between">
          <span>Deductible</span>
          <span className="text-red-500">
            ₹2,000
          </span>
        </div>

        <div className="text-center text-2xl">
          −
        </div>

        <div className="flex justify-between">
          <span>Depreciation</span>
          <span className="text-red-500">
            ₹1,500
          </span>
        </div>

        <hr />

        <div className="flex justify-between text-2xl font-bold">

          <span>
            Expected Claim
          </span>

          <span className="text-green-600">
            ₹24,000
          </span>

        </div>

      </div>

    </div>

    {/* AI Result */}

    <div className="rounded-2xl bg-linear-to-br from-pink-500 to-purple-600 text-white p-10 flex flex-col justify-center">

      <div className="text-sm uppercase tracking-widest opacity-80">
        ClaimBrain AI
      </div>

      <h2 className="text-5xl font-bold mt-4">
        ₹24,000
      </h2>

      <p className="mt-6 text-lg leading-8">

        Based on the detected damages,
        insurance policy coverage,
        deductible amount,
        and depreciation calculations,

        ClaimBrain AI predicts that the
        expected claim settlement amount
        is approximately

        <span className="font-bold">
          {" "}₹24,000.
        </span>

      </p>

      <button className="mt-10 bg-white text-pink-600 font-semibold rounded-xl py-4 hover:bg-gray-100 transition">
        Continue to Final Verification →
      </button>

    </div>

  </div>

</div>

</div>
</div>
);
}

export default Claim;