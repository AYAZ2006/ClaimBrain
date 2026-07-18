import React from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { BrainCircuit, ArrowDown } from "lucide-react";

function About() {
  return (
    <>
      <Navbar />

      <section className="relative min-h-screen overflow-hidden bg-white">

        {/* Background Blobs */}

        <motion.div
          animate={{
            x: [0, 80, -20, 0],
            y: [0, -40, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
          }}
          className="absolute -top-40 -left-40 h-[550px] w-[550px] rounded-full bg-gray-200/50 blur-[140px]"
        />

        <motion.div
          animate={{
            x: [0, -70, 30, 0],
            y: [0, 60, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
          }}
          className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-pink-100/40 blur-[150px]"
        />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6">

          {/* Badge */}

          <motion.div

            initial={{ opacity: 0, y: 40 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: .8 }}

            className="mb-10"

          >

            <div className="inline-flex items-center gap-3 rounded-full border border-gray-300 bg-gray-100 px-6 py-3">

              <BrainCircuit
                size={20}
                className="text-pink-500"
              />

              <span className="font-medium text-gray-700">

                AI Powered Insurance Claims

              </span>

            </div>

          </motion.div>
                    <motion.h1

            initial={{ opacity: 0, y: 50 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{
              delay: .2,
              duration: .8,
            }}

            className="max-w-6xl text-6xl md:text-8xl lg:text-[110px] font-black tracking-[-4px] leading-[0.95] text-gray-900"

          >

            Insurance

            <br />

            claims should

            <br />

            take

            <span className="text-pink-500">

              {" "}minutes.

            </span>

          </motion.h1>

          <motion.p

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            transition={{
              delay: .6,
            }}

            className="mt-14 max-w-3xl text-xl leading-10 text-gray-600"

          >

            ClaimBrain combines OCR,
            Computer Vision,
            Artificial Intelligence
            and Large Language Models
            into one intelligent platform
            that automates insurance policy verification,
            vehicle inspection,
            damage analysis
            and claim prediction.

          </motion.p>
                    <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.9,
              duration: 0.8,
            }}
            className="mt-24 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-lg">

              <div className="flex items-center gap-3">

                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>

                <span className="text-sm font-semibold uppercase tracking-[4px] text-gray-500">

                  Ready for Production

                </span>

              </div>

              <p className="mt-6 text-lg leading-9 text-gray-600">

                Built for Insurance Companies,
                Surveyors and Claim Processing Teams.

              </p>

            </div>

            <div className="flex items-center gap-6">

              <motion.div
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="flex h-16 w-16 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm"
              >
                <ArrowDown
                  className="text-gray-700"
                  size={26}
                />
              </motion.div>

            </div>
          </motion.div>

        </div>
      </section>

      <section className="overflow-hidden border-y bg-gray-50 py-7">

  <motion.div

    animate={{
      x: ["0%", "-50%"],
    }}

    transition={{
      duration: 22,
      repeat: Infinity,
      ease: "linear",
    }}

    className="flex w-max gap-24 whitespace-nowrap"

  >

    {[
      "AI Powered Claims",
      "OCR Verification",
      "YOLO Damage Detection",
      "Policy Parsing",
      "Vehicle Verification",
      "Repair Cost Estimation",
      "Fraud Detection",
      "Claim Prediction",
      "Computer Vision",
      "Large Language Models",
      "AI Powered Claims",
      "OCR Verification",
      "YOLO Damage Detection",
      "Policy Parsing",
      "Vehicle Verification",
      "Repair Cost Estimation",
    ].map((item, index) => (

      <div
        key={index}
        className="flex items-center gap-5 px-4"
      >

        <div className="h-2 w-2 rounded-full bg-pink-500" />

        <span className="text-lg font-semibold text-gray-700">

          {item}

        </span>

      </div>

    ))}

  </motion.div>

</section>
{/* WHY CLAIMBRAIN */}

<section className="py-40 bg-white">

  <div className="max-w-7xl mx-auto px-6">

    <div className="grid lg:grid-cols-2 gap-24 items-center">

      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .8 }}
      >

        <p className="uppercase tracking-[5px] text-gray-400 mb-6">

          WHY CLAIMBRAIN

        </p>

        <h2 className="text-6xl lg:text-7xl font-black leading-tight text-gray-900">

          Smarter
          <br />

          Claims.

          <br />

          Less Manual
          <br />

          Work.

        </h2>

      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .8 }}
      >

        <p className="text-xl leading-10 text-gray-600">

          ClaimBrain automates the complete insurance
          claim workflow by understanding insurance
          documents, verifying vehicles, detecting
          damages and predicting repair costs.

        </p>

        <p className="mt-10 text-xl leading-10 text-gray-600">

          Instead of spending hours manually
          reviewing policies and photographs,
          insurance companies receive structured,
          AI-generated insights within minutes.

        </p>

      </motion.div>

    </div>

  </div>

</section>
{/* FEATURES */}

<section className="py-32 bg-gray-50 border-y">

<div className="max-w-7xl mx-auto px-6">

<h2 className="text-6xl font-black mb-20">

Everything.
One Platform.

</h2>

<div className="grid lg:grid-cols-2 gap-8">

{[
{
title:"Policy Verification",
desc:"OCR extracts every important insurance detail automatically."
},
{
title:"Vehicle Verification",
desc:"Verify uploaded vehicle images using AI."
},
{
title:"Damage Detection",
desc:"YOLO identifies damaged vehicle parts with confidence scores."
},
{
title:"Coverage Validation",
desc:"Compare detected damages with insurance coverage."
},
{
title:"Repair Estimation",
desc:"Estimate repair costs using predefined databases."
},
{
title:"Claim Prediction",
desc:"Predict the expected insurance claim amount."
},
].map((feature,index)=>(

<motion.div

key={index}

initial={{opacity:0,y:40}}

whileInView={{opacity:1,y:0}}

viewport={{once:true}}

transition={{delay:index*.08}}

whileHover={{
y:-8,
scale:1.02
}}

className="rounded-3xl border bg-white p-10"

>

<div className="flex justify-between items-start">

<h3 className="text-3xl font-bold">

{feature.title}

</h3>

<div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center">

<div className="h-3 w-3 rounded-full bg-pink-500"/>

</div>

</div>

<p className="mt-8 text-lg leading-9 text-gray-600">

{feature.desc}

</p>

</motion.div>

))}

</div>

</div>

</section>
{/* JOURNEY */}

<section className="py-40 bg-white">

  <div className="max-w-7xl mx-auto px-6">

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >

      <p className="uppercase tracking-[6px] text-gray-400 mb-6">

        AI JOURNEY

      </p>

      <h2 className="text-6xl lg:text-7xl font-black text-gray-900 mb-24">

        From Upload
        <br />

        to Settlement

      </h2>

    </motion.div>

    {[
      {
        no: "01",
        title: "Upload Insurance Policy",
        desc: "Users upload their insurance policy PDF which becomes the foundation for the complete verification process."
      },
      {
        no: "02",
        title: "AI Understands Documents",
        desc: "OCR and LLM models extract policy holder details, vehicle information and policy validity."
      },
      {
        no: "03",
        title: "Vehicle Verification",
        desc: "Vehicle images are matched against policy information to ensure authenticity."
      },
      {
        no: "04",
        title: "Damage Analysis",
        desc: "YOLO models identify damaged vehicle parts and classify every detected damage."
      },
      {
        no: "05",
        title: "Claim Prediction",
        desc: "Repair cost estimation and policy coverage are combined to estimate the expected claim amount."
      }

    ].map((step,index)=>(

      <motion.div

        key={index}

        initial={{opacity:0,y:70}}

        whileInView={{opacity:1,y:0}}

        viewport={{once:true}}

        transition={{delay:index*.08}}

        className="grid lg:grid-cols-12 gap-8 border-t py-14"

      >

        <div className="lg:col-span-2">

          <h1 className="text-7xl font-black text-pink-500">

            {step.no}

          </h1>

        </div>

        <div className="lg:col-span-4">

          <h2 className="text-4xl font-bold">

            {step.title}

          </h2>

        </div>

        <div className="lg:col-span-6">

          <p className="text-lg leading-9 text-gray-600">

            {step.desc}

          </p>

        </div>

      </motion.div>

    ))}

  </div>

</section>
{/* STATS */}

<section className="py-36 bg-gray-900">

<div className="max-w-7xl mx-auto px-6">

<div className="grid lg:grid-cols-4 gap-12">

