import { VideoFeed } from "@/components/VideoFeed/VideoFeed";

export default function Home() {
  // List of local videos
  const videos = [
    "/videos/2025-06-21_09-21-10_UTC_DLKFZqRSZfp.mp4",
    "/videos/2025-12-06_20-27-13_UTC_DR73Vfak0mV.mp4",
    "/videos/2025-12-07_15-04-29_UTC_DR92-FCkp0Y.mp4",
    "/videos/2025-12-17_10-06-46_UTC_DSXFAHRkhoI.mp4",
    "/videos/2025-12-18_10-51-03_UTC_DSZuwzNEtcC.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  ];

  return (
    <main className="relative w-full h-screen bg-black">
      <VideoFeed videos={videos} />
    </main>
  );
}
