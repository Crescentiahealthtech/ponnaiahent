export interface SpecialistProfile {
  id: string;
  name: string;
  credentials: string;
  role: string;
  division: 'ENT' | 'IVF';
  accentColor: string;
  tagline: string;
  biography: string;
  metrics: { value: string; label: string }[];
  specializations: string[];
  consultationTimings: string;
}

export interface TelemetryNode {
  id: string;
  code: string;
  division: 'OTOLARYNGOLOGY' | 'REPRODUCTIVE MEDICINE';
  title: string;
  subtitle: string;
  metricValue: string;
  metricUnit: string;
  metricLabel: string;
  description: string;
  protocolSpecs: string[];
  coordinates: [number, number, number];
  accentHex: string;
}

export const HOSPITAL_IDENTITY = {
  name: 'PONNAIAH',
  subName: 'ENT & IVF SUPER SPECIALITY HOSPITAL',
  tagline: 'Where Micro-Acoustic Precision Meets the Architecture of Life.',
  location: 'Tamil Nadu, India',
  emergencyHotline: '+91 (0422) 248-9000',
  conciergeWhatsApp: '919876543210',
  architectBrand: 'CRESCENTIA HEALTHTECH',
};

export const SPECIALISTS: SpecialistProfile[] = [
  {
    id: 'dr-gopinath',
    name: 'Dr. Gopinath',
    credentials: 'MBBS, MS (ENT), DNB — Senior Consultant Otolaryngologist',
    role: 'Chief of Micro-Ear, Endoscopic Sinus & Skull Base Surgery',
    division: 'ENT',
    accentColor: '#06B6D4',
    tagline: 'Restoring acoustic fidelity through sub-millimeter endoscopic and microscopic navigation.',
    biography:
      'Pioneering minimally invasive otolaryngology, cochlear implantation, and anterior skull base procedures. Engineered around zero-scar endoscopic corridors and real-time intraoperative nerve monitoring.',
    metrics: [
      { value: '12,400+', label: 'MICRO-EAR & SINUS PROCEDURES' },
      { value: '99.4%', label: 'ACOUSTIC GRAFT SUCCESS' },
      { value: '0.2mm', label: 'OPTICAL SURGICAL TOLERANCE' },
    ],
    specializations: [
      'Cochlear Implantation & Implantable Hearing Systems',
      '4K 3D Endoscopic Sinus & Skull Base Navigation (FESS)',
      'Micro-Laryngeal Phonosurgery & Voice Restoration',
      'Coblation-Assisted Obstructive Sleep Apnea Surgery',
    ],
    consultationTimings: 'MON – SAT · 09:30 AM – 02:30 PM & 05:30 PM – 08:30 PM',
  },
  {
    id: 'dr-manopriya-gopinath',
    name: 'Dr. Manopriya Gopinath',
    credentials: 'MBBS, MS (OBG), FRM — Fellowship in Reproductive Medicine',
    role: 'Clinical Director — Fertility, High-Precision IVF & Embryology',
    division: 'IVF',
    accentColor: '#DA291C',
    tagline: 'Cultivating cellular potential inside ISO-5 cleanroom embryology environments.',
    biography:
      'Leading individualized Assisted Reproductive Technology (ART) protocols, AI-assisted time-lapse embryo morphokinetics, and fertility preservation with uncompromising clinical transparency and empathy.',
    metrics: [
      { value: '78.6%', label: 'BLASTOCYST CLINICAL RATE' },
      { value: 'ISO 5', label: 'CLASS-100 AIR PURITY LAB' },
      { value: '3,800+', label: 'SUCCESSFUL LIFE STORIES' },
    ],
    specializations: [
      'ICSI with Piezo-Actuated Micromanipulation',
      'Time-Lapse EmbryoScope Morphokinetic Selection',
      'Pre-Implantation Genetic Testing (PGT-A / PGT-M)',
      'Cryo-Vitrification & Onco-Fertility Preservation',
    ],
    consultationTimings: 'MON – SAT · 09:00 AM – 04:00 PM (Prior Appointment)',
  },
];

export const TELEMETRY_NODES: TelemetryNode[] = [
  {
    id: 'node-cochlear',
    code: 'ENT-01',
    division: 'OTOLARYNGOLOGY',
    title: 'Cochlear Tonotopic Mapping',
    subtitle: 'Bionic Auditory Neural Interface',
    metricValue: '20',
    metricUnit: 'kHz',
    metricLabel: 'SPECTRAL BANDWIDTH RESTORATION',
    description:
      'Atraumatic soft-surgery electrode insertion into the scala tympani, preserving residual low-frequency hearing while restoring full high-frequency speech discrimination.',
    protocolSpecs: [
      'Intraoperative Neural Response Telemetry (NRT)',
      'Sub-millimeter Round Window Membrane Insertion',
      '3T MRI-Compatible Titanium Implant Architecture',
    ],
    coordinates: [1.9, 0.9, 0.8],
    accentHex: '#06B6D4',
  },
  {
    id: 'node-skullbase',
    code: 'ENT-02',
    division: 'OTOLARYNGOLOGY',
    title: '4K Optical Sinus & Skull Base Corridor',
    subtitle: 'Image-Guided Endoscopic Navigation',
    metricValue: '0.1',
    metricUnit: 'mm',
    metricLabel: 'OPTICAL TRACKING PRECISION',
    description:
      'Ultra-high-definition 4K 60fps endoscopic visualization paired with electromagnetic CT-merged navigation for safe clearance of complex paranasal and skull-base pathology.',
    protocolSpecs: [
      'Real-Time Optic Nerve & Carotid Proximity Alerts',
      'Powered Microdebrider & Plasma Coblation Hemostasis',
      'Rapid Mucosal Preservation & Day-Care Recovery',
    ],
    coordinates: [-1.8, 1.1, 0.9],
    accentHex: '#06B6D4',
  },
  {
    id: 'node-voice',
    code: 'ENT-03',
    division: 'OTOLARYNGOLOGY',
    title: 'Digital Laryngeal Videostroboscopy',
    subtitle: 'Mucosal Wave Harmonic Analysis',
    metricValue: '400',
    metricUnit: 'fps',
    metricLabel: 'SYNCHRONIZED GLOTTIC CAPTURE',
    description:
      'High-speed phase-locked stroboscopic illumination captures vocal fold vibration dynamics in slow motion, diagnosing micro-lesions invisible to standard endoscopy.',
    protocolSpecs: [
      'Fundamental Frequency (F0) & Jitter Acoustic Telemetry',
      'CO2 Laser & Micro-Flap Phonosurgical Precision',
      'Professional Voice & Airway Reconstruction Protocols',
    ],
    coordinates: [0.2, 2.1, -0.7],
    accentHex: '#22D3EE',
  },
  {
    id: 'node-icsi',
    code: 'IVF-01',
    division: 'REPRODUCTIVE MEDICINE',
    title: 'Laser-Assisted ICSI Micromanipulation',
    subtitle: 'Single-Cell Gamete Precision',
    metricValue: '400',
    metricUnit: 'x',
    metricLabel: 'INVERTED HOFFMAN OPTICS',
    description:
      'Anti-vibration hydraulic tables and dual-stage heated glass stages enable single-sperm cytoplasmic injection with zero thermal or mechanical stress to the oocyte.',
    protocolSpecs: [
      'SpindleView Polarized Light Meiotic Spindle Protection',
      'Non-Contact 1.48µm Diode Laser Zona Hatching',
      'HEPA + VOC Activated Carbon Positive-Pressure Suite',
    ],
    coordinates: [1.7, -1.2, -0.9],
    accentHex: '#DA291C',
  },
  {
    id: 'node-timelapse',
    code: 'IVF-02',
    division: 'REPRODUCTIVE MEDICINE',
    title: 'Continuous Time-Lapse Morphokinetics',
    subtitle: 'Undisturbed Tri-Gas Incubation',
    metricValue: '10',
    metricUnit: 'min',
    metricLabel: 'OPTICAL Z-STACK INTERVAL',
    description:
      'Embryos remain inside a closed, physiologically balanced low-oxygen (5% O2) chamber while multi-plane optics capture every cleavage division for AI-assisted grading.',
    protocolSpecs: [
      'Zero Door-Opening Thermal or pH Perturbation',
      'Automated Cleavage Synchronicity & Blastulation Scoring',
      'Single Elective Blastocyst Transfer (eSET) Optimization',
    ],
    coordinates: [-1.7, -1.1, 1.0],
    accentHex: '#DA291C',
  },
  {
    id: 'node-cryo',
    code: 'IVF-03',
    division: 'REPRODUCTIVE MEDICINE',
    title: 'Ultra-Rapid Cryo-Vitrification Core',
    subtitle: 'Glass-State Cellular Suspension',
    metricValue: '-196',
    metricUnit: '°C',
    metricLabel: 'LIQUID NITROGEN CRYO-STABILITY',
    description:
      'Cooling rates exceeding 20,000°C per minute vitrify oocytes and embryos into a crystal-free glass state, achieving post-thaw survival rates above 99%.',
    protocolSpecs: [
      '24/7 Cloud-Monitored Liquid Nitrogen Level Telemetry',
      'Closed-System High-Security Cryo-Straw Architecture',
      'Long-Term Fertility & Gonadal Tissue Preservation',
    ],
    coordinates: [0.0, -2.1, -0.8],
    accentHex: '#F43F5E',
  },
];

