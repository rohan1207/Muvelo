import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { getCloudinaryImageUrl } from '../utils/cloudinary';





const FloatingDish = ({ src, alt, className, animation }) => (
  <motion.div
    className={`absolute ${className}`}
    animate={animation}
  >
    <img src={src} alt={alt} className="w-full h-full object-contain drop-shadow-2xl" />
  </motion.div>
);

const Annotation = ({ text, subtext, className, arrowClassName }) => (
    <div className={`absolute ${className} text-center`}>
        <p className="font-serif text-lg italic text-yellow-700">{text}</p>
        <p className="text-sm text-gray-500">{subtext}</p>
        <div className={`absolute ${arrowClassName}`}>
            <svg width="60" height="40" viewBox="0 0 60 40">
                <path d="M5,35 Q20,5 55,5" stroke="#b45309" strokeWidth="2" fill="none" strokeDasharray="4 4" />
            </svg>
        </div>
    </div>
);

const OwnerMessage = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  
  const bgClass = isDark
    ? 'bg-gradient-to-b from-black via-[#050505] to-black'
    : 'bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6]';
  
  const textColor = isDark ? 'text-white' : 'text-[#1a1a1a]';
  const accentColor = isDark ? 'text-[#fff8e1]' : 'text-[#A0826D]';
  const iconBg = isDark ? 'bg-white/10 border border-white/20' : 'bg-[#A0826D]/10 border border-[#A0826D]/20';
  const iconColor = isDark ? 'text-[#fff8e1]' : 'text-[#A0826D]';

  return (
    <section className={`${bgClass} py-24 sm:py-32 relative overflow-hidden`}>
      <div className="max-w-4xl mx-auto px-4 relative z-10 mb-20">
        
        {/* Quote Icon */}
        <div className="text-center mb-10">
          <div className={`inline-flex items-center justify-center w-[38px] h-[38px] sm:w-20 sm:h-20 ${iconBg} rounded-full backdrop-blur-sm`}>
            <Quote className={`w-[18px] h-[18px] sm:w-10 sm:h-10 ${iconColor}`} strokeWidth={1.5} />
          </div>
        </div>

        {/* Main Message */}
        <p className={`text-md sm:text-3xl font-playfair font-normal ${textColor} text-center leading-relaxed tracking-wide`}>
        We're not just making lights. We're crafting movement.
Muvèlo reimagines everyday objects as adaptable, beautiful, and functional pieces for modern living.
Our collection, Ekkam, celebrates portability, modularity, and sustainable design, all built right here in India.
        </p>

        {/* Author */}
        <p className={`text-center ${accentColor} font-light text-lg mt-8 tracking-wider`}>MUVELO</p>

       
      </div>

      {/* Floating Decorative Elements */}
      <FloatingDish 
        src={getCloudinaryImageUrl('om1', {
          quality: 'auto:good',
          format: 'auto',
          width: 'auto',
          crop: 'scale',
        })}
        alt="Delicious Soup" 
        className=" w-48 h-48 top-[68%] sm:w-72 sm:h-72 sm:top-[35%] -translate-y-1/2  left-[0%]sm:left-[-2%]"
        animation={{ y: [0, -15, 0], transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
      />
      <FloatingDish 
        src={getCloudinaryImageUrl('om2', {
          quality: 'auto:good',
          format: 'auto',
          width: 'auto',
          crop: 'scale',
        })} 
        alt="Healthy Chicken" 
        className=" w-48 h-48 sm:w-72 sm:h-72 top-[-2%] sm:top-[10%] -translate-y-[70%]  right-[0%] sm:right-[0%]"
        animation={{ y: [0, 15, 0], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
      />

    

    </section>
  );
};

export default OwnerMessage;