import React, { useState } from 'react';
import { Volume2, Sparkles, ChevronRight } from 'lucide-react';

interface DiagramRegion {
  id: string;
  name: string;
  zone: string;
  symptoms: string[];
  treatment: string;
  doctorInCharge: string;
  coordinates: { x: number; y: number; r: number };
}

export const InteractiveAnatomyDiagram: React.FC<{
  onBookAppointment?: (unit: 'ent' | 'ivf', reason: string) => void;
}> = ({ onBookAppointment }) => {
  const [selectedUnit, setSelectedUnit] = useState<'ent' | 'ivf'>('ent');
  const [activeRegionId, setActiveRegionId] = useState<string>('eardrum');

  const entRegions: DiagramRegion[] = [
    {
      id: 'pinna-canal',
      name: 'External Auditory Canal & Pinna',
      zone: 'Outer Ear',
      symptoms: ['Wax impaction', 'Otitis externa (Swimmer ear)', 'Ear canal pain', 'Foreign body obstruction'],
      treatment: 'Micro-suction ear clearance & endoscopic ear canal hygiene under Carl Zeiss microscope.',
      doctorInCharge: 'Dr. A. Ponnaiah',
      coordinates: { x: 18, y: 48, r: 14 },
    },
    {
      id: 'eardrum',
      name: 'Tympanic Membrane & Middle Ear Cavity',
      zone: 'Middle Ear',
      symptoms: ['Eardrum perforation', 'Chronic ear discharge', 'Conductive hearing loss', 'Pulsatile tinnitus'],
      treatment: 'Microscopic Tympanoplasty & Ossicular Reconstruction with 99.4% graft uptake rate.',
      doctorInCharge: 'Dr. A. Ponnaiah',
      coordinates: { x: 38, y: 50, r: 15 },
    },
    {
      id: 'cochlea-nerve',
      name: 'Cochlea & Organ of Corti',
      zone: 'Inner Ear (Sensory)',
      symptoms: ['Sensorineural hearing loss', 'High-pitched tinnitus', 'Speech discernment decline', 'Sudden deafness'],
      treatment: 'Advanced Cochlear Implantation, Intratympanic steroid perfusions, and BERA diagnostics.',
      doctorInCharge: 'Dr. A. Ponnaiah',
      coordinates: { x: 58, y: 42, r: 16 },
    },
    {
      id: 'vestibular-canals',
      name: 'Semicircular Canals & Vestibular Organ',
      zone: 'Equilibrium & Balance',
      symptoms: ['Spinning sensation (Vertigo)', 'Positional dizziness (BPPV)', 'Unsteadiness', 'Nausea on head turn'],
      treatment: 'Computerized Videonystagmography (VNG) & Precision Epley Canalith Repositioning.',
      doctorInCharge: 'Dr. A. Ponnaiah',
      coordinates: { x: 62, y: 24, r: 14 },
    },
    {
      id: 'eustachian',
      name: 'Eustachian Tube & Nasopharynx',
      zone: 'Middle-Ear Pressure Regulator',
      symptoms: ['Ear popping / fullness during flights', 'Glue ear in children', 'Autophony (echoing voice)'],
      treatment: 'Balloon Eustachian Tuboplasty (BET) & Grommet ventilation tube insertion.',
      doctorInCharge: 'Dr. A. Ponnaiah',
      coordinates: { x: 80, y: 72, r: 14 },
    },
  ];

  const ivfRegions: DiagramRegion[] = [
    {
      id: 'ovaries',
      name: 'Ovaries & Oocyte Follicles',
      zone: 'Ovarian Reserve',
      symptoms: ['Low AMH levels', 'Poor egg quality', 'PCOS / Polycystic ovaries', 'Irregular menstrual cycles'],
      treatment: 'Mild ovarian stimulation protocols, Oocyte Vitrification (Egg Freezing), and PRP rejuvenation.',
      doctorInCharge: 'Dr. S. Radhika Ponnaiah',
      coordinates: { x: 22, y: 35, r: 16 },
    },
    {
      id: 'fallopian-tubes',
      name: 'Fallopian Tubes (Oviducts)',
      zone: 'Fertilization Passage',
      symptoms: ['Hydrosalpinx', 'Blocked fallopian tubes', 'Previous ectopic pregnancy', 'Pelvic adhesions'],
      treatment: '3D Laparoscopic Salpingectomy / Tuboplasty or direct IVF bypass.',
      doctorInCharge: 'Dr. S. Radhika Ponnaiah',
      coordinates: { x: 42, y: 28, r: 15 },
    },
    {
      id: 'uterine-cavity',
      name: 'Uterine Cavity & Endometrium',
      zone: 'Implantation Ground',
      symptoms: ['Thin endometrium (<7mm)', 'Uterine fibroids', 'Endometrial polyps', 'Recurrent implantation failure'],
      treatment: 'Office Hysteroscopy, Endometrial Receptivity Analysis (ERA), and G-CSF infusions.',
      doctorInCharge: 'Dr. S. Radhika Ponnaiah',
      coordinates: { x: 52, y: 54, r: 17 },
    },
    {
      id: 'blastocyst-stage',
      name: 'Day 5 Blastocyst & Trophectoderm',
      zone: 'Embryology Lab Milestone',
      symptoms: ['Embryonic arrest on Day 3', 'Genetic chromosomal abnormalities', 'Unexplained fertility failure'],
      treatment: 'Extended Day-5 Blastocyst culture, Laser Assisted Hatching, and PGT-A Genetic NGS Testing.',
      doctorInCharge: 'Dr. S. Radhika Ponnaiah',
      coordinates: { x: 78, y: 46, r: 18 },
    },
  ];

  const currentRegions = selectedUnit === 'ent' ? entRegions : ivfRegions;
  const activeRegion = currentRegions.find((r) => r.id === activeRegionId) || currentRegions[0];

  return (
    <div className="rounded-[28px] bg-white border border-black/[0.08] overflow-hidden apple-product-shadow">
      {/* Top Header Bar */}
      <div className="p-6 sm:p-8 border-b border-black/[0.08] bg-[#f5f5f7] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[12px] font-medium text-[#86868b] tracking-[-0.01em] uppercase block">
            Diagnostic Cross-Section Atlas
          </span>
          <h3 className="text-[24px] sm:text-[28px] font-semibold text-[#1d1d1f] tracking-[-0.025em] mt-0.5">
            Select an anatomical zone to inspect clinical protocols.
          </h3>
        </div>

        {/* Apple Segmented Switcher */}
        <div className="flex items-center bg-white p-1 rounded-full border border-black/[0.08] shadow-sm self-start md:self-auto">
          <button
            onClick={() => {
              setSelectedUnit('ent');
              setActiveRegionId('eardrum');
            }}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] tracking-[-0.01em] transition-all cursor-pointer ${
              selectedUnit === 'ent'
                ? 'bg-[#0071e3] text-white font-medium shadow-sm'
                : 'text-[#86868b] hover:text-[#1d1d1f]'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>ENT Auditory System</span>
          </button>
          <button
            onClick={() => {
              setSelectedUnit('ivf');
              setActiveRegionId('blastocyst-stage');
            }}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] tracking-[-0.01em] transition-all cursor-pointer ${
              selectedUnit === 'ivf'
                ? 'bg-[#0071e3] text-white font-medium shadow-sm'
                : 'text-[#86868b] hover:text-[#1d1d1f]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>IVF Reproductive Biology</span>
          </button>
        </div>
      </div>

      {/* Main Diagram Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Schematic Stage (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 bg-white flex flex-col justify-center items-center border-b lg:border-b-0 lg:border-r border-black/[0.08]">
          <div className="w-full max-w-lg relative bg-[#fafafc] rounded-[22px] p-6 border border-black/[0.06]">
            <svg
              viewBox="0 0 100 80"
              className="w-full h-auto select-none"
              style={{ maxHeight: '340px' }}
            >
              <defs>
                <pattern id="appleGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f0f0f2" strokeWidth="0.5" />
                </pattern>
              </defs>

              <rect width="100" height="80" fill="url(#appleGrid)" />

              {selectedUnit === 'ent' ? (
                <g>
                  {/* Outer ear contour */}
                  <path
                    d="M 12 30 C 10 45, 12 60, 24 58 C 30 57, 34 52, 38 50"
                    fill="none"
                    stroke="#0071e3"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  {/* Middle ear chamber */}
                  <rect x="36" y="38" width="16" height="24" rx="4" fill="rgba(0,113,227,0.06)" stroke="#0071e3" strokeWidth="1" />
                  {/* Ossicles link */}
                  <line x1="39" y1="50" x2="44" y2="44" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
                  <line x1="44" y1="44" x2="50" y2="46" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
                  {/* Inner ear Cochlea */}
                  <path
                    d="M 52 46 C 54 36, 64 36, 64 44 C 64 50, 58 50, 58 46"
                    fill="none"
                    stroke="#2997ff"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                  {/* Semicircular canals */}
                  <path d="M 54 38 C 54 22, 68 22, 68 38" fill="none" stroke="#0071e3" strokeWidth="1.8" strokeDasharray="2,1" />
                  <path d="M 60 38 C 60 26, 72 26, 72 38" fill="none" stroke="#0071e3" strokeWidth="1.8" />
                  {/* Eustachian downward slope */}
                  <path d="M 48 58 Q 62 68, 82 72" fill="none" stroke="#e11d48" strokeWidth="1.8" strokeDasharray="3,2" />
                </g>
              ) : (
                <g>
                  <path
                    d="M 28 35 Q 40 28, 52 38 Q 64 28, 76 35"
                    fill="none"
                    stroke="#e11d48"
                    strokeWidth="2.2"
                  />
                  <polygon
                    points="42,40 62,40 52,65"
                    fill="rgba(225,29,72,0.06)"
                    stroke="#e11d48"
                    strokeWidth="1.2"
                  />
                  <circle cx="22" cy="35" r="7" fill="#fecdd3" stroke="#e11d48" strokeWidth="1.2" />
                  <circle cx="82" cy="35" r="7" fill="#fecdd3" stroke="#e11d48" strokeWidth="1.2" />
                  <circle cx="78" cy="46" r="9" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                  <circle cx="76" cy="44" r="3.5" fill="#f59e0b" />
                </g>
              )}

              {/* Numbered Interactive Nodes */}
              {currentRegions.map((region, idx) => {
                const isSelected = region.id === activeRegionId;
                return (
                  <g
                    key={region.id}
                    className="cursor-pointer"
                    onClick={() => setActiveRegionId(region.id)}
                  >
                    {isSelected && (
                      <circle
                        cx={region.coordinates.x}
                        cy={region.coordinates.y}
                        r="8"
                        fill="none"
                        stroke="#0071e3"
                        strokeWidth="1.2"
                        opacity="0.8"
                      />
                    )}
                    <circle
                      cx={region.coordinates.x}
                      cy={region.coordinates.y}
                      r="4.2"
                      fill={isSelected ? '#0071e3' : '#1d1d1f'}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <text
                      x={region.coordinates.x}
                      y={region.coordinates.y + 1.2}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="3.2"
                      fontWeight="600"
                    >
                      {idx + 1}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="flex items-center justify-between text-[11px] text-[#86868b] mt-3 pt-2.5 border-t border-black/[0.05]">
              <span>Click markers 1 to {currentRegions.length} to inspect</span>
              <span>Ponnaiah Clinical Cross-Section Atlas</span>
            </div>
          </div>
        </div>

        {/* Clinical Detail Card (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center justify-between mb-1.5 text-[12px] text-[#86868b]">
              <span className="font-medium text-[#0071e3]">
                Anatomical Structure #{currentRegions.findIndex((r) => r.id === activeRegion.id) + 1}
              </span>
              <span>{activeRegion.zone}</span>
            </div>

            <h4 className="text-[22px] font-semibold text-[#1d1d1f] tracking-[-0.02em] mb-4">
              {activeRegion.name}
            </h4>

            {/* Symptoms */}
            <div className="mb-4">
              <span className="text-[12px] font-semibold text-[#1d1d1f] uppercase tracking-wider block mb-2">
                Typical Clinical Manifestations:
              </span>
              <div className="space-y-1.5">
                {activeRegion.symptoms.map((symptom, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[14px] text-[#424245]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] mt-2 shrink-0" />
                    <span>{symptom}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment */}
            <div className="p-4 rounded-[16px] bg-[#f5f5f7] border border-black/[0.05] mb-5">
              <span className="text-[12px] font-semibold text-[#1d1d1f] uppercase tracking-wider block mb-1">
                Hospital Surgical Protocol:
              </span>
              <p className="text-[14px] text-[#424245] leading-[1.4]">
                {activeRegion.treatment}
              </p>
            </div>

            {/* Supervising Doctor */}
            <div className="flex items-center gap-3 p-3 rounded-[14px] bg-[#fafafc] border border-black/[0.05] mb-6">
              <div className="w-9 h-9 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center font-semibold text-[13px]">
                {selectedUnit === 'ent' ? 'AP' : 'RP'}
              </div>
              <div className="text-[13px]">
                <span className="text-[#86868b] block text-[11px]">Supervising Chief Clinician</span>
                <span className="font-semibold text-[#1d1d1f]">{activeRegion.doctorInCharge}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onBookAppointment?.(selectedUnit, activeRegion.name)}
            className="apple-btn-primary !w-full !py-3 !text-[15px]"
          >
            <span>Book Consultation on this Condition</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
