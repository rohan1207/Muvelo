import React from 'react';
import { getCloudinaryImageUrl } from '../utils/cloudinary';

const Banner = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  
  // Simple container - just the banner image with padding on all sides, compact height
  // const imageBg = isDark ? 'bg-[#1a1a1a]' : 'bg-gray-100';
  
  return (
    <section className={`w-full ${isDark ? 'bg-black' : 'bg-[#FAF9F6]'} py-3 sm:py-4 md:py-5 px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden flex items-center justify-center`}>
      <div className="w-full  mx-auto">
        <div className={` rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl p-3 sm:p-4 md:p-6`}>
          <img
            src='/banner.png'
            alt="Banner"
            className="w-full h-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;

