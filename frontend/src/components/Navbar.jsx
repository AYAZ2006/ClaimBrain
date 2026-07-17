import React from 'react'

function Navbar() {
  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className="flex items-center justify-between rounded-full border border-gray-300/60 bg-gray-100/80 backdrop-blur-2xl shadow-md px-5 sm:px-7 lg:px-8 py-3">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">Claim<span className="text-pink-500">Brain</span></h1>
          <ul className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-gray-700">
            <li className="cursor-pointer hover:text-black transition-colors"><a href="/">Home</a></li>
            <li className="cursor-pointer hover:text-black transition-colors"><a href="/features">Features</a></li>
            <li className="relative group cursor-pointer">
              <div className="flex items-center gap-1 hover:text-black transition-colors">Claims
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
              </div>
              <div className="absolute left-1/2 top-10 -translate-x-1/2 opacity-0 invisible translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div className="w-64 rounded-2xl border border-gray-200 bg-white shadow-xl p-2">
                  <a href="/home" className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-100 transition"><i className="ri-home-4-line text-gray-500"></i><span>Home Insurance</span></a>
                  <a href="/car" className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-100 transition"><i className="ri-car-line text-gray-500"></i><span>Car Insurance</span></a>
                  <a href="/life" className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-100 transition"><i className="ri-heart-pulse-line text-gray-500"></i><span>Term Life Insurance</span></a>
                </div>
              </div>
            </li>
            <li className="cursor-pointer hover:text-black transition-colors">About</li>
          </ul>
          <button className="rounded-full bg-pink-500 px-5 py-2 text-sm font-semibold text-white hover:bg-pink-600 transition">Get Started</button>
        </div>
      </nav>
  )
}

export default Navbar
