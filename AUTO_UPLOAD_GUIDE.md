# 🚀 Automated Cloudinary Upload Guide

## Quick Start (3 Steps)

### Step 1: Install Cloudinary SDK
```bash
cd frontend
npm install cloudinary
```

### Step 2: Run Upload Script
```bash
npm run upload:cloudinary
```

### Step 3: Wait for Upload to Complete
The script will:
- ✅ Upload all images (hero, logo, products, etc.)
- ✅ Upload all videos
- ✅ Show progress for each file
- ✅ Display summary at the end

---

## What Gets Uploaded

### Images (High Quality - 90-95%)
- ✅ `heroimg.png` → `heroimg`
- ✅ `heroimg_day.png` → `heroimg_day`
- ✅ `logo.png` → `logo`
- ✅ `product1.webp` through `product8.webp`
- ✅ `product1-off.png` through `product8-off.png`
- ✅ `wcu.png` → `wcu`
- ✅ `banner.png` → `banner`
- ✅ `om1.png` → `om1`
- ✅ `om2.png` → `om2`

### Videos (High Quality - 90-95%)
- ✅ `showvideo1.mp4` → `showvideo1`
- ✅ `video1.mp4` through `video9.mp4`

### Not Uploaded (Keep Local)
- ❌ `.glb` files (3D models) - Cloudinary doesn't support these
- ❌ Duplicate files (heroimg2.png, etc.)

---

## Upload Settings

### Images
- **Quality**: `auto:good` (90-95% - HD quality maintained)
- **Format**: `auto` (WebP/AVIF for modern browsers)
- **Overwrite**: Yes (replaces existing)
- **Cache**: Cleared (fresh CDN cache)

### Videos
- **Quality**: `auto:good` (90-95% - HD quality maintained)
- **Format**: `auto` (optimized format)
- **Overwrite**: Yes (replaces existing)
- **Cache**: Cleared (fresh CDN cache)

---

## Script Output Example

```
🚀 Starting Cloudinary Upload...

📁 Reading files from: /path/to/public

📸 Uploading 18 images...

📤 Uploading heroimg.png → heroimg...
✅ Uploaded heroimg.png (245.32 KB) → https://res.cloudinary.com/...

📤 Uploading heroimg_day.png → heroimg_day...
✅ Uploaded heroimg_day.png (238.91 KB) → https://res.cloudinary.com/...

...

🎬 Uploading 9 videos...

⏳ Videos take longer to upload, please wait...

📤 Uploading showvideo1.mp4 → showvideo1...
✅ Uploaded showvideo1.mp4 (3.2 MB) → https://res.cloudinary.com/...

...

============================================================
📊 UPLOAD SUMMARY
============================================================
✅ Successfully uploaded: 27
❌ Failed: 0
⚠️  Skipped: 0

✅ Successfully uploaded files:
   heroimg.png → heroimg
   heroimg_day.png → heroimg_day
   ...

============================================================
🎉 Upload complete!
============================================================
```

---

## Troubleshooting

### Error: "Cannot find module 'cloudinary'"
**Solution**: Run `npm install cloudinary` first

### Error: "Invalid API credentials"
**Solution**: Check credentials in `scripts/upload-to-cloudinary.js`

### Some files skipped
**Solution**: Check if files exist in `public` folder. Script skips missing files.

### Upload fails for large files
**Solution**: 
- Check your Cloudinary plan limits
- Large videos may take time (be patient)
- Check internet connection

---

## After Upload

1. ✅ **Test locally**: Run `npm run dev` and check images load from Cloudinary
2. ✅ **Verify in dashboard**: Go to https://console.cloudinary.com → Media Library
3. ✅ **Check quality**: Images should look HD (90-95% quality)
4. ✅ **Check speed**: Load times should be < 1-2 seconds

---

## Customization

### Change Quality Settings
Edit `scripts/upload-to-cloudinary.js`:

```javascript
// For even higher quality (larger files)
quality: 'auto:best'  // 100% quality

// For smaller files (still good quality)
quality: 'auto:eco'   // 80-85% quality
```

### Add More Files
Edit `FILE_MAPPING` in `scripts/upload-to-cloudinary.js`:

```javascript
const FILE_MAPPING = {
  // Add your files here
  'newfile.png': 'newfile',
  // ...
};
```

---

## Notes

- ⚠️ **Keep original files** in `/public` as backup
- ⚠️ **3D models (.glb)** are NOT uploaded (Cloudinary doesn't support)
- ⚠️ **Large videos** may take several minutes to upload
- ✅ **Quality maintained**: Using `auto:good` ensures HD quality
- ✅ **Auto-optimized**: Cloudinary automatically optimizes format and size

---

## Next Steps

After upload completes:
1. Test your site - images should load from Cloudinary
2. Verify quality - should look HD
3. Check load times - should be < 1-2 seconds
4. Deploy and enjoy fast loading! 🚀





