import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Lamp data - each lamp has off and on image variants
// Using direct image paths from public folder
const LAMPS = [
  {
    id: 1,
    imageOff: '/lamp1-off.png',
    imageOn: '/lamp1.png',
  },
  {
    id: 2,
    imageOff: '/lamp2-off.png',
    imageOn: '/lamp2.png',
  },
  {
    id: 3,
    imageOff: '/lamp3-off.png',
    imageOn: '/lamp3.png',
  },
];

const Lamp3DImages = ({ theme = 'dark' }) => {
  // Commented out hover/touch on/off logic - will use later
  // const [isHovered, setIsHovered] = useState(false);
  // const [isTouched, setIsTouched] = useState(false);
  const [lampIndex, setLampIndex] = useState(0);
  const isDark = theme === 'dark';

  // Cycle through lamps every 2 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLampIndex((prev) => (prev + 1) % LAMPS.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  // Get current lamp image (only "on" images for now)
  const currentLamp = LAMPS[lampIndex];
  const imageOn = currentLamp.imageOn;

  // Commented out hover/touch on/off logic - will use later
  // const imageOff = currentLamp.imageOff;
  // const isLampOn = isHovered || isTouched;

  // Floating animation - elegant up/down movement with smooth easing
  const floatingAnimation = {
    y: [0, -25, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1], // Smooth ease-in-out curve
    },
  };

  // Commented out hover/touch handlers - will use later
  // const handleTouchStart = (e) => {
  //   e.preventDefault();
  //   setIsTouched((prev) => !prev);
  // };
  // const handleClick = () => {
  //   setIsTouched((prev) => !prev);
  // };

  return (
    <div className="w-full h-full relative flex items-center justify-center touch-manipulation">
      <motion.div
        className="relative flex items-center justify-center"
        animate={floatingAnimation}
        style={{
          width: '85%',
          height: '85%',
          maxWidth: '85%',
          maxHeight: '85%',
        }}
      >
        {/* Image Container - showing only "on" images that cycle every 2 seconds */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Lamp image (on) - cycles every 2 seconds */}
          <motion.img
            key={lampIndex}
            src={imageOn}
            alt="Lamp"
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
            }}
          />
        </div>

        {/* Commented out hover/touch handlers - will use later */}
        {/* onMouseEnter={() => setIsHovered(true)} */}
        {/* onMouseLeave={() => setIsHovered(false)} */}
        {/* onTouchStart={handleTouchStart} */}
        {/* onClick={handleClick} */}

        {/* Commented out glow effect - will use later */}
        {/* {isLampOn && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255, 248, 225, 0.2) 0%, transparent 70%)',
              filter: 'blur(25px)',
              zIndex: -1,
            }}
          />
        )} */}
      </motion.div>
    </div>
  );
};

export default Lamp3DImages;

