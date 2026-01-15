import React from 'react';
import { getCloudinaryImageUrl } from '../utils/cloudinary';

const Banner = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  
  // Simple container - just the banner image with padding on all sides, compact height
  const imageBg = isDark ? 'bg-[#1a1a1a]' : 'bg-gray-100';
  
  return (
    <section className={`w-full ${isDark ? 'bg-black' : 'bg-[#FAF9F6]'} py-3 sm:py-4 px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center justify-center`}>
      <div className="w-full max-w-7xl mx-auto">
        <div className={`${imageBg} rounded-2xl overflow-hidden shadow-xl p-4 sm:p-6`}>
          <img
            src={getCloudinaryImageUrl('banner', {
              quality: 'auto:good',
              format: 'auto',
              width: 'auto',
              crop: 'scale',
            })}
            alt="Banner"
            className="w-full h-auto max-h-[50vh] object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;

