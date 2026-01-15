# ⚡ Quick Start - Automated Cloudinary Upload

## 🚀 Run This Command (That's It!)

```bash
cd frontend
npm run upload:cloudinary
```

The script will automatically:
1. ✅ Upload all images from `/public` folder
2. ✅ Upload all videos from `/public` folder  
3. ✅ Use high quality settings (90-95% - HD maintained)
4. ✅ Show progress for each file
5. ✅ Display summary when done

---

## 📋 What Gets Uploaded

### Images (27 files)
- Hero images (heroimg.png, heroimg_day.png)
- Logo (logo.png)
- Products (product1-8.webp, product1-8-off.png)
- Other images (wcu.png, banner.png, om1.png, om2.png)

### Videos (9 files)
- showvideo1.mp4
- video1.mp4 through video9.mp4

### Not Uploaded
- 3D models (.glb files) - Keep these local, optimize manually

---

## ⚙️ Upload Settings

- **Quality**: `auto:good` (90-95% - HD quality maintained)
- **Format**: `auto` (WebP/AVIF automatically)
- **Overwrite**: Yes (replaces existing)
- **Cache**: Cleared (fresh CDN)

---

## ⏱️ Expected Time

- **Images**: ~30 seconds (18 files)
- **Videos**: ~5-10 minutes (9 files, depends on size)
- **Total**: ~5-10 minutes for all assets

---

## ✅ After Upload

1. Test locally: `npm run dev`
2. Check images load from Cloudinary (DevTools → Network)
3. Verify quality looks HD
4. Check load times (< 1-2 seconds)

---

## 🎯 That's It!

Just run `npm run upload:cloudinary` and wait. The script handles everything automatically! 🚀

