import { VideoFeed } from "@/components/VideoFeed/VideoFeed";
import { getVideos } from "@/lib/videos";

export const dynamic = 'force-dynamic'; // Ensure the page updates when new videos are added

export default function Home() {
  const videos = getVideos();

  return (
    <main className="relative w-full h-screen bg-black">
      <VideoFeed videos={videos} />
    </main>
  );
}
