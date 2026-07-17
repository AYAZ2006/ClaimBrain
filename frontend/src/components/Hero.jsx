import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
const cards = [
  {title: "Home Insurance",image: "/home_desktop_off.27a2c041.svg",},
  {title: "Car Insurance",image: "/car_desktop_off.6ed28b9d.svg",},
  {title: "Term Life Insurance",image: "/life_desktop_off.1cd127b0.svg",},
];
function Hero() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <div className="hidden lg:flex justify-between items-end px-12 pt-32 mt-24">
        <div className="relative w-fit -left-12">
          <img src="/home-left.2fe38685.svg" alt="" />
          <img src="/car.fd95efa5.svg" alt="" className="absolute bottom-[-8px] left-10"/>
        </div>
        <div className="relative w-fit -right-12">
          <img src="/home-right.2fe2559b.svg" alt="" />
          <img src="/guy.921bc398.svg" alt="" className="absolute bottom-[-8px] left-10"/>
        </div>
      </div>
      <section className="bg-[#F7F7F7] py-16 md:py-24 lg:py-28 px-5 mt-10">
        <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold text-[#454545] leading-tight">AI Powered<br />Claim Approval Assistant.</h1>
        <p className="text-center text-lg md:text-xl lg:text-2xl text-gray-600 mt-5 max-w-4xl mx-auto">Verify eligibility, upload documents, and receive intelligent claim assessments in minutes.</p>
        <div className="mt-14 md:mt-20 flex justify-center gap-6 flex-wrap">
          {cards.map((card) => (
            <div key={card.title} className="group relative w-full max-w-[285px] rounded-[28px] bg-white p-4 shadow-xl hover:-translate-y-2 hover:shadow-2xl duration-300 cursor-pointer">
              <div className="absolute top-6 left-6 h-9 w-9 rounded-lg border border-gray-400 bg-white z-10" />
              <div className="rounded-2xl overflow-hidden bg-[#f8f8f8]">
                <img src={card.image} alt={card.title} className="w-full group-hover:scale-105 duration-300"/>
              </div>
              <div className="text-center mt-8">
                <h2 className="text-[22px] font-semibold text-[#404040]">{card.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-[#F7F7F7] pt-10 pb-0 px-5 flex flex-col items-center">
        <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold text-[#454545] leading-tight">Know Before You Claim.</h1>
        <p className="mt-5 max-w-3xl text-center text-base md:text-lg lg:text-xl text-gray-600">From document verification to eligibility checks, our AI makes the claims process simple and transparent.</p>
        <img src="/app-sketch-us.d0ce65d2.svg" alt="App Sketch" className="mt-16 w-full max-w-[420px]"/>
      </section>
      <Footer />
    </div>
  );
}

export default Hero;