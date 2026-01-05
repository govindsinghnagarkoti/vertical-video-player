"use client";

import { useEffect, useRef, useState } from "react";
import { VideoPlayer } from "@/components/VideoPlayer/VideoPlayer";
import { DownloadModal } from "@/components/ui/DownloadModal";
import { Plus } from "lucide-react";

interface HorizontalVideoFeedProps {
  videos: string[];
}

export function HorizontalVideoFeed({ videos }: HorizontalVideoFeedProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGlobalMuted, setIsGlobalMuted] = useState(true);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleVideoEnd = async (index: number) => {
    if (!containerRef.current) return;
    let nextIndex = index + 1;
    if (nextIndex >= videos.length) nextIndex = 0;

    // If there's only one video, replay it manually
    if (nextIndex === index) {
        const videoElement = containerRef.current.querySelector(`section[data-index="${index}"] video`) as HTMLVideoElement;
        if (videoElement) {
            videoElement.currentTime = 0;
            videoElement.play().catch(() => {});
        }
        return;
    }

    const nextSection = containerRef.current.querySelector(`section[data-index="${nextIndex}"]`);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", inline: "start" });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex((prev) => (prev !== index ? index : prev));
          }
        });
      },
      { root: container, threshold: 0.5 }
    );

    const sections = container.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [videos]);

  return (
    <>
      <div 
        ref={containerRef} 
        className="h-full w-full overflow-x-scroll snap-x snap-mandatory scroll-smooth bg-black flex flex-row"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style jsx>{`
            div::-webkit-scrollbar { display: none; }
        `}</style>
        
        <button
            onClick={() => setShowDownloadModal(true)}
            className="absolute bottom-6 right-6 z-50 bg-white text-black p-4 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all"
            aria-label="Add Video"
        >
            <Plus className="w-6 h-6" />
        </button>

        {videos.map((src, index) => (
          <section 
            key={`${src}-${index}`}
            data-index={index}
            className="relative min-w-full h-full snap-center shrink-0"
          >
            <VideoPlayer
              src={src}
              isActive={index === activeIndex}
              isMuted={isGlobalMuted}
              onToggleMute={setIsGlobalMuted}
              onEnded={() => handleVideoEnd(index)}
              loop={false} // Auto-advance playlist
              objectFit="cover"
            />
          </section>
        ))}
      </div>

      <DownloadModal 
        isOpen={showDownloadModal} 
        onClose={() => setShowDownloadModal(false)} 
      />
    </>
  );
}
