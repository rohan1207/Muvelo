import { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import { useTheme } from '../contexts/ThemeContext';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ThemeToggle from '../components/ThemeToggle';
import LampshadeCard from '../components/LampshadeCard';
import SystemSelector from '../components/SystemSelector';
import SystemAddToCart from '../components/SystemAddToCart';
import { WebGLErrorBoundary } from '../components/WebGLErrorBoundary';
import lampshadesData from '../data/lampshades.json';

// First ~2 scrolls: drive lamp up/down only (page does not scroll). After that: normal page scroll.
const LAMP_SCROLL_DELTA_TOTAL = 1200; // total wheel delta to go 0→1; ~4 scrolls locked (higher = more scrolls before page scrolls)

function useWheelControlledProgress() {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const [containerEl, setContainerEl] = useState(null);
  const containerRef = useCallback((el) => setContainerEl(el), []);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    if (!containerEl) return;
    const handleWheel = (e) => {
      const delta = e.deltaY;
      const prev = progressRef.current;

      // After 3rd scroll (progress = 1): scroll down → scroll the page (even when over white bg)
      if (prev >= 1 && delta > 0) {
        e.preventDefault();
        window.scrollBy({ top: delta, behavior: 'auto' });
        return;
      }
      // At start (progress = 0): scroll up → scroll the page (even when over white bg)
      if (prev <= 0 && delta < 0) {
        e.preventDefault();
        window.scrollBy({ top: delta, behavior: 'auto' });
        return;
      }

      const step = delta / LAMP_SCROLL_DELTA_TOTAL;
      let next = prev + step;
      next = Math.min(1, Math.max(0, next));
      progressRef.current = next;
      setProgress(next);
      // Only block page scroll during 1st–3rd scroll (lamp animation)
      if (next > 0 && next < 1) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    containerEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => containerEl.removeEventListener('wheel', handleWheel);
  }, [containerEl]);

  return { progress, containerRef };
}

// 3-phase scroll: 1st = up/down, 2nd = left/right, 3rd = top down / bottom up
// Values tuned so models stay inside the white bg region (no overflow)
const PHASE1_END = 1 / 3;
const PHASE2_END = 2 / 3;
const MAX_SEPARATION = 0.4;
const MAX_LEFT_RIGHT = 0.4;
const PHASE3_Y = 0.4; // last phase: top down / bottom up – higher = more movement

function LampParts({ progress }) {
  const { scene: lampTop } = useGLTF('/lampmodelglb.glb');
  const { scene: lampBottom } = useGLTF('/lampmodelsystem.glb');
  const { progress: springProgress } = useSpring({
    progress,
    config: { mass: 1, tension: 150, friction: 20 },
  });
  const maxRotation = Math.PI * 0.6;
  const baseRotation = [Math.PI, 0, 0];
  const baseGroupRotation = [Math.PI * 0.08, Math.PI * 0.18, Math.PI * 0.08];

  const getTopPosition = (p) => {
    const phase1 = Math.min(1, p / PHASE1_END);
    const phase2 = p <= PHASE1_END ? 0 : p >= PHASE2_END ? 1 : (p - PHASE1_END) / (PHASE2_END - PHASE1_END);
    const phase3 = p < PHASE2_END ? 0 : (p - PHASE2_END) / (1 - PHASE2_END);
    return [
      -phase2 * MAX_LEFT_RIGHT,
      phase1 * MAX_SEPARATION - phase3 * PHASE3_Y,
      0,
    ];
  };

  const getBottomPosition = (p) => {
    const phase1 = Math.min(1, p / PHASE1_END);
    const phase2 = p <= PHASE1_END ? 0 : p >= PHASE2_END ? 1 : (p - PHASE1_END) / (PHASE2_END - PHASE1_END);
    const phase3 = p < PHASE2_END ? 0 : (p - PHASE2_END) / (1 - PHASE2_END);
    return [
      phase2 * MAX_LEFT_RIGHT,
      -phase1 * MAX_SEPARATION + phase3 * PHASE3_Y,
      0,
    ];
  };

  return (
    <group scale={1} rotation={baseGroupRotation}>
      <a.group
        position={springProgress.to((p) => getTopPosition(Number(p)))}
        rotation={springProgress.to((p) => [
          baseRotation[0],
          baseRotation[1] + Number(p) * maxRotation,
          baseRotation[2],
        ])}
      >
        <primitive object={lampTop} />
      </a.group>
      <a.group
        position={springProgress.to((p) => getBottomPosition(Number(p)))}
        rotation={springProgress.to((p) => [
          baseRotation[0],
          baseRotation[1] - Number(p) * maxRotation,
          baseRotation[2],
        ])}
      >
        <primitive object={lampBottom} />
      </a.group>
    </group>
  );
}

useGLTF.preload('/lampmodelglb.glb');
useGLTF.preload('/lampmodelsystem.glb');

function LampshadesOnly() {
  const { theme, toggleTheme } = useTheme();
  const [selectedLampshade, setSelectedLampshade] = useState(null);
  const [systemFilter, setSystemFilter] = useState('all'); // all | bullet | coremount
  const { progress: lampProgress, containerRef: lampContainerRef } = useWheelControlledProgress();

  const isDark = theme === 'dark';

  const filteredLampshades = useMemo(() => {
    if (systemFilter === 'all') return lampshadesData;
    return lampshadesData.filter((l) => l.system === systemFilter);
  }, [systemFilter]);

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-gradient-to-b from-black via-[#050505] to-black text-white' : 'bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6] text-[#1a1a1a]'}`}>
      <NavBar theme={theme} />
      <ThemeToggle theme={theme} onToggleTheme={toggleTheme} />

      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20"
      >
        {/* 3D Lamp – at top of page; scroll-based motion and stickiness unchanged */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mb-10 sm:mb-12 md:mb-16">
          <div
            ref={lampContainerRef}
            className="w-full h-[420px] sm:h-[480px] md:h-[520px] lg:h-[580px] rounded-lg overflow-hidden bg-[#F7F3EC]"
            style={{ overscrollBehavior: 'contain' }}
          >
            <WebGLErrorBoundary>
              <Canvas
                camera={{ position: [0, 0, 2.4], fov: 36 }}
                className="block w-full h-full"
                gl={{ preserveDrawingBuffer: false, antialias: true }}
              >
                <color attach="background" args={['#F7F3EC']} />
                <ambientLight intensity={0.7} />
                <directionalLight position={[3, 5, 3]} intensity={1.6} color="#ffffff" />
                <directionalLight position={[-3, -2, -2]} intensity={0.5} color="#ffddaa" />
                <LampParts progress={lampProgress} />
                <OrbitControls enablePan={false} enableZoom={false} />
              </Canvas>
            </WebGLErrorBoundary>
          </div>
        </section>

        {/* Hero: title, description, note, filter */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mb-8 sm:mb-10 md:mb-12">
          <div className="max-w-3xl space-y-4 sm:space-y-5 md:space-y-6">
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <p className={`text-[10px] sm:text-xs md:text-sm tracking-[0.18em] uppercase ${isDark ? 'text-gray-300' : 'text-[#6B6B6B]'}`}>
                Lampshades Only
              </p>
              <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                Interchangeable <span className="text-red-600">Lampshades</span>
              </h1>
              <p className={`max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-[#6B6B6B]'}`}>
                Mix and match lampshades to customize your lighting. Each lampshade is designed to work with specific systems—choose the one that fits your lamp.
              </p>
            </div>

            {/* Important Notice */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`p-5 rounded-2xl border-2 shadow-sm ${
                isDark 
                  ? 'bg-red-500/10 border-red-500/30' 
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  isDark ? 'text-red-400' : 'text-red-600'
                }`} />
                <div className="space-y-1">
                  <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                    System Not Included
                  </p>
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Lampshades are sold separately. You must purchase a compatible system (Bullet System or CoreMount System) separately to use these lampshades.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* System Filter */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className={`text-xs sm:text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Filter by System:
              </span>
              <div className="flex gap-2">
                {[
                  { id: 'all', label: 'All Systems' },
                  { id: 'bullet', label: 'Bullet System' },
                  { id: 'coremount', label: 'CoreMount System' },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setSystemFilter(filter.id)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-medium transition-all shadow-sm ${
                      systemFilter === filter.id
                        ? isDark
                          ? 'bg-white text-black shadow-lg'
                          : 'bg-black text-white shadow-lg'
                        : isDark
                        ? 'bg-white/10 text-gray-300 hover:bg-white/20 hover:shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products grid + cart/preview */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            {/* Left Column - Product Grid */}
            <div className="lg:col-span-8 space-y-6 lg:space-y-8">
              {/* Lampshades Grid - 3 per row on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {filteredLampshades.map((lampshade, index) => (
                  <motion.div
                    key={lampshade.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <LampshadeCard
                      lampshade={lampshade}
                      onSelect={setSelectedLampshade}
                      isSelected={selectedLampshade?.id === lampshade.id}
                      theme={theme}
                    />
                  </motion.div>
                ))}
              </div>

            </div>

            {/* Right Column - Cart & Preview (Sticky, more compact) */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* Compact Cart Card */}
                <div
                  className={`rounded-3xl border shadow-lg px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6
                    ${isDark
                      ? 'bg-black/80 border-white/10 shadow-black/60'
                      : 'bg-white border-black/5 shadow-black/10'
                    }`}
                >
                  <div className="scale-[0.95] origin-top">
                    <SystemAddToCart theme={theme} />
                  </div>
                </div>

                {/* How it will look card */}
                <div
                  className={`rounded-3xl border shadow-md px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 space-y-4
                    ${isDark
                      ? 'bg-black/70 border-white/10 shadow-black/60'
                      : 'bg-[#FAF9F6] border-black/5 shadow-black/10'
                    }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h2 className="text-sm sm:text-base md:text-lg font-semibold tracking-tight">
                        How it will look
                      </h2>
                      <p className={`text-[11px] sm:text-xs md:text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Preview your lampshade on the system before you add it.
                      </p>
                    </div>
                  </div>

                  {selectedLampshade ? (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <SystemSelector lampshade={selectedLampshade} theme={theme} />
                    </motion.div>
                  ) : (
                    <div
                      className={`mt-2 rounded-2xl border px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm
                        ${isDark
                          ? 'border-white/10 bg-black/40 text-gray-300'
                          : 'border-black/5 bg-white text-gray-600'
                        }`}
                    >
                      Select a lampshade on the left to see how it looks with your system.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.main>

      <Footer theme={theme} />
    </div>
  );
}

export default LampshadesOnly;

