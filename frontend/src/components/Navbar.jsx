import React, { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [claimsOpen, setClaimsOpen] = useState(false);
  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="relative">
        <div className="flex items-center justify-between rounded-full border border-gray-300/60 bg-gray-100/80 backdrop-blur-2xl shadow-md px-5 sm:px-7 lg:px-8 py-3">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 cursor-pointer" onClick={() => window.location.href = '/'}>Claim<span className="text-pink-500">Brain</span></h1>
          <ul className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-gray-700">
            <li className="hover:text-black transition"><a href="/">Home</a></li>
            <li className="hover:text-black transition"><a href="/features">Features</a></li>
            <li className="relative group cursor-pointer">
              <div className="flex items-center gap-1 hover:text-black transition">Claims<svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg></div>
              <div className="absolute left-1/2 top-10 -translate-x-1/2 opacity-0 invisible translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div className="w-64 rounded-2xl border border-gray-200 bg-white shadow-xl p-2">
                  <a href="/home" className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-100"><i className="ri-home-4-line"></i>Home Insurance</a>
                  <a href="/car" className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-100"><i className="ri-car-line"></i>Car Insurance</a>
                  <a href="/life" className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-100"><i className="ri-heart-pulse-line"></i>Term Life Insurance</a>
                </div>
              </div>
            </li>
            <li className="hover:text-black transition cursor-pointer">About</li>
          </ul>
          <button className="hidden lg:block rounded-full bg-pink-500 px-5 py-2 text-sm font-semibold text-white hover:bg-pink-600 transition">Get Started</button>
          <button className="lg:hidden text-3xl text-gray-800" onClick={() => setOpen(!open)}><i className={open ? "ri-close-line" : "ri-menu-line"}></i></button>
        </div>
        <div className={`lg:hidden absolute top-full left-0 right-0 mt-3 transition-all duration-300 ${open ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-3 invisible"}`}>
          <div className="rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
            <a href="/" className="block px-5 py-4 hover:bg-gray-100" onClick={() => setOpen(false)}>Home</a>
            <a href="/features" className="block px-5 py-4 hover:bg-gray-100" onClick={() => setOpen(false)}>Features</a>
            <button onClick={() => setClaimsOpen(!claimsOpen)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-100"><span>Claims</span>
              <i className={`ri-arrow-down-s-line text-xl transition-transform ${claimsOpen ? "rotate-180" : ""}`}></i></button>
            <div className={`overflow-hidden transition-all duration-300 ${ claimsOpen ? "max-h-60" : "max-h-0"}`}>
              <a href="/home" className="block pl-10 pr-5 py-3 hover:bg-gray-100" onClick={() => setOpen(false)}>Home Insurance</a>
              <a href="/car" className="block pl-10 pr-5 py-3 hover:bg-gray-100" onClick={() => setOpen(false)}>Car Insurance</a>
              <a href="/life" className="block pl-10 pr-5 py-3 hover:bg-gray-100" onClick={() => setOpen(false)}>Term Life Insurance</a>
            </div>
            <a href="/about" className="block px-5 py-4 hover:bg-gray-100" onClick={() => setOpen(false)}>About</a>
            <div className="p-4"><button className="w-full rounded-full bg-pink-500 py-3 text-white font-semibold hover:bg-pink-600 transition">Get Started</button></div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;