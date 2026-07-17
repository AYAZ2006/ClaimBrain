import React, { useState } from "react";
import Navbar from "./Navbar";
import { Camera, CheckCircle2, X } from "lucide-react";
import { motion } from "framer-motion";
import { verifyVehicleImage } from "../utils/openai";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import carAnimation from "../assets/carr.json";
function ClaimVerify() {

  const policyVehicleNumber = "REVTRN20JUXMH3219";
  const [images, setImages] = useState({front: null,rear: null,left: null,right: null,});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState({front: false,rear: false,left: false,right: false,});
  const canUpload = {front: true,rear: verified.front,left: verified.rear,right: verified.left,};
  const handleCapture = async (side, file) => {
  if (!file) return;
  setError("");
  if (!canUpload[side]) {
    setError(
      `Please verify the ${side === "rear" ? "Front" : side === "left" ? "Rear" : side === "right" ? "Left" : "Front"} view first.`);
    return;
  }
  setLoading(true);
  const toastId = toast.custom(() => (
    <div className="w-72 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 px-4 py-3">
      <div className="flex items-center gap-3">
        <video src="/carr.webm" autoPlay loop muted playsInline className="w-16 h-16 object-contain"/>
        <div>
          <p className="font-semibold text-sm text-gray-800">AI is verifying {side} view</p>
          <p className="text-xs text-gray-500 mt-1">Inspecting vehicle details...</p>
        </div>
      </div>
    </div>
    ),{duration: Infinity,}
  );
  try {
    const expectedView = {front: "Front",rear: "Rear",left: "Left",right: "Right",};
    const result = await verifyVehicleImage(file,expectedView[side],policyVehicleNumber);
    if (side === "front") {
      if (!result.viewMatched) {
        toast.dismiss(toastId);
        toast.error(result.message || "Invalid vehicle view");
        setError(result.message);
        setLoading(false);
        return;
      }
      if (!result.numberPlateVisible) {
        toast.dismiss(toastId);
        toast.error("Number plate not visible. Capture a clearer front image.");
        setError("Number plate is not visible. Please capture a clearer FRONT image.");
        setLoading(false);
        return;
      }
      if (!result.vehicleMatched) {
        toast.dismiss(toastId);
        toast.error("Vehicle number does not match policy");
        setError(`Vehicle number does not match policy.Detected : ${result.detectedVehicleNumber}`);
        setLoading(false);
        return;
      }
    }
    else {
      if (!result.viewMatched) {
        toast.dismiss(toastId);
        toast.error(result.message || "Vehicle view does not match");
        setError(result.message);
        setLoading(false);
        return;
      }
    }
    setImages((prev) => ({...prev,[side]: {file,preview: URL.createObjectURL(file),ai: result,},}));
    setVerified((prev) => ({...prev,[side]: true,}));
    toast.dismiss(toastId);
    toast.success(`${side.toUpperCase()} view verified successfully`);
    setError("");
  }
  catch (err) {
    toast.dismiss(toastId);
    toast.error("AI verification failed. Please try again.");
    setError("AI Verification Failed.");
  }
  finally {
    toast.dismiss(toastId);
    setLoading(false);
  }
};
  const removeImage = (side) => {
  setImages((prev) => ({...prev,[side]: null,}));
  setVerified((prev) => ({...prev,[side]: false,}));
  if (side === "front") {
    setVerified({front: false,rear: false,left: false,right: false,});
    setImages({front: null,rear: null,left: null,right: null,});
  }
  if (side === "rear") {
    setVerified((prev) => ({...prev,rear: false,left: false,right: false,}));
    setImages((prev) => ({...prev,rear: null,left: null,right: null,}));
  }
  if (side === "left") {
    setVerified((prev) => ({...prev,left: false,right: false,}));
    setImages((prev) => ({...prev,left: null,right: null,}));
  }
  if (side === "right") {
    setVerified((prev) => ({...prev,right: false,}));
    setImages((prev) => ({...prev,right: null,}));
  }
};

  const completed = verified.front && verified.rear && verified.left && verified.right;
  const CaptureCard = ({ title, side }) => {
  const previousView = {rear: "Front",left: "Rear",right: "Left",};
  return (
    <motion.div whileHover={{ scale: canUpload[side] ? 1.02 : 1 }} className={`bg-white rounded-2xl border shadow-sm p-5 transition ${ !canUpload[side] ? "opacity-50 pointer-events-none" : ""}`}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {!canUpload[side] && (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10">
          <Camera size={60} className="mx-auto text-gray-400"/>
          <p className="text-center mt-5 text-lg font-semibold text-gray-500">Locked</p>
          <p className="text-center text-red-500 mt-2">Verify {previousView[side]} View First</p>
        </div>
      )}
      {canUpload[side] && !images[side] && (
        <label className="cursor-pointer block">
          <input type="file" accept="image/*" capture="environment" className="hidden" disabled={loading} onChange={(e) =>handleCapture(side, e.target.files[0])}/>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 hover:bg-gray-50 transition">
            <Camera size={60} className="mx-auto text-black"/>
            <p className="text-center mt-5 text-lg font-semibold">{loading ? "Verifying..." : `Capture ${title}`}</p>
            <p className="text-center text-gray-500 mt-2">{loading ? "AI is verifying..." : "Use your phone camera"}</p>
          </div>
        </label>
      )}
      {images[side] && (
        <div>
          <div className="relative">
            <img src={images[side].preview} className="rounded-xl w-full h-64 object-cover" alt=""/>
            <button onClick={() => removeImage(side)} className="absolute top-3 right-3 bg-red-600 rounded-full p-2">
              <X size={18} className="text-white"/>
            </button>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-green-600"/>
              <span className="font-semibold text-green-600">AI Verified</span>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              <p><b>Detected View:</b>{" "}{images[side].ai.detectedView}</p>
              {side === "front" && (
                <>
                  <p><b>Vehicle Number:</b>{" "}{images[side].ai.detectedVehicleNumber}</p>
                  <p className="font-semibold text-green-600">✓ Vehicle Number Verified</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white py-10 px-6">
        <div className="max-w-7xl mt-20 mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold">Vehicle Verification</h1>
            <p className="text-gray-500 mt-3 text-lg">Capture all four sides of your vehicle.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <CaptureCard title="Front View" side="front"/>
            <CaptureCard title="Rear View" side="rear"/>
            <CaptureCard title="Left Side" side="left"/>
            <CaptureCard title="Right Side" side="right"/>
          </div>
          <div className="mt-10 flex justify-end gap-4">
            <button className="px-6 py-3 border rounded-xl hover:bg-gray-100">Back</button>
            <button disabled={!completed} className={`px-8 py-3 rounded-xl font-semibold transition ${completed ? "bg-black text-white hover:bg-gray-800" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>Continue →</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClaimVerify;