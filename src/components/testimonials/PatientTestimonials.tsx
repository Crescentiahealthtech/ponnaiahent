import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../../data/hospitalData';
import { Star, Check, MapPin, Volume2, Sparkles } from 'lucide-react';

export const PatientTestimonials: React.FC = () => {
  const [filterUnit, setFilterUnit] = useState<'all' | 'ent' | 'ivf'>('all');

  const filtered = filterUnit === 'all'
    ? TESTIMONIALS_DATA
    : TESTIMONIALS_DATA.filter((t) => t.unit === filterUnit);

  return (
    <section id="testimonials" className="py-24 bg-[#f5f5f7] text-[#1d1d1f] border-b border-black/[0.08]">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="text-[13px] font-medium text-[#0071e3] tracking-[-0.01em] block mb-2">
              Audited Clinical Proof
            </span>
            <h2 className="text-[34px] sm:text-[44px] lg:text-[50px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#1d1d1f]">
              Real lives renewed. Real families begun.
            </h2>
            <p className="mt-4 text-[19px] sm:text-[22px] font-normal text-[#86868b] leading-[1.28] tracking-[-0.015em]">
              Documented patient recoveries following micro-ear surgeries and IVF conceptions.
            </p>
          </div>

          {/* Segmented Filter Pills */}
          <div className="flex items-center bg-white p-1 rounded-full border border-black/[0.08] shadow-sm self-start md:self-auto">
            <button
              onClick={() => setFilterUnit('all')}
              className={`px-4 py-1.5 rounded-full text-[13px] font-normal tracking-[-0.01em] transition-all cursor-pointer ${
                filterUnit === 'all'
                  ? 'bg-[#1d1d1f] text-white font-medium shadow-sm'
                  : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              All Testimonials
            </button>
            <button
              onClick={() => setFilterUnit('ent')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[13px] font-normal tracking-[-0.01em] transition-all cursor-pointer ${
                filterUnit === 'ent'
                  ? 'bg-[#0071e3] text-white font-medium shadow-sm'
                  : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>ENT Recovery</span>
            </button>
            <button
              onClick={() => setFilterUnit('ivf')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[13px] font-normal tracking-[-0.01em] transition-all cursor-pointer ${
                filterUnit === 'ivf'
                  ? 'bg-rose-500 text-white font-medium shadow-sm'
                  : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>IVF Families</span>
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((item) => {
            const isEnt = item.unit === 'ent';
            return (
              <div
                key={item.id}
                className="p-8 sm:p-9 rounded-[24px] bg-white border border-black/[0.08] flex flex-col justify-between apple-product-shadow"
              >
                <div>
                  <div className="flex items-center justify-between text-[12px] text-[#86868b] mb-4">
                    <span className={`font-medium ${isEnt ? 'text-[#0071e3]' : 'text-rose-500'}`}>
                      {item.treatment}
                    </span>

                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-[16px] text-[#1d1d1f] leading-[1.5] italic mb-6">
                    “{item.review}”
                  </p>
                </div>

                <div className="pt-4 border-t border-black/[0.06]">
                  {/* Verified Outcome Banner */}
                  <div className="mb-3.5 p-3 rounded-[12px] bg-[#f5f5f7] flex items-center justify-between text-[12px]">
                    <span className="text-[#86868b]">Clinical Result:</span>
                    <span className="font-semibold text-[#0071e3] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      {item.outcome}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-[15px] text-[#1d1d1f] tracking-[-0.01em]">
                        {item.patientName}
                      </h4>
                      <div className="flex items-center gap-2 text-[12px] text-[#86868b] mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span>{item.city}</span>
                        <span>·</span>
                        <span>Supervising Surgeon: {item.doctorName}</span>
                      </div>
                    </div>

                    <span className="text-[12px] font-mono text-[#86868b] tabular-nums">
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
