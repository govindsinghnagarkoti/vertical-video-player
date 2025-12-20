"use client";

import { useEffect, useRef, useState } from "react";
import { VideoPlayer } from "@/components/VideoPlayer/VideoPlayer";
import { InstagramButton } from "@/components/SocialButtons/InstagramButton";
import { GPayButton } from "@/components/SocialButtons/GPayButton";
import { ImageModal } from "@/components/ui/ImageModal";
import { DownloadModal } from "@/components/ui/DownloadModal";
import { Plus } from "lucide-react";

interface VideoFeedProps {
  videos: string[];
}

export function VideoFeed({ videos }: VideoFeedProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGlobalMuted, setIsGlobalMuted] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to next video
  const handleVideoEnd = async (index: number) => {
    if (!containerRef.current) return;

    let nextIndex = index + 1;
    // Loop back to start if at the end
    if (nextIndex >= videos.length) {
      nextIndex = 0;
    }

    const nextSection = containerRef.current.querySelector(`section[data-index="${nextIndex}"]`);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
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
            // Only update if index changed to avoid re-renders
            setActiveIndex((prev) => (prev !== index ? index : prev));
          }
        });
      },
      {
        root: container,
        threshold: 0.5, // Standard threshold for snap scrolling
      }
    );

    const sections = container.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [videos]);

  const handleOpenModal = () => setShowModal(true);

  // Global Fullscreen Handler
  const toggleFullscreen = async () => {
      if (!containerRef.current) return;

      if (!document.fullscreenElement) {
        try {
          await containerRef.current.requestFullscreen();
        } catch (err) {
          console.error("Error attempting to enable fullscreen:", err);
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
  };

  return (
    <>
      <div 
        ref={containerRef} 
        className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black"
      >
        {/* Floating Add Button */}
        <button
            onClick={() => setShowDownloadModal(true)}
            className="fixed top-6 right-6 z-50 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-3 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg"
            aria-label="Add/Download Video"
        >
            <Plus className="w-6 h-6" />
        </button>

        {videos.map((src, index) => (
          <section 
            key={`${src}-${index}`} 
            data-index={index}
            className="h-screen w-full snap-start relative"
          >
            <VideoPlayer 
              src={src} 
              isActive={index === activeIndex}
              isMuted={isGlobalMuted}
              onToggleMute={(muted) => setIsGlobalMuted(muted)}
              onEnded={() => handleVideoEnd(index)}
              onToggleFullscreen={toggleFullscreen}
              loop={false} // Sequential play
            />
            
            {/* Social Overlay Layer */}
            <div className="absolute bottom-[100px] left-0 right-0 z-10 px-6 pb-8 pointer-events-none">
               <div className="flex flex-col items-center gap-4 pointer-events-auto">
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                    <InstagramButton onClick={handleOpenModal} />
                    <GPayButton amount="$10.00" onClick={handleOpenModal} />
                  </div>
               </div>
            </div>
          </section>
        ))}
      </div>

      <ImageModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        imageUrl="https://picsum.photos/600/800"
      />

      <DownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
      />
    </>
  );
}
