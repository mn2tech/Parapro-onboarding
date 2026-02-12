# Quick Video Placement Guide

## 📁 Where to Place Your Video

**Location:** `public/videos/` folder

## 📝 Step-by-Step Instructions

### Step 1: Place Your Video File
1. Copy your MP4 video file
2. Navigate to: `Parapro-onboarding/public/videos/`
3. Paste your video file there

### Step 2: Name Your Video
Rename your video file to match the module:
- **Module 1 (Seizure Protocol):** `seizure-protocol.mp4`
- **Module 2 (ABC Data):** `abc-data-collection.mp4`
- **Module 3 (De-Escalation):** `de-escalation-basics.mp4`

Or keep your current filename - just make sure to update `data.js` with the exact filename.

### Step 3: Update data.js
Open `data.js` and update the `videoUrl` for the appropriate module:

**For Module 1 (Seizure Emergency Protocol):**
```javascript
videoUrl: "/videos/your-video-filename.mp4",
```

**For Module 2 (ABC Data Collection):**
```javascript
videoUrl: "/videos/your-video-filename.mp4",
```

**For Module 3 (De-Escalation Basics):**
```javascript
videoUrl: "/videos/your-video-filename.mp4",
```

### Step 4: Test
1. Run `npm run dev`
2. Switch to Para View
3. Assign the module to a paraprofessional
4. Click on the assignment
5. Verify the video plays correctly

## 💡 Tips

- Make sure the filename in `data.js` matches exactly (case-sensitive)
- The path should start with `/videos/` (not `/public/videos/`)
- Supported formats: MP4, WebM, OGG (MP4 recommended)

## 🆘 Common Issues

**Video won't play?**
- Check the filename matches exactly in `data.js`
- Make sure the file is in `public/videos/` folder
- Restart the dev server after adding the video

**File too large?**
- Videos should ideally be under 100MB
- Use a video compressor if needed (HandBrake, free)
