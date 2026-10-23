import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TELEMETRY_NODES, type TelemetryNode } from '../../data/clinicalData';
import { Crosshair, ArrowUpRight, Layers } from 'lucide-react';

export default function ClinicalNodeViewer() {
  const [activeNode, setActiveNode] = useState<TelemetryNode>(TELEMETRY_NODES[0]);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.3, y: -0.5 });

  useEffect(() => {
    // Compute target rotation from selected node coordinates so active node rotates toward camera
    const [nx, ny, nz] = activeNode.coordinates;
    const angleY = -Math.atan2(nx, nz);
    const angleX = Math.atan2(ny, Math.sqrt(nx * nx + nz * nz)) * 0.65;
    targetRotationRef.current = { x: angleX, y: angleY };
  }, [activeNode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const rigGroup = new THREE.Group();
    scene.add(rigGroup);

    // 1. Central Crystalline Architectural Core (Non-Gory Clinical Precision Matrix)
    const coreGeo = new THREE.IcosahedronGeometry(1.35, 2);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#181818'),
      metalness: 0.85,
      roughness: 0.18,
      wireframe: false,
      clearcoat: 1.0,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rigGroup.add(coreMesh);

    // Subtle Wireframe Lattice Overlay
    const latticeGeo = new THREE.IcosahedronGeometry(1.38, 2);
    const latticeMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#38BDF8'),
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const latticeMesh = new THREE.Mesh(latticeGeo, latticeMat);
    rigGroup.add(latticeMesh);

    // 2. Orbital Telemetry Rings
    const orbit1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.15, 0.01, 16, 128),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.35 })
    );
    orbit1.rotation.x = Math.PI / 3;
    rigGroup.add(orbit1);

    const orbit2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.15, 0.01, 16, 128),
      new THREE.MeshBasicMaterial({ color: 0xda291c, transparent: true, opacity: 0.35 })
    );
    orbit2.rotation.y = Math.PI / 3;
    rigGroup.add(orbit2);

    // 3. Plot the 6 Clinical Telemetry Nodes in 3D Space
    const nodeMeshes: { id: string; mesh: THREE.Mesh; halo: THREE.Mesh }[] = [];

    TELEMETRY_NODES.forEach((node) => {
      const isENT = node.division === 'OTOLARYNGOLOGY';
      const colorHex = isENT ? 0x06b6d4 : 0xda291c;

      const sphereGeo = new THREE.SphereGeometry(0.11, 24, 24);
      const sphereMat = new THREE.MeshBasicMaterial({ color: colorHex });
      const nodeMesh = new THREE.Mesh(sphereGeo, sphereMat);
      nodeMesh.position.set(...node.coordinates);

      const haloGeo = new THREE.RingGeometry(0.16, 0.22, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.position.set(...node.coordinates);
      haloMesh.lookAt(0, 0, 0);

      // Connector stem from center to node
      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...node.coordinates)];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.4,
      });
      const stem = new THREE.Line(lineGeo, lineMat);

      rigGroup.add(stem);
      rigGroup.add(nodeMesh);
      rigGroup.add(haloMesh);
      nodeMeshes.push({ id: node.id, mesh: nodeMesh, halo: haloMesh });
    });

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.8);
    dirLight.position.set(4, 5, 6);
    scene.add(dirLight);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth Quaternion-like Damping toward selected node coordinate
      rigGroup.rotation.y += (targetRotationRef.current.y - rigGroup.rotation.y) * 0.06;
      rigGroup.rotation.x += (targetRotationRef.current.x - rigGroup.rotation.x) * 0.06;

      coreMesh.rotation.y = t * 0.12;
      latticeMesh.rotation.y = -t * 0.08;

      nodeMeshes.forEach((item) => {
        const scale = 1 + Math.sin(t * 4) * 0.18;
        item.halo.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 border border-hairline-dark bg-canvas">
      {/* Left 7 Cols: Interactive 3D Node Canvas + Node Switcher Bar */}
      <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-hairline-dark flex flex-col justify-between bg-canvas-deep/50">
        <div className="flex items-center justify-between px-6 py-4 border-b border-hairline-dark">
          <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-caption text-white">
            <Crosshair className="w-4 h-4 text-lunar-cyan" />
            <span>3D CLINICAL ARCHITECTURE NODE VIEWER</span>
          </div>
          <span className="font-mono text-xs text-ink-body">
            NODE [{activeNode.code}] LOCKED
          </span>
        </div>

        {/* 3D Viewport */}
        <div ref={mountRef} className="w-full h-[380px] sm:h-[440px] relative" />

        {/* 6 Node Selector Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 border-t border-hairline-dark">
          {TELEMETRY_NODES.map((node) => {
            const isSelected = node.id === activeNode.id;
            const isENT = node.division === 'OTOLARYNGOLOGY';
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveNode(node)}
                className={`p-4 text-left border-r border-b border-hairline-dark transition-all rounded-none ${
                  isSelected
                    ? 'bg-canvas-elevated text-white'
                    : 'bg-canvas hover:bg-canvas-elevated/50 text-ink-body'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-caption mb-1">
                  <span className={isENT ? 'text-lunar-cyan' : 'text-rosso'}>
                    {node.code}
                  </span>
                  {isSelected && (
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isENT ? 'bg-lunar-cyan' : 'bg-rosso'
                      }`}
                    />
                  )}
                </div>
                <div className="text-xs font-semibold text-white line-clamp-1">
                  {node.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right 5 Cols: Ferrari-Style Spec Sheet & Telemetry Readout */}
      <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between bg-canvas">
        <div>
          <div className="flex items-center justify-between mb-6">
            <span
              className={`px-3 py-1 rounded-full font-mono text-[11px] uppercase tracking-caption ${
                activeNode.division === 'OTOLARYNGOLOGY'
                  ? 'bg-lunar-cyan/15 text-lunar-cyan'
                  : 'bg-rosso/20 text-rosso'
              }`}
            >
              {activeNode.division}
            </span>
            <span className="font-mono text-xs text-ink-body">{activeNode.code}</span>
          </div>

          <h3 className="display-lg text-white mb-2">{activeNode.title}</h3>
          <p className="text-sm font-mono uppercase tracking-caption text-ink-body mb-8">
            {activeNode.subtitle}
          </p>

          {/* Ferrari 80px Number Spec Cell */}
          <div className="py-6 border-t border-b border-hairline-dark mb-8">
            <div className="flex items-baseline gap-2">
              <span
                className="number-display"
                style={{ color: activeNode.accentHex }}
              >
                {activeNode.metricValue}
              </span>
              <span className="text-3xl font-light text-white">
                {activeNode.metricUnit}
              </span>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-caption text-ink-body mt-2">
              {activeNode.metricLabel}
            </p>
          </div>

          <p className="text-sm text-ink-body leading-relaxed mb-8">
            {activeNode.description}
          </p>

          <div className="space-y-3">
            <div className="font-mono text-[11px] uppercase tracking-caption text-white flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-lunar-cyan" />
              <span>CLINICAL PROTOCOL SPECIFICATIONS</span>
            </div>
            {activeNode.protocolSpecs.map((spec, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 py-2.5 border-b border-hairline-dark/60 text-xs text-lunar-silver"
              >
                <span className="font-mono text-ink-muted">0{idx + 1}</span>
                <span>{spec}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8">
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent('open-consultation-drawer', {
                  detail: {
                    division:
                      activeNode.division === 'OTOLARYNGOLOGY' ? 'ENT' : 'IVF',
                  },
                })
              )
            }
            className="w-full btn-outline-sharp justify-between group"
          >
            <span>BOOK {activeNode.code} SPECIALIST CONSULTATION</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

