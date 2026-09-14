import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { checkDamageCoverage, estimateClaimPayout } from "../utils/openai";
import { Boxes, CheckCircle2, Wrench, Loader2, Camera, Activity, ShieldCheck, ShieldX, ShieldAlert, IndianRupee} from "lucide-react";
import AILoader from "./AILoader";
import SliderCheckout from "./SliderCheckout";
function Parts() {
  const location = useLocation();
  const navigate = useNavigate();
  const uploadedImages = location.state?.images || null;
  const policyText = location.state?.policyText || null;
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [processedImages, setProcessedImages] = useState({});
  const [detectedDamages, setDetectedDamages] = useState([]);
  const [coverageResults, setCoverageResults] = useState(null);
  const [isCoverageLoading, setIsCoverageLoading] = useState(false);
  const [coverageError, setCoverageError] = useState(null);
  const [payoutEstimate, setPayoutEstimate] = useState(null);
  const [isPayoutLoading, setIsPayoutLoading] = useState(false);
  const [payoutError, setPayoutError] = useState(null);
  useEffect(() => {
    const analyzeVehicle = async () => {
      if (!uploadedImages) {
        setIsAnalyzing(false);
        return;
      }
      let allDamages = [];
      let resultingImages = {};
      for (const [side, data] of Object.entries(uploadedImages)) {
        if (data && data.file) {
          try {
            const formData = new FormData();
            formData.append("image", data.file);
            const response = await axios.post("http://127.0.0.1:8000/analyze-damage/",formData,{headers: {"Content-Type": "multipart/form-data"}});
            resultingImages[side] = response.data.image_base64;
            response.data.damages.forEach((dmg) => {
              allDamages.push({
                part: `${side.charAt(0).toUpperCase() + side.slice(1)} View`,
                damage: dmg.damage_type,
                confidenceScore: dmg.confidence,
                confidence: `${dmg.confidence}%`,
                color: dmg.confidence > 85 ? "red" : "orange"
              });
            });
          } catch (error) {
            console.error(`Error analyzing ${side} image:`, error);
          }
        }
      }
      setProcessedImages(resultingImages);
      setDetectedDamages(allDamages);
      setIsAnalyzing(false);
    };
    analyzeVehicle();
  }, [uploadedImages]);

  useEffect(() => {
    const runCoverageCheck = async () => {
      if (!policyText || detectedDamages.length === 0) return;
      setIsCoverageLoading(true);
      setCoverageError(null);
      try {
        const result = await checkDamageCoverage(detectedDamages, policyText);
        setCoverageResults(result);
      } catch (error) {
        console.error("Error checking damage coverage:", error);
      } finally {
        setIsCoverageLoading(false);
      }
    };
    runCoverageCheck();
  }, [detectedDamages, policyText]);

  useEffect(() => {
    const runPayoutEstimate = async () => {
      if (!policyText || detectedDamages.length === 0 || !coverageResults) return;
      setIsPayoutLoading(true);
      setPayoutError(null);
      try {
        const estimate = await estimateClaimPayout(detectedDamages, policyText, coverageResults);
        setPayoutEstimate(estimate);
      } catch (error) {
        console.error("Error estimating payout:", error);
      } finally {
        setIsPayoutLoading(false);
      }
    };
    runPayoutEstimate();
  }, [detectedDamages, policyText, coverageResults]);

  const mergedDamages = detectedDamages.map((d, i) => {
    const verdict = coverageResults?.results?.[i];
    return {...d,status: verdict?.status || null,reason: verdict?.reason || null};});
  const allCovered = coverageResults?.allCovered ?? null;
  if (isAnalyzing) {
    return <AILoader />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {Object.keys(processedImages).length > 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 mt-10 mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-pink-100 p-3 rounded-2xl">
                  <Camera className="text-pink-600" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Visual Evidence</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(processedImages).map(
                  ([side, base64Str]) => (
                    <motion.div whileHover={{ y: -5, scale: 1.02 }} key={side} className="group relative overflow-hidden rounded-2xl border shadow-sm bg-gray-100 aspect-[4/3]">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10 opacity-80" />
                      <span className="absolute bottom-4 left-4 text-white text-sm font-bold tracking-wider uppercase z-20 flex items-center gap-2"><CheckCircle2 size={16} className="text-green-400"/>{side} View</span>
                      <img src={base64Str} alt={`${side} view analysis`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          )}
          <div className="mt-8 grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto items-start">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-red-50 p-4 rounded-2xl"><Wrench className="text-red-500" size={32} /></div>
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900">Assessment Report</h2>
                  <p className="text-gray-500 text-sm font-medium mt-1">Final defect classification & policy coverage</p>
                </div>
              </div>
              <div className="space-y-4">
                {mergedDamages.length > 0 ? (
                  mergedDamages.map((item, index) => (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} key={index} className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all p-5 group">
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${ item.color === "red" ? "bg-red-500" : "bg-orange-500"}`}></div>
                      <div className="flex justify-between items-start mb-3 ml-2">
                        <div><h3 className="font-bold text-gray-900">{item.part}</h3>
                          <p className={`text-sm font-bold uppercase tracking-wide mt-1 ${item.color === "red" ? "text-red-600" : "text-orange-500"}`}>{item.damage}</p>
                          <div className="mt-3">
                            {isCoverageLoading && !item.status ? ( <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400"><Loader2 size={12} className="animate-spin" /> Checking policy... </span>
                            ) : item.status === "covered" ? (
                              <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-700"><ShieldCheck size={14} /> Covered by Policy</span>
                            ) : item.status === "notCovered" ? (
                              <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-red-100 text-red-700"><ShieldX size={14} /> Not Covered</span>
                            ) : item.status === "unclear" ? (
                              <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-yellow-100 text-yellow-700"><ShieldAlert size={14} /> Coverage Unclear</span>
                            ) : null}
                            {item.reason && (
                              <p className="text-xs text-gray-500 mt-1 max-w-md">{item.reason}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <span className="text-xs text-gray-500 font-semibold block mb-1">CONFIDENCE</span>
                          <span className={`text-lg font-black ${ item.color === "red" ? "text-red-600" : "text-orange-500"}`}>{item.confidence}</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 ml-2 mr-2 overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: item.confidence }} transition={{duration: 1,ease: "easeOut" }} className={`h-full rounded-full ${ item.color === "red" ? "bg-red-500" : "bg-orange-500"}`}/>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-8 text-center bg-green-50 rounded-2xl border border-green-100 flex flex-col justify-center items-center gap-3">
                    <div className="bg-white p-4 rounded-full shadow-sm"><CheckCircle2 className="text-green-500" size={40}/></div>
                    <div><h3 className="text-green-800 font-bold text-lg">Vehicle Clear</h3><p className="text-green-600 text-sm mt-1">No significant defects detected.</p>
                    </div>
                  </div>
                )}
              </div>
              {coverageError && (
                <div className="mt-6 rounded-2xl bg-red-50 border border-red-100 p-4 text-sm text-red-600 font-medium">{coverageError}</div>
              )}
              <div className="mt-8 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-200 p-6 shadow-inner">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><Activity size={18} className="text-pink-500"/>Final Disposition</h3>
                <p className="text-gray-600 leading-relaxed text-sm font-medium">{detectedDamages.length > 0 ? `Identified ${detectedDamages.length} defect(s) requiring attention. Telemetry has been logged and forwarded to the estimation engine for financial modeling.` : "Inspection returned negative for surface defects. Vehicle passes automated visual clearance."}</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-green-50 p-4 rounded-2xl">
                  <IndianRupee className="text-green-600" size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900">Estimated Payout</h2>
                  <p className="text-gray-500 text-sm font-medium mt-1">Approximate claim value based on your policy</p>
                </div>
              </div>
              {isPayoutLoading && (
                <div className="flex items-center justify-center gap-3 py-10">
                  <Loader2 className="animate-spin text-green-500" size={24} />
                  <p className="text-gray-500 font-medium">Estimating payout...</p>
                </div>
              )}
              {payoutError && (
                <div className="rounded-2xl bg-red-50 border border-red-100 p-4 text-sm text-red-600 font-medium">{payoutError}</div>
              )}
              {!isPayoutLoading && !payoutError && !payoutEstimate && (
                <p className="text-sm text-gray-500">Payout estimate will appear once coverage has been checked.</p>
              )}
              {payoutEstimate && (
                <div className="space-y-4">
                  {payoutEstimate.items?.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl border border-gray-100 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{item.part}</h4>
                          <p className="text-xs text-gray-500 uppercase font-semibold mt-0.5">{item.damage}</p>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.coverageStatus === "covered" ? "bg-green-100 text-green-700" : item.coverageStatus === "notCovered" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{item.coverageStatus}</span>
                      </div>
                      <p className="text-sm font-bold text-gray-800 mt-2">{item.estimatedRepairCost}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.payoutNote}</p>
                    </div>
                  ))}
                  <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Deductible Applied</span>
                      <span className="font-semibold text-gray-800">{payoutEstimate.deductibleApplied}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Nil Depreciation</span>
                      <span className="font-semibold text-gray-800">{payoutEstimate.nilDepreciationApplied ? "Applied" : "Not Applied"}</span>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                      <span className="text-gray-700 font-bold">Estimated Total Payout</span>
                      <span className="text-2xl font-black text-green-600">{payoutEstimate.estimatedTotalPayout}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-4 italic">{payoutEstimate.disclaimer}</p>
                </div>
              )}
            </motion.div>
          </div>
          <div className="w-full px-6 mt-10">
            <SliderCheckout label="Slide to finish & go home" redirectTo="/" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Parts;