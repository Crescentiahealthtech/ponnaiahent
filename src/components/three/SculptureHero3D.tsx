import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function SculptureHero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Centerpiece: Apple-style Dichroic Glass & Brushed Titanium Torus Knot Sculpture
    const knotGeo = new THREE.TorusKnotGeometry(1.35, 0.34, 220, 48, 2, 3);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#1E293B'),
      metalness: 0.78,
      roughness: 0.14,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 1.0,
      iridescence: 0.65,
      iridescenceIOR: 1.4,
    });
    const sculptureMesh = new THREE.Mesh(knotGeo, knotMat);
    rootGroup.add(sculptureMesh);

    // 2. Outer Acoustic Harmonic Ring (ENT Precision)
    const ringGeo = new THREE.TorusGeometry(2.35, 0.025, 32, 180);
    const ringMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#06B6D4'),
      emissive: new THREE.Color('#06B6D4'),
      emissiveIntensity: 0.45,
      metalness: 0.9,
      roughness: 0.1,
    });
    const acousticRing = new THREE.Mesh(ringGeo, ringMat);
    acousticRing.rotation.x = Math.PI / 2.8;
    rootGroup.add(acousticRing);

    // 3. Secondary Orbital Ring (IVF Life Axis - Rosso Corsa subtle rim)
    const secondaryRingGeo = new THREE.TorusGeometry(2.68, 0.014, 24, 180);
    const secondaryRingMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#DA291C'),
      emissive: new THREE.Color('#DA291C'),
      emissiveIntensity: 0.55,
      metalness: 0.8,
      roughness: 0.2,
    });
    const secondaryRing = new THREE.Mesh(secondaryRingGeo, secondaryRingMat);
    secondaryRing.rotation.y = Math.PI / 3.2;
    secondaryRing.rotation.x = -Math.PI / 4;
    rootGroup.add(secondaryRing);

    // 4. Floating Cellular / Acoustic Micro-Nodes
    const particleCount = 120;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.1 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.035,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particles);

    // Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(5, 6, 5);
    scene.add(keyLight);

    const cyanRimLight = new THREE.PointLight(0x06b6d4, 6.5, 14);
    cyanRimLight.position.set(-4, 2, 3);
    scene.add(cyanRimLight);

    const rossoRimLight = new THREE.PointLight(0xda291c, 4.5, 14);
    rossoRimLight.position.set(4, -3, 2);
    scene.add(rossoRimLight);

    // Interaction State
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth rotation + scroll velocity coupling
      const scrollFactor = scrollY * 0.0018;
      sculptureMesh.rotation.y = elapsed * 0.28 + scrollFactor;
      sculptureMesh.rotation.x = elapsed * 0.16 + scrollFactor * 0.5;

      acousticRing.rotation.z = -elapsed * 0.22;
      secondaryRing.rotation.z = elapsed * 0.18;
      particles.rotation.y = elapsed * 0.06;

      // Subtle mouse parallax
      rootGroup.rotation.y += (mouseX * 0.35 - rootGroup.rotation.y) * 0.05;
      rootGroup.rotation.x += (mouseY * 0.25 - rootGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[520px] lg:h-[680px] select-none">
      <div ref={mountRef} className="w-full h-full" />
      {/* Subtle Telemetry Overlay Corners */}
      <div className="pointer-events-none absolute top-4 left-4 border-l border-t border-white/20 w-4 h-4" />
      <div className="pointer-events-none absolute top-4 right-4 border-r border-t border-white/20 w-4 h-4" />
      <div className="pointer-events-none absolute bottom-4 left-4 border-l border-b border-white/20 w-4 h-4" />
      <div className="pointer-events-none absolute bottom-4 right-4 border-r border-b border-white/20 w-4 h-4" />
      <div className="pointer-events-none absolute bottom-6 left-8 flex items-center gap-3 font-mono text-[11px] tracking-widest text-white/50 uppercase">
        <span className="w-2 h-2 rounded-full bg-lunar-cyan animate-pulse" />
        <span>REAL-TIME WEBGL HARMONIC & CELLULAR SCULPTURE · 60 FPS</span>
      </div>
    </div>
  );
}

