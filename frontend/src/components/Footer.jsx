import React from 'react'

function Footer() {
  return (
    <div>
      <footer className="bg-[#181818] text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-20">
            <div>
              <h3 className="text-sm font-bold uppercase mb-6">Product</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="hover:text-white cursor-pointer">Home</li>
                <li className="hover:text-white cursor-pointer">Features</li>
                <li className="hover:text-white cursor-pointer">How It Works</li>
                <li className="hover:text-white cursor-pointer">Pricing</li>
                <li className="hover:text-white cursor-pointer">FAQ</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase mb-6">Claims</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="hover:text-white cursor-pointer">Health Insurance</li>
                <li className="hover:text-white cursor-pointer">Home Insurance</li>
                <li className="hover:text-white cursor-pointer">Vehicle Insurance</li>
                <li className="hover:text-white cursor-pointer">Life Insurance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase mb-6">Resources</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="hover:text-white cursor-pointer">Documentation</li>
                <li className="hover:text-white cursor-pointer">API</li>
                <li className="hover:text-white cursor-pointer">Support</li>
                <li className="hover:text-white cursor-pointer">Contact</li>
                <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase mb-6">Company</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="hover:text-white cursor-pointer">About Us</li>
                <li className="hover:text-white cursor-pointer">Our Team</li>
                <li className="hover:text-white cursor-pointer">Careers</li>
                <li className="hover:text-white cursor-pointer">Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-16 pt-8 flex flex-col lg:flex-row justify-between items-center gap-8">
            <div>
              <h2 className="text-3xl font-bold">Claim<span className="text-pink-500">Brain</span></h2>
              <p className="text-gray-400 mt-2">AI Powered Insurance Claim Approval Assistant</p>
            </div>
            <div className="flex gap-6 text-gray-300">
              <i className="ri-facebook-fill text-xl cursor-pointer"></i>
              <i className="ri-twitter-x-fill text-xl cursor-pointer"></i>
              <i className="ri-linkedin-fill text-xl cursor-pointer"></i>
              <i className="ri-instagram-line text-xl cursor-pointer"></i>
              <i className="ri-github-fill text-xl cursor-pointer"></i>
            </div>
          </div>
          <div className="text-center text-gray-500 mt-8 text-sm">© 2026 ClaimBrain. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
