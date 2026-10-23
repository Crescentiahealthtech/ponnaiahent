import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { ANATOMY_ENT_PARTS, ANATOMY_IVF_PARTS } from '../../data/hospitalData';
import { AnatomyPart } from '../../types/hospital';
import { 
  Rotate3d, 
  Layers, 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  Volume2, 
  Sparkles, 
  Crosshair, 
  ChevronRight,
  X,
  Info
} from 'lucide-react';

interface AnatomyViewer3DProps {
  initialSystem?: 'ent' | 'ivf';
  onScheduleConsultation?: (system: 'ent' | 'ivf') => void;
}

export const AnatomyViewer3D: React.FC<AnatomyViewer3DProps> = ({
  initialSystem = 'ent',
  onScheduleConsultation
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSystem, setActiveSystem] = useState<'ent' | 'ivf'>(initialSystem);
  const [selectedPart, setSelectedPart] = useState<AnatomyPart | null>(null);
  const [explodedRatio, setExplodedRatio] = useState<number>(0);
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showHud, setShowHud] = useState<boolean>(true);

  // References for Three.js lifecycle
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const entGroupRef = useRef<THREE.Group | null>(null);
  const ivfGroupRef = useRef<THREE.Group | null>(null);
  const animFrameRef = useRef<number>(0);
  const explodedTargetRef = useRef<number>(0);
  const explodedCurrentRef = useRef<number>(0);
  const cameraTargetPos = useRef<THREE.Vector3 | null>(null);
  const controlsTargetPos = useRef<THREE.Vector3 | null>(null);
  const partsMeshMap = useRef<Map<string, THREE.Object3D>>(new Map());

  // Parts list based on active system
  const currentParts = activeSystem === 'ent' ? ANATOMY_ENT_PARTS : ANATOMY_IVF_PARTS;

  // Sync state
  useEffect(() => {
    explodedTargetRef.current = explodedRatio;
  }, [explodedRatio]);

  // Handle system switch
  const handleSwitchSystem = (system: 'ent' | 'ivf') => {
    setActiveSystem(system);
    setSelectedPart(null);
    setExplodedRatio(0);
    explodedTargetRef.current = 0;
    explodedCurrentRef.current = 0;
    if (controlsRef.current && cameraRef.current) {
      cameraTargetPos.current = new THREE.Vector3(0, 1.2, 5.5);
      controlsTargetPos.current = new THREE.Vector3(0, 0, 0);
    }
  };

  // Focus on specific anatomical part
  const handleSelectPart = useCallback((part: AnatomyPart) => {
    setSelectedPart(part);
    if (cameraRef.current && controlsRef.current) {
      cameraTargetPos.current = new THREE.Vector3(...part.cameraPosition);
      controlsTargetPos.current = new THREE.Vector3(...part.targetPosition);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    // 1. Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Initialize Three.js scene (Apple Near-Black Tile 1: #161617)
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x161617);
    scene.fog = new THREE.FogExp2(0x161617, 0.04);

    // 3. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.5);
    cameraRef.current = camera;

    // 4. Modern Renderer with ACES Tone mapping & SRGB
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.replaceChildren(renderer.domElement);

    // 5. Studio Room Environment
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {
      // Fallback
    }

    // 6. Lighting: Apple Key + Rim + Contact Shadow
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x2997ff, 1.2);
    fillLight.position.set(-4, -2, -3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.4);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x161617, 0.9);
    scene.add(hemiLight);

    // Apple signature soft product shadow resting on surface
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const gradient = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
      gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.15)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = gradient;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const groundShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 6),
      new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
      })
    );
    groundShadow.rotation.x = -Math.PI / 2;
    groundShadow.position.y = -1.5;
    scene.add(groundShadow);

    // 7. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2.0;
    controls.maxDistance = 12.0;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controls.autoRotate = false;

    // -------------------------------------------------------------
    // BUILD ENT 3D MODEL: Composite 8-part auditory system
    // -------------------------------------------------------------
    const entGroup = new THREE.Group();
    entGroupRef.current = entGroup;
    scene.add(entGroup);

    // Part 1: Outer Ear Canal
    const canalCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(2.2, -0.4, 0.2),
      new THREE.Vector3(1.4, -0.1, 0.1),
      new THREE.Vector3(0.6, 0.0, 0.0),
    ]);
    const canalGeo = new THREE.TubeGeometry(canalCurve, 24, 0.38, 16, false);
    const fleshMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xec4899,
      roughness: 0.45,
      metalness: 0.1,
      clearcoat: 0.3,
      transparent: true,
      opacity: 0.85,
    });
    const canalMesh = new THREE.Mesh(canalGeo, fleshMaterial);
    entGroup.add(canalMesh);

    // Part 2: Tympanic Membrane (Eardrum)
    const eardrumGeo = new THREE.CylinderGeometry(0.55, 0.45, 0.08, 32);
    eardrumGeo.rotateZ(Math.PI / 2);
    const eardrumMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      roughness: 0.2,
      metalness: 0.1,
      transmission: 0.65,
      transparent: true,
      opacity: 0.8,
      ior: 1.4,
    });
    const eardrumMesh = new THREE.Mesh(eardrumGeo, eardrumMat);
    eardrumMesh.position.set(0.55, 0, 0);
    eardrumMesh.name = 'tympanic-membrane';
    entGroup.add(eardrumMesh);
    partsMeshMap.current.set('tympanic-membrane', eardrumMesh);

    // Part 3: Auditory Ossicles Chain (Malleus, Incus, Stapes)
    const ossiclesGroup = new THREE.Group();
    ossiclesGroup.name = 'auditory-ossicles';

    const boneMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfef3c7,
      roughness: 0.25,
      metalness: 0.05,
      clearcoat: 0.5,
    });

    // Malleus (Hammer)
    const malleusHead = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), boneMaterial);
    malleusHead.position.set(0.48, 0.28, 0);
    const malleusHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.03, 0.42, 12), boneMaterial);
    malleusHandle.position.set(0.52, 0.1, 0);
    malleusHandle.rotation.z = -0.3;
    ossiclesGroup.add(malleusHead, malleusHandle);

    // Incus (Anvil)
    const incusBody = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.22, 0.14), boneMaterial);
    incusBody.position.set(0.32, 0.3, 0);
    const incusCrus = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.03, 0.32, 12), boneMaterial);
    incusCrus.position.set(0.25, 0.14, 0);
    incusCrus.rotation.z = 0.4;
    ossiclesGroup.add(incusBody, incusCrus);

    // Stapes (Stirrup)
    const stapesArchGeo = new THREE.TorusGeometry(0.1, 0.03, 12, 24, Math.PI);
    const stapesArch = new THREE.Mesh(stapesArchGeo, boneMaterial);
    stapesArch.position.set(0.1, 0.08, 0);
    stapesArch.rotation.z = -Math.PI / 2;
    const stapesFootplate = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.03, 16), boneMaterial);
    stapesFootplate.position.set(0.02, 0.08, 0);
    stapesFootplate.rotation.z = Math.PI / 2;
    ossiclesGroup.add(stapesArch, stapesFootplate);

    entGroup.add(ossiclesGroup);
    partsMeshMap.current.set('auditory-ossicles', ossiclesGroup);

    // Part 4: Cochlea (Spiral logarithmic snail shell)
    const cochleaCurvePoints: THREE.Vector3[] = [];
    const turns = 2.6;
    const totalPoints = 120;
    for (let i = 0; i <= totalPoints; i++) {
      const t = i / totalPoints;
      const angle = t * Math.PI * 2 * turns;
      const r = (1 - t * 0.72) * 0.55;
      const x = -0.5 - Math.cos(angle) * r;
      const y = -0.05 + Math.sin(angle) * r;
      const z = -0.1 + t * 0.45;
      cochleaCurvePoints.push(new THREE.Vector3(x, y, z));
    }
    const cochleaCurve = new THREE.CatmullRomCurve3(cochleaCurvePoints);
    const cochleaGeo = new THREE.TubeGeometry(cochleaCurve, 80, 0.16, 16, false);
    const cochleaMat = new THREE.MeshPhysicalMaterial({
      color: 0x0071e3, // Apple Action Blue tone for precision sensory organ
      roughness: 0.18,
      metalness: 0.35,
      clearcoat: 0.8,
      emissive: 0x002244,
      emissiveIntensity: 0.4,
    });
    const cochleaMesh = new THREE.Mesh(cochleaGeo, cochleaMat);
    cochleaMesh.name = 'cochlea';
    entGroup.add(cochleaMesh);
    partsMeshMap.current.set('cochlea', cochleaMesh);

    // Part 5: Semicircular Canals (Vestibular balance apparatus)
    const canalsGroup = new THREE.Group();
    canalsGroup.name = 'semicircular-canals';
    const canalLoopMat = new THREE.MeshPhysicalMaterial({
      color: 0x2997ff,
      roughness: 0.2,
      metalness: 0.2,
      clearcoat: 0.6,
    });

    const superiorGeo = new THREE.TorusGeometry(0.36, 0.05, 16, 32, Math.PI * 1.5);
    const superiorMesh = new THREE.Mesh(superiorGeo, canalLoopMat);
    superiorMesh.position.set(-0.45, 0.65, 0.0);
    superiorMesh.rotation.z = 0.3;
    canalsGroup.add(superiorMesh);

    const lateralGeo = new THREE.TorusGeometry(0.32, 0.05, 16, 32, Math.PI * 1.5);
    const lateralMesh = new THREE.Mesh(lateralGeo, canalLoopMat);
    lateralMesh.position.set(-0.45, 0.4, 0.25);
    lateralMesh.rotation.x = Math.PI / 2;
    canalsGroup.add(lateralMesh);

    const posteriorGeo = new THREE.TorusGeometry(0.34, 0.05, 16, 32, Math.PI * 1.5);
    const posteriorMesh = new THREE.Mesh(posteriorGeo, canalLoopMat);
    posteriorMesh.position.set(-0.7, 0.5, -0.15);
    posteriorMesh.rotation.y = Math.PI / 2;
    canalsGroup.add(posteriorMesh);

    entGroup.add(canalsGroup);
    partsMeshMap.current.set('semicircular-canals', canalsGroup);

    // Part 6: Eustachian Tube
    const eustachianCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.3, -0.1, 0),
      new THREE.Vector3(0.65, -0.65, 0.3),
      new THREE.Vector3(1.1, -1.2, 0.5),
    ]);
    const eustachianGeo = new THREE.TubeGeometry(eustachianCurve, 20, 0.08, 12, false);
    const eustachianMat = new THREE.MeshPhysicalMaterial({
      color: 0xf43f5e,
      roughness: 0.35,
      metalness: 0.1,
      transparent: true,
      opacity: 0.75,
    });
    const eustachianMesh = new THREE.Mesh(eustachianGeo, eustachianMat);
    eustachianMesh.name = 'eustachian-tube';
    entGroup.add(eustachianMesh);
    partsMeshMap.current.set('eustachian-tube', eustachianMesh);

    // Part 7: Acoustic Nerve Trunk
    const nerveGeo = new THREE.CylinderGeometry(0.08, 0.12, 1.2, 16);
    const nerveMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      roughness: 0.4,
      emissive: 0x713f12,
      emissiveIntensity: 0.3,
    });
    const nerveMesh = new THREE.Mesh(nerveGeo, nerveMat);
    nerveMesh.position.set(-1.1, 0.15, -0.2);
    nerveMesh.rotation.z = Math.PI / 3;
    entGroup.add(nerveMesh);

    // Sound wave particles
    const soundWavesCount = 36;
    const waveGeo = new THREE.BufferGeometry();
    const wavePositions = new Float32Array(soundWavesCount * 3);
    for (let i = 0; i < soundWavesCount; i++) {
      wavePositions[i * 3] = 1.8 + Math.random() * 1.5;
      wavePositions[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
      wavePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
    }
    waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3));
    const waveMat = new THREE.PointsMaterial({
      color: 0x2997ff,
      size: 0.06,
      transparent: true,
      opacity: 0.8,
    });
    const wavePoints = new THREE.Points(waveGeo, waveMat);
    entGroup.add(wavePoints);

    // -------------------------------------------------------------
    // BUILD IVF 3D MODEL: Composite 7-part Blastocyst & ICSI Stage
    // -------------------------------------------------------------
    const ivfGroup = new THREE.Group();
    ivfGroupRef.current = ivfGroup;
    ivfGroup.visible = false;
    scene.add(ivfGroup);

    // Part 1: Zona Pellucida
    const zonaGeo = new THREE.SphereGeometry(1.4, 48, 48);
    const zonaMat = new THREE.MeshPhysicalMaterial({
      color: 0xf472b6,
      roughness: 0.15,
      metalness: 0.05,
      transmission: 0.7,
      transparent: true,
      opacity: 0.75,
      ior: 1.35,
      clearcoat: 0.8,
    });
    const zonaMesh = new THREE.Mesh(zonaGeo, zonaMat);
    zonaMesh.name = 'zona-pellucida';
    ivfGroup.add(zonaMesh);
    partsMeshMap.current.set('zona-pellucida', zonaMesh);

    // Part 2: Blastocoel Fluid Cavity
    const blastocoelGeo = new THREE.SphereGeometry(1.15, 32, 32);
    const blastocoelMat = new THREE.MeshPhysicalMaterial({
      color: 0xdbeafe,
      roughness: 0.1,
      transmission: 0.85,
      transparent: true,
      opacity: 0.45,
    });
    const blastocoelMesh = new THREE.Mesh(blastocoelGeo, blastocoelMat);
    ivfGroup.add(blastocoelMesh);

    // Part 3: Inner Cell Mass (ICM)
    const icmGroup = new THREE.Group();
    icmGroup.name = 'inner-cell-mass';
    const cellMat = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      roughness: 0.3,
      metalness: 0.1,
      clearcoat: 0.5,
      emissive: 0x78350f,
      emissiveIntensity: 0.2,
    });
    const icmOffset = new THREE.Vector3(-0.45, 0.4, 0.2);
    for (let c = 0; c < 20; c++) {
      const cellRadius = 0.16 + Math.random() * 0.08;
      const cellMesh = new THREE.Mesh(new THREE.SphereGeometry(cellRadius, 16, 16), cellMat);
      cellMesh.position.set(
        icmOffset.x + (Math.random() - 0.5) * 0.55,
        icmOffset.y + (Math.random() - 0.5) * 0.5,
        icmOffset.z + (Math.random() - 0.5) * 0.45
      );
      icmGroup.add(cellMesh);
    }
    ivfGroup.add(icmGroup);
    partsMeshMap.current.set('inner-cell-mass', icmGroup);

    // Part 4: Trophectoderm Layer
    const trophoGroup = new THREE.Group();
    trophoGroup.name = 'trophectoderm';
    const trophoMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      roughness: 0.35,
      metalness: 0.1,
    });
    const trophoCount = 55;
    for (let t = 0; t < trophoCount; t++) {
      const phi = Math.acos(-1 + (2 * t) / trophoCount);
      const theta = Math.sqrt(trophoCount * Math.PI) * phi;
      const x = Math.sin(phi) * Math.cos(theta) * 1.25;
      const y = Math.sin(phi) * Math.sin(theta) * 1.25;
      const z = Math.cos(phi) * 1.25;

      if (x < -0.2 && y > 0.2) continue;

      const tCell = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), trophoMat);
      tCell.position.set(x, y, z);
      trophoGroup.add(tCell);
    }
    ivfGroup.add(trophoGroup);
    partsMeshMap.current.set('trophectoderm', trophoGroup);

    // Part 5: ICSI Micromanipulator Glass Injection Pipette
    const icsiGroup = new THREE.Group();
    icsiGroup.name = 'icsi-micropipette';

    const pipetteCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(3.2, 1.2, 0),
      new THREE.Vector3(2.0, 0.7, 0),
      new THREE.Vector3(1.3, 0.4, 0),
    ]);
    const pipetteGeo = new THREE.TubeGeometry(pipetteCurve, 24, 0.06, 16, false);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.05,
      metalness: 0.05,
      transmission: 0.92,
      transparent: true,
      opacity: 0.8,
      ior: 1.52,
    });
    const pipetteMesh = new THREE.Mesh(pipetteGeo, glassMat);
    icsiGroup.add(pipetteMesh);

    const needleTipGeo = new THREE.ConeGeometry(0.05, 0.4, 16);
    needleTipGeo.rotateZ(Math.PI / 2.7);
    const needleTipMat = new THREE.MeshPhysicalMaterial({
      color: 0x2997ff,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.85,
    });
    const needleTipMesh = new THREE.Mesh(needleTipGeo, needleTipMat);
    needleTipMesh.position.set(1.2, 0.35, 0);
    icsiGroup.add(needleTipMesh);

    const spermHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0x2997ff, emissive: 0x004488 })
    );
    spermHead.position.set(1.15, 0.32, 0);
    const spermTailGeo = new THREE.CylinderGeometry(0.008, 0.004, 0.28, 8);
    const spermTail = new THREE.Mesh(spermTailGeo, new THREE.MeshBasicMaterial({ color: 0x2997ff }));
    spermTail.position.set(1.25, 0.36, 0);
    spermTail.rotation.z = -0.5;
    icsiGroup.add(spermHead, spermTail);

    const chuckGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.8, 16);
    chuckGeo.rotateZ(-Math.PI / 4);
    const chuckMat = new THREE.MeshStandardMaterial({ color: 0xd2d2d7, metalness: 0.9, roughness: 0.2 });
    const chuckMesh = new THREE.Mesh(chuckGeo, chuckMat);
    chuckMesh.position.set(3.4, 1.35, 0);
    icsiGroup.add(chuckMesh);

    ivfGroup.add(icsiGroup);
    partsMeshMap.current.set('icsi-micropipette', icsiGroup);

    // -------------------------------------------------------------
    // Animation & Render Loop
    // -------------------------------------------------------------
    let clock = new THREE.Clock();
    let tick = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth exploded-view spring damping
      explodedCurrentRef.current = THREE.MathUtils.damp(
        explodedCurrentRef.current,
        explodedTargetRef.current,
        6,
        delta
      );
      const exp = explodedCurrentRef.current;

      // Apply exploded displacements to ENT parts
      if (entGroupRef.current) {
        canalMesh.position.x = exp * 1.2;
        eardrumMesh.position.x = 0.55 + exp * 0.6;
        ossiclesGroup.position.x = exp * 0.3;
        ossiclesGroup.position.y = exp * 0.2;
        cochleaMesh.position.x = -exp * 0.5;
        canalsGroup.position.y = exp * 0.6;
        eustachianMesh.position.y = -exp * 0.8;
        eustachianMesh.position.x = exp * 0.5;

        const positions = waveGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < soundWavesCount; i++) {
          positions[i * 3] -= 0.8 * delta;
          if (positions[i * 3] < 0.6) {
            positions[i * 3] = 2.8 + Math.random() * 0.6;
          }
        }
        waveGeo.attributes.position.needsUpdate = true;
      }

      // Apply exploded displacements to IVF parts
      if (ivfGroupRef.current) {
        zonaMesh.scale.setScalar(1.0 + exp * 0.4);
        zonaMat.opacity = Math.max(0.2, 0.75 - exp * 0.45);
        icmGroup.position.set(-0.45 - exp * 0.8, 0.4 + exp * 0.6, 0.2);
        trophoGroup.scale.setScalar(1.0 + exp * 0.25);
        icsiGroup.position.x = (1 - exp) * 0.2;

        const pulse = Math.sin(elapsed * 1.5) * 0.015;
        blastocoelMesh.scale.setScalar(1 + pulse);
      }

      // Smooth camera transition when user clicks an anatomical part
      if (cameraTargetPos.current && controlsRef.current && cameraRef.current) {
        cameraRef.current.position.lerp(cameraTargetPos.current, 0.06);
        if (controlsTargetPos.current) {
          controlsRef.current.target.lerp(controlsTargetPos.current, 0.06);
        }
        if (cameraRef.current.position.distanceTo(cameraTargetPos.current) < 0.02) {
          cameraTargetPos.current = null;
        }
      }

      if (controlsRef.current) {
        controlsRef.current.autoRotate = autoRotate;
        controlsRef.current.autoRotateSpeed = 0.8;
        controlsRef.current.update();
      }

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      groundShadow.geometry.dispose();
      canalGeo.dispose();
      eardrumGeo.dispose();
      cochleaGeo.dispose();
    };
  }, []);

  useEffect(() => {
    if (entGroupRef.current && ivfGroupRef.current) {
      entGroupRef.current.visible = activeSystem === 'ent';
      ivfGroupRef.current.visible = activeSystem === 'ivf';
    }
  }, [activeSystem]);

  useEffect(() => {
    if (!sceneRef.current) return;
    sceneRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => (m.wireframe = wireframeMode));
        } else {
          child.material.wireframe = wireframeMode;
        }
      }
    });
  }, [wireframeMode]);

  return (
    <div className="relative w-full rounded-[28px] overflow-hidden bg-[#161617] border border-white/[0.08] apple-product-shadow">
      {/* 3D Scene Viewport Canvas */}
      <div 
        ref={containerRef} 
        className="w-full h-[540px] md:h-[640px] cursor-grab active:cursor-grabbing"
      />

      {/* TOP BAR: Clean Apple Segmented Control */}
      <div className="absolute top-5 inset-x-5 flex flex-wrap items-center justify-between gap-3 pointer-events-none z-10">
        <div className="pointer-events-auto flex items-center bg-[#000000]/70 border border-white/10 rounded-full p-1 backdrop-blur-xl shadow-lg">
          <button
            onClick={() => handleSwitchSystem('ent')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] tracking-[-0.01em] transition-all cursor-pointer ${
              activeSystem === 'ent'
                ? 'bg-[#0071e3] text-white font-medium shadow-sm'
                : 'text-[#86868b] hover:text-white'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>01. ENT Auditory System</span>
          </button>

          <button
            onClick={() => handleSwitchSystem('ivf')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] tracking-[-0.01em] transition-all cursor-pointer ${
              activeSystem === 'ivf'
                ? 'bg-[#0071e3] text-white font-medium shadow-sm'
                : 'text-[#86868b] hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>02. IVF Blastocyst</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl text-[12px] text-[#86868b]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2997ff]" />
          <span>Interactive Microscopic Anatomy Explorer</span>
        </div>
      </div>

      {/* QUICK ANATOMICAL HOTSPOT BUTTONS */}
      <div className="absolute top-18 left-5 flex flex-wrap gap-1.5 max-w-lg pointer-events-auto z-10">
        {currentParts.map((part) => {
          const isSelected = selectedPart?.id === part.id;
          return (
            <button
              key={part.id}
              onClick={() => handleSelectPart(part)}
              className={`text-[12px] px-3 py-1 rounded-full transition-all border cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-white text-[#1d1d1f] border-white font-medium shadow-sm'
                  : 'bg-black/50 text-[#a1a1a6] border-white/10 hover:border-white/30 hover:text-white backdrop-blur-md'
              }`}
            >
              <Crosshair className="w-3 h-3" />
              <span>{part.name.split(' (')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* INSPECTION SLIDE-IN PANEL (WHEN ANATOMICAL PART IS SELECTED) */}
      {selectedPart && (
        <div className="absolute top-20 right-5 max-w-sm w-[calc(100%-2.5rem)] sm:w-[340px] apple-frosted-dark border border-white/10 rounded-[22px] p-5 shadow-2xl text-white z-20 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3 mb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#2997ff] block">
                {selectedPart.category}
              </span>
              <h4 className="text-[18px] font-semibold tracking-[-0.02em] text-white mt-0.5">
                {selectedPart.name}
              </h4>
            </div>
            <button
              onClick={() => setSelectedPart(null)}
              className="text-[#86868b] hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[13px] text-[#a1a1a6] leading-[1.4] mb-3">
            {selectedPart.description}
          </p>

          <div className="bg-black/40 rounded-[14px] p-3 border border-white/5 text-[12px] mb-2.5">
            <span className="font-semibold text-white block mb-0.5">Clinical Significance:</span>
            <span className="text-[#a1a1a6]">{selectedPart.clinicalSignificance}</span>
          </div>

          <div className="bg-black/40 rounded-[14px] p-3 border border-white/5 text-[12px] mb-4">
            <span className="font-semibold text-amber-300 block mb-0.5">Common Pathology:</span>
            <span className="text-[#a1a1a6]">{selectedPart.commonPathology}</span>
          </div>

          <button
            onClick={() => onScheduleConsultation?.(activeSystem)}
            className="w-full apple-btn-primary !py-2.5 !text-[13px] !w-full"
          >
            Consult Chief Specialist on this Condition
          </button>
        </div>
      )}

      {/* APPLE VISION PRO STYLE FLOATING BOTTOM CONTROL DOCK */}
      <div 
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-[94%] max-w-2xl transition-transform duration-300 z-20 ${
          showHud ? 'translate-y-0' : 'translate-y-[calc(100%-2rem)]'
        }`}
      >
        <div className="flex justify-center mb-1">
          <button
            onClick={() => setShowHud(!showHud)}
            className="flex items-center gap-1.5 px-3 py-1 bg-black/60 border border-white/10 text-[#86868b] hover:text-white rounded-full text-[11px] shadow-md transition-all backdrop-blur-xl cursor-pointer"
          >
            {showHud ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            <span>{showHud ? 'Hide Controls' : 'Show 3D Controls'}</span>
          </button>
        </div>

        {/* Floating Capsule Dock */}
        <div className="apple-frosted-dark border border-white/10 rounded-full px-5 py-3 shadow-2xl flex flex-wrap items-center justify-between gap-4">
          {/* Exploded slider */}
          <div className="flex items-center gap-3 min-w-[200px] flex-1">
            <span className="text-[12px] text-[#a1a1a6] whitespace-nowrap flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-[#2997ff]" />
              <span>Exploded View</span>
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explodedRatio}
              onChange={(e) => setExplodedRatio(parseFloat(e.target.value))}
              className="w-full accent-[#0071e3] h-1.5 bg-white/20 rounded-lg cursor-pointer"
            />
            <span className="text-[11px] font-mono text-white/80 tabular-nums">
              {Math.round(explodedRatio * 100)}%
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-3 py-1.5 rounded-full text-[12px] border transition-all cursor-pointer flex items-center gap-1.5 ${
                autoRotate
                  ? 'bg-white/20 text-white border-white/30'
                  : 'bg-transparent text-[#86868b] border-white/10 hover:text-white'
              }`}
            >
              <Rotate3d className="w-3.5 h-3.5" />
              <span>360° Rotate</span>
            </button>

            <button
              onClick={() => setWireframeMode(!wireframeMode)}
              className={`px-3 py-1.5 rounded-full text-[12px] border transition-all cursor-pointer flex items-center gap-1.5 ${
                wireframeMode
                  ? 'bg-white/20 text-white border-white/30'
                  : 'bg-transparent text-[#86868b] border-white/10 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{wireframeMode ? 'Wireframe' : 'Solid PBR'}</span>
            </button>

            <button
              onClick={() => {
                cameraTargetPos.current = new THREE.Vector3(0, 1.2, 5.5);
                controlsTargetPos.current = new THREE.Vector3(0, 0, 0);
                setSelectedPart(null);
              }}
              className="px-3 py-1.5 rounded-full text-[12px] text-[#86868b] hover:text-white border border-white/10 transition-all cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
