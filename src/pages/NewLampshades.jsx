import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import { useTheme } from '../contexts/ThemeContext';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ThemeToggle from '../components/ThemeToggle';
import { WebGLErrorBoundary } from '../components/WebGLErrorBoundary';

const LAMP_SCROLL_DELTA_TOTAL = 1000;

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
      if (prev >= 1 && delta > 0) {
        e.preventDefault();
        window.scrollBy({ top: delta, behavior: 'auto' });
        return;
      }
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

const PHASE1_END = 1 / 3;
const PHASE2_END = 2 / 3;
const MAX_SEPARATION = 0.4;
const MAX_LEFT_RIGHT = 0.4;
const PHASE3_Y = 0.4;

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

function NewLampshades() {
  const { theme, toggleTheme } = useTheme();
  const { progress: lampProgress, containerRef: lampContainerRef } = useWheelControlledProgress();
  const [canvasReady, setCanvasReady] = useState(false);
  const sectionRef = useRef(null);
  const isDark = theme === 'dark';

  // Lazy-mount Canvas only when lamp section is in view to avoid WebGL context limit/loss
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCanvasReady(true);
      },
      { threshold: 0.1, rootMargin: '0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pageBg = isDark
    ? 'bg-gradient-to-b from-black via-[#050505] to-black text-white'
    : 'bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6] text-[#1a1a1a]';
  const muted = isDark ? 'text-gray-300' : 'text-[#6B6B6B]';

  return (
    <div className={`min-h-screen flex flex-col ${pageBg}`}>
      <NavBar theme={theme} />
      <ThemeToggle theme={theme} onToggleTheme={toggleTheme} />

      {/* Section 1: Full-height hero – title, description, note */}
      <section
        className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 pt-20 pb-12"
        style={{ minHeight: '100dvh' }}
      >
        <div className="max-w-2xl mx-auto w-full space-y-6 sm:space-y-8">
          <p className={`text-[10px] sm:text-xs tracking-[0.18em] uppercase ${muted}`}>
            Lampshades Only
          </p>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
            Interchangeable <span className="text-red-600">Lampshades</span>
          </h1>
          <p className={`text-sm sm:text-base md:text-lg leading-relaxed ${muted} max-w-xl`}>
            Mix and match lampshades to customize your lighting. Each lampshade is designed to work with specific systems—choose the one that fits your lamp.
          </p>
          <div
            className={`p-5 sm:p-6 rounded-2xl border-2 ${
              isDark ? 'bg-red-500/10 border-red-500/30' : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
              <div className="space-y-1">
                <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                  System Not Included
                </p>
                <p className={`text-xs sm:text-sm ${muted}`}>
                  Lampshades are sold separately. You must purchase a compatible system (Bullet System or CoreMount System) separately to use these lampshades.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Lamp – intact by default, then scroll 1–3 drives animation, then labels */}
      <section
        ref={(el) => {
          sectionRef.current = el;
          lampContainerRef(el);
        }}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20"
        style={{ minHeight: '100dvh', overscrollBehavior: 'contain' }}
      >
        <div className="w-full max-w-4xl mx-auto relative">
          {/* 3D canvas – lazy-mounted when section in view; fallback if WebGL fails */}
          <div className="w-full h-[420px] sm:h-[480px] md:h-[520px] lg:h-[580px] rounded-xl overflow-hidden bg-[#F7F3EC]">
            {canvasReady ? (
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
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#6B6B6B] text-sm">
                Scroll to explore
              </div>
            )}
          </div>

          {/* Labels with arrows – visible when progress >= 1 */}
          <AnimatePresence>
            {lampProgress >= 1 && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="absolute left-0 sm:left-4 top-[18%] sm:top-[22%] flex items-center gap-2 max-w-[200px] sm:max-w-[240px]"
                >
                  <span className="text-red-600 flex-shrink-0" aria-hidden>
                    ←
                  </span>
                  <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                    Changeable lampshades
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="absolute right-0 sm:right-4 bottom-[18%] sm:bottom-[22%] flex items-center gap-2 max-w-[200px] sm:max-w-[260px] text-right"
                >
                  <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                    This is the system — purchase separately
                  </p>
                  <span className="text-red-600 flex-shrink-0" aria-hidden>
                    →
                  </span>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Spacer so user can scroll after animation */}
      <section className="min-h-[40vh]" aria-hidden />

      <Footer theme={theme} />
    </div>
  );
}

export default NewLampshades;
