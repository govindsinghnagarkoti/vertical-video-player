"use client";

import { X, Download, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState<{ video_url: string; thumbnail: string; caption: string } | null>(null);

  if (!isOpen) return null;

  const handleDownload = async () => {
    if (!url) return;
    
    setStatus("loading");
    setErrorMsg("");
    setResult(null);

    try {
      const res = await fetch(`/api?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      const message = err instanceof Error ? err.message : "Failed to fetch video";
      setErrorMsg(message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-white mb-4">Download Instagram Video</h2>
        
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste Instagram URL (Reel, Post, TV)..."
            className="flex-1 bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/50"
          />
          <button
            onClick={handleDownload}
            disabled={status === "loading" || !url}
            className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : "Fetch"}
          </button>
        </div>

        {status === "error" && (
          <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-lg mb-4">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{errorMsg}</span>
          </div>
        )}

        {status === "success" && result && (
          <div className="space-y-4 animate-in slide-in-from-bottom-2">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-zinc-800">
              {/* Using video tag for preview to ensure audio/video works */}
              <video 
                src={result.video_url} 
                className="w-full h-full object-contain"
                controls
              />
            </div>
            
            <div className="flex items-start justify-between gap-4">
               <p className="text-sm text-zinc-400 line-clamp-2 flex-1">{result.caption}</p>
               <a 
                 href={result.video_url} 
                 download="video.mp4"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap"
               >
                 <Download className="w-4 h-4" />
                 Download MP4
               </a>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop click to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}
