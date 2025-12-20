"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title?: string;
}

export function QRModal({ isOpen, onClose, url, title = "Scan to Follow" }: QRModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
      >
        <X className="w-8 h-8" />
      </button>

      <div 
        className="relative bg-white p-8 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col items-center gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-black">{title}</h2>
        <div className="p-4 bg-white rounded-xl border-2 border-black/10">
          <QRCodeSVG 
            value={url} 
            size={256}
            level="H"
            includeMargin={true}
          />
        </div>
        <p className="text-sm text-gray-500 max-w-[250px] text-center break-words">
          {url}
        </p>
      </div>

      {/* Backdrop click to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}
