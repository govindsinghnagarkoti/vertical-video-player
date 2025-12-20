import React from 'react';
import { Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InstagramButtonProps {
  username?: string;
  className?: string;
  onClick?: () => void;
}

export function InstagramButton({ username = "trae.ai", className, onClick }: InstagramButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-2 px-6 py-3 rounded-full overflow-hidden transition-transform active:scale-95",
        "bg-white text-black font-semibold shadow-lg hover:shadow-xl",
        className
      )}
      aria-label={`Follow ${username} on Instagram`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
        <Instagram className="w-5 h-5" />
        <span>Follow on Instagram</span>
      </div>
    </button>
  );
}
