import React, { useState } from 'react';
import { HOSPITAL_TECHNOLOGIES } from '../../data/hospitalData';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

export const TechInfrastructure: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const activeTech = HOSPITAL_TECHNOLOGIES[activeIdx];

  return (
    <section id="technology" className="py-24 bg-white text-[#1d1d1f] border-b border-black/[0.08]">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-[13px] font-medium text-[#0071e3] tracking-[-0.01em] block mb-2">
            Surgical & Embryology Infrastructure
          </span>
          <h2 className="text-[34px] sm:text-[44px] lg:text-[50px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#1d1d1f]">
            Sub-millimeter precision instrumentation.
          </h2>
          <p className="mt-4 text-[19px] sm:text-[22px] font-normal text-[#86868b] leading-[1.28] tracking-[-0.015em]">
            From 4K image-guided endoscopic navigation to positive-pressure Class 100 cleanroom embryology labs.
          </p>
        </div>

        {/* Carousel & Technology Showcase */}
        <div className="rounded-[28px] bg-[#f5f5f7] border border-black/[0.08] p-6 sm:p-12 apple-product-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Tech Image (6 cols) */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-[22px] overflow-hidden aspect-[4/3] border border-black/[0.08] apple-product-shadow bg-[#e5e5ea]">
                <img
                  src={activeTech.image}
                  alt={activeTech.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-4 left-4 bg-[#000000]/70 backdrop-blur-md text-white text-[12px] font-medium px-3 py-1 rounded-full">
                  {activeTech.category}
                </span>
              </div>
            </div>

            {/* Tech Details (6 cols) */}
            <div className="lg:col-span-6">
              <div className="flex items-center justify-between mb-3 text-[12px] text-[#86868b]">
                <span className="font-mono tabular-nums">
                  Equipment Standard {activeIdx + 1} of {HOSPITAL_TECHNOLOGIES.length}
                </span>
                
                {/* Carousel navigation */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveIdx((prev) => (prev > 0 ? prev - 1 : HOSPITAL_TECHNOLOGIES.length - 1))}
                    className="w-8 h-8 rounded-full bg-white border border-black/[0.08] text-[#1d1d1f] hover:bg-black/[0.04] flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Previous Equipment"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveIdx((prev) => (prev < HOSPITAL_TECHNOLOGIES.length - 1 ? prev + 1 : 0))}
                    className="w-8 h-8 rounded-full bg-white border border-black/[0.08] text-[#1d1d1f] hover:bg-black/[0.04] flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Next Equipment"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-[24px] sm:text-[30px] font-semibold text-[#1d1d1f] tracking-[-0.025em] mb-3">
                {activeTech.name}
              </h3>

              <p className="text-[15px] text-[#6e6e73] leading-[1.5] mb-6">
                {activeTech.description}
              </p>

              {/* Specs */}
              <div className="p-4 rounded-[16px] bg-white border border-black/[0.06] mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868b] block mb-1">
                  Technical Specifications
                </span>
                <span className="text-[13px] font-mono text-[#0071e3] font-medium">
                  {activeTech.specs}
                </span>
              </div>

              {/* Clinical outcome benefit */}
              <div className="p-4 rounded-[16px] bg-white border border-black/[0.06] mb-8">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#1d1d1f] font-semibold block mb-1 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#0071e3]" />
                  Patient Outcome Impact
                </span>
                <span className="text-[13px] text-[#424245]">
                  {activeTech.impact}
                </span>
              </div>

              {/* Equipment Thumbnails */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-black/[0.06]">
                {HOSPITAL_TECHNOLOGIES.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`p-2.5 rounded-[12px] text-left border text-[11px] truncate transition-all cursor-pointer ${
                      idx === activeIdx
                        ? 'bg-white text-[#1d1d1f] border-[#0071e3] font-semibold shadow-sm'
                        : 'bg-white/60 text-[#86868b] border-black/[0.05] hover:text-[#1d1d1f]'
                    }`}
                  >
                    {item.name.split(' ')[0]} {item.name.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
