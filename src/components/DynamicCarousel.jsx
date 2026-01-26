import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const DynamicCarousel = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const containerRef = useRef(null);
  const [lampIndex, setLampIndex] = useState(0);
  const [isPhone, setIsPhone] = useState(false);

  // Detect if screen is phone size
  useEffect(() => {
    const checkIsPhone = () => {
      setIsPhone(window.innerWidth < 640); // sm breakpoint
    };
    
    checkIsPhone();
    window.addEventListener('resize', checkIsPhone);
    return () => window.removeEventListener('resize', checkIsPhone);
  }, []);

  // Cycle through lamp PNGs every 2 seconds
  const lampImages = ['/lamp1.png', '/lamp2.png', '/lamp3.png'];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLampIndex((prev) => (prev + 1) % lampImages.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  // Use framer-motion scroll tracking
  // The component height is exactly 100vh (one viewport height)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to image position
  // Image slides from left bottom (completely off-screen left) to an even more left‑aligned \"center\",
  // then stays fixed there even if the user keeps scrolling.
  // Because the image anchor is at its center (`left-1/2`), a stronger negative offset keeps it clearly left of center.
  // 0   -> far left, 0.5 -> slightly further left‑center, 1 -> still at that same spot (clamped)
  const imageX = useTransform(scrollYProgress, [0, 0.5, 1], ['-150%', '-45%', '-45%']);
  // Lamp should always be visible while this section is in view
  // Keep full opacity and no vertical offset so we don't accidentally hide it via scroll mapping
  const lampOpacity = 1;
  const lampY = 0;
  
  // Fade in/out at the edges for smooth transitions
  const imageOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  // Parallax and animation for left content (title + link)
  const leftOpacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0]);
  const leftY = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [40, 0, 0, -20]);
  const leftX = useTransform(scrollYProgress, [0, 0.5, 1], [-30, 0, 0]);
  
  // Parallax and animation for right content (subheading + button)
  const rightOpacity = useTransform(scrollYProgress, [0, 0.18, 0.8, 1], [0, 1, 1, 0]);
  const rightY = useTransform(scrollYProgress, [0, 0.18, 0.8, 1], [50, 0, 0, -25]);
  const rightX = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, 0]);
  
  // Parallax for title (faster movement)
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Parallax for link (slower movement)
  const linkY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <>
      {/* Add style tag for 16:9 aspect ratio on mobile */}
      <style>{`
        @media (max-width: 640px) {
          .dynamic-carousel-mobile-16-9 {
            height: auto !important;
            aspect-ratio: 16/9;
            min-height: 56.25vw; /* 9/16 = 0.5625 = 56.25% */
          }
        }
        @media (min-width: 641px) {
          .dynamic-carousel-mobile-16-9 {
            height: 100vh;
            aspect-ratio: auto;
          }
        }
      `}</style>
      <section
        ref={containerRef}
        className="dynamic-carousel-mobile-16-9 relative w-full overflow-hidden h-screen"
      >
      {/* Background image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${isDark ? '/dbg_night.png' : '/dbg_day.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Table PNG Image - positioned slightly below the center bottom */}
      <motion.div
        className="absolute left-1/4 sm:left-1/3 z-10 bottom-[-5vh] sm:bottom-[-10vh]"
        style={{
          x: imageX,
          opacity: imageOpacity,
        }}
      >
        <img
          // src={isDark ? '/b1_day.png' : '/b1_day.png'}
          src="/b1_day.png"
          alt="Dynamic content"
          className="h-auto object-contain max-h-[27vh] sm:max-h-[75vh] min-w-[200px] sm:min-w-[280px]"
          style={{
            width: 'auto',
            display: 'block',
          }}
        />
      </motion.div>

      {/* Warm light glow reflection on table - changes with lamp (behind shadow, on table surface) */}
      <motion.div
        className="absolute left-[27%] sm:left-[32%] md:left-[34%] z-17 -translate-x-1/2 pointer-events-none bottom-[3vh] sm:bottom-[12vh]"
        style={{
                    // positioned on table surface
          x: imageX,               // locked to table horizontal motion
        }}
      >
        <motion.div
          key={lampIndex}            // trigger animation on lamp change
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ 
            opacity: [0, 1, 0.8, 0.95],  // strong blink effect when lamp changes
            scale: [0.5, 1, 1, 1],   // noticeable scale pulse
          }}
          transition={{
            duration: 0.9,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 1],
          }}
        >
          <motion.div
            className="w-28 h-28 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 rounded-full"
            style={{
              background: `radial-gradient(circle, 
                rgba(255, 200, 140, 0.65) 0%, 
                rgba(255, 185, 120, 0.55) 15%, 
                rgba(255, 170, 110, 0.45) 30%, 
                rgba(255, 155, 95, 0.35) 45%, 
                rgba(255, 140, 80, 0.25) 60%, 
                rgba(255, 125, 70, 0.15) 75%, 
                rgba(255, 110, 60, 0.08) 90%, 
                transparent 100%)`,
              filter: 'blur(35px)',
            }}
            animate={{
              opacity: [0.95, 0.95, 0.95],  // strong continuous pulse
              scale: [1, 1, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>

      

      {/* Warm light shadow on table - left diagonal side of lamp - Realistic shadow */}
      <motion.div
        className="absolute pointer-events-none 
          w-26 h-5 sm:w-40 sm:h-10 md:w-48 md:h-12 lg:w-52 lg:h-14 
          bottom-[5vh] sm:bottom-[20vh] md:bottom-[18vh] lg:bottom-[20vh]
          left-[20%] sm:left-[28%] md:left-[30%] lg:left-[28%]"
        style={{
          x: imageX,                       // Locked to table horizontal motion
          zIndex: 25,                      // Above table and glow
        }}
      >
        <motion.div
          key={lampIndex}                  // Instant blink on lamp change
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: [0, 1, 1, 1],         // Instant blink on lamp change
            scale: [0.9, 1, 1, 1],
          }}
          transition={{
            duration: 0.3,                 // Quick/instant for realistic effect
            ease: "easeOut",
            times: [0, 0.1, 0.5, 1],
          }}
          className="w-full h-full "
          style={{
            background: 'radial-gradient(ellipse, rgba(120, 80, 50, 0.6) 0%, rgba(140, 100, 70, 0.55) 20%, rgba(160, 120, 90, 0.5) 40%, rgba(180, 140, 110, 0.45) 60%, rgba(200, 160, 130, 0.35) 80%, rgba(220, 180, 150, 0.25) 95%, transparent 100%)',
            filter: 'blur(12px)',            // Less blur for more visibility
            borderRadius: '50%',
            // background: 'rgba(16, 16, 16, 0.6)', // Oval shape
            transform: 'scaleX(1.5) scaleY(0.6)', // Flattened horizontal shadow
          }}
        />
      </motion.div>

      {/* Center lamp on the table (simplified for reliability) */}
      <motion.div
        className="absolute left-[27%] sm:left-[34%] md:left-[35%] z-20 -translate-x-1/2 bottom-[6vh] sm:bottom-[20vh]"
        style={{
          x: imageX,               // locked to table horizontal motion
          opacity: lampOpacity,
          y: lampY,
        }}
      >
        <img
          src={lampImages[lampIndex]}
          alt="Dynamic lamp"
          className="h-auto object-contain max-h-[14vh] sm:max-h-[35vh]"
          style={{
            width: 'auto',
            display: 'block',
          }}
        />
        {/* Small shadow only at bottommost point of lamp */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            bottom: '0',
            width: '20px',
            height: '3px',
            background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.5) 0%, transparent 100%)',
            filter: 'blur(8px)',
            transform: 'translateX(-50%) scaleX(2)',
          }}
        />
      </motion.div>

      {/* Minimal but visible left/right arrows for manual control (in addition to auto-cycle) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 z-30">
        <button
          type="button"
          aria-label="Previous lamp"
          onClick={() => setLampIndex((prev) => (prev - 1 + lampImages.length) % lampImages.length)}
          className={`pointer-events-auto w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full border text-base sm:text-lg flex items-center justify-center touch-manipulation
            ${isDark
              ? 'border-white/35 text-white/80 bg-black/50 hover:bg-white/10 active:bg-white/15'
              : 'border-black/15 text-black/70 bg-white/80 hover:bg-black/5 active:bg-black/10'} 
            transition-colors backdrop-blur-sm`}
        >
          ‹
        </button>

        <button
          type="button"
          aria-label="Next lamp"
          onClick={() => setLampIndex((prev) => (prev + 1) % lampImages.length)}
          className={`pointer-events-auto w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full border text-base sm:text-lg flex items-center justify-center touch-manipulation
            ${isDark
              ? 'border-white/35 text-white/80 bg-black/50 hover:bg-white/10 active:bg-white/15'
              : 'border-black/15 text-black/70 bg-white/80 hover:bg-black/5 active:bg-black/10'} 
            transition-colors backdrop-blur-sm`}
        >
          ›
        </button>
      </div>

      {/* Left side: Title + Link */}
      <motion.div
        className="absolute inset-y-0 left-0 z-20 flex items-start"
        style={{ opacity: leftOpacity, y: leftY, x: leftX }}
      >
        <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-[180px]">
          <div className="space-y-2 sm:space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-8">
            {/* Primary headline with parallax - double line */}
            <motion.h2
              className="text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold leading-tight sm:leading-tight"
              style={{
                color: isDark ? '#FFFFFF' : '#0a0a0a',
                letterSpacing: '0.02em',
                y: titleY,
                textShadow: isDark 
                  ? '0 2px 8px rgba(0,0,0,0.3)' 
                  : '0 1px 3px rgba(255,255,255,0.8), 0 2px 6px rgba(255,255,255,0.5)',
              }}
            >
              Light, Designed
              <br />
              to Belong.
            </motion.h2>

            {/* Secondary CTA as text link with parallax */}
            <motion.button
              type="button"
              className={`
                block text-[9px] sm:text-sm md:text-base tracking-[0.18em] uppercase whitespace-nowrap
                underline-offset-4 decoration-transparent hover:decoration-current active:decoration-current
                transition-colors duration-200 font-medium touch-manipulation
                ${isDark ? 'text-gray-200 hover:text-white active:text-white' : 'text-[#2a2a2a] hover:text-[#0a0a0a] active:text-[#0a0a0a]'}
              `}
              style={{ 
                y: linkY,
                textShadow: isDark 
                  ? '0 1px 4px rgba(0,0,0,0.25)' 
                  : '0 1px 2px rgba(255,255,255,0.7)',
              }}
            > {isPhone ? '' : 'Switch light mood'}
              
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Right side: Subheading + CTA Button */}
      <motion.div
        className="absolute inset-y-0 right-0 z-20 flex items-end sm:items-center md:items-start"
        style={{ opacity: rightOpacity, y: rightY, x: rightX }}
      >
        <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 max-w-[180px] sm:max-w-[200px] md:max-w-xs lg:max-w-sm xl:max-w-md 2xl:max-w-lg pb-3 sm:pb-0 md:pt-20 lg:pt-24 xl:pt-[500px]">
          <div className="space-y-1 sm:space-y-4 md:space-y-5 lg:space-y-6">
            {/* Subheading */}
            <motion.p
              className="text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg leading-relaxed font-medium"
              style={{
                color: isDark ? 'rgba(225,229,235,1)' : 'rgba(30,30,30,1)',
                textShadow: isDark 
                  ? '0 1px 4px rgba(0,0,0,0.25)' 
                  : '0 1px 2px rgba(255,255,255,0.7)',
              }}
            >
              {isPhone ? (
                <>
                  One setting
                  <br />
                  Endless expressions.
                </>
              ) : (
                <>
                  One setting. Endless expressions.
                  <br />
                  Discover how the same space transforms.
                </>
              )}
            </motion.p>

            {/* Primary CTA - single line button */}
            <motion.button
              type="button"
              className={`
                inline-flex items-center justify-center whitespace-nowrap
                rounded-full px-2 sm:px-6 md:px-8 py-1 sm:py-3
                text-[7px] sm:text-xs md:text-sm font-medium sm:font-semibold tracking-[0.2em] uppercase
                transition-all duration-300 touch-manipulation
                ${isDark
                  ? 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 hover:scale-105 active:scale-95'
                  : 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 hover:scale-105 active:scale-95'}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Micro copy bottom-left */}
      <div className="absolute left-3 sm:left-4 md:left-6 lg:left-10 bottom-1 sm:bottom-4 md:bottom-6 lg:bottom-8 z-20">
        <p
          className="text-xs sm:text-[9px] md:text-[10px] lg:text-[11px] tracking-[0.24em] uppercase font-medium"
          style={{
            color: isDark ? 'rgba(225,229,235,0.85)' : 'rgba(40,40,40,0.9)',
            textShadow: isDark 
              ? '0 1px 3px rgba(0,0,0,0.3)' 
              : '0 1px 2px rgba(255,255,255,0.8)',
          }}
        >{isPhone ? '' : 'Designed to elevate everyday spaces'}
        </p>
      </div>
    </section>
    </>
  );
};

export default DynamicCarousel;

