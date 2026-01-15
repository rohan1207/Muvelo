import { useRef, useMemo } from 'react';
import SplashCursor from './SplashCursor';
import { useScroll, useTransform, motion } from 'framer-motion';
import { getCloudinaryImageUrl } from '../utils/cloudinary';

function Hero({ theme = 'dark' }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const isDark = theme === 'dark';

  // Sync Framer Motion scroll with Lenis - optimized
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
    layoutEffect: false,
    // Optimize scroll tracking
    axis: 'y'
  });

  // Image: moves up on scroll until it fits in screen (reaches top)
  const imageY = useTransform(scrollYProgress, [0, 1], ['-30vh', '-50vh'], {
    clamp: false
  });
  
  // Text: stays at top initially, then moves to just below image end line and STOPS
  const textY = useTransform(
    scrollYProgress, 
    [0, 0.7, 0.8, 1], 
    ['0px', '100vh', '100vh', '100vh'],
    { clamp: false }
  );
  
  const textFontSize = useTransform(
    scrollYProgress, 
    [0, 0.7, 1], 
    ['clamp(3.5rem, 8vw, 6rem)', 'clamp(4rem, 15vw, 12rem)', 'clamp(4rem, 15vw, 12rem)'],
    { clamp: false }
  );

  // Memoize styles to prevent re-renders
  const imageStyle = useMemo(() => ({
    top: '50vh',
    y: imageY,
    willChange: 'transform',
    cursor: 'default',
    pointerEvents: 'auto',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden'
  }), [imageY]);

  const textStyle = useMemo(() => ({
    y: textY,
    x: '-50%',
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden'
  }), [textY]);

  // Vibrant gradient for MUVELO text - same for both themes
  const muveloGradient = 'linear-gradient(90deg, #f97316, #fb7185, #eab308)';

  // Cloudinary URLs for hero images - high quality, fast loading
  const heroImageUrl = useMemo(() => {
    return isDark
      ? getCloudinaryImageUrl('heroimg', {
          quality: 'auto:good', // High quality (90-95%)
          format: 'auto', // Auto WebP/AVIF
          width: 1920, // Max width for HD
          crop: 'scale', // Scale proportionally
        })
      : getCloudinaryImageUrl('heroimg_day', {
          quality: 'auto:good', // High quality (90-95%)
          format: 'auto', // Auto WebP/AVIF
          width: 1920, // Max width for HD
          crop: 'scale', // Scale proportionally
        });
  }, [isDark]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full overflow-x-hidden"
      style={{
        minHeight: '150vh', // Just enough for scroll animation to complete
        willChange: 'scroll-position',
        WebkitOverflowScrolling: 'touch',
        transform: 'translateZ(0)',
        backgroundColor: isDark ? '#000000' : 'transparent'
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
        className="fixed top-20 left-1/2 z-20 pointer-events-none"
        style={{
          ...textStyle,
          width: '100vw',
          overflow: 'visible',
          paddingLeft: '2rem',
          paddingRight: '2rem',
          boxSizing: 'border-box'
        }}
      >
        <motion.h1 
          className="muvelo-text-gradient font-bold"
          style={{
            fontSize: textFontSize,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '0.05em',
            fontWeight: 700,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            willChange: 'transform, font-size, background-position',
            WebkitTextFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            backgroundImage: muveloGradient,
            display: 'block',
            textAlign: 'center',
            margin: '0 auto'
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
        {/* Gradient fade overlay at bottom of image */}
        <div
          className="absolute bottom-0 left-0 w-full h-40 z-10 pointer-events-none"
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
            imageRendering: 'auto'
          }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onError={(e) => {
            // Fallback to local image if Cloudinary fails
            e.target.src = isDark ? "/heroimg.png" : "/heroimg_day.png";
          }}
        />
      </motion.div>

      {/* Minimal spacer - just enough for smooth transition */}
      <div className="relative z-0" style={{ height: '20vh', pointerEvents: 'none' }} />
    </div>
  );
}

export default Hero;

