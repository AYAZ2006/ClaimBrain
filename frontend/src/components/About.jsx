import React, { useState } from "react";
import {Upload,BrainCircuit,ShieldAlert,BadgeCheck,Wallet,ShieldCheck,Car,Home,HeartHandshake,Target,Eye,ArrowRight,Sparkles,CheckCircle2,Cpu,ChevronDown} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BotpressChat from "./ChatBot";
import KineticText from "./KineticText";
import { motion, AnimatePresence } from "framer-motion";
function About() {
  const [openFAQ, setOpenFAQ] = useState(0);
  const insuranceData = [
    {
      icon: Car,
      title: "Car Insurance",
      description: "Our AI-powered automobile insurance platform simplifies the entire claims process. From vehicle verification to intelligent damage assessment, every claim is processed faster with advanced automation.",
      features: ["Vehicle Verification","Number Plate Detection","Damage Assessment","Policy Validation",],
    },
    {
      icon: Home,
      title: "Home Insurance",
      description: "Protect your home against unexpected events with intelligent property verification, ownership validation, and automated damage estimation powered by Artificial Intelligence.",
      features: ["Property Verification","Disaster Protection","Ownership Validation","Repair Estimation",],
    },
    {
      icon: HeartHandshake,
      title: "Health Insurance",
      description: "Experience seamless healthcare claim management with secure document verification, medical record validation, and instant claim assistance.",
      features: ["Medical Verification","Hospital Network","Cashless Claims","Secure Records",],
    },
  ];
  return (
    <>
      <Navbar />
      <BotpressChat />
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="absolute -top-44 -left-40 h-[450px] w-[450px] rounded-full bg-black/5 blur-[120px]" />
        <div className="absolute top-80 -right-40 h-[400px] w-[400px] rounded-full bg-gray-400/10 blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="h-full w-full" style={{backgroundImage: `linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)`,backgroundSize: "60px 60px",}}/>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24">
          <motion.div initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} viewport={{ once: true }} className="flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border bg-white px-6 py-3 shadow">
              <Sparkles className="h-5 w-5" />
              <span className="font-semibold">About Our AI Insurance Platform</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} viewport={{ once: true }} className="mt-10 text-center">
            <div className="text-center">
            <KineticText text="Protecting What" className="text-5xl md:text-7xl font-black"/>
            <KineticText text="Matters Most" className="mt-2 text-5xl md:text-7xl font-black text-gray-500"/>
            </div>
            <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-gray-600"> We combine Artificial Intelligence with modern insurance technology to deliver faster verification, smarter fraud detection, secure policy management, and seamless claim processing for millions of customers.</p>
          </motion.div>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: .8 }} viewport={{ once: true }} className="mt-20 h-[2px] origin-left bg-gradient-to-r from-transparent via-black to-transparent"/>
          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} viewport={{ once: true }} className="mt-24 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <KineticText as="h2" text="Who We Are" className="justify-start text-5xl font-black"/>
              <p className="mt-8 text-lg leading-9 text-gray-600"> We are building the next generation insurance ecosystem where Artificial Intelligence makes claim verification simple, transparent, and highly accurate.</p>
              <p className="mt-6 text-lg leading-9 text-gray-600"> Our platform minimizes paperwork, reduces fraudulent claims, automates document validation, and significantly improves claim settlement speed while ensuring complete customer trust.</p>
              <button className="mt-10 flex items-center gap-3 rounded-2xl bg-black px-7 py-4 text-white">Learn More<ArrowRight size={20} />
              </button>
            </div>
            <motion.div whileHover={{ scale: 1.03 }} className="rounded-[40px] border border-gray-200 bg-white p-10 shadow-sm">
              <Cpu className="h-14 w-14" />
              <KineticText as="h3" text="AI Powered Verification" className="mt-8 justify-start text-3xl font-black"/>
              <p className="mt-5 leading-8 text-gray-600"> Our intelligent algorithms analyze policy documents, vehicle images, identity proofs and damage reports to deliver accurate insurance decisions within seconds.</p>
            </motion.div>
          </motion.div>
          <div className="mt-28 grid lg:grid-cols-2 gap-10">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} viewport={{ once: true }} className="rounded-[32px] border border-gray-200 bg-white p-10 shadow-sm">
              <Target className="h-12 w-12" />
              <KineticText as="h2" text="Our Mission" className="mt-6 justify-start text-3xl font-black tracking-tight"/>
              <p className="mt-6 leading-8 text-gray-600"> To revolutionize insurance claim processing through Artificial Intelligence by delivering secure, transparent, and lightning-fast verification that benefits both insurers and policyholders.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} viewport={{ once: true }} className="rounded-[32px] border border-gray-200 bg-white p-10 shadow-sm">
              <Eye className="h-12 w-12" />
              <KineticText as="h2" text="Our Vision" className="mt-6 justify-start text-3xl font-black tracking-tight"/>
              <p className="mt-6 leading-8 text-gray-600"> To become the world's most trusted AI-powered insurance platform by making every insurance claim faster, fairer, smarter and completely digital.</p>
            </motion.div>
          </div>          
          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} viewport={{ once: true }} className="mt-32">
            <div className="text-center">
              <KineticText as="h2" text="Why Choose Us" className="justify-center text-5xl font-black tracking-tight"/>
              <p className="mt-5 text-lg text-gray-500">Intelligent technology combined with reliable insurance services to deliver a seamless experience.</p>
            </div>
            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {title: "AI Verification",desc: "Advanced AI verifies documents and images with exceptional accuracy."},
                {title: "Instant Claims",desc: "Reduce claim settlement time from days to minutes."},
                {title: "Fraud Detection",desc: "Smart algorithms identify suspicious claims automatically."},
                {title: "Secure Platform",desc: "Enterprise-grade encryption protects your information."},
                {title: "24×7 Support",desc: "Round-the-clock assistance whenever you need help."},
                {title: "Paperless Experience",desc: "Completely digital claim submission and tracking."}
              ].map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{delay: index * .08,duration: .5}} whileHover={{y: -10,scale: 1.03}} viewport={{ once: true }} className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:border-black hover:shadow-xl">
                  <ShieldCheck className="h-10 w-10" />
                  <h3 className="mt-6 text-2xl font-bold">{item.title}</h3>
                  <p className="mt-4 leading-8 text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
          </div>
        </motion.div>
        <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="mt-36">
        <div className="text-center">
            <span className="rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-semibold shadow-sm">AI Claim Workflow</span>
            <KineticText as="h2" text="From Upload to Settlement" className="mt-6 justify-center text-5xl font-black tracking-tight"/>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-500"> Every claim passes through an intelligent verification pipeline that minimizes manual work, detects fraud, and accelerates approvals with exceptional accuracy.</p>
        </div>
        <div className="relative mt-24">
            <div className="absolute left-0 right-0 top-12 hidden h-[2px] bg-gray-200 lg:block" />
            <div className="grid gap-10 lg:grid-cols-5">
            {[
                {icon: Upload,step: "01",title: "Upload",desc: "Submit policy documents and supporting images securely."},
                {icon: BrainCircuit,step: "02",title: "AI Analysis",desc: "Our AI extracts policy details and validates every document."},
                {icon: ShieldAlert,step: "03",title: "Fraud Detection",desc: "Advanced models detect inconsistencies and suspicious activity."},
                {icon: BadgeCheck,step: "04",title: "Verification",desc: "Coverage, eligibility and claim details are automatically verified."},
                {icon: Wallet,step: "05",title: "Settlement",desc: "Approved claims move directly to fast and transparent settlement."},
            ].map((item, index) => {
                const Icon = item.icon;
                return (
                <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{delay: index * 0.12,duration: 0.6,}} whileHover={{y: -10,}} viewport={{ once: true }} className="relative text-center">
                    <div className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:bg-black hover:text-white">
                    <Icon size={34} />
                    <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white">{item.step}</span>
                    </div>
                    <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-xl">
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                    <p className="mt-4 leading-8 text-gray-600">{item.desc}</p>
                    </div>
                </motion.div>
                );
            })}
            </div>
        </div>
        </motion.section>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="mt-32">
        <div className="text-center">
            <KineticText as="h2" text="Frequently Asked Questions" className="justify-center text-5xl font-black tracking-tight"/>
            <p className="mt-5 text-lg text-gray-500">Everything you need to know about our insurance platform.</p>
        </div>
        <div className="mx-auto mt-16 max-w-4xl space-y-5">
            {[
            {q: "What insurance services do you provide?",a: "We provide AI-powered Car Insurance, Home Insurance, and Health Insurance with intelligent document verification, fraud detection, and automated claim processing.",},
            {q: "How does AI verify insurance claims?",a: "Our AI analyzes uploaded documents, vehicle or property images, policy details, and identity information to verify claims accurately while reducing manual effort.",},
            {q: "Is my information secure?",a: "Yes. All customer data is encrypted using industry-standard security practices. Your personal information and uploaded documents remain protected throughout the claim process.",},
            {q: "How long does claim verification take?",a: "Most verifications are completed within seconds. More complex claims may require additional review before approval.",},
            {q: "Can I track my claim status?",a: "Absolutely. You can monitor your claim from document submission to final settlement through our platform.",},
            ].map((item, index) => (
            <motion.div key={index} layout transition={{layout: {duration: 0.35,ease: "easeInOut",},}} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                <button onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)} className="flex w-full items-center justify-between px-7 py-6 text-left">
                <span className="text-lg font-semibold">{item.q}</span>
                <motion.div animate={{rotate: openFAQ === index ? 180 : 0,}} transition={{duration: 0.3,}}>
                    <ChevronDown className="h-6 w-6 text-gray-500" />
                </motion.div>
                </button>
                <AnimatePresence initial={false}>
                {openFAQ === index && (
                    <motion.div key="content" initial={{height: 0,opacity: 0,}} animate={{height: "auto",opacity: 1,}} exit={{height: 0,opacity: 0,}} transition={{height: {duration: 0.35,ease: "easeInOut",},opacity: {duration: 0.25,},}} className="overflow-hidden">
                    <div className="border-t border-gray-100 px-7 py-6 text-gray-600 leading-8">{item.a}</div>
                    </motion.div>
                )}
                </AnimatePresence>
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

export default About;