"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

export function ImageModal({ isOpen, onClose, imageUrl }: ImageModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
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
        aria-label="Close modal"
      >
        <X className="w-8 h-8" />
      </button>

      <div 
        className="relative w-full max-w-lg aspect-[4/5] rounded-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={imageUrl}
          alt="Preview"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 500px"
          priority
        />
      </div>

      {/* Backdrop click to close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose} 
      />
    </div>
  );
}
