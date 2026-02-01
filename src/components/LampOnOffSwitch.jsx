import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LampOnOffSwitch = () => {
  const [isInView, setIsInView] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const containerRef = useRef(null);
  const offImageRef = useRef(null);
  const onImageRef = useRef(null);

  // Preload images to prevent flash
  useEffect(() => {
    const offImg = new Image();
    const onImg = new Image();
    
    let loadedCount = 0;
    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount === 2) {
        setImagesLoaded(true);
      }
    };

    offImg.onload = checkLoaded;
    onImg.onload = checkLoaded;
    
    offImg.src = '/lamp_on_hand_off.png';
    onImg.src = '/lamp_on_hand_on.png';
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Switch to ON when in view, OFF when out of view
          setIsInView(entry.isIntersecting);
        });
      },
      {
        threshold: 0.7, // Trigger when 30% of component is visible
        rootMargin: '0px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Force 3:4 aspect on phones, 16:9 on larger screens */}
      <style>{`
        @media (max-width: 640px) {
          .lamp-onoff-3-4 {
            height: auto !important;
            aspect-ratio: 3/4 !important; /* width : height = 3 : 4 */
          }
        }
        @media (min-width: 641px) {
          .lamp-onoff-3-4 {
            aspect-ratio: 16/9 !important; /* standard wide aspect for desktop/tablet */
          }
        }
      `}</style>
      <div
        ref={containerRef}
        className="lamp-onoff-3-4 w-full relative overflow-hidden bg-black"
      >
      {/* Off Image - Always rendered, opacity controlled */}
      <img
        ref={offImageRef}
        src="/lamp_on_hand_off.png"
        alt="Lamp Off"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: imagesLoaded ? (isInView ? 0 : 1) : 1,
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      
      {/* On Image - Always rendered, opacity controlled */}
      <img
        ref={onImageRef}
        src="/lamp_on_hand_on.png"
        alt="Lamp On"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: imagesLoaded ? (isInView ? 1 : 0) : 0,
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {/* Text + CTA overlay - Right side (phone-friendly) */}
      <div className="absolute inset-0 z-10 flex items-end sm:items-center justify-end pointer-events-none">
        <div className="w-full sm:w-auto max-w-[90%] sm:max-w-[520px] md:max-w-[620px] lg:max-w-[720px] xl:max-w-[780px] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pb-4 sm:pb-0 text-left sm:text-right ml-1 pointer-events-auto">
          {/* Title with MUVELO-style moving glow */}
          <motion.h2
            className="font-semibold tracking-tight mb-2 sm:mb-3 md:mb-4"
            initial={{ opacity: 0.9 }}
            animate={{ 
              opacity: [0.9, 1, 0.9],
              x: [0, 4, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              fontSize: 'clamp(1.4rem, 2.6vw, 2.6rem)', // slightly smaller on desktop
              color: '#F9FAFB',
              textShadow: '0 0 18px rgba(248, 250, 252, 0.6), 0 0 36px rgba(250, 250, 250, 0.35)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Hold the glow
          </motion.h2>

          {/* Sub title */}
          <p
            className="text-[11px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-medium tracking-[0.18em] uppercase mb-3 sm:mb-4 md:mb-5"
            style={{
              color: 'rgba(243,244,246,0.9)',
              textShadow: '0 2px 8px rgba(0,0,0,0.45)',
            }}
          >
            Portable. Minimal. Emotionally warm.
          </p>

          {/* Body copy - compact on phone, full on larger screens */}
          <p
            className="text-[11px] leading-relaxed mb-3 max-w-md sm:hidden"
            style={{
              color: 'rgba(229,231,235,0.9)',
              textShadow: '0 2px 8px rgba(0,0,0,0.45)',
            }}
          >
            Made to glow wherever life takes you.
          </p>

          {/* Body copy - tablet / desktop */}
          <p
            className="hidden sm:block text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl leading-relaxed mb-4 sm:mb-6 md:mb-8 max-w-md sm:max-w-md md:max-w-md lg:max-w-xl"
            style={{
              color: 'rgba(229,231,235,0.9)',
              textShadow: '0 2px 8px rgba(0,0,0,0.45)',
            }}
          >
            Made to glow wherever life takes you. <br />This isn&rsquo;t just a lamp.
            It&rsquo;s MUVELO &mdash; Designed to Move.
          </p>

          {/* CTA */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full px-5 sm:px-8 md:px-10 lg:px-12 py-2 sm:py-3 md:py-4
                       text-[11px] sm:text-xs md:text-sm lg:text-base font-semibold tracking-[0.18em] uppercase
                       bg-white/95 text-black hover:bg-white active:bg-gray-200
                       transition-all duration-300 shadow-lg shadow-black/40 hover:shadow-black/60
                       hover:scale-105 active:scale-95"
          >
            Explore
          </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default LampOnOffSwitch;

