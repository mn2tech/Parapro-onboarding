# Training Video Files

Place your training module video files in this folder.

## Recommended File Names:
- `seizure-protocol.mp4` - For "Seizure Emergency Protocol" module
- `abc-data-collection.mp4` - For "ABC Data Collection" module  
- `de-escalation-basics.mp4` - For "De-Escalation Basics" module

## Supported Formats:
- MP4 (recommended)
- WebM
- OGG

## File Size Recommendations:
- Keep videos under 100MB for best performance
- Use compressed formats when possible
- Consider hosting large files on a CDN or cloud storage

## How to Use:
1. Add your video files to this folder
2. Update the `videoUrl` in `data.js` to point to your file:
   - Example: `videoUrl: "/videos/seizure-protocol.mp4"`

## Alternative: Remote Hosting
If your videos are hosted elsewhere (YouTube, Vimeo, AWS S3, etc.):
- Update the `videoUrl` in `data.js` to the full URL
- Example: `videoUrl: "https://your-host.com/videos/seizure-protocol.mp4"`
