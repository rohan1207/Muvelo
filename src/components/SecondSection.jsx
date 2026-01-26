import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Phone, Leaf, MapPin, Grid, Battery } from "lucide-react";
import { Link } from "react-router-dom";
import Lamp3DImages from "./Lamp3DImages";

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
      className={`relative ${themeStyles.background} py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 overflow-hidden min-h-[70vh] sm:min-h-[80vh]`}
    >
      {/* Background Text */}
      <motion.div
        className={`absolute top-0 sm:top-8 md:top-0 left-0 right-0 text-center text-[8vw] sm:text-[10vw] md:text-[8.5vw] font-playfair font-black ${themeStyles.backgroundText} whitespace-nowrap z-0 leading-none select-none pointer-events-none`}
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ letterSpacing: "0.1em" }}
      >
        DESIGNED TO MOVE
      </motion.div>

      {/* Main Layout Container */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto pt-8 sm:pt-12 md:pt-16 lg:pt-20 mt-0 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
        {/* Left Side - 3D Lamp Images (order-2 on mobile) */}
        <div className="w-full lg:w-1/2 relative flex justify-center items-center order-2 lg:order-1 mt-0 lg:mt-0 h-[40vh] sm:h-[45vh] md:h-[48vh] lg:h-[60vh]">
          <motion.div
            className="relative z-20 w-full h-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Lamp3DImages theme={theme} />
          </motion.div>
        </div>

        {/* Right Side - Text Content (order-1 on mobile) */}
        <div className="w-full lg:w-1/2 lg:pl-10 order-1 lg:order-2 text-left lg:text-left">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${themeStyles.textPrimary} leading-tight mb-4 sm:mb-5 z-40`}
              style={{ letterSpacing: "0.02em" }}
            >
              CRAFTED
              <br />
              WITH <span className="text-red-600">PASSION</span>
            </h2>

            <p className={`${themeStyles.textSecondary} text-xs sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-6 max-w-md mx-auto lg:mx-0`}>
              Discover the artistry behind every Muvelo lamp. Our collection represents the perfect fusion of traditional craftsmanship and modern design, creating lighting solutions that illuminate your space with sophistication and style.
            </p>

            <div className="flex flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4 md:gap-8">
              <motion.div
                className="relative flex-1 sm:flex-none min-w-0 max-w-[60%] sm:max-w-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/products"
                  className={`relative z-10 block ${themeStyles.buttonBg} text-white px-4 sm:px-8 py-2.5 sm:py-3 text-[10px] sm:text-sm md:text-base font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase rounded-full w-full text-center overflow-hidden`}
                  style={{ 
                    lineHeight: '1.5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '36px',
                  }}
                >
                  <span className="relative z-30">Explore Collection</span>
                  
                  {/* Shiny glass shine effect - moves from left to right */}
                  <motion.div
                    className="absolute inset-0 z-20 rounded-full pointer-events-none"
                    initial={{ x: '-100%', skewX: '-20deg' }}
                    whileHover={{ x: '200%' }}
                    transition={{ 
                      duration: 0.9,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 30%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.3) 70%, transparent 100%)',
                      width: '50%',
                      height: '100%',
                    }}
                  />
                </Link>
              </motion.div>

              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  className={`w-9 h-9 sm:w-10 sm:h-10 ${themeStyles.iconBg} ${isDark ? 'hover:bg-white/20' : 'hover:bg-[#A0826D]/20'} rounded-full flex items-center justify-center transition-colors touch-manipulation`}
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Phone size={18} className={`sm:w-5 sm:h-5 ${themeStyles.iconColor}`} />
                </motion.div>
                <span className={`${themeStyles.textPrimary} font-light text-xs sm:text-sm leading-tight`}>
                  Get In<br />
                  <span className="text-red-600">Touch Today</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Ribbon */}
      <div className="relative z-20 mt-12 sm:mt-16 md:mt-20 lg:mt-14">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-10 max-w-6xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`flex items-center gap-3 sm:gap-4 ${themeStyles.cardBg} rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all duration-500 group border ${themeStyles.borderColor}`}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 ${themeStyles.iconBg} ${themeStyles.iconBgHover} rounded-full flex items-center justify-center shadow-inner flex-shrink-0 transition-colors duration-500`}>
                <feature.Icon className={themeStyles.iconColor} size={24} />
              </div>
              <div>
                <h3 className={`font-semibold ${themeStyles.textPrimary} tracking-wider text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1`}>
                  {feature.title}
                </h3>
                <p className={`${themeStyles.textSecondary} text-[11px] sm:text-xs md:text-sm leading-relaxed`}>
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
