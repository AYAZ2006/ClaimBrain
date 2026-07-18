import React from "react";
import {
  Boxes,
  Car,
  CheckCircle2,
  ShieldAlert,
  Wrench,
} from "lucide-react";

function Parts() {
  const parts = [
    "Bonnet",
    "Front Bumper",
    "Rear Bumper",
    "Windshield",
    "Back Glass",
    "Front Left Door",
    "Front Right Door",
    "Rear Left Door",
    "Rear Right Door",
    "Left Mirror",
    "Right Mirror",
    "Left Headlight",
    "Right Headlight",
    "Left Tail Light",
    "Right Tail Light",
    "Number Plate",
    "Wheel",
    "Roof",
    "Fender",
  ];

  const detectedParts = [
    "Bonnet",
    "Front Bumper",
    "Left Headlight",
    "Windshield",
    "Right Mirror",
  ];

  const damages = [
    "Dent",
    "Scratch",
    "Crack",
    "Broken Glass",
    "Broken Headlight",
    "Broken Tail Light",
    "Broken Mirror",
    "Bent Bonnet",
    "Broken Bumper",
  ];

  const detectedDamages = [
    {
      part: "Front Bumper",
      damage: "Dent",
      confidence: "96%",
      color: "red",
    },
    {
      part: "Bonnet",
      damage: "Scratch",
      confidence: "94%",
      color: "orange",
    },
    {
      part: "Windshield",
      damage: "Crack",
      confidence: "98%",
      color: "red",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full shadow border">
            <Boxes className="text-pink-500" size={30} />
            <h1 className="text-4xl font-bold">
              AI Vehicle Inspection
            </h1>
          </div>

          <p className="text-gray-500 text-lg mt-5">
            Vehicle Parts Segmentation & Damage Detection using YOLO Models
          </p>
        </div>
                {/* ===================== CAR PARTS SEGMENTATION ===================== */}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Detectable Parts */}

          <div className="bg-white rounded-3xl shadow-lg border p-8">

            <div className="flex items-center gap-3 mb-6">
              <Car className="text-pink-500" size={28} />
              <div>
                <h2 className="text-2xl font-bold">
                  Car Parts Segmentation
                </h2>
                <p className="text-gray-500 text-sm">
                  Using YOLO Segmentation Model
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {parts.map((part) => (
                <div
                  key={part}
                  className="rounded-xl border bg-gray-50 px-4 py-3 hover:bg-pink-50 transition"
                >
                  {part}
                </div>
              ))}
            </div>

          </div>

          {/* Segmentation Result */}

          <div className="bg-white rounded-3xl shadow-lg border p-8">

            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="text-green-500" size={28} />
              <div>
                <h2 className="text-2xl font-bold">
                  Segmentation Result
                </h2>
                <p className="text-gray-500 text-sm">
                  Vehicle components detected successfully
                </p>
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl border border-green-200 p-6">

              <h3 className="font-semibold text-green-700 mb-5">
                Detected Parts
              </h3>

              <div className="flex flex-wrap gap-3">
                {detectedParts.map((part) => (
                  <span
                    key={part}
                    className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium"
                  >
                    ✓ {part}
                  </span>
                ))}
              </div>

            </div>

            <div className="mt-6 rounded-xl border bg-gray-50 p-5">

              <div className="flex items-center gap-3 mb-3">
                <Boxes className="text-pink-500" size={22} />
                <h3 className="font-semibold">
                  AI Summary
                </h3>
              </div>

              <p className="text-gray-600 leading-7">
                The segmentation model identified all visible vehicle
                components. Only these detected parts will be forwarded
                to the damage detection model for further inspection.
              </p>

            </div>

          </div>

        </div>
                {/* ===================== DAMAGE DETECTION ===================== */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          {/* Detectable Damages */}

          <div className="bg-white rounded-3xl shadow-lg border p-8">

            <div className="flex items-center gap-3 mb-6">
              <ShieldAlert className="text-red-500" size={28} />

              <div>
                <h2 className="text-2xl font-bold">
                  Damage Detection
                </h2>

                <p className="text-gray-500 text-sm">
                  Using YOLO Damage Detection Model
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {damages.map((damage) => (
                <div
                  key={damage}
                  className="rounded-xl border bg-gray-50 px-4 py-3 hover:bg-red-50 transition"
                >
                  {damage}
                </div>
              ))}
            </div>

          </div>

          {/* Damage Result */}

          <div className="bg-white rounded-3xl shadow-lg border p-8">

            <div className="flex items-center gap-3 mb-6">
              <Wrench className="text-red-500" size={28} />

              <div>
                <h2 className="text-2xl font-bold">
                  Damage Detection Result
                </h2>

                <p className="text-gray-500 text-sm">
                  AI Damage Analysis
                </p>
              </div>
            </div>

            <div className="space-y-5">

              {detectedDamages.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border bg-gray-50 p-5 hover:shadow-md transition"
                >

                  <div className="flex justify-between items-center">

                    <div>

                      <h3 className="font-bold text-lg">
                        {item.part}
                      </h3>

                      <p
                        className={`mt-2 font-medium ${
                          item.color === "red"
                            ? "text-red-600"
                            : "text-orange-500"
                        }`}
                      >
                        {item.damage}
                      </p>

                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-white font-semibold ${
                        item.color === "red"
                          ? "bg-red-500"
                          : "bg-orange-500"
                      }`}
                    >
                      {item.confidence}
                    </span>

                  </div>

                </div>
              ))}

            </div>

            {/* Summary */}

            <div className="mt-8 rounded-2xl bg-red-50 border border-red-200 p-6">

              <h3 className="font-semibold text-red-700 mb-3">
                AI Inspection Summary
              </h3>

              <p className="text-gray-700 leading-7">
                The damage detection model identified multiple visible
                defects on the inspected vehicle. High-confidence damage
                includes a dent on the front bumper, a scratch on the
                bonnet, and a crack on the windshield. These detections
                will be forwarded to the claim assessment engine for
                repair cost estimation and fraud verification.
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Parts;