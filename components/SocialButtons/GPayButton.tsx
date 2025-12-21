"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface GPayButtonProps {
  amount: string;
  onClick?: (e?: React.MouseEvent) => void;
  className?: string;
}

export function GPayButton({ amount, onClick, className }: GPayButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isProcessing) return;
    
    // Trigger external onClick if provided (for opening modal)
    if (onClick) {
        onClick(e);
        return;
    }

    // Fallback simulation if no onClick provided
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    alert(`Payment of ${amount} processed! (Simulation)`);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "relative flex items-center justify-center min-w-[200px] h-[48px] rounded-full",
        "bg-black hover:bg-gray-900 active:scale-95 transition-all shadow-md",
        "overflow-hidden group",
        className
      )}
      aria-label="Pay with Google Pay"
      disabled={isProcessing}
    >
        {isProcessing ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
      <div className="flex items-center gap-3 px-6">
        <span className="text-white font-semibold text-lg">GPay</span>
        {/* Simplified G Logo */}
        <svg className="h-6 w-auto" viewBox="0 0 49 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* G Logo */}
          <path d="M43.95 6.75C43.95 6.32 43.91 5.95 43.83 5.59H39.42V8.29H42.02C41.89 9.07 41.51 9.87 40.83 10.36V12.01H42.34C43.23 11.16 43.95 9.77 43.95 6.75Z" fill="#4285F4"/>
          <path d="M39.42 14.1C40.69 14.1 41.76 13.67 42.54 12.93L41.03 11.28C40.6 11.58 40.05 11.75 39.42 11.75C38.18 11.75 37.13 10.87 36.75 9.68H35.19V10.93C35.96 12.55 37.58 14.1 39.42 14.1Z" fill="#34A853"/>
          <path d="M36.75 9.67C36.65 9.38 36.6 9.07 36.6 8.75C36.6 8.43 36.65 8.12 36.75 7.83V6.58H35.19C34.87 7.24 34.69 7.98 34.69 8.75C34.69 9.52 34.87 10.26 35.19 10.92L36.75 9.67Z" fill="#FBBC05"/>
          <path d="M39.42 5.75C40.35 5.75 41.02 6.16 41.38 6.51L43.25 4.64C42.23 3.69 40.94 3.4 39.42 3.4C37.58 3.4 35.96 4.95 35.19 6.58L36.75 7.83C37.13 6.63 38.18 5.75 39.42 5.75Z" fill="#EA4335"/>
        </svg>
      </div>
        )}
    </button>
  );
}
