"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Play, Volume2, VolumeX, Maximize2, Minimize2, Scaling, Expand } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  isActive?: boolean;
  isMuted?: boolean;
  onToggleMute?: (muted: boolean) => void;
  onEnded?: () => void;
  onToggleFullscreen?: () => void;
  loop?: boolean;
  objectFit?: "cover" | "contain";
}

export function VideoPlayer({ 
  src, 
  poster, 
  isActive = false, 
  isMuted = true,
  onToggleMute,
  onEnded,
  onToggleFullscreen,
  loop = false,
  objectFit = "cover"
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  // Removed local isMuted state
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentObjectFit, setCurrentObjectFit] = useState<"cover" | "contain">(objectFit);
  
  // Touch handling state
  const lastTapRef = useRef<number>(0);
  const touchStartRef = useRef<{ y: number; vol: number } | null>(null);

  // Sync prop changes
  useEffect(() => {
    setCurrentObjectFit(objectFit);
  }, [objectFit]);

  // Handle global fullscreen changes to update local state
  useEffect(() => {
    const handleFullscreenChange = () => {
      // If parent is handling fullscreen, we need to know if we are effectively fullscreen
      // If document.fullscreenElement exists, we consider ourselves in fullscreen mode for UI purposes
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Handle active state changes
  useEffect(() => {
    if (!videoRef.current) return;
    
    // Sync muted state with video element
    videoRef.current.muted = isMuted;

    if (isActive) {
      // Use Page Visibility API to handle background tabs
      if (document.hidden) {
        const handleVisibilityChange = () => {
          if (!document.hidden && videoRef.current) {
             videoRef.current.play().catch(() => {});
             document.removeEventListener("visibilitychange", handleVisibilityChange);
          }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return;
      }

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .catch(() => {
            // Auto-play was prevented (likely due to unmuted audio)
            // Retry with muted audio
            if (videoRef.current) {
                videoRef.current.muted = true;
                if (onToggleMute) onToggleMute(true);
                videoRef.current.play()
                    .catch((e) => console.error("Autoplay failed even after mute:", e));
            }
          });
      }
    } else {
      videoRef.current.pause();
    }
  }, [isActive, isMuted, onToggleMute]);

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isPlaying && showControls) {
      timeout = setTimeout(() => setShowControls(false), 2000);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

  // Handle Play/Pause
  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
            // Auto-play might be blocked if unmuted
            if (!isMuted && onToggleMute) onToggleMute(true);
        });
      }
      setIsPlaying(!isPlaying);
      setShowControls(true);
    }
  }, [isPlaying, isMuted, onToggleMute]);

  // Handle Mute
  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      if (onToggleMute) onToggleMute(newMuted);
      
      // If unmuting, ensure volume is audible
      if (!newMuted && videoRef.current.volume === 0) {
          videoRef.current.volume = 1;
          setVolume(1);
      }
    }
  };

  // Handle Fullscreen
  const toggleFullscreen = useCallback(async () => {
    // If parent provided a handler (e.g. VideoFeed), use it
    if (onToggleFullscreen) {
        onToggleFullscreen();
        return;
    }

    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  }, [onToggleFullscreen]);

  // Time Update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  // Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      y: e.touches[0].clientY,
      vol: volume,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current || !videoRef.current) return;
    
    const deltaY = touchStartRef.current.y - e.touches[0].clientY;
    // Sensitivity: full screen height = 100% volume change roughly
    const sensitivity = 0.005; 
    let newVol = touchStartRef.current.vol + deltaY * sensitivity;
    newVol = Math.max(0, Math.min(1, newVol));
    
    videoRef.current.volume = newVol;
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
        if (onToggleMute) onToggleMute(false);
        videoRef.current.muted = false;
    }
    setShowControls(true);
  };

  const handleTouchEnd = () => {
    // Check for tap vs swipe
    if (!touchStartRef.current) return;
    
    // If movement was minimal, consider it a tap
    // Note: This logic is simple; might need more robust "moved" check
    // But for now, let's rely on onClick for tap, this is mainly for swipe cleanup
    touchStartRef.current = null;
  };

  const handleClick = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      toggleFullscreen();
    } else {
      togglePlay();
    }
    lastTapRef.current = now;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-black overflow-hidden group select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="auto"
        className={cn("w-full h-full transition-all duration-300", currentObjectFit === "contain" ? "object-contain" : "object-cover")}
        playsInline
        loop={loop}
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
            setIsPlaying(false);
            if (onEnded) onEnded();
        }}
      />

      {/* Overlay Gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none transition-opacity duration-300",
        showControls ? "opacity-100" : "opacity-0"
      )} />

      {/* Center Play Button Animation */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200",
        !isPlaying ? "opacity-100" : "opacity-0"
      )}>
        <div className="bg-black/50 p-4 rounded-full backdrop-blur-sm">
          <Play className="w-12 h-12 text-white fill-white" />
        </div>
      </div>

      {/* Controls Container */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-4 transition-transform duration-300",
        showControls ? "translate-y-0" : "translate-y-full"
      )}>
        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Bottom Row Controls */}
        <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
            {/* Left: Volume Indicator */}
            <button 
                onClick={toggleMute}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
            >
                {isMuted || volume === 0 ? (
                    <VolumeX className="w-6 h-6 text-white" />
                ) : (
                    <Volume2 className="w-6 h-6 text-white" />
                )}
            </button>

            {/* Right: Controls Group */}
            <div className="flex items-center gap-4">
                {/* Object Fit Toggle */}
                <button 
                    onClick={(e) => { 
                        e.stopPropagation(); 
                        setCurrentObjectFit(prev => prev === "cover" ? "contain" : "cover");
                    }}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors"
                    aria-label={currentObjectFit === "cover" ? "Fit to Screen" : "Fill Screen"}
                    title={currentObjectFit === "cover" ? "Show full video" : "Fill screen (crop)"}
                >
                     {currentObjectFit === "cover" ? (
                        <Scaling className="w-6 h-6 text-white" />
                     ) : (
                        <Expand className="w-6 h-6 text-white" />
                     )}
                </button>

                {/* Fullscreen (Desktop mostly, but works on mobile too) */}
                <button 
                    onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors"
                    aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                     {isFullscreen ? (
                        <Minimize2 className="w-6 h-6 text-white" />
                     ) : (
                        <Maximize2 className="w-6 h-6 text-white" />
                     )}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
