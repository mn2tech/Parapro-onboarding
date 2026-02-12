# Video Not Playing After Deploy (AWS Amplify / Vercel / etc.)

## Why the video didn't play

The Seizure Protocol video (`seizure-protocol.mp4`) is **not in the GitHub repo** because it's over GitHub's 100 MB limit. So the deployed app had no file at `/videos/seizure-protocol.mp4`.

## Current behavior

- **Local:** Uses `public/videos/seizure-protocol.mp4` if the file is present.
- **Deployed:** Uses a public sample video so Module 1 always plays. Replace with your own URL when ready.

## Use your real video on the deployed app (AWS S3)

1. **Create an S3 bucket** (e.g. `parapro-training-videos`).
2. **Upload** `seizure-protocol.mp4` to the bucket.
3. **Make the file public:**
   - Object → Actions → Make public using ACL,  
   - or turn on **Public read** for the object.
4. **Get the object URL**, e.g.  
   `https://parapro-training-videos.s3.amazonaws.com/seizure-protocol.mp4`  
   (or use a bucket in a specific region if you prefer).
5. **Update `data.js`** – replace the Module 1 `videoUrl` with your S3 URL:

   ```js
   {
     id: 1,
     title: "Seizure Emergency Protocol",
     category: "Safety",
     videoUrl: "https://your-bucket.s3.amazonaws.com/seizure-protocol.mp4",
     xp: 50,
     icon: "Shield"
   }
   ```

6. **Commit and push** so Amplify redeploys.

## Optional: use CloudFront

For better performance and HTTPS, put CloudFront in front of the S3 bucket and use the CloudFront URL as `videoUrl` in `data.js`.

---

After you redeploy (and use the S3 URL in `data.js`), the video will play on AWS Amplify.