{[
["90%","Faster Processing"],
["98%","Detection Accuracy"],
["24/7","AI Availability"],
["100+","Vehicle Parts"]
].map((item,index)=>(

<motion.div

key={index}

initial={{opacity:0,y:60}}

whileInView={{opacity:1,y:0}}

viewport={{once:true}}

transition={{delay:index*.1}}

whileHover={{
y:-12
}}

className="text-center"

>

<h1 className="text-7xl font-black text-white">

{item[0]}

</h1>

<div className="mx-auto mt-8 h-px w-20 bg-pink-500"/>

<p className="mt-8 text-xl text-gray-300">

{item[1]}

</p>

</motion.div>

))}

</div>

</div>

</section>
{/* FUTURE */}

<section className="py-44 bg-white">

  <div className="max-w-7xl mx-auto px-6">

    <motion.div

      initial={{ opacity:0,y:60 }}

      whileInView={{ opacity:1,y:0 }}

      viewport={{ once:true }}

    >

      <p className="uppercase tracking-[6px] text-gray-400 mb-6">

        THE FUTURE

      </p>

      <h2 className="max-w-6xl text-6xl lg:text-8xl font-black leading-[1] text-gray-900">

        Insurance claims
        shouldn't depend
        on paperwork.

      </h2>

      <div className="grid lg:grid-cols-2 gap-20 mt-20">

        <p className="text-xl leading-10 text-gray-600">

          ClaimBrain replaces repetitive manual
          verification with intelligent automation.
          Every uploaded document and vehicle image
          is analyzed using Artificial Intelligence,
          enabling insurers to process claims
          significantly faster without compromising
          accuracy.

        </p>

        <p className="text-xl leading-10 text-gray-600">

          Our vision is to build an ecosystem where
          policy verification, damage assessment,
          fraud detection and claim settlement
          happen seamlessly with AI assistance.

        </p>

      </div>

    </motion.div>

  </div>

</section>
{/* CTA */}

<section className="py-40 bg-gray-50 border-y">

<div className="max-w-7xl mx-auto px-6">

<motion.div

initial={{opacity:0,y:50}}

whileInView={{opacity:1,y:0}}

viewport={{once:true}}

className="rounded-[40px] border bg-white p-20"

>

<h2 className="text-6xl lg:text-7xl font-black leading-tight max-w-5xl">

Experience AI
powered vehicle
insurance claims.

</h2>

<p className="mt-10 max-w-3xl text-xl leading-10 text-gray-600">

Upload your insurance policy,
verify vehicle images,
detect damages,
estimate repair costs
and predict claim amount
using ClaimBrain AI.

</p>

<div className="mt-16 flex flex-wrap gap-6">

<a

href="/car"

className="rounded-xl bg-black px-8 py-4 text-white font-semibold hover:bg-gray-800 transition"

>

Start Verification →

</a>

<a

href="/features"

className="rounded-xl border px-8 py-4 font-semibold hover:bg-gray-100 transition"

>

Explore Features

</a>

</div>

</motion.div>

</div>

</section>
<footer className="bg-white py-16">

<div className="max-w-7xl mx-auto px-6">

<div className="grid lg:grid-cols-3 gap-16">

<div>

<h2 className="text-4xl font-black">

Claim
<span className="text-pink-500">

Brain

</span>

</h2>

<p className="mt-6 leading-8 text-gray-600">

AI Powered Vehicle Insurance
Claim Automation Platform.

</p>

</div>

<div>

<h3 className="font-bold text-xl mb-6">

Navigation

</h3>

<div className="space-y-4 text-gray-500">

<p><a href="/">Home</a></p>

<p><a href="/features">Features</a></p>

<p><a href="/car">Claims</a></p>

<p><a href="/about">About</a></p>

</div>

</div>

<div>

<h3 className="font-bold text-xl mb-6">

Technology

</h3>

<div className="space-y-4 text-gray-500">

<p>OCR</p>

<p>YOLO</p>

<p>Computer Vision</p>

<p>Large Language Models</p>

</div>

</div>

</div>

<div className="mt-16 border-t pt-10 flex flex-col md:flex-row justify-between items-center">

<p className="text-gray-500">

© 2026 ClaimBrain. All rights reserved.

</p>

<p className="text-gray-400 mt-4 md:mt-0">

Built with React • Tailwind CSS • Framer Motion

</p>

</div>

</div>

</footer>

</>

);

}

export default About;