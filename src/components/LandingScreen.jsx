import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const LandingScreen = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      width: '100%',
      transition: {
        duration: 4.5, // slightly longer, very smooth
        ease: 'linear', // perfectly continuous, no pause/play feeling
      },
    });
  }, [controls]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-7 px-6">
        {/* MUVELO text with reveal mask tied to loader */}
        <div className="relative">
          {/* Base text (subtle, unrevealed) */}
          <div className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[0.35em] text-neutral-600/35 uppercase">
            MUVELO
          </div>

          {/* Revealed text that grows with the loader */}
          <motion.div
            initial={{ width: '0%' }}
            animate={controls}
            className="absolute inset-y-0 left-0 overflow-hidden"
          >
            <div className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[0.35em] text-neutral-100 uppercase">
              MUVELO
            </div>
          </motion.div>
        </div>

        {/* Loader line in perfect sync with text reveal */}
        <div className="w-64 sm:w-80 md:w-96 h-[3px] sm:h-[4px] bg-neutral-700/70 rounded-full overflow-hidden mt-3">
          <motion.div
            initial={{ width: '0%' }}
            animate={controls}
            className="h-full bg-gradient-to-r from-white via-white/90 to-white/40 shadow-[0_0_22px_rgba(255,255,255,0.75)]"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;


