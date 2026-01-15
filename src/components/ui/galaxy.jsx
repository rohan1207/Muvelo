import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Galaxy({
  starSpeed = 0,
  density = 3,
  hueShift = 0,
  speed = 1,
  glowIntensity = 0.25,
  saturation = 0,
  mouseRepulsion = false,
  repulsionStrength = 0.5,
  twinkleIntensity = 0.55,
  rotationSpeed = 0.05,
  transparent = true
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: transparent,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (transparent) {
      renderer.setClearColor(0x000000, 0);
    } else {
      renderer.setClearColor(0x000000, 1);
    }
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = Math.floor(1000 * density);
    const positions = new Float32Array(starsCount * 3);
    const colors = new Float32Array(starsCount * 3);
    const sizes = new Float32Array(starsCount);
    const velocities = new Float32Array(starsCount * 3);

    const color = new THREE.Color();

    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;
      
      // Position
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      // Velocity
      velocities[i3] = (Math.random() - 0.5) * speed * 0.01;
      velocities[i3 + 1] = (Math.random() - 0.5) * speed * 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * speed * 0.01;

      // Color with hue shift
      const hue = (Math.random() + hueShift / 360) % 1;
      color.setHSL(hue, saturation, 0.8 + Math.random() * 0.2);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Size
      sizes[i] = Math.random() * 0.5 + 0.1;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Shader material for glowing stars
    const starsMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        glowIntensity: { value: glowIntensity },
        twinkleIntensity: { value: twinkleIntensity }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vSize;
        uniform float time;
        uniform float twinkleIntensity;
        
        void main() {
          vColor = color;
          vSize = size;
          
          vec3 pos = position;
          // Twinkle effect
          float twinkle = 1.0 + sin(time * 2.0 + position.x * 10.0) * twinkleIntensity * 0.5;
          pos *= twinkle;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z) * twinkle;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float glowIntensity;
        varying vec3 vColor;
        varying float vSize;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          
          // Glow effect
          vec3 glow = vColor * glowIntensity;
          vec3 finalColor = mix(vColor, glow, 1.0 - distanceToCenter * 2.0);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    starsRef.current = stars;

    // Mouse tracking for repulsion
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const clock = new THREE.Clock();
    let time = 0;

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      time = clock.getElapsedTime();

      // Update shader time
      starsMaterial.uniforms.time.value = time;

      // Rotate stars
      stars.rotation.x += rotationSpeed * 0.001;
      stars.rotation.y += rotationSpeed * 0.001;

      // Update star positions with velocity
      const positions = starsGeometry.attributes.position.array;
      for (let i = 0; i < starsCount; i++) {
        const i3 = i * 3;
        
        // Apply velocity
        positions[i3] += velocities[i3] * starSpeed;
        positions[i3 + 1] += velocities[i3 + 1] * starSpeed;
        positions[i3 + 2] += velocities[i3 + 2] * starSpeed;

        // Mouse repulsion
        if (mouseRepulsion) {
          const mouseX = mouseRef.current.x * 5;
          const mouseY = mouseRef.current.y * 5;
          const dx = positions[i3] - mouseX;
          const dy = positions[i3 + 1] - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 2) {
            const force = (2 - distance) / 2 * repulsionStrength * 0.1;
            positions[i3] += (dx / distance) * force;
            positions[i3 + 1] += (dy / distance) * force;
          }
        }

        // Wrap around edges
        if (Math.abs(positions[i3]) > 5) positions[i3] = -positions[i3];
        if (Math.abs(positions[i3 + 1]) > 5) positions[i3 + 1] = -positions[i3 + 1];
        if (Math.abs(positions[i3 + 2]) > 5) positions[i3 + 2] = -positions[i3 + 2];
      }
      starsGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
    };
  }, [
    starSpeed,
    density,
    hueShift,
    speed,
    glowIntensity,
    saturation,
    mouseRepulsion,
    repulsionStrength,
    twinkleIntensity,
    rotationSpeed,
    transparent
  ]);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
}

export default Galaxy;


