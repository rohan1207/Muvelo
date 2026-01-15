import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Phone, Leaf, MapPin, Grid, Battery } from "lucide-react";
import { Link } from "react-router-dom";
import LampModels from "./LampModels";

const SecondSection = ({ theme = 'dark' }) => {
  // Theme configuration - easy to switch between dark and light
  const isDark = theme === 'dark';
  
  // Match LiveDemo color theme
  const themeStyles = {
    background: isDark 
      ? 'bg-gradient-to-b from-black via-[#050505] to-black' 
      : 'bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6]',
    textPrimary: isDark ? 'text-white' : 'text-[#1a1a1a]',
    textSecondary: isDark ? 'text-gray-300' : 'text-[#6B6B6B]',
    textAccent: isDark ? 'text-red-400' : 'text-red-600',
    // Background text - more visible in day mode
    backgroundText: isDark 
      ? 'text-white/20 drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]' 
      : 'text-red-600/15 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]',
    cardBg: isDark ? 'bg-[#1a1a1a]' : 'bg-white/90 backdrop-blur-sm shadow-md',
    cardHover: isDark ? 'bg-[#1a1a1a]/80' : 'bg-white shadow-lg',
    iconBg: isDark ? 'bg-red-600/20' : 'bg-red-600/10',
    iconBgHover: isDark ? 'bg-red-600/30' : 'bg-red-600/20',
    iconColor: isDark ? 'text-red-400' : 'text-red-600',
    buttonBg: 'bg-red-600 hover:bg-red-700',
    borderColor: isDark ? 'border-white/10' : 'border-gray-200/50',
  };
  const features = [
    {
      Icon: MapPin,
      title: "Designed & Made in India",
      subtitle: "Crafted in small batches using BioPlastic. Proudly made in India.",
    },
    {
      Icon: Grid,
      title: "Modular design",
      subtitle: "Swap and Change Designs",
    },
    {
      Icon: Leaf,
      title: "Sustainable Materials",
      subtitle: "We use Industrially Compostible Materials",
    },
    {
      Icon: Battery,
      title: "24+ HOURS BATTERY LIFE",
      subtitle: "Charge for 3-4 Hours and it will last for a Full 24+ Hours",
    },
  ];

  const targetRef = useRef(null);

  return (
    <section
      ref={targetRef}
      className={`relative ${themeStyles.background} py-16 sm:py-20 px-4 sm:px-8 overflow-hidden min-h-screen`}
    >
      {/* Background Text */}
      <motion.div
        className={`absolute top-8 sm:top-0 left-0 right-0 text-center sm:text-[8.5vw] text-[13vw] font-playfair font-black ${themeStyles.backgroundText} whitespace-nowrap z-0 leading-none select-none pointer-events-none`}
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ letterSpacing: "0.1em" }}
      >
        DESIGNED TO MOVE
      </motion.div>

      {/* Main Layout Container */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto pt-0 sm:pt-0 lg:pt-0 mt-0">
        {/* Left Side - 3D Lamp Models (order-2 on mobile) */}
        <div className="w-full lg:w-1/2 relative flex justify-center items-center order-2 lg:order-1 mt-0 lg:mt-0 h-[60vh] lg:h-[80vh]">
          <motion.div
            className="relative z-20 w-full h-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <LampModels />
          </motion.div>
        </div>

        {/* Right Side - Text Content (order-1 on mobile) */}
        <div className="w-full lg:w-1/2 lg:pl-16 order-1 lg:order-2 text-left lg:text-left">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className={`text-5xl sm:text-6xl font-bold ${themeStyles.textPrimary} leading-tight mb-6 z-40`}
              style={{ letterSpacing: "0.02em" }}
            >
              CRAFTED
              <br />
              WITH <span className="text-red-600">PASSION</span>
            </h2>

            <p className={`${themeStyles.textSecondary} text-base leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0 font-light`}>
              Discover the artistry behind every Muvelo lamp. Our collection represents the perfect fusion of traditional craftsmanship and modern design, creating lighting solutions that illuminate your space with sophistication and style.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 sm:gap-10">
              <motion.div
                className="relative inline-block w-fit overflow-hidden rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/products"
                  className={`relative z-10 inline-block ${themeStyles.buttonBg} text-white px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase rounded-full shadow-lg transition-colors duration-300 overflow-hidden w-full sm:w-auto`}
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

              <div className="flex items-center gap-4">
                <motion.div
                  className={`w-12 h-12 ${themeStyles.iconBg} ${isDark ? 'hover:bg-white/20' : 'hover:bg-[#A0826D]/20'} rounded-full flex items-center justify-center transition-colors`}
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Phone size={20} className={themeStyles.iconColor} />
                </motion.div>
                <span className={`${themeStyles.textPrimary} font-light text-base leading-tight`}>
                  Get In<br />
                  <span className="text-red-600">Touch Today</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Ribbon */}
      <div className="relative z-20 mt-24 sm:mt-32 lg:mt-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 max-w-6xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`flex items-center gap-4 ${themeStyles.cardBg} rounded-2xl p-5 sm:p-6 hover:shadow-xl transition-all duration-500 group border ${themeStyles.borderColor}`}
              whileHover={{ scale: 1.02, y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`w-16 h-16 sm:w-20 sm:h-20 ${themeStyles.iconBg} ${themeStyles.iconBgHover} rounded-full flex items-center justify-center shadow-inner flex-shrink-0 transition-colors duration-500`}>
                <feature.Icon className={themeStyles.iconColor} size={28} />
              </div>
              <div>
                <h3 className={`font-light ${themeStyles.textPrimary} tracking-wider text-sm sm:text-base mb-1`}>
                  {feature.title}
                </h3>
                <p className={`${themeStyles.textSecondary} text-xs sm:text-sm font-light leading-relaxed`}>
                  {feature.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SecondSection;
