# Host ParaPro Video on AWS S3

Use these steps so your Seizure Protocol video plays on the deployed Amplify app.

---

## Option A: New bucket (recommended for this project)

### 1. Create bucket
1. In S3, click **Create bucket**.
2. **Bucket name:** e.g. `parapro-training-videos` (must be globally unique).
3. **Region:** e.g. **US East (N. Virginia) us-east-1** (same as Amplify is fine).
4. **Block Public Access:**  
   Uncheck **Block all public access**, then check the acknowledgment.
5. Click **Create bucket**.

### 2. Upload the video
1. Open the new bucket (or the bucket you chose).
2. Click **Upload**.
3. **Add files** → select `public/videos/seizure-protocol.mp4` from your project.
4. Under **Permissions**, set **Predefined ACL** to **Grant public read access** (or use the bucket policy below).
5. Click **Upload**.

### 3. Make the object public (if you didn’t use ACL)
1. Click the object name **seizure-protocol.mp4**.
2. **Actions** → **Edit ACL** (or **Make public using ACL**).
3. Enable public read for the object and save.

### 4. Get the video URL
1. Open the object **seizure-protocol.mp4**.
2. In **Object URL** copy the URL. It will look like:
   ```text
   https://parapro-training-videos.s3.us-east-1.amazonaws.com/seizure-protocol.mp4
   ```
   or (older style):
   ```text
   https://s3.us-east-1.amazonaws.com/parapro-training-videos/seizure-protocol.mp4
   ```

### 5. Use the URL in the app
- Open **data.js** in the project.
- Find **Module 1** (Seizure Emergency Protocol).
- Set **videoUrl** to the S3 URL you copied (see comment in `data.js`).
- Commit, push, and let Amplify redeploy.

---

## Option B: Use an existing bucket (e.g. `nm2vault-media`)

1. Open the bucket **nm2vault-media**.
2. Click **Upload** → add **seizure-protocol.mp4**.
3. In **Permissions**, choose **Grant public read access** (or set object/bucket policy so the file is publicly readable).
4. After upload, open the object and copy its **Object URL**.
5. In **data.js**, set Module 1’s **videoUrl** to that URL, then commit and push.

---

## Bucket policy (optional – for public read)

If you prefer a bucket policy instead of per-object ACL:

1. Bucket → **Permissions** → **Bucket policy** → **Edit**.
2. Use (replace `YOUR-BUCKET-NAME`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

3. Save. New uploads will be publicly readable.

---

## After you have the S3 URL

1. Paste it into **data.js** for Module 1 (see the `videoUrl` line and comment).
2. Run locally to confirm: `npm run dev` → open Seizure module.
3. Commit and push so Amplify redeploys:
   ```bash
   git add data.js
   git commit -m "Use S3 URL for Seizure Protocol video"
   git push origin main
   ```

Video will then be served from your S3 and should play on Amplify without CORS issues from third‑party hosts.
