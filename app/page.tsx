import fs from "fs";
import path from "path";
import { VideoFeed } from "@/components/VideoFeed/VideoFeed";

export default function Home() {
  const videosDir = path.join(process.cwd(), "public/videos");
  let videos: string[] = [];

  try {
    const files = fs.readdirSync(videosDir);
    videos = files
      .filter((file) => /\.(mp4|webm|ogg)$/i.test(file)) // Filter for browser-supported formats
      .sort((a, b) => a.localeCompare(b)) // Sort alphabetically
      .map((file) => `/videos/${file}`);
      
    // Log warning for unsupported formats if any (for server console)
    const unsupported = files.filter(file => 
      /\.(avi|mov|mkv|flv|wmv)$/i.test(file)
    );
    if (unsupported.length > 0) {
      console.warn("Skipped unsupported video formats (browser requires transcoding):", unsupported);
    }
  } catch (error) {
    console.error("Error reading videos directory:", error);
  }

  // Fallback to root video if no videos found in /videos
  if (videos.length === 0) {
     videos = ["/video.mp4"];
  }

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      <VideoFeed videos={videos} />
    </main>
  );
}
