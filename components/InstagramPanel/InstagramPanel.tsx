"use client";

import { QRCodeSVG } from "qrcode.react";
import { Instagram } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/toybazaar1608/";
const INSTAGRAM_GRADIENT = "bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FFDC80]";

export function InstagramPanel() {
  return (
    <div className="h-full w-full relative bg-white overflow-hidden font-sans">
         <div className={`h-full w-full flex flex-col items-center justify-center p-6 ${INSTAGRAM_GRADIENT} text-white relative`}>
             
             {/* Header / Profile Section */}
             <div className="absolute top-12 w-full flex flex-col items-center space-y-4">
                <div className="p-1 rounded-full bg-white/20 backdrop-blur-sm">
                    <div className="bg-white p-1 rounded-full">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                             <Instagram className="w-10 h-10 text-[#E1306C]" />
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight">@toybazaar1608</h2>
                    <p className="text-white/80 text-sm font-medium mt-1">Instagram</p>
                </div>
             </div>

             {/* QR Code Card */}
             <div className="relative group w-full max-w-[420px] aspect-square">
                 <a 
                    href={INSTAGRAM_URL} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="relative w-full h-full bg-white rounded-3xl p-8 shadow-2xl flex items-center justify-center hover:scale-[1.02] transition-transform duration-300 border border-white/20"
                 >
                     <QRCodeSVG 
                        value={INSTAGRAM_URL} 
                        className="w-full h-full"
                        width="100%"
                        height="100%"
                        level="H"
                        imageSettings={{
                            src: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
                            x: undefined,
                            y: undefined,
                            height: 48,
                            width: 48,
                            excavate: true,
                        }}
                    />
                </a>
            </div>

            {/* Bottom Spacer / Footer info */}
            <div className="absolute bottom-16 text-center opacity-80">
                <p className="text-xs font-medium uppercase tracking-widest">Scan to Follow</p>
            </div>
         </div>
    </div>
  );
}
