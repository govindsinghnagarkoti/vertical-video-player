"use client";

import { QRCodeSVG } from "qrcode.react";
import { Instagram, Gamepad2, Puzzle, Car, Rocket, Bike, Dice5, Baby, Bot, Dna, Ghost, Joystick, Sword, Trophy, Crown, Gift, PartyPopper, Sparkles } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/toybazaar1608/";
const INSTAGRAM_GRADIENT = "bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FFDC80]";

export function InstagramPanel() {
  return (
    <div className="h-full w-full relative bg-white overflow-hidden font-sans">
         {/* Background Toy Icons Pattern (White, Low Opacity for Gradient) */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.1] text-white z-10">
            {/* Top Area */}
            <div className="absolute top-[3%] left-[8%] rotate-12"><Gamepad2 size={90} /></div>
            <div className="absolute top-[5%] right-[5%] -rotate-12"><Puzzle size={110} /></div>
            <div className="absolute top-[10%] left-[35%] rotate-180"><Bot size={75} /></div>
            <div className="absolute top-[15%] right-[25%] rotate-45"><Joystick size={60} /></div>

            {/* Upper Middle */}
            <div className="absolute top-[22%] left-[5%] -rotate-6"><Ghost size={65} /></div>
            <div className="absolute top-[25%] left-[80%] -rotate-6"><Gamepad2 size={50} /></div>
            <div className="absolute top-[30%] right-[40%] rotate-12"><Trophy size={70} /></div>
            <div className="absolute top-[35%] right-[5%] rotate-90"><Dice5 size={70} /></div>

            {/* Middle */}
            <div className="absolute top-[45%] left-[2%] -translate-y-1/2 rotate-6"><Bike size={80} /></div>
            <div className="absolute top-[50%] right-[10%] -rotate-45"><Sparkles size={55} /></div>
            <div className="absolute top-[55%] left-[15%] rotate-12"><Sword size={65} /></div>
            <div className="absolute top-[58%] right-[80%] -rotate-12"><Crown size={50} /></div>

            {/* Lower Middle */}
            <div className="absolute bottom-[35%] right-[20%] -rotate-45"><Baby size={85} /></div>
            <div className="absolute bottom-[30%] left-[10%] rotate-6"><Gift size={65} /></div>
            <div className="absolute bottom-[25%] right-[5%] -rotate-12"><Rocket size={90} /></div>

            {/* Bottom Area */}
            <div className="absolute bottom-[20%] left-[8%] rotate-45"><Car size={100} /></div>
            <div className="absolute bottom-[10%] right-[30%] rotate-12"><PartyPopper size={75} /></div>
            <div className="absolute bottom-[5%] left-[40%] -rotate-12"><Dna size={60} /></div>
            <div className="absolute bottom-[15%] right-[10%] rotate-90"><Puzzle size={50} /></div>
         </div>

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
