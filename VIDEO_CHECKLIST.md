# Video Creation Checklist

## ✅ Quick Start Checklist

- [ ] **Choose your video creation tool**
  - [ ] Canva (Free, recommended for beginners)
  - [ ] Synthesia (Paid, professional AI avatars)
  - [ ] HeyGen (Paid, AI talking heads)
  - [ ] Other: _______________

- [ ] **Create Module 1: Seizure Emergency Protocol**
  - [ ] Read script from `VIDEO_CREATION_GUIDE.md`
  - [ ] Create video (5-7 minutes)
  - [ ] Export as MP4
  - [ ] Save as `seizure-protocol.mp4`
  - [ ] Move to `public/videos/` folder
  - [ ] Update `data.js` line 19: `videoUrl: "/videos/seizure-protocol.mp4"`

- [ ] **Create Module 2: ABC Data Collection**
  - [ ] Read script from `VIDEO_CREATION_GUIDE.md`
  - [ ] Create video (4-6 minutes)
  - [ ] Export as MP4
  - [ ] Save as `abc-data-collection.mp4`
  - [ ] Move to `public/videos/` folder
  - [ ] Update `data.js` line 30: `videoUrl: "/videos/abc-data-collection.mp4"`

- [ ] **Create Module 3: De-Escalation Basics**
  - [ ] Read script from `VIDEO_CREATION_GUIDE.md`
  - [ ] Create video (6-8 minutes)
  - [ ] Export as MP4
  - [ ] Save as `de-escalation-basics.mp4`
  - [ ] Move to `public/videos/` folder
  - [ ] Update `data.js` line 41: `videoUrl: "/videos/de-escalation-basics.mp4"`

- [ ] **Test Your Videos**
  - [ ] Run `npm run dev`
  - [ ] Switch to Para View
  - [ ] Assign a module to a paraprofessional
  - [ ] Click on the assignment
  - [ ] Verify video plays correctly
  - [ ] Test progress tracking (watch 30% to unlock completion)
  - [ ] Test completion and XP reward

## 📝 Notes

- Video file size should be under 100MB for best performance
- Use MP4 format (most compatible)
- Test each video after creating it
- Keep the sample videos as backup until yours are ready

## 🆘 Having Issues?

- **Video won't play?** Check the file path in `data.js` matches your filename
- **Video too large?** Use a video compressor (HandBrake, free)
- **Need help?** Check `VIDEO_CREATION_GUIDE.md` for detailed instructions
