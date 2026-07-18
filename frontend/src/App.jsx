import React from 'react'
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Features from './components/Features'
import Hero from './components/Hero'
import Car from './components/Car'
import Home from './components/Home'
import Life from './components/Life'
import ClaimVerify from './components/ClaimVerify'
import Parts from './components/Parts'
import Coverage from './components/Coverage'
import About from './components/About'
import ProtectedRoute from "./components/ProtectedRoute"
function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} toastOptions={{duration: 3000,style: {borderRadius: "12px",fontSize: "15px",},}}/>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/car" element={<ProtectedRoute><Car /></ProtectedRoute>}/>
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/life" element={<ProtectedRoute><Life /></ProtectedRoute>} />
        <Route path="/claim-verify" element={<ProtectedRoute><ClaimVerify /></ProtectedRoute>} />
        <Route path="/features" element={<Features />} />
        <Route path="/parts" element={<ProtectedRoute><Parts /></ProtectedRoute>} />
        <Route path="/coverage" element={<ProtectedRoute><Coverage /></ProtectedRoute>} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App