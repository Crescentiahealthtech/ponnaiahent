import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.replaceChildren(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x14b8a6, 2.2); // ENT Teal
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf43f5e, 1.8); // IVF Rose
    fillLight.position.set(-5, -3, 3);
    scene.add(fillLight);

    // Main 3D Medical Helix & Biological Nodes Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Double Helix (represents genetic precision & life)
    const pointsA: THREE.Vector3[] = [];
    const pointsB: THREE.Vector3[] = [];
    const strandLength = 50;
    for (let i = 0; i <= strandLength; i++) {
      const t = (i / strandLength) * Math.PI * 4;
      const y = (i / strandLength - 0.5) * 6.5;
      const r = 1.3;
      pointsA.push(new THREE.Vector3(Math.cos(t) * r, y, Math.sin(t) * r));
      pointsB.push(new THREE.Vector3(Math.cos(t + Math.PI) * r, y, Math.sin(t + Math.PI) * r));
    }

    const curveA = new THREE.CatmullRomCurve3(pointsA);
    const curveB = new THREE.CatmullRomCurve3(pointsB);

    const tubeGeoA = new THREE.TubeGeometry(curveA, 64, 0.06, 8, false);
    const tubeGeoB = new THREE.TubeGeometry(curveB, 64, 0.06, 8, false);

    const matA = new THREE.MeshPhysicalMaterial({
      color: 0x0d9488, // ENT Teal
      roughness: 0.2,
      metalness: 0.4,
      clearcoat: 0.6,
      emissive: 0x115e59,
      emissiveIntensity: 0.2,
    });

    const matB = new THREE.MeshPhysicalMaterial({
      color: 0xe11d48, // IVF Rose
      roughness: 0.2,
      metalness: 0.4,
      clearcoat: 0.6,
      emissive: 0x9f1239,
      emissiveIntensity: 0.2,
    });

    const tubeMeshA = new THREE.Mesh(tubeGeoA, matA);
    const tubeMeshB = new THREE.Mesh(tubeGeoB, matB);
    mainGroup.add(tubeMeshA, tubeMeshB);

    // Connecting Base Pairs / Rungs
    const rungsCount = 20;
    const rungMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.3,
      metalness: 0.5,
    });
    for (let r = 0; r < rungsCount; r++) {
      const t = (r / rungsCount) * Math.PI * 4;
      const y = (r / rungsCount - 0.5) * 6.5;
      const radius = 1.3;
      const p1 = new THREE.Vector3(Math.cos(t) * radius, y, Math.sin(t) * radius);
      const p2 = new THREE.Vector3(Math.cos(t + Math.PI) * radius, y, Math.sin(t + Math.PI) * radius);

      const rungCurve = new THREE.LineCurve3(p1, p2);
      const rungGeo = new THREE.TubeGeometry(rungCurve, 4, 0.025, 6, false);
      const rungMesh = new THREE.Mesh(rungGeo, rungMat);
      mainGroup.add(rungMesh);
    }

    // Floating Cellular Spheres & Micro-vesicles
    const spheresGroup = new THREE.Group();
    mainGroup.add(spheresGroup);
    const sphereMat1 = new THREE.MeshPhysicalMaterial({
      color: 0x2dd4bf,
      transmission: 0.6,
      transparent: true,
      opacity: 0.7,
      roughness: 0.1,
    });
    const sphereMat2 = new THREE.MeshPhysicalMaterial({
      color: 0xfb7185,
      transmission: 0.6,
      transparent: true,
      opacity: 0.7,
      roughness: 0.1,
    });

    for (let s = 0; s < 16; s++) {
      const isTeal = s % 2 === 0;
      const sphGeo = new THREE.SphereGeometry(0.12 + Math.random() * 0.14, 16, 16);
      const sph = new THREE.Mesh(sphGeo, isTeal ? sphereMat1 : sphereMat2);
      const phi = Math.random() * Math.PI * 2;
      const dist = 2.2 + Math.random() * 1.5;
      sph.position.set(
        Math.cos(phi) * dist,
        (Math.random() - 0.5) * 5,
        Math.sin(phi) * dist
      );
      spheresGroup.add(sph);
    }

    // Mouse parallax tracking
    let targetRotX = 0;
    let targetRotY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.45;
      targetRotX = -y * 0.35;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let frameId = 0;
    let clock = new THREE.Clock();
    const renderLoop = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Continuous gentle rotation
      mainGroup.rotation.y += delta * 0.35;
      mainGroup.rotation.x = THREE.MathUtils.damp(mainGroup.rotation.x, targetRotX, 4, delta);
      mainGroup.rotation.z = Math.sin(elapsed * 0.5) * 0.08;

      // Bob spheres
      spheresGroup.children.forEach((sph, idx) => {
        sph.position.y += Math.sin(elapsed * 1.2 + idx) * 0.003;
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(renderLoop);
    };

    frameId = requestAnimationFrame(renderLoop);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      tubeGeoA.dispose();
      tubeGeoB.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full min-h-[380px] md:min-h-[480px] pointer-events-none" 
    />
  );
};
