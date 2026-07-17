import React, { useState } from "react";
import Navbar from "./Navbar";
import { UploadCloud, FileText, CheckCircle2, X } from "lucide-react";
import { motion } from "framer-motion";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { parsePolicy } from "../utils/openai";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function Car() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [policyData, setPolicyData] = useState({});
  const extractTextFromPDF = async (file) => {
    setIsUploading(true);
    setIsProcessing(false);
    setProgress(0);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const typedArray = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument({data: typedArray,}).promise;
        let fullText = "";
        for (let page = 1; page <= pdf.numPages; page++) {
          const current = await pdf.getPage(page);
          const content = await current.getTextContent();
          const pageText = content.items.map((item) => item.str).filter(Boolean).join(" ");
          fullText += pageText + "\n\n";
          setProgress(Math.floor((page / pdf.numPages) * 100));
        }
        setIsUploading(false);
        if (fullText.trim().length < 30) {
          alert("Scanned PDF detected. OCR is required.");
          return;
        }
        setIsProcessing(true);
        try {
          const parsed = await parsePolicy(fullText);
          console.log(parsed);
          setPolicyData(parsed);
        } catch (err) {
          console.error(err);
          alert("Unable to understand this policy.");
        } finally {
          setIsProcessing(false);
        }
      } catch (err) {
        console.error(err);
        alert("Unable to read PDF.");
        setIsUploading(false);
        setIsProcessing(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }
    setSelectedFile(file);
    setProgress(0);
    setPolicyData({});
    extractTextFromPDF(file);
  };

  const handleFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    preventDefaults(e);
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setProgress(0);
    setIsUploading(false);
    setIsProcessing(false);
    setPolicyData({});
  };
  const isPolicyActive = () => {
    if (!policyData.startDate || !policyData.endDate) return false;
    try {
      const parseDate = (dateStr) => {
      const [day, month, year] = dateStr.trim().split("-");
      const months = {jan: 0,feb: 1,mar: 2,apr: 3,may: 4,jun: 5,jul: 6,aug: 7,sep: 8,oct: 9,nov: 10,dec: 11,};
      return new Date(Number(year),months[month.toLowerCase()],Number(day));
    };
      const start = parseDate(policyData.startDate);
      const end = parseDate(policyData.endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today >= start && today <= end;
    } catch {
      return false;
    }
  };
  const policyActive = isPolicyActive();
  return (
  <>
    <Navbar />
    <div className="min-h-screen bg-white py-10 px-6">
      <div className="max-w-7xl mt-20 mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-black">ClaimBrain AI</h1>
          <p className="text-gray-500 mt-3 text-lg">Upload your Car Insurance Policy and let AI extract all details automatically.</p>
        </div>
        <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">
        {!selectedFile && (
            <div onDrop={handleDrop} onDragEnter={preventDefaults} onDragOver={preventDefaults} className="p-16 border-2 border-dashed border-gray-300 text-center hover:bg-gray-50 transition-all duration-300 cursor-pointer">
              <UploadCloud size={80} className="mx-auto text-gray-700"/>
              <h2 className="text-3xl font-bold mt-6">Drag & Drop Insurance Policy</h2>
              <p className="text-gray-500 mt-4">Supports PDF files from any insurance company</p>
              <label className="inline-block mt-8">
                <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange}/>
                <span className="px-8 py-4 rounded-xl bg-black text-white cursor-pointer hover:bg-gray-800 font-semibold">Browse PDF</span>
              </label>
            </div>
          )}
          {selectedFile && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 border-b bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex gap-5 items-center">
                  <FileText className="text-red-500" size={55}/>
                  <div>
                    <h2 className="font-bold text-xl">{selectedFile.name}</h2>
                    <p className="text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <button onClick={removeFile} className="bg-red-100 hover:bg-red-200 rounded-full p-3 transition">
                  <X size={22} className="text-red-600"/>
                </button>
              </div>
            </motion.div>
          )}
          {isUploading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
              <div className="flex justify-between mb-2">
                <h2 className="font-semibold text-lg">Reading PDF...</h2>
                <span className="font-bold text-gray-700">{progress}%</span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} className="h-full bg-black"/>
              </div>
            </motion.div>
          )}
          {isProcessing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-md">
            <div className="w-[90%] max-w-md rounded-3xl bg-white p-10 shadow-2xl text-center">
              <div className="flex justify-center mb-6"><div className="w-16 h-16 border-[5px] border-pink-200 border-t-pink-500 rounded-full animate-spin"></div></div>
              <h2 className="text-2xl font-bold text-gray-900">ClaimBrain AI</h2>
              <p className="mt-3 text-gray-600">Analyzing your insurance policy...</p>
              <p className="text-sm text-gray-400 mt-2">Extracting vehicle details, owner information and policy data.</p>
                <div className="flex justify-center gap-2 mt-8">
                  <span className="w-3 h-3 rounded-full bg-pink-500 animate-bounce"></span>
                  <span className="w-3 h-3 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: "0.15s" }}></span>
                  <span className="w-3 h-3 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: "0.3s" }}></span>
                </div>
              </div>
            </motion.div>
          )}
          {Object.keys(policyData).length > 0 && (
            <div className="mx-8 mt-8 rounded-xl bg-gray-50 border border-gray-200 p-5">
              <h2 className="text-2xl font-bold text-black">✅ Policy Successfully Parsed</h2>
              <p className="text-gray-600 mt-2">ClaimBrain AI extracted the insurance information successfully.</p>
            </div>
          )}
          {Object.keys(policyData).length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid lg:grid-cols-2 gap-6 p-8">
              <div className="bg-white rounded-2xl border shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-black">Owner Information</h2>
                  <span className="bg-gray-100 text-black px-3 py-1 rounded-full text-sm">AI Verified</span>
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="text-gray-500">Policy Holder</p>
                    <p className="font-semibold text-lg">{policyData.ownerName || policyData.policyHolderName || "Not Found"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Policy Number</p>
                    <p className="font-semibold">{policyData.policyNumber || "Not Found"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Insurance Company</p>
                    <p className="font-semibold">{policyData.company || policyData.insuranceCompany || "Not Found"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p className="font-semibold">{policyData.phone || "Not Available"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-semibold">{policyData.email || "Not Available"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Address</p>
                    <p className="font-semibold">{policyData.address || "Not Available"}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl border shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-black">Vehicle Information</h2>
                  <span className="bg-gray-100 text-black px-3 py-1 rounded-full text-sm">Extracted</span>
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="text-gray-500">Registration Number</p>
                    <p className="font-semibold text-lg">{policyData.vehicleNumber || "Not Found"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Vehicle Model</p>
                    <p className="font-semibold">{policyData.vehicleModel || policyData.model || "Not Found"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Engine Number</p>
                    <p className="font-semibold">{policyData.engineNumber || "Not Found"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Chassis Number</p>
                    <p className="font-semibold">{policyData.chassisNumber || "Not Found"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Manufacturing Year</p>
                    <p className="font-semibold">{policyData.year || "Not Available"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Fuel Type</p>
                    <p className="font-semibold">{policyData.fuelType || "Not Available"}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl border shadow-sm p-6 lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-black">Insurance Details</h2>
                  <span className="bg-gray-100 text-black px-3 py-1 rounded-full text-sm">Verified</span>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="text-gray-500 text-sm">Policy Start Date</p>
                    <p className="font-bold text-lg mt-2">{policyData.startDate || "Not Found"}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="text-gray-500 text-sm">Policy End Date</p>
                    <p className="font-bold text-lg mt-2">{policyData.endDate || "Not Found"}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="text-gray-500 text-sm">IDV</p>
                    <p className="font-bold text-lg mt-2">{policyData.idv || "Not Found"}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="text-gray-500 text-sm">Premium</p>
                    <p className="font-bold text-lg mt-2">{policyData.premium || "Not Found"}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="text-gray-500 text-sm">Nominee</p>
                    <p className="font-bold text-lg mt-2">{policyData.nominee || "Not Available"}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="text-gray-500 text-sm">Policy Status</p>
                    <p className={`font-bold text-lg mt-2 ${policyActive ? "text-green-600" : "text-red-600"}`}>{policyActive ? "Active" : "Expired"}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {Object.keys(policyData).length > 0 && (
            <div className="px-8 pb-8 flex justify-end gap-4">
              <button onClick={removeFile} className="px-6 py-3 rounded-xl border hover:bg-gray-100">Upload Another PDF</button>
              {policyActive ? (
                <a href="/claim-verify" className="px-8 py-3 rounded-xl bg-black hover:bg-gray-800 text-white font-semibold no-underline">Continue to Claim Verification →</a>) : (
                <button disabled className="px-8 py-3 rounded-xl bg-gray-400 text-white font-semibold cursor-not-allowed" title="This policy has expired">Policy Expired</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  </>
);
}
export default Car;