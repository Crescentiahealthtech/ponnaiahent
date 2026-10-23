import React from 'react';
import { Hero3DCanvas } from '../3d/Hero3DCanvas';
import { 
  ChevronRight, 
  Rotate3d, 
  ShieldCheck, 
  Calendar,
  Volume2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface HospitalHeroProps {
  onOpenBooking: (unit?: 'ent' | 'ivf') => void;
  onExplore3DAnatomy: (unit?: 'ent' | 'ivf') => void;
}

export const HospitalHero: React.FC<HospitalHeroProps> = ({
  onOpenBooking,
  onExplore3DAnatomy,
}) => {
  return (
    <section className="relative bg-[#000000] text-white pt-[116px] pb-24 overflow-hidden border-b border-white/[0.08]">
      {/* Apple Subtle Vignette Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,113,227,0.15),rgba(0,0,0,0))] pointer-events-none" />

      <div className="max-w-[1120px] mx-auto px-4 sm:px-8 relative z-10">
        {/* Apple Kicker (Unboxed quiet text) */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-10 text-[13px] text-[#86868b] tracking-[-0.01em]">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">Ponnaiah Super Speciality Hospital</span>
            <span>·</span>
            <span className="text-[#2997ff]">Primary Focus: ENT Surgery</span>
            <span>·</span>
            <span>Secondary Focus: Advanced IVF</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-white/60">
            <ShieldCheck className="w-4 h-4 text-[#2997ff]" />
            <span>NABH Accredited Tertiary Center</span>
          </div>
        </div>

        {/* Hero Headline & Subhead (SF Pro tight display style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16">
          <div className="lg:col-span-7">
            <h1 className="text-[40px] sm:text-[54px] lg:text-[62px] font-semibold tracking-[-0.03em] leading-[1.06] text-white">
              Two surgical disciplines. One standard of precision.
            </h1>

            <p className="mt-5 text-[19px] sm:text-[23px] font-normal text-[#a1a1a6] leading-[1.22] tracking-[-0.015em] max-w-xl">
              World-class microscopic otolaryngology and skull base interventions, paired with advanced cleanroom reproductive embryology.
            </p>

            {/* Apple CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenBooking('ent')}
                className="apple-btn-primary !px-6 !py-3 !text-[16px]"
              >
                <span>Consult Chief ENT Surgeon</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenBooking('ivf')}
                className="apple-btn-secondary !px-6 !py-3 !text-[16px] !text-white !border-white/30 hover:!border-white/60 hover:!bg-white/5"
              >
                <span>Inquire at IVF Clinic</span>
              </button>

              <button
                onClick={() => onExplore3DAnatomy('ent')}
                className="apple-link-dark !text-[16px] ml-2"
              >
                <Rotate3d className="w-4 h-4 mr-1 text-[#2997ff]" />
                <span>Explore 3D Anatomy Lab</span>
                <span className="text-sm">›</span>
              </button>
            </div>

            {/* Two Unit Split Cards (Clean Apple Surface Tile style) */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Unit 1: ENT */}
              <div 
                onClick={() => {
                  const el = document.getElementById('ent-unit');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group cursor-pointer p-5 rounded-[18px] bg-[#161617] border border-white/[0.08] hover:border-white/[0.2] transition-all"
              >
                <div className="flex items-center justify-between text-[12px] font-normal text-[#86868b] mb-2">
                  <span className="text-[#2997ff] font-medium">01. Primary Speciality</span>
                  <span>15,200+ Surgeries</span>
                </div>
                <h3 className="text-[19px] font-semibold text-white tracking-[-0.02em] group-hover:text-[#2997ff] transition-colors">
                  ENT Microsurgery Wing
                </h3>
                <p className="text-[14px] text-[#86868b] leading-[1.35] mt-1.5">
                  Zeiss 3D microscopes for eardrum tympanoplasty, cochlear implants & 3D navigation sinus clearance.
                </p>
                <span className="apple-link-dark !text-[13px] mt-3">
                  View ENT procedures <span className="text-xs">›</span>
                </span>
              </div>

              {/* Unit 2: IVF */}
              <div 
                onClick={() => {
                  const el = document.getElementById('ivf-unit');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group cursor-pointer p-5 rounded-[18px] bg-[#161617] border border-white/[0.08] hover:border-white/[0.2] transition-all"
              >
                <div className="flex items-center justify-between text-[12px] font-normal text-[#86868b] mb-2">
                  <span className="text-rose-400 font-medium">02. Secondary Speciality</span>
                  <span>5,600+ IVF Deliveries</span>
                </div>
                <h3 className="text-[19px] font-semibold text-white tracking-[-0.02em] group-hover:text-rose-400 transition-colors">
                  IVF & Embryology Center
                </h3>
                <p className="text-[14px] text-[#86868b] leading-[1.35] mt-1.5">
                  ISO Class 5 positive-pressure lab with single-cell ICSI, Day-5 blastocyst culture & PGT-A genetics.
                </p>
                <span className="apple-link-dark !text-[13px] !text-rose-400 mt-3 hover:!text-rose-300">
                  View IVF protocols <span className="text-xs">›</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right 3D Medical Helix Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[22px] overflow-hidden bg-[#161617] border border-white/[0.08] p-2 apple-product-shadow">
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[12px] text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2997ff]" />
                <span>3D Biomechanical Simulation</span>
              </div>

              <div className="w-full h-[400px] sm:h-[460px]">
                <Hero3DCanvas />
              </div>

              <div className="absolute bottom-4 inset-x-4 z-10 flex items-center justify-between p-3 rounded-[14px] bg-black/70 backdrop-blur-md border border-white/10 text-[13px]">
                <div>
                  <span className="font-semibold text-white block">Interactive 3D Anatomy</span>
                  <span className="text-[12px] text-[#86868b]">Inspect Ear & Embryo in 360°</span>
                </div>
                <button
                  onClick={() => onExplore3DAnatomy('ent')}
                  className="apple-btn-primary !px-3.5 !py-1.5 !text-[12px]"
                >
                  Launch 3D Lab
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Apple Numerical Strip (Tabular numbers, clean typography) */}
        <div className="pt-8 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <span className="block text-[32px] sm:text-[40px] font-semibold text-white tracking-[-0.03em] font-mono tabular-nums">
              24+
            </span>
            <span className="text-[14px] text-[#86868b] leading-tight block mt-0.5">
              Years of Clinical Excellence
            </span>
          </div>

          <div>
            <span className="block text-[32px] sm:text-[40px] font-semibold text-[#2997ff] tracking-[-0.03em] font-mono tabular-nums">
              15,200+
            </span>
            <span className="text-[14px] text-[#86868b] leading-tight block mt-0.5">
              Successful ENT Microsurgeries
            </span>
          </div>

          <div>
            <span className="block text-[32px] sm:text-[40px] font-semibold text-rose-400 tracking-[-0.03em] font-mono tabular-nums">
              5,600+
            </span>
            <span className="text-[14px] text-[#86868b] leading-tight block mt-0.5">
              Healthy IVF Deliveries
            </span>
          </div>

          <div>
            <span className="block text-[32px] sm:text-[40px] font-semibold text-white tracking-[-0.03em] font-mono tabular-nums">
              78.6%
            </span>
            <span className="text-[14px] text-[#86868b] leading-tight block mt-0.5">
              Audited IVF Success Rate (&lt;35 yrs)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
