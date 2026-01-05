import fs from "fs";
import path from "path";

export function getVideos(): string[] {
  const videosDir = path.join(process.cwd(), "public/videos");
  let videos: string[] = [];

  try {
    if (fs.existsSync(videosDir)) {
      const files = fs.readdirSync(videosDir);
      videos = files
        .filter((file) => /\.(mp4|webm|ogg)$/i.test(file))
        .sort((a, b) => b.localeCompare(a)) // Newest first
        .map((file) => `/videos/${file}`);
    }
  } catch (error) {
    console.error("Error reading videos directory:", error);
  }

  // Fallback if no videos found
  if (videos.length === 0) {
    videos = [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    ];
  }

  return videos;
}
