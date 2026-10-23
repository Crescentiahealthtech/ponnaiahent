import React, { useState } from 'react';
import { ENT_PROCEDURES } from '../../data/hospitalData';
import { ProcedureItem } from '../../types/hospital';
import { 
  Play, 
  Clock, 
  ChevronRight, 
  PhoneCall, 
  Check,
  Ear
} from 'lucide-react';

export const ENTUnitSection: React.FC<{
  onBookProcedure: (proc: ProcedureItem) => void;
}> = ({ onBookProcedure }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedHz, setSelectedHz] = useState<number>(1000);
  const [isPlayingTone, setIsPlayingTone] = useState<boolean>(false);

  const categories = [
    'all', 
    'Otology (Ear)', 
    'Rhinology (Nose & Sinus)', 
    'Advanced Neuro-Otology', 
    'Pediatric ENT', 
    'Laryngology (Throat & Voice)', 
    'Vestibular Medicine'
  ];

  const filteredProcedures = activeCategory === 'all'
    ? ENT_PROCEDURES
    : ENT_PROCEDURES.filter((p) => p.category === activeCategory);

  // Web Audio hearing tone synthesizer (safe procedural audio)
  const playHearingTone = (freq: number) => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
      setIsPlayingTone(true);
      setTimeout(() => setIsPlayingTone(false), 1200);
    } catch {
      // Audio not supported
    }
  };

  return (
    <section id="ent-unit" className="py-24 bg-white text-[#1d1d1f] border-b border-black/[0.08]">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-8">
        {/* Section Header (Apple Product Tile Display) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-black/[0.08] pb-10">
          <div className="max-w-2xl">
            <span className="text-[13px] font-medium text-[#0071e3] tracking-[-0.01em] block mb-2">
              Primary Speciality · Centre of Excellence
            </span>
            <h2 className="text-[34px] sm:text-[44px] lg:text-[50px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#1d1d1f]">
              Otolaryngology & Skull Base Surgery.
            </h2>
            <p className="mt-4 text-[19px] sm:text-[22px] font-normal text-[#86868b] leading-[1.28] tracking-[-0.015em]">
              Precision microsurgery under Carl Zeiss OPMI Sensera optics and Medtronic 3D navigation, led by Chief Surgeon Dr. A. Ponnaiah.
            </p>
          </div>

          {/* 24/7 Emergency Card */}
          <div className="p-5 rounded-[20px] bg-[#f5f5f7] border border-black/[0.06] shrink-0 max-w-sm">
            <span className="text-[12px] font-medium text-[#0071e3] block mb-1">
              24/7 Acute ENT Emergency Helpline
            </span>
            <a 
              href="tel:+914428478899"
              className="text-[22px] font-semibold text-[#1d1d1f] hover:text-[#0071e3] tracking-[-0.02em] block font-mono tabular-nums transition-colors"
            >
              +91 44 2847 8899
            </a>
            <p className="text-[13px] text-[#86868b] mt-1 leading-snug">
              Foreign body in ear/nose · Acute epistaxis (bleeding) · Sudden sensorineural hearing loss.
            </p>
          </div>
        </div>

        {/* APPLE HEALTH STYLE PURE-TONE AUDITORY TESTER */}
        <div className="mb-20 rounded-[24px] bg-[#f5f5f7] border border-black/[0.06] p-6 sm:p-10 apple-product-shadow">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-black/[0.06]">
            <div>
              <div className="flex items-center gap-2 text-[12px] font-medium text-[#0071e3] mb-1">
                <Ear className="w-4 h-4" />
                <span>Auditory Spectrum Screener</span>
              </div>
              <h3 className="text-[22px] sm:text-[26px] font-semibold tracking-[-0.025em] text-[#1d1d1f]">
                Interactive Audiometric Frequency Response
              </h3>
              <p className="text-[14px] text-[#86868b] mt-1">
                Listen to sine tones across standard pure-tone speech frequencies (250 Hz – 8,000 Hz).
              </p>
            </div>

            <div className="text-[12px] text-[#86868b] font-mono tabular-nums">
              Core Human Speech Band: 500 Hz – 4,000 Hz
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
            {[
              { hz: 250, label: 'Deep Vowels', freq: '250 Hz' },
              { hz: 500, label: 'Low Resonance', freq: '500 Hz' },
              { hz: 1000, label: 'Core Vowels', freq: '1,000 Hz' },
              { hz: 2000, label: 'Consonants (P, T, K)', freq: '2,000 Hz' },
              { hz: 4000, label: 'High Clarity (S, F)', freq: '4,000 Hz' },
              { hz: 8000, label: 'High Tone', freq: '8,000 Hz' },
            ].map((tone) => (
              <button
                key={tone.hz}
                onClick={() => {
                  setSelectedHz(tone.hz);
                  playHearingTone(tone.hz);
                }}
                className={`p-4 rounded-[18px] text-left transition-all border cursor-pointer ${
                  selectedHz === tone.hz
                    ? 'bg-white border-[#0071e3] shadow-md'
                    : 'bg-white/80 border-black/[0.06] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[16px] font-semibold font-mono text-[#1d1d1f] tabular-nums">
                    {tone.freq}
                  </span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    selectedHz === tone.hz && isPlayingTone ? 'bg-[#0071e3] text-white animate-pulse' : 'bg-black/[0.06] text-[#86868b]'
                  }`}>
                    <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                  </div>
                </div>
                <span className="block text-[12px] text-[#86868b]">{tone.label}</span>
              </button>
            ))}
          </div>

          <div className="p-4 rounded-[16px] bg-white border border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#424245]">
            <span>
              If you experience difficulty discerning 2,000 Hz or 4,000 Hz frequencies, clinical pure-tone audiometry & BERA testing is indicated.
            </span>
            <button
              onClick={() => onBookProcedure(ENT_PROCEDURES[0])}
              className="apple-btn-primary !text-[13px] !px-4 !py-2 shrink-0"
            >
              Book In-Hospital Audiometry Test
            </button>
          </div>
        </div>

        {/* Category Pills (Apple Filter Style) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-normal tracking-[-0.01em] whitespace-nowrap transition-all border cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#1d1d1f] text-white border-[#1d1d1f]'
                  : 'bg-[#f5f5f7] text-[#424245] border-black/[0.06] hover:text-[#1d1d1f]'
              }`}
            >
              {cat === 'all' ? 'All ENT Specialties' : cat}
            </button>
          ))}
        </div>

        {/* Bento Grid of Procedures */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProcedures.map((proc) => (
            <div
              key={proc.id}
              className="p-7 rounded-[22px] bg-[#f5f5f7] border border-black/[0.06] hover:border-black/[0.15] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[12px] text-[#86868b] mb-3">
                  <span className="font-medium text-[#0071e3]">{proc.category}</span>
                  <span className="flex items-center gap-1 font-mono tabular-nums">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{proc.recoveryDays}</span>
                  </span>
                </div>

                <h3 className="text-[20px] font-semibold text-[#1d1d1f] tracking-[-0.02em] group-hover:text-[#0071e3] transition-colors mb-2.5">
                  {proc.title}
                </h3>

                <p className="text-[14px] text-[#6e6e73] leading-[1.45] mb-5">
                  {proc.shortDesc}
                </p>

                {/* Key Benefits */}
                <div className="space-y-2 mb-6">
                  {proc.keyBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-[13px] text-[#1d1d1f]">
                      <Check className="w-4 h-4 text-[#0071e3] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Technology used */}
                <div className="bg-white rounded-[14px] p-3.5 border border-black/[0.05] mb-6">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#86868b] block mb-1">
                    Operating Technology
                  </span>
                  <span className="text-[12px] text-[#1d1d1f] font-medium block">
                    {proc.technologiesUsed.join(' · ')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onBookProcedure(proc)}
                className="apple-link !text-[14px] font-medium group-hover:text-[#0071e3]"
              >
                <span>Consult on this procedure</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
