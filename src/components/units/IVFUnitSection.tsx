import React, { useState } from 'react';
import { IVF_PROCEDURES } from '../../data/hospitalData';
import { ProcedureItem } from '../../types/hospital';
import { 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  Check, 
  ShieldCheck, 
  Award,
  Sparkles
} from 'lucide-react';

interface IVFUnitSectionProps {
  onBookProcedure: (proc: ProcedureItem) => void;
}

export const IVFUnitSection: React.FC<IVFUnitSectionProps> = ({ onBookProcedure }) => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('under35');

  const fertilityJourneyStages = [
    {
      step: '01',
      title: 'Diagnostic Precision & Ovarian Reserve',
      subtitle: 'AMH & High-Magnification Semen Assessment',
      duration: 'Day 1 – 3',
      description: 'Comprehensive baseline 3D pelvic ultrasound, antral follicle count (AFC), complete hormonal profiling, and strict Tygerberg morphology semen analysis to calibrate an individualized protocol.',
      milestone: 'Zero-guesswork biological roadmap',
    },
    {
      step: '02',
      title: 'Targeted Ovarian Stimulation',
      subtitle: 'Individualized Recombinant Protocol',
      duration: 'Days 3 – 12',
      description: 'Subcutaneous micro-dosed gonadotropins foster multiple mature follicles. Serial transvaginal ultrasound monitoring ensures peak oocyte health while eliminating hyperstimulation risk.',
      milestone: 'Optimal retrieval timing via dual trigger',
    },
    {
      step: '03',
      title: 'Painless Ovum Pickup & Piezo-ICSI',
      subtitle: 'Ultrasonic Aspiration & Single-Cell Injection',
      duration: 'Day 14 (36h post-trigger)',
      description: 'A 15-minute daycare procedure under light conscious sedation. In our ISO Class 5 cleanroom, a single morphology-screened sperm is micro-injected directly into each mature oocyte.',
      milestone: '85–90% Fertilization Confirmation',
    },
    {
      step: '04',
      title: 'Day-5 Blastocyst Culture & PGT-A',
      subtitle: 'Tri-Gas Incubators & Laser Biopsy',
      duration: 'Days 15 – 19',
      description: 'Embryos develop in individual benchtop chambers replicating the fallopian maternal milieu. Only genetically balanced, high-grade blastocysts are selected for transfer or vitrification.',
      milestone: 'High live-birth implantation potential',
    },
    {
      step: '05',
      title: 'Ultrasound-Guided Embryo Transfer',
      subtitle: 'Soft Catheter Single Blastocyst Placement',
      duration: 'Day 20 (or frozen cycle)',
      description: 'A gentle 5-minute procedure where the selected embryo is placed 1cm below the uterine fundus under real-time ultrasound guidance, followed by individualized luteal support.',
      milestone: 'Positive Beta-hCG Confirmation',
    },
  ];

  const successRates = {
    under35: { rate: '78.6%', label: 'Under 35 Years', note: 'Single blastocyst transfer with optimal ovarian reserve and embryo genetic integrity.' },
    age35to37: { rate: '68.2%', label: '35 – 37 Years', note: 'High cumulative live birth rate using ICSI micro-injection and laser hatching.' },
    age38to40: { rate: '54.5%', label: '38 – 40 Years', note: 'PGT-A genetic screening significantly mitigates age-related aneuploidy and miscarriage.' },
    above40: { rate: '42.8%', label: 'Above 40 Years', note: 'Individualized mild stimulation or vitrified donor oocyte protocols for healthy take-home deliveries.' },
  };

  return (
    <section id="ivf-unit" className="py-24 bg-[#161617] text-white border-b border-white/[0.08]">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-8">
        {/* Section Header (Apple Dark Product Tile) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-white/[0.08] pb-10">
          <div className="max-w-2xl">
            <span className="text-[13px] font-medium text-rose-400 tracking-[-0.01em] block mb-2">
              Secondary Speciality · Advanced Reproductive Medicine
            </span>
            <h2 className="text-[34px] sm:text-[44px] lg:text-[50px] font-semibold tracking-[-0.03em] leading-[1.08] text-white">
              Advanced IVF & Human Embryology.
            </h2>
            <p className="mt-4 text-[19px] sm:text-[22px] font-normal text-[#86868b] leading-[1.28] tracking-[-0.015em]">
              Positive-pressure ISO Class 5 Cleanroom laboratory, high-magnification ICSI, Day-5 blastocyst culture, and PGT-A genetics under Dr. S. Radhika Ponnaiah.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="p-5 rounded-[20px] bg-[#242426] border border-white/[0.08] shrink-0 flex items-center gap-6">
            <div>
              <span className="text-[26px] font-semibold text-white block font-mono tabular-nums">5,600+</span>
              <span className="text-[12px] text-[#86868b]">Healthy IVF Deliveries</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <span className="text-[26px] font-semibold text-rose-400 block font-mono tabular-nums">78.6%</span>
              <span className="text-[12px] text-[#86868b]">Audited Success Rate</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <span className="text-[26px] font-semibold text-[#2997ff] block font-mono tabular-nums">100%</span>
              <span className="text-[12px] text-[#86868b]">RFID Witness Security</span>
            </div>
          </div>
        </div>

        {/* 5-STAGE FERTILITY PATHWAY CAROUSEL */}
        <div className="mb-20 rounded-[24px] bg-[#242426] border border-white/[0.08] p-6 sm:p-10 apple-product-shadow">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-[12px] font-mono uppercase tracking-wider text-rose-400 font-medium block mb-1">
                Clinical Workflow
              </span>
              <h3 className="text-[22px] sm:text-[26px] font-semibold text-white tracking-[-0.025em]">
                Your 5-Stage Pathway to Parenthood
              </h3>
            </div>

            {/* Carousel navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveStageIndex((prev) => (prev > 0 ? prev - 1 : fertilityJourneyStages.length - 1))}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous Stage"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[13px] font-mono text-[#86868b] px-2 tabular-nums">
                Stage {activeStageIndex + 1} of {fertilityJourneyStages.length}
              </span>
              <button
                onClick={() => setActiveStageIndex((prev) => (prev < fertilityJourneyStages.length - 1 ? prev + 1 : 0))}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next Stage"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Stage Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-8">
            {fertilityJourneyStages.map((stage, idx) => {
              const isActive = idx === activeStageIndex;
              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`text-left p-3.5 rounded-[16px] transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#1d1d1f] border-white shadow-md'
                      : 'bg-black/30 text-[#86868b] border-white/5 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span className={`block font-mono text-[11px] font-semibold mb-0.5 ${isActive ? 'text-[#0071e3]' : 'text-[#86868b]'}`}>
                    Stage {stage.step}
                  </span>
                  <span className="block text-[13px] font-semibold truncate tracking-[-0.01em]">
                    {stage.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Card */}
          {(() => {
            const currentStage = fertilityJourneyStages[activeStageIndex];
            return (
              <div className="p-6 sm:p-8 rounded-[20px] bg-black/40 border border-white/10 flex flex-col md:flex-row items-start justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-2 text-[13px]">
                    <span className="text-white font-mono bg-white/10 px-2.5 py-0.5 rounded-full font-semibold">
                      Timeline: {currentStage.duration}
                    </span>
                    <span className="text-rose-400">{currentStage.subtitle}</span>
                  </div>
                  <h4 className="text-[24px] font-semibold text-white tracking-[-0.02em] mb-3">
                    {currentStage.title}
                  </h4>
                  <p className="text-[15px] text-[#a1a1a6] leading-[1.45] mb-4">
                    {currentStage.description}
                  </p>
                  <div className="flex items-center gap-2 text-[13px] text-white/90">
                    <Check className="w-4 h-4 text-[#2997ff]" />
                    <span>Clinical Goal: <strong>{currentStage.milestone}</strong></span>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col gap-2.5 w-full md:w-auto">
                  <button
                    onClick={() => onBookProcedure(IVF_PROCEDURES[0])}
                    className="apple-btn-primary !py-2.5 !px-5 !text-[14px]"
                  >
                    <span>Schedule Fertility Workup</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <span className="text-[12px] text-[#86868b] text-center">
                    Private confidential consultation
                  </span>
                </div>
              </div>
            );
          })()}
        </div>

        {/* CLINICAL SUCCESS RATE TRANSPARENCY BY AGE */}
        <div className="mb-20 rounded-[24px] bg-[#242426] border border-white/[0.08] p-6 sm:p-10 apple-product-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-[12px] font-mono uppercase tracking-wider text-rose-400 font-medium block mb-1">
                Audited Clinical Evidence
              </span>
              <h3 className="text-[26px] sm:text-[30px] font-semibold text-white tracking-[-0.025em] mb-3">
                Live Birth Rates by Maternal Age Group
              </h3>
              <p className="text-[15px] text-[#a1a1a6] leading-[1.45] mb-6">
                At Ponnaiah IVF Hospital, every rate published reflects independently audited take-home baby deliveries per embryo transfer cycle.
              </p>

              {/* Age selector buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                {(['under35', 'age35to37', 'age38to40', 'above40'] as const).map((key) => {
                  const item = successRates[key];
                  const isSelected = selectedAgeGroup === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedAgeGroup(key)}
                      className={`p-3 rounded-[14px] border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white text-[#1d1d1f] border-white shadow-md'
                          : 'bg-black/30 text-[#86868b] border-white/5 hover:text-white'
                      }`}
                    >
                      <span className="block text-[12px]">{item.label}</span>
                      <span className="block text-[18px] font-semibold font-mono mt-1 tabular-nums">
                        {item.rate}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="p-3.5 bg-black/40 rounded-[14px] border border-white/5 text-[13px] text-[#a1a1a6]">
                <span className="font-semibold text-white block mb-0.5">Clinical Protocol:</span>
                <span>{successRates[selectedAgeGroup as keyof typeof successRates].note}</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-black/40 rounded-[20px] border border-white/10 text-center">
              <Award className="w-10 h-10 text-rose-400 mb-2" />
              <span className="text-[48px] sm:text-[56px] font-semibold text-white tracking-[-0.03em] font-mono tabular-nums leading-none">
                {successRates[selectedAgeGroup as keyof typeof successRates].rate}
              </span>
              <span className="text-[13px] text-[#86868b] mt-2">
                Clinical Live Birth Rate
              </span>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-[12px] text-[#2997ff]">
                <ShieldCheck className="w-4 h-4" />
                <span>European Society of Human Reproduction (ESHRE) Member</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core IVF Procedures Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {IVF_PROCEDURES.map((proc) => (
            <div
              key={proc.id}
              className="p-7 rounded-[22px] bg-[#242426] border border-white/[0.08] hover:border-white/[0.2] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[12px] text-[#86868b] mb-3">
                  <span className="font-medium text-rose-400">{proc.category}</span>
                  <span className="flex items-center gap-1 font-mono tabular-nums">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{proc.recoveryDays}</span>
                  </span>
                </div>

                <h3 className="text-[20px] font-semibold text-white tracking-[-0.02em] group-hover:text-rose-400 transition-colors mb-2.5">
                  {proc.title}
                </h3>

                <p className="text-[14px] text-[#a1a1a6] leading-[1.45] mb-5">
                  {proc.shortDesc}
                </p>

                <div className="space-y-2 mb-6">
                  {proc.keyBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-[13px] text-white/90">
                      <Check className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-black/30 rounded-[14px] p-3.5 border border-white/5 mb-6">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868b] block mb-1">
                    Embryology Instrumentation
                  </span>
                  <span className="text-[12px] text-white/80 font-medium block">
                    {proc.technologiesUsed.join(' · ')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onBookProcedure(proc)}
                className="apple-link-dark !text-[14px] font-medium !text-rose-400 hover:!text-rose-300"
              >
                <span>Inquire about {proc.title.split(' ')[0]}</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
