import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BotpressChat from "./ChatBot";
import { Car, Home, HeartHandshake, ShieldCheck, ArrowRight, Sparkles,} from "lucide-react";
function Features() {
  const navigate = useNavigate();
  const InsuranceCard = ({icon: Icon,title,subtitle,features,path,}) => {
    return (
      <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} whileHover={{y: -15,scale: 1.03,}} onClick={() => navigate(path)} className="group relative cursor-pointer overflow-hidden rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm transition-all duration-500 hover:border-black hover:shadow-2xl">
        <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
          <div className="absolute -top-32 -right-20 h-64 w-64 rounded-full bg-black/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-gray-300/20 blur-3xl" />
        </div>
        <motion.div animate={{y: [0, -8, 0],rotate: [0, 4, -4, 0],}} transition={{duration: 4,repeat: Infinity,}} className="relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-black text-white shadow-xl"><Icon className="h-10 w-10" /></motion.div>
        <div className="relative z-10 mt-8">
          <h2 className="text-3xl font-black">{title}</h2>
          <p className="mt-4 leading-8 text-gray-600">{subtitle}</p>
        </div>
        <div className="relative z-10 mt-8 space-y-4">
          {features.map((item, index) => (
            <motion.div key={index} initial={{opacity: 0,x: -20,}} whileHover={{x: 6,}} whileInView={{opacity: 1,x: 0,}} transition={{delay: index * 0.15,duration: 0.4,ease: "easeOut",}} viewport={{ once: true }} className="flex items-center gap-4">
                <motion.div initial={{scale: 0,}} whileInView={{scale: 1,}} transition={{delay: index * 0.15 + 0.1,duration: 0.25,}} viewport={{ once: true }} className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition group-hover:bg-black"><ShieldCheck className="h-5 w-5 text-black group-hover:text-white" /></motion.div>
                <motion.span initial={{opacity: 0,}} whileInView={{opacity: 1,}} transition={{delay: index * 0.15 + 0.15,duration: 0.3,}} viewport={{ once: true }} className="font-medium text-gray-700">{item}</motion.span>
            </motion.div>
          ))}
        </div>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="relative z-10 mt-10 flex items-center gap-3 rounded-2xl bg-black px-6 py-4 text-white">
          <span className="font-semibold">Explore Solution</span>
          <motion.div animate={{x: [0, 5, 0],}} transition={{repeat: Infinity,duration: 1.2,}}><ArrowRight size={20} /></motion.div>
        </motion.button>
      </motion.div>
    );
  };
  return (
    <>
      <Navbar />
      <BotpressChat/>
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="absolute -top-44 -left-40 h-[450px] w-[450px] rounded-full bg-black/5 blur-[120px]" />
        <div className="absolute top-80 -right-40 h-[400px] w-[400px] rounded-full bg-gray-400/10 blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="h-full w-full" style={{backgroundImage: `linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)`,backgroundSize: "60px 60px",}}/>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24">
          <motion.div initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }} className="flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border bg-white px-6 py-3 shadow">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">AI Powered Insurance Platform</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} viewport={{ once: true }} className="text-center mt-10">
            <h1 className="text-5xl md:text-7xl font-black leading-tight">Intelligent Insurance<br /><span className="text-gray-500">Claim Solutions</span></h1>
            <p className="mt-8 max-w-3xl mx-auto text-xl leading-9 text-gray-600">Experience next-generation AI claim automation across Car, Home and Term Life Insurance with intelligent document verification, fraud detection, vehicle inspection and seamless claim processing.</p>
          </motion.div>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: .8 }} viewport={{ once: true }} className="mt-20 h-[2px] origin-left bg-gradient-to-r from-transparent via-black to-transparent"/>
          <div className="mt-20 grid lg:grid-cols-3 gap-10">
            <InsuranceCard icon={Car} title="Car Insurance" subtitle="AI-powered automobile insurance with intelligent vehicle verification, number plate validation, policy checking and fraud detection." path="/car" features={["Vehicle Verification","Number Plate Matching","Damage Assessment","Policy Validation","Fraud Detection","Instant Claim Processing",]}/>
            <InsuranceCard icon={HeartHandshake} title="Term Life Insurance" subtitle="Automated life insurance claims with nominee verification, identity validation and AI-powered document processing." path="/life" features={["Nominee Verification","Identity Validation","Death Certificate Check","Policy Extraction","Fraud Prevention","Quick Settlement",]}/>
            <InsuranceCard icon={Home} title="Home Insurance" subtitle="Intelligent home insurance claim automation with property verification, damage analysis and repair estimation." path="/home" features={["Property Verification","Damage Analysis","Ownership Validation","Repair Estimation","Fraud Detection","Automated Claims",]}/>
          </div>
          <motion.div initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mt-28">
            <div className="text-center">
              <h2 className="text-4xl font-black">Trusted AI Platform</h2>
              <p className="mt-4 text-lg text-gray-500">Delivering faster, smarter and more secure insurance claim processing powered by Artificial Intelligence.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
              {[
                {number: "10K+",title: "Claims Processed",desc: "Successfully verified insurance claims."},
                {number: "99.8%",title: "Verification Accuracy",desc: "High confidence AI verification."},
                {number: "<30s",title: "Average Processing",desc: "Complete verification within seconds."},
                {number: "24×7",title: "AI Assistance",desc: "Always available whenever you need."}
              ].map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{delay: index * 0,duration: 0.6,}} whileHover={{y: -12,scale: 1.04,}} viewport={{ once: true }} className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-black hover:shadow-2xl">
                  <h2 className="text-5xl font-black">{item.number}</h2>
                  <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 leading-7 text-gray-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Features;