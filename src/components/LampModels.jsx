import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Inner component that uses Three.js hooks - must be inside Canvas
const LampModelScene = ({ isHovered, onHoverChange, onModelsLoaded }) => {
  const lampRef = useRef();
  const groupRef = useRef();
  const lightRef = useRef();
  const bulbRef = useRef();
  const sunLightRef = useRef();
  const [modelIndex, setModelIndex] = useState(0);
  const modelPaths = ['/lamp_model1.glb', '/lamp_model2.glb', '/lamp_model3.glb'];
  
  // Animation state refs for smooth interpolation
  const targetPosition = useRef(new THREE.Vector3(0, 0, 0));
  const currentPosition = useRef(new THREE.Vector3(0, 0, 0));
  const targetRotation = useRef(new THREE.Euler(0, 0, 0));
  const currentRotation = useRef(new THREE.Euler(0, 0, 0));
  
  // Load GLB models - useGLTF handles loading automatically
  const gltf1 = useGLTF(modelPaths[0]);
  const gltf2 = useGLTF(modelPaths[1]);
  const gltf3 = useGLTF(modelPaths[2]);

  // Store cloned models in refs to prevent re-cloning and memory issues
  const clonedModelsRef = useRef([]);
  
  // Clone models once and store them and enhance materials
  useEffect(() => {
    if (clonedModelsRef.current.length === 0) {
      const cloned1 = gltf1.scene.clone();
      const cloned2 = gltf2.scene.clone();
      const cloned3 = gltf3.scene.clone();
      
      // Enhance materials for better lighting response
      const enhanceMaterials = (object) => {
        object.traverse((child) => {
          if (child.isMesh && child.material) {
            // Make materials more responsive to environment
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => {
                if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
                  mat.envMapIntensity = 1.2;
                  mat.needsUpdate = true;
                }
              });
            } else {
              if (child.material.isMeshStandardMaterial || child.material.isMeshPhysicalMaterial) {
                child.material.envMapIntensity = 1.2;
                child.material.needsUpdate = true;
              }
            }
          }
        });
      };
      
      enhanceMaterials(cloned1);
      enhanceMaterials(cloned2);
      enhanceMaterials(cloned3);
      
      clonedModelsRef.current = [cloned1, cloned2, cloned3];
      
      // Notify parent that models are loaded
      if (onModelsLoaded) {
        onModelsLoaded(true);
      }
    }
  }, [gltf1.scene, gltf2.scene, gltf3.scene, onModelsLoaded]);

  // Change model every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setModelIndex((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  // Get current model from stored clones
  const lampModel = clonedModelsRef.current[modelIndex];
  const modelsLoaded = clonedModelsRef.current.length > 0 && lampModel;

  // Find and store reference to the sun light from the GLB model
  useEffect(() => {
    if (!lampModel) {
      sunLightRef.current = null;
      return;
    }

    // Function to traverse the scene and find the sun light
    const findSunLight = (object) => {
      if (object.type === 'DirectionalLight' && (object.name === 'Sun' || object.name.toLowerCase().includes('sun'))) {
        return object;
      }
      
      for (const child of object.children) {
        const found = findSunLight(child);
        if (found) return found;
      }
      
      return null;
    };

    const sunLight = findSunLight(lampModel);
    if (sunLight) {
      sunLightRef.current = sunLight;
      // Store original intensity to restore it later if needed
      if (!sunLight.userData.originalIntensity) {
        sunLight.userData.originalIntensity = sunLight.intensity;
      }
    } else {
      sunLightRef.current = null;
    }
  }, [lampModel, modelIndex]);

  // Control inner bulb emissive on hover
  useEffect(() => {
    if (!bulbRef.current) return;

    const material = bulbRef.current.material;
    if (!material) return;

    if (isHovered) {
      // Lamp ON – warm, soft light
      material.emissive = new THREE.Color('#fff4d0');
      material.emissiveIntensity = 2.3;
    } else {
      // Lamp OFF
      material.emissiveIntensity = 0;
    }

    material.needsUpdate = true;
  }, [isHovered]);

  // Control sun light intensity - instant on/off
  useEffect(() => {
    if (sunLightRef.current) {
      // Instant on/off - no lerp, just toggle
      sunLightRef.current.intensity = isHovered 
        ? (sunLightRef.current.userData.originalIntensity || 1) 
        : 0;
    }
  }, [isHovered]);

  // Buttery smooth floating animation with optimized spring physics
  useFrame((state, delta) => {
    if (!lampRef.current || !lampModel) return;
    
    const time = state.clock.elapsedTime;
    
    // Calculate target positions and rotations with smooth sine waves
    // Reduced frequencies for smoother, more elegant movement
    targetPosition.current.set(
      Math.sin(time * 0.25) * 0.12, // Gentle horizontal drift
      Math.sin(time * 0.35) * 0.2,  // Smooth vertical float
      Math.cos(time * 0.2) * 0.08   // Subtle depth movement
    );
    
    targetRotation.current.set(
      Math.cos(time * 0.25) * 0.08,  // Reduced rotation for smoother feel
      Math.sin(time * 0.2) * 0.12,
      Math.sin(time * 0.15) * 0.06
    );
    
    // Ultra-smooth spring interpolation (buttery smooth and elegant)
    // Using exponential smoothing for frame-rate independent smooth movement
    const smoothing = 0.08; // Even smoother (lower = smoother)
    const lerpFactor = 1 - Math.exp(-smoothing * delta * 60); // Frame-rate independent
    
    // Smooth position interpolation with exponential smoothing
    currentPosition.current.lerp(targetPosition.current, lerpFactor);
    lampRef.current.position.lerp(currentPosition.current, 1);
    
    // Smooth rotation interpolation with exponential smoothing
    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * lerpFactor;
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * lerpFactor;
    currentRotation.current.z += (targetRotation.current.z - currentRotation.current.z) * lerpFactor;
    
    lampRef.current.rotation.copy(currentRotation.current);
    
    // Smooth light intensity transition - more dramatic on hover
    if (lightRef.current) {
      const targetIntensity = isHovered ? 2.5 : 0.2;
      const intensityDiff = targetIntensity - lightRef.current.intensity;
      lightRef.current.intensity += intensityDiff * Math.min(delta * 5, 1);
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerEnter={() => onHoverChange(true)}
      onPointerLeave={() => onHoverChange(false)}
    >
      <group ref={lampRef} position={[0, 0, 0]}>
        {/* GLB Model - Bigger scale for more presence */}
        {lampModel && (
          <primitive 
            key={`lamp-model-${modelIndex}`}
            object={lampModel} 
            scale={2.6}
          />
        )}

        {/* Inner bulb geometry that glows on hover - only show when models are loaded */}
        {modelsLoaded && (
          <mesh ref={bulbRef} position={[0, 0.4, 0]}>
            <sphereGeometry args={[0.12, 24, 24]} />
            <meshStandardMaterial
              color="#fff4d0"
              emissive="#000000"
              emissiveIntensity={0}
              roughness={0.25}
              metalness={0}
            />
          </mesh>
        )}

        {/* Point light - Dimmer by default, brighter on hover */}
        <pointLight
          ref={lightRef}
          position={[0, 1, 0]}
          intensity={isHovered ? 2.5 : 0.2}
          color="#fff8e1"
          distance={isHovered ? 12 : 6}
          decay={isHovered ? 1.2 : 2}
        />
        
        {/* Additional dramatic glow lights when hovered */}
        {isHovered && (
          <>
            <pointLight
              position={[0, 1, 0]}
              intensity={2.0}
              color="#fff8e1"
              distance={14}
              decay={1.0}
            />
            <pointLight
              position={[0, 1.2, 0]}
              intensity={1.5}
              color="#fff8e1"
              distance={18}
              decay={0.8}
            />
            <pointLight
              position={[0, 0.8, 0]}
              intensity={1.2}
              color="#fff8e1"
              distance={16}
              decay={1.0}
            />
            <hemisphereLight
              skyColor={0xfff8e1}
              groundColor={0x000000}
              intensity={0.4}
            />
          </>
        )}
      </group>
    </group>
  );
};

// Main wrapper component with Canvas
const LampModels = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  // Track page visibility to pause rendering when tab is hidden
  const [isPageVisible, setIsPageVisible] = useState(true);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    // Initialize state
    handleVisibilityChange();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const maxDpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 1.5);

  return (
    <div 
      className="w-full h-screen relative"
      style={{
        willChange: 'auto',
        transform: 'translateZ(0)',
        zIndex: 15,
        position: 'relative'
      }}
    >
      {/* Loading placeholder image - shows while models are loading */}
      {!modelsLoaded && (
        <div 
          className="absolute inset-0 flex items-center justify-center z-20"
          style={{
            background: 'transparent',
            pointerEvents: 'none'
          }}
        >
          <img
            src="/wcu.png"
            alt="Loading lamp"
            className="w-auto h-auto max-w-[80%] max-h-[80%] object-contain opacity-90"
            style={{
              animation: 'fadeIn 0.5s ease-in'
            }}
          />
        </div>
      )}
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ 
          background: 'transparent',
          zIndex: 15,
          position: 'relative'
        }}
        dpr={[1, maxDpr]}
        performance={{ min: 0.8 }}
        // Pause the internal render loop when page is not visible
        frameloop={isPageVisible ? 'always' : 'never'}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          // Optimize for smooth rendering
          preserveDrawingBuffer: false,
          logarithmicDepthBuffer: false,
          // Faster loading
          precision: 'mediump',
          failIfMajorPerformanceCaveat: false
        }}
        // Handle WebGL context loss on the Three.js canvas to avoid permanent white screens
        onCreated={(state) => {
          const canvas = state.gl && state.gl.domElement;
          if (!canvas) return;

          const handleContextLost = (event) => {
            console.warn('WebGL context lost for LampModels Canvas, reloading page to recover.');
            event.preventDefault();
            window.location.reload();
          };

          canvas.addEventListener('webglcontextlost', handleContextLost, false);
        }}
      >
        {/* Studio/Interior Environment - Not too bright, but better than dull */}
        <Suspense fallback={null}>
          <Environment
            preset="studio"
            environmentIntensity={0.6}
            background={false}
            blur={0.5}
          />
        </Suspense>

        {/* Enhanced Lighting Setup - Dimmer by default, brighter on hover */}
        <ambientLight intensity={isHovered ? 1.0 : 0.4} color="#ffffff" />
        
        {/* Main key light - soft and warm */}
        <directionalLight 
          position={[5, 8, 5]} 
          intensity={isHovered ? 1.8 : 0.5} 
          color="#fff8e1"
          castShadow={false}
        />
        
        {/* Fill light - opposite side */}
        <directionalLight 
          position={[-5, 4, -3]} 
          intensity={isHovered ? 1.0 : 0.3} 
          color="#ffffff"
          castShadow={false}
        />
        
        {/* Rim light for definition */}
        <directionalLight 
          position={[-3, 2, -5]} 
          intensity={isHovered ? 0.8 : 0.2} 
          color="#fff8e1"
          castShadow={false}
        />
        
        {/* Additional ambient for depth */}
        <hemisphereLight
          skyColor="#ffffff"
          groundColor="#4a4a4a"
          intensity={isHovered ? 0.7 : 0.3}
        />
        
        {/* Soft point lights for warmth */}
        <pointLight 
          position={[3, 3, 3]} 
          intensity={isHovered ? 1.2 : 0.4} 
          color="#fff8e1"
          distance={isHovered ? 12 : 8}
          decay={isHovered ? 1.5 : 2}
        />
        <pointLight 
          position={[-3, 2, -2]} 
          intensity={isHovered ? 0.8 : 0.25} 
          color="#ffffff"
          distance={isHovered ? 10 : 6}
          decay={isHovered ? 1.5 : 2}
        />
        
        <Suspense fallback={null}>
          <LampModelScene 
            isHovered={isHovered} 
            onHoverChange={setIsHovered}
            onModelsLoaded={setModelsLoaded}
          />
        </Suspense>
        
        {/* Subtle contact shadow for grounding */}
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.3}
          scale={10}
          blur={2}
          far={4}
        />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};

// Aggressively preload models for instant display - called at module level for immediate execution
if (typeof window !== 'undefined') {
  // Preload models immediately when module loads
  useGLTF.preload('/lamp_model1.glb');
  useGLTF.preload('/lamp_model2.glb');
  useGLTF.preload('/lamp_model3.glb');
}

export default LampModels;
