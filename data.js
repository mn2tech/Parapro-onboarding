// Mock data for ParaPro Onboarding App

export const users = [
  { id: 1, name: "Sarah Johnson", role: "Paraprofessional", xp: 120, level: 2 },
  { id: 2, name: "Michael Chen", role: "Paraprofessional", xp: 80, level: 1 },
  { id: 3, name: "Emily Rodriguez", role: "Paraprofessional", xp: 200, level: 3 },
  { id: 4, name: "David Thompson", role: "Paraprofessional", xp: 50, level: 1 },
  { id: 5, name: "Jessica Martinez", role: "Paraprofessional", xp: 150, level: 2 },
];

export const modules = [
  {
    id: 1,
    title: "Seizure Emergency Protocol",
    category: "Safety",
    // Use full URL so video plays when deployed (no local file in repo). Replace with your S3 URL when ready.
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    xp: 50,
    icon: "Shield"
  },
  {
    id: 2,
    title: "ABC Data Collection",
    category: "Data",
    // Using sample video for testing. Replace with your actual video:
    // Local: "/videos/abc-data-collection.mp4" (place in public/videos/)
    // Remote: "https://your-video-host.com/abc-data-collection.mp4"
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    xp: 30,
    icon: "Brain"
  },
  {
    id: 3,
    title: "De-Escalation Basics",
    category: "Behavior",
    // Using sample video for testing. Replace with your actual video:
    // Local: "/videos/de-escalation-basics.mp4" (place in public/videos/)
    // Remote: "https://your-video-host.com/de-escalation-basics.mp4"
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    xp: 40,
    icon: "Heart"
  },
];

// VIDEO SETUP INSTRUCTIONS:
// 1. To use local videos:
//    - Place your video files in the public/videos/ folder
//    - Update videoUrl above to: "/videos/your-video-name.mp4"
//
// 2. To use remote videos:
//    - Host your videos on a service (YouTube, Vimeo, AWS S3, etc.)
//    - Update videoUrl above to the full URL
//
// 3. Supported formats: MP4, WebM, OGG

// Helper function to calculate level from XP
export const calculateLevel = (xp) => {
  return Math.floor(xp / 100) + 1;
};
