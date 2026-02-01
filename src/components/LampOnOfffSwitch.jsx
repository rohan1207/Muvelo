import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { useSpring, a } from '@react-spring/three';

function usePageScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const maxScroll =
        (doc.scrollHeight || document.body.scrollHeight) - window.innerHeight;

      if (maxScroll <= 0) {
        setProgress(0);
        return;
      }

      const p = scrollTop / maxScroll;
      setProgress(Math.min(1, Math.max(0, p)));
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

function LampParts() {
  const { scene: lampTop } = useGLTF('/lampmodelglb.glb');
  const { scene: lampBottom } = useGLTF('/lampmodelsystem.glb');

  const scrollProgress = usePageScrollProgress();

  const { progress } = useSpring({
    progress: scrollProgress,
    config: { mass: 1, tension: 150, friction: 20 },
  });

  // How far top & bottom move apart vertically when fully scrolled (in scene units)
  const maxSeparation = 0;
  const maxRotation = Math.PI * 0.6;
  const baseRotation = [Math.PI, 0, 0];

  // Base group rotation to tilt the whole lamp diagonally
  // [x, y, z] → tweak x/z for forward/side tilt, y for spin
  const baseGroupRotation = [Math.PI * 0.08, Math.PI * 0.18, Math.PI * 0.08];

  return (
    <group scale={1} rotation={baseGroupRotation}>
      <a.group
        position={progress.to((p) => [0, p * maxSeparation, 0])}
        rotation={progress.to((p) => [
          baseRotation[0],
          baseRotation[1] + p * maxRotation,
          baseRotation[2],
        ])}
      >
        <primitive object={lampTop} />
      </a.group>

      <a.group
        position={progress.to((p) => [0, -p * maxSeparation, 0])}
        rotation={progress.to((p) => [
          baseRotation[0],
          baseRotation[1] - p * maxRotation,
          baseRotation[2],
        ])}
      >
        <primitive object={lampBottom} />
      </a.group>
    </group>
  );
}

export default function LampOnOfffSwitch() {
  return (
    <div className="w-full h-[420px] sm:h-[480px] md:h-[520px] lg:h-[580px]">
      {/* Camera placed straight in front of the lamp (no top‑down tilt) */}
      <Canvas camera={{ position: [0, 0, 2.4], fov: 36 }}>
        {/* Off‑white background to match the site */}
        <color attach="background" args={['#F7F3EC']} />
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[3, 5, 3]}
          intensity={1.6}
          color="#ffffff"
        />
        <directionalLight
          position={[-3, -2, -2]}
          intensity={0.5}
          color="#ffddaa"
        />

        <LampParts />

        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/lampmodel.glb');
useGLTF.preload('/lampmodelsystem.glb');

