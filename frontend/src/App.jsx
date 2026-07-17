import React from 'react'
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Features from './components/Features'
import Hero from './components/Hero'
import Car from './components/Car'
import Home from './components/Home'
import Life from './components/Life'
import ClaimVerify from './components/ClaimVerify'

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} toastOptions={{duration: 3000,style: {borderRadius: "12px",fontSize: "15px",},}}/>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/car" element={<Car />} />
        <Route path="/home" element={<Home />} />
        <Route path="/life" element={<Life />} />
        <Route path="/claim-verify" element={<ClaimVerify />} />
        <Route path="/features" element={<Features />} />
      </Routes>
    </>
  )
}

export default App