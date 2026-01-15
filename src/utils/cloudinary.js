/**
 * Cloudinary Configuration and Helper Functions
 * Cloud Name: dvofgrucv
 */

const CLOUD_NAME = 'dvofgrucv';
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}`;

/**
 * Generate optimized Cloudinary image URL with high quality settings
 * @param {string} publicId - Image name in Cloudinary (without extension)
 * @param {object} options - Transformation options
 * @returns {string} Optimized Cloudinary URL
 */
export const getCloudinaryImageUrl = (publicId, options = {}) => {
  const {
    quality = 'auto:good', // High quality (90-95%), auto-optimized
    format = 'auto', // Auto WebP/AVIF for modern browsers
    width = 'auto', // Auto width, or specify max width
    crop = 'scale', // Scale proportionally
    ...rest
  } = options;

  const transformations = [
    `q_${quality}`, // High quality
    `f_${format}`, // Auto format (WebP/AVIF)
    `w_${width}`, // Width
    `c_${crop}`, // Crop mode
  ];

  // Add any additional transformations
  Object.entries(rest).forEach(([key, value]) => {
    if (value !== undefined) {
      transformations.push(`${key}_${value}`);
    }
  });

  return `${BASE_URL}/image/upload/${transformations.join(',')}/${publicId}`;
};

/**
 * Generate optimized Cloudinary video URL with high quality settings
 * @param {string} publicId - Video name in Cloudinary (without extension)
 * @param {object} options - Transformation options
 * @returns {string} Optimized Cloudinary URL
 */
export const getCloudinaryVideoUrl = (publicId, options = {}) => {
  const {
    quality = 'auto:good', // High quality
    format = 'auto', // Auto format
    width = 'auto', // Max width
    ...rest
  } = options;

  const transformations = [
    `q_${quality}`,
    `f_${format}`,
    `w_${width}`,
  ];

  Object.entries(rest).forEach(([key, value]) => {
    if (value !== undefined) {
      transformations.push(`${key}_${value}`);
    }
  });

  return `${BASE_URL}/video/upload/${transformations.join(',')}/${publicId}`;
};

export default {
  getCloudinaryImageUrl,
  getCloudinaryVideoUrl,
  CLOUD_NAME,
};

