import React, { useState } from 'react';
import { DOCTORS_DATA } from '../../data/hospitalData';
import { 
  Award, 
  Clock, 
  Calendar, 
  GraduationCap, 
  Check, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface DoctorProfilesProps {
  onBookWithDoctor: (doctorId: string) => void;
}

export const DoctorProfiles: React.FC<DoctorProfilesProps> = ({ onBookWithDoctor }) => {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(DOCTORS_DATA[0].id);

  const activeDoctor = DOCTORS_DATA.find((d) => d.id === selectedDoctorId) || DOCTORS_DATA[0];

  return (
    <section id="doctors" className="py-24 bg-[#f5f5f7] text-[#1d1d1f] border-b border-black/[0.08]">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-8">
        {/* Section Header (Apple Display Style) */}
        <div className="max-w-2xl mb-16">
          <span className="text-[13px] font-medium text-[#0071e3] tracking-[-0.01em] block mb-2">
            Clinical Leadership & Surgical Chiefs
          </span>
          <h2 className="text-[34px] sm:text-[44px] lg:text-[50px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#1d1d1f]">
            Meet our chief surgeons.
          </h2>
          <p className="mt-4 text-[19px] sm:text-[22px] font-normal text-[#86868b] leading-[1.28] tracking-[-0.015em]">
            Dedicated sub-specialists in microscopic otolaryngology and advanced clinical embryology.
          </p>
        </div>

        {/* Doctor Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {DOCTORS_DATA.map((doc) => {
            const isSelected = doc.id === activeDoctor.id;
            const isEnt = doc.unit === 'ent';

            return (
              <div
                key={doc.id}
                onClick={() => setSelectedDoctorId(doc.id)}
                className={`cursor-pointer rounded-[22px] p-6 sm:p-7 transition-all duration-200 border text-left ${
                  isSelected
                    ? 'bg-white border-[#0071e3] shadow-lg shadow-black/[0.06] scale-[1.01]'
                    : 'bg-white/70 border-black/[0.06] hover:bg-white hover:border-black/[0.12]'
                }`}
              >
                <div className="flex items-center justify-between text-[12px] text-[#86868b] mb-4">
                  <span className={`font-medium ${isEnt ? 'text-[#0071e3]' : 'text-rose-500'}`}>
                    {isEnt ? 'Chief ENT Surgeon · Primary Focus' : 'Chief Fertility Specialist · 2nd Focus'}
                  </span>
                  <span className="font-mono tabular-nums">{doc.experienceYears}+ Years Exp</span>
                </div>

                <div className="flex items-center gap-5">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-[18px] overflow-hidden shrink-0 bg-[#e5e5ea] border border-black/[0.06]">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div>
                    <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#1d1d1f] tracking-[-0.02em]">
                      {doc.name}
                    </h3>
                    <p className="text-[13px] text-[#86868b] font-mono mt-0.5">
                      {doc.degrees}
                    </p>
                    <p className="text-[13px] text-[#424245] mt-1 line-clamp-1">
                      {doc.title}
                    </p>
                  </div>
                </div>

                {/* Metric row */}
                <div className="mt-5 pt-4 border-t border-black/[0.06] grid grid-cols-2 gap-3">
                  <div>
                    <span className="block text-[20px] font-semibold text-[#1d1d1f] font-mono tabular-nums">
                      {isEnt ? doc.surgeriesCount : doc.babiesDelivered}
                    </span>
                    <span className="text-[12px] text-[#86868b]">
                      {isEnt ? 'ENT Surgeries Performed' : 'Healthy IVF Deliveries'}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[20px] font-semibold text-[#1d1d1f] font-mono tabular-nums">
                      {doc.successRate}
                    </span>
                    <span className="text-[12px] text-[#86868b]">
                      Audited Success Rate
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ACTIVE DOCTOR COMPREHENSIVE DOSSIER */}
        <div className="rounded-[28px] bg-white border border-black/[0.08] p-8 sm:p-12 apple-product-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Doctor Portrait & Quick Booking (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-56 h-64 sm:w-64 sm:h-72 rounded-[22px] overflow-hidden border border-black/[0.08] apple-product-shadow bg-[#e5e5ea]">
                <img
                  src={activeDoctor.image}
                  alt={activeDoctor.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="mt-6 w-full space-y-3">
                <button
                  onClick={() => onBookWithDoctor(activeDoctor.id)}
                  className="apple-btn-primary !w-full !py-3 !text-[15px]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation with {activeDoctor.name.split(' ')[1] || activeDoctor.name}</span>
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[12px] text-[#86868b]">
                  <ShieldCheck className="w-4 h-4 text-[#0071e3]" />
                  <span>Verified Medical Council Specialist</span>
                </div>
              </div>

              {/* OPD Consultation Hours */}
              <div className="mt-6 w-full rounded-[18px] bg-[#f5f5f7] p-4 text-left border border-black/[0.05]">
                <span className="text-[12px] font-semibold text-[#1d1d1f] uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                  <Clock className="w-3.5 h-3.5 text-[#86868b]" />
                  OPD Consultation Timings
                </span>
                <div className="space-y-2 text-[13px]">
                  {activeDoctor.opdSchedule.map((sched, idx) => (
                    <div key={idx} className="pb-2 border-b border-black/[0.05] last:border-0 last:pb-0">
                      <span className="font-medium text-[#1d1d1f] block">{sched.day}</span>
                      <div className="flex justify-between text-[#86868b] mt-0.5">
                        <span>{sched.timings}</span>
                        <span className="font-mono text-[11px] text-[#1d1d1f]">{sched.room}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Doctor Dossier & Specializations (8 Cols) */}
            <div className="lg:col-span-8">
              <div className="border-b border-black/[0.08] pb-5 mb-5">
                <span className="text-[13px] font-medium text-[#0071e3] block mb-1">
                  {activeDoctor.unit === 'ent' ? 'Chief ENT Surgeon' : 'Director of IVF & Embryology'}
                </span>
                <h3 className="text-[28px] sm:text-[34px] font-semibold text-[#1d1d1f] tracking-[-0.025em]">
                  {activeDoctor.name}
                </h3>
                <p className="text-[14px] text-[#0071e3] font-mono mt-0.5">
                  {activeDoctor.degrees}
                </p>
                <p className="text-[14px] text-[#86868b] mt-1">
                  {activeDoctor.title} · Languages: {activeDoctor.languages.join(', ')}
                </p>
              </div>

              {/* Quote */}
              <div className="p-4 rounded-[16px] bg-[#f5f5f7] border-l-2 border-[#0071e3] italic text-[15px] text-[#1d1d1f] mb-6 leading-relaxed">
                “{activeDoctor.quote}”
              </div>

              <p className="text-[15px] text-[#424245] leading-[1.5] mb-6">
                {activeDoctor.bio}
              </p>

              {/* Specializations */}
              <div className="mb-6">
                <h4 className="text-[13px] font-semibold text-[#1d1d1f] uppercase tracking-wider mb-3">
                  Core Clinical Specializations:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeDoctor.specializations.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2.5 rounded-[12px] bg-[#f5f5f7] text-[13px] text-[#1d1d1f]"
                    >
                      <Check className="w-3.5 h-3.5 text-[#0071e3] shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Qualifications & Fellowships */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-black/[0.08]">
                <div>
                  <h4 className="text-[13px] font-semibold text-[#1d1d1f] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#0071e3]" />
                    Academic Degrees
                  </h4>
                  <div className="space-y-2 text-[13px]">
                    {activeDoctor.qualifications.map((q, i) => (
                      <div key={i} className="p-2.5 rounded-[12px] bg-[#f5f5f7]">
                        <span className="font-semibold text-[#1d1d1f] block">{q.degree}</span>
                        <span className="text-[#86868b] text-[12px] block">{q.institution}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[13px] font-semibold text-[#1d1d1f] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500" />
                    International Fellowships
                  </h4>
                  <div className="space-y-2 text-[13px]">
                    {activeDoctor.fellowships.map((f, i) => (
                      <div key={i} className="p-2.5 rounded-[12px] bg-[#f5f5f7] text-[#1d1d1f] text-[12px]">
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
