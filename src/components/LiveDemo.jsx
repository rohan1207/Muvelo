import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getCloudinaryVideoUrl } from '../utils/cloudinary';

const LiveDemo = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  
  const bgClass = isDark
    ? 'bg-gradient-to-b from-black via-[#050505] to-black'
    : 'bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6]';
  
  const leftPanelBg = isDark ? 'bg-[#1a1a1a]' : 'bg-gray-100';
  const headingColor = isDark ? 'text-white' : 'text-[#1a1a1a]';
  const subTextColor = isDark ? 'text-gray-300' : 'text-[#6B6B6B]';
  const buttonBg = isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-red-600 hover:bg-red-700';
  
  return (
    <section className={`w-full ${bgClass} py-8 sm:py-12 px-4 sm:px-8 overflow-hidden`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-0 rounded-xl overflow-hidden shadow-xl">
          {/* Left Panel - Text Content */}
          <div className={`${leftPanelBg} p-6 sm:p-8 lg:p-10 flex flex-col justify-center`}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${headingColor} leading-tight`}>
                Illuminate Your
                <br />
                <span className="text-red-600">Everyday Moments</span>
              </h2>
              
              <p className={`text-sm sm:text-base ${subTextColor} leading-relaxed max-w-lg`}>
                Transform your space with lighting that adapts to your life. Every Muvelo lamp is designed to move with you, creating ambiance that evolves with your perspective.
              </p>
              
              <motion.div
                className="relative inline-block w-fit overflow-hidden rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/products"
                  className={`relative z-10 inline-block ${buttonBg} text-white px-8 py-3 rounded-full font-semibold text-sm sm:text-base shadow-lg transition-colors duration-300 overflow-hidden`}
                >
                  <span className="relative z-30">Explore Collection</span>
                  
                  {/* Shiny glass shine effect - moves from left to right */}
                  <motion.div
                    className="absolute inset-0 z-20 rounded-full"
                    initial={{ x: '-100%', skewX: '-20deg' }}
                    whileHover={{ x: '200%' }}
                    transition={{ 
                      duration: 0.9,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 30%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.3) 70%, transparent 100%)',
                      width: '50%',
                    }}
                  />
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Right Panel - Video */}
          <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[400px] bg-black">
            <video
              src={getCloudinaryVideoUrl('showvideo1', {
                quality: 'auto:good',
                format: 'auto',
                width: 'auto',
              })}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;

