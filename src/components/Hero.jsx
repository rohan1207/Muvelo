import { useRef, useMemo, useState, useEffect } from 'react';
import SplashCursor from './SplashCursor';
import { useScroll, useTransform, motion } from 'framer-motion';
import { getCloudinaryImageUrl } from '../utils/cloudinary';

function Hero({ theme = 'dark' }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const isDark = theme === 'dark';
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

  // Sync Framer Motion scroll with Lenis - optimized for performance
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
    layoutEffect: false, // Use layoutEffect: false for better performance
    axis: 'y',
  });

  // Image: moves up on scroll until it fits in screen (reaches top) - responsive
  // Shorter movement on mobile since hero section is shorter
  const imageY = useTransform(
    scrollYProgress, 
    [0, 1], 
    isPhone ? ['-20vh', '-30vh'] : ['-25vh', '-45vh'], 
    { clamp: false }
  );
  
  // Text: stays at top initially, then moves to just below image end line and STOPS
  // On phone: moves down more to merge with "DESIGNED TO MOVE" text and reduce gap
  // On desktop: moves to merge nicely with content below
  const textY = useTransform(
    scrollYProgress, 
    isPhone ? [0, 0.4, 0.5, 1] : [0, 0.7, 0.8, 1], 
    isPhone ? ['20px', '75vh', '80vh', '80vh'] : ['10px', '90vh', '100vh', '100vh'],
    { clamp: false }
  );
  
  // Font size: larger on desktop, responsive on mobile
  // Use simpler values for better performance - avoid clamp() in transforms
  const textFontSize = useTransform(
    scrollYProgress, 
    [0, 0.7, 1], 
    isPhone 
      ? ['3rem', '4rem', '4rem']
      : ['5rem', '8rem', '8rem'],
    { clamp: false }
  );

  // Memoize styles to prevent re-renders - responsive
  // Optimized for GPU acceleration
  const imageStyle = useMemo(() => ({
    top: isPhone ? '50vh' : '45vh', // Lower on phone screens, unchanged on desktop
    y: imageY,
    willChange: 'transform',
    cursor: 'default',
    pointerEvents: 'auto',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    isolation: 'isolate', // Create new stacking context for better performance
  }), [imageY, isPhone]);

  const textStyle = useMemo(() => ({
    y: textY,
    x: '-50%',
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    isolation: 'isolate', // Create new stacking context
  }), [textY]);

  // Vibrant gradient for MUVELO text - same for both themes
  const muveloGradient = 'linear-gradient(90deg, #f97316, #fb7185, #eab308)';

  // Cloudinary URLs for hero images - high quality, fast loading
  // Use phone-specific images on mobile, regular images on desktop
  const heroImageUrl = useMemo(() => {
    if (isPhone) {
      // Phone-specific images
      return isDark
        ? getCloudinaryImageUrl('heroimg_phone', {
            quality: 'auto:good',
            format: 'auto',
            width: 640, // Optimized for mobile
            crop: 'scale',
          })
        : getCloudinaryImageUrl('heroimg_day_phone', {
            quality: 'auto:good',
            format: 'auto',
            width: 640, // Optimized for mobile
            crop: 'scale',
          });
    } else {
      // Desktop images
      return isDark
        ? getCloudinaryImageUrl('heroimg', {
            quality: 'auto:good',
            format: 'auto',
            width: 1920, // Max width for HD
            crop: 'scale',
          })
        : getCloudinaryImageUrl('heroimg_day', {
            quality: 'auto:good',
            format: 'auto',
            width: 1920, // Max width for HD
            crop: 'scale',
          });
    }
  }, [isDark, isPhone]);

  return (
    <>
      {/* Add style tag for responsive hero height */}
      <style>{`
        .hero-container {
          min-height: 100vh; /* Mobile: just one screen height */
        }
        @media (min-width: 640px) {
          .hero-container {
            min-height: 140vh; /* Desktop: larger for scroll effect */
          }
        }
      `}</style>
      <div 
        ref={containerRef} 
        className="hero-container relative w-full overflow-x-hidden"
        style={{
          willChange: 'auto', // Only change when needed
          WebkitOverflowScrolling: 'touch',
          transform: 'translateZ(0)',
          backgroundColor: isDark ? '#000000' : 'transparent',
          contain: 'layout style paint', // CSS containment for better performance
        }}
      >
      {/* Splash Cursor - used for both themes */}
      <SplashCursor />
      
      {/* Background: stars for night, soft blue sky with sun glow for day */}
      {isDark ? (
        <div 
          className="fixed inset-0 w-full h-full z-0 bg-black stars-background"
          style={{
            willChange: 'auto',
            transform: 'translateZ(0)',
            contain: 'layout style paint'
          }}
        />
      ) : (
        <div 
          className="fixed inset-0 z-0 day-sky-background"
          style={{
            willChange: 'auto',
            transform: 'translateZ(0)',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0
          }}
        />
      )}

      {/* Text - MUVELO - Stops at image end line */}
      <motion.div
        className="fixed top-12 sm:top-16 md:top-20 left-1/2 z-20 pointer-events-none"
        style={{
          ...textStyle,
          width: '100vw',
          overflow: 'visible',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          boxSizing: 'border-box'
        }}
      >
        <motion.h1 
          className="muvelo-text-gradient font-bold "
          style={{
            fontSize: textFontSize,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '0.03em',
            fontWeight: 700,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            willChange: isPhone ? 'transform, font-size' : 'transform', // Reduce willChange on desktop
            WebkitTextFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            backgroundImage: muveloGradient,
            display: 'block',
            textAlign: 'center',
            margin: '0 auto',
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            transform: 'translateZ(0)', // Force GPU acceleration
            isolation: 'isolate', // Create stacking context
          }}
        >
          MUVELO
        </motion.h1>
      </motion.div>

      {/* Hero Image - Moves up on scroll, with gradient fade at bottom */}
      <motion.div
        ref={imageRef}
        className="absolute left-0 w-full"
        style={{
          ...imageStyle,
          zIndex: 10
        }}
      >
        {/* Gradient fade overlay at bottom of image - responsive */}
        <div
          className="absolute bottom-0 left-0 w-full h-24 sm:h-32 md:h-40 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.9) 100%)',
            willChange: 'auto',
            transform: 'translateZ(0)'
          }}
        />
        
        <img
          src={heroImageUrl}
          alt="Hero"
          className="w-full h-auto"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            willChange: 'transform',
            cursor: 'default',
            pointerEvents: 'auto',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            imageRendering: 'auto',
            contain: 'layout style paint', // CSS containment
          }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onError={(e) => {
            // Fallback to local image if Cloudinary fails
            if (isPhone) {
              e.target.src = isDark ? "/heroimg_phone.png" : "/heroimg_day_phone.png";
            } else {
              e.target.src = isDark ? "/heroimg.png" : "/heroimg_day.png";
            }
          }}
        />
      </motion.div>

      {/* Minimal spacer - just enough for smooth transition - responsive */}
      <div className="relative z-0" style={{ height: isPhone ? '10vh' : '15vh', pointerEvents: 'none' }} />
    </div>
    </>
  );
}

export default Hero;

