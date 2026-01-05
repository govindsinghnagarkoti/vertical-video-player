"use client";

import { QRCodeSVG } from "qrcode.react";
import { Wallet } from "lucide-react";

// Google Colors: Blue (#4285F4), Red (#EA4335), Yellow (#FBBC05), Green (#34A853)
// Using a clean white background with Google Pay Blue accents for official look
const PHONE_NUMBER = "+91 70736 24824";
const UPI_ID = "reenubhandari25-1@okaxis"; // Updated UPI ID
const PAY_URL = `upi://pay?pa=${UPI_ID}&pn=ToyBazaar&tn=Payment&cu=INR`;

export function GPayPanel() {
  return (
    <div className="h-full w-full relative bg-white overflow-hidden font-sans">
       <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-white text-gray-900 relative">
           
           {/* Header / Branding Section */}
           <div className="absolute top-12 w-full flex flex-col items-center space-y-4">
              <div className="p-1 rounded-full bg-gray-50 backdrop-blur-sm border border-gray-100">
                  <div className="bg-white p-1 rounded-full">
                      <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden">
                           <img 
                             src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" 
                             alt="Google Pay" 
                             className="h-8 w-auto"
                           />
                      </div>
                  </div>
              </div>
              <div className="text-center">
                  <h2 className="text-xl font-bold tracking-tight text-[#3c4043]">ToyBazaar</h2>
                  <p className="text-gray-500 text-sm font-medium mt-1">Unified Payment Interface</p>
              </div>
           </div>

           {/* QR Code Card */}
           <div className="relative group w-full max-w-[420px] aspect-square">
               {/* Decorative border/shadow wrapper */}
               <div className="absolute -inset-1 bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#FBBC05] rounded-[2rem] opacity-30 group-hover:opacity-50 blur transition duration-500"></div>
               
               <a 
                  href={PAY_URL}
                  className="relative w-full h-full bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center hover:scale-[1.02] transition-transform duration-300 border border-gray-100"
               >
                   <QRCodeSVG 
                      value={PAY_URL}
                      className="w-full h-full"
                      width="100%"
                      height="100%"
                      level="H"
                      imageSettings={{
                          src: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
                          x: undefined,
                          y: undefined,
                          height: 48,
                          width: 48,
                          excavate: true,
                      }}
                  />
                  <div className="absolute bottom-2 text-[10px] text-gray-400 font-mono tracking-wider">UPI: {UPI_ID}</div>
              </a>
           </div>

          {/* Bottom Info / Phone Number */}
          <div className="absolute bottom-16 text-center space-y-3">
              <div className="flex flex-col items-center">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Pay to Phone Number</span>
                  <div className="text-3xl font-bold text-[#3c4043] tracking-tight">{PHONE_NUMBER}</div>
              </div>
              
              <div className="flex items-center justify-center gap-4 mt-4 opacity-80">
                  <div className="h-2 w-2 rounded-full bg-[#4285F4]"></div>
                  <div className="h-2 w-2 rounded-full bg-[#EA4335]"></div>
                  <div className="h-2 w-2 rounded-full bg-[#FBBC05]"></div>
                  <div className="h-2 w-2 rounded-full bg-[#34A853]"></div>
              </div>
          </div>
       </div>
    </div>
  );
}
