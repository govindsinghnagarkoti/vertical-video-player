import { HorizontalVideoFeed } from "@/components/HorizontalVideoFeed/HorizontalVideoFeed";
import { InstagramPanel } from "@/components/InstagramPanel/InstagramPanel";
import { GPayPanel } from "@/components/GPayPanel/GPayPanel";
import { getVideos } from "@/lib/videos";

export const dynamic = 'force-dynamic';

export default function MorePage() {
  const videos = getVideos();

  return (
    <main className="h-screen w-full bg-black flex flex-col md:flex-row overflow-hidden">
      {/* Left Panel: GPay */}
      <section className="h-1/3 md:h-full md:flex-1 bg-white border-r border-gray-800 z-10 overflow-hidden">
        <GPayPanel />
      </section>

      {/* Center Panel: Video Feed */}
      <section className="h-1/3 md:h-full md:w-[34%] relative bg-black">
        <HorizontalVideoFeed videos={videos} />
      </section>

      {/* Right Panel: Instagram */}
      <section className="h-1/3 md:h-full md:flex-1 bg-white border-l border-gray-800 z-10 overflow-hidden">
        <InstagramPanel />
      </section>
    </main>
  );
}
