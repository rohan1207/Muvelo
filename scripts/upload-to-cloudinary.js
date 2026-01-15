/**
 * Automated Cloudinary Upload Script
 * Uploads all assets from public folder to Cloudinary
 * 
 * Usage: npm run upload:cloudinary
 */

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cloudinary Configuration
cloudinary.config({
  cloud_name: 'dvofgrucv',
  api_key: '867738833923113',
  api_secret: '8xQ0WCHtS7wJgFzOHVHEzxHFItY'
});

const PUBLIC_FOLDER = path.join(__dirname, '../public');

// File mapping: local filename -> Cloudinary public ID
const FILE_MAPPING = {
  // Hero images
  'heroimg.png': 'heroimg',
  'heroimg_day.png': 'heroimg_day',
  
  // Logo
  'logo.png': 'logo',
  
  // Product images
  'product1.webp': 'product1',
  'product1-off.png': 'product1-off',
  'product2.webp': 'product2',
  'product2-off.png': 'product2-off',
  'product3.webp': 'product3',
  'product3-off.png': 'product3-off',
  'product4.webp': 'product4',
  'product4-off.png': 'product4-off',
  'product5.webp': 'product5',
  'product5-off.png': 'product5-off',
  'product6.webp': 'product6',
  'product6-off.png': 'product6-off',
  'product7.webp': 'product7',
  'product7-off.png': 'product7-off',
  'product8.webp': 'product8',
  'product8-off.png': 'product8-off',
  
  // Other images
  'wcu.png': 'wcu',
  'banner.png': 'banner',
  'om1.png': 'om1',
  'om2.png': 'om2',
  
  // Videos
  'showvideo1.mp4': 'showvideo1',
  'video1.mp4': 'video1',
  'video2.mp4': 'video2',
  'video3.mp4': 'video3',
  'video4.mp4': 'video4',
  'video5.mp4': 'video5',
  'video6.mp4': 'video6',
  'video7.mp4': 'video7',
  'video9.mp4': 'video9',
};

// Upload options for images (high quality)
const IMAGE_OPTIONS = {
  resource_type: 'image',
  overwrite: true, // Overwrite if exists
  invalidate: true, // Clear CDN cache
  quality: 'auto:good', // High quality (90-95%)
  fetch_format: 'auto', // Auto WebP/AVIF
};

// Upload options for videos (high quality)
const VIDEO_OPTIONS = {
  resource_type: 'video',
  overwrite: true,
  invalidate: true,
  quality: 'auto:good', // High quality
  fetch_format: 'auto',
};

/**
 * Upload a single file to Cloudinary
 */
async function uploadFile(filename, publicId, isVideo = false) {
  const filePath = path.join(PUBLIC_FOLDER, filename);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${filename} - file not found`);
    return { success: false, reason: 'file_not_found' };
  }

  const options = isVideo ? VIDEO_OPTIONS : IMAGE_OPTIONS;
  options.public_id = publicId;

  try {
    console.log(`📤 Uploading ${filename} → ${publicId}...`);
    
    const result = await cloudinary.uploader.upload(filePath, options);
    
    const fileSize = (result.bytes / 1024).toFixed(2);
    console.log(`✅ Uploaded ${filename} (${fileSize} KB) → ${result.secure_url}`);
    
    return { success: true, result };
  } catch (error) {
    console.error(`❌ Failed to upload ${filename}:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Main upload function
 */
async function uploadAllAssets() {
  console.log('🚀 Starting Cloudinary Upload...\n');
  console.log(`📁 Reading files from: ${PUBLIC_FOLDER}\n`);

  const results = {
    success: [],
    failed: [],
    skipped: []
  };

  // Upload images first
  const imageFiles = Object.entries(FILE_MAPPING).filter(([filename]) => {
    const ext = path.extname(filename).toLowerCase();
    return ['.png', '.jpg', '.jpeg', '.webp'].includes(ext);
  });

  console.log(`📸 Uploading ${imageFiles.length} images...\n`);
  
  for (const [filename, publicId] of imageFiles) {
    const result = await uploadFile(filename, publicId, false);
    
    if (result.success) {
      results.success.push({ filename, publicId, type: 'image' });
    } else if (result.reason === 'file_not_found') {
      results.skipped.push({ filename, reason: 'file_not_found' });
    } else {
      results.failed.push({ filename, error: result.error });
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Upload videos
  const videoFiles = Object.entries(FILE_MAPPING).filter(([filename]) => {
    const ext = path.extname(filename).toLowerCase();
    return ['.mp4', '.mov', '.webm'].includes(ext);
  });

  console.log(`\n🎬 Uploading ${videoFiles.length} videos...\n`);
  console.log('⏳ Videos take longer to upload, please wait...\n');

  for (const [filename, publicId] of videoFiles) {
    const result = await uploadFile(filename, publicId, true);
    
    if (result.success) {
      results.success.push({ filename, publicId, type: 'video' });
    } else if (result.reason === 'file_not_found') {
      results.skipped.push({ filename, reason: 'file_not_found' });
    } else {
      results.failed.push({ filename, error: result.error });
    }
    
    // Longer delay for videos
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 UPLOAD SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successfully uploaded: ${results.success.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`⚠️  Skipped: ${results.skipped.length}`);
  
  if (results.success.length > 0) {
    console.log('\n✅ Successfully uploaded files:');
    results.success.forEach(({ filename, publicId }) => {
      console.log(`   ${filename} → ${publicId}`);
    });
  }
  
  if (results.failed.length > 0) {
    console.log('\n❌ Failed files:');
    results.failed.forEach(({ filename, error }) => {
      console.log(`   ${filename}: ${error}`);
    });
  }
  
  if (results.skipped.length > 0) {
    console.log('\n⚠️  Skipped files (not found):');
    results.skipped.forEach(({ filename }) => {
      console.log(`   ${filename}`);
    });
  }

  console.log('\n' + '='.repeat(60));
  console.log('🎉 Upload complete!');
  console.log('='.repeat(60));
  console.log('\n💡 Next steps:');
  console.log('   1. Test your site locally');
  console.log('   2. Verify images load from Cloudinary');
  console.log('   3. Check Cloudinary dashboard for uploaded files');
  console.log('\n');
}

// Run the upload
uploadAllAssets().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});

