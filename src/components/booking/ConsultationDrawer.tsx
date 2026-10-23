import React, { useState, useEffect } from 'react';
import { X, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SPECIALISTS, HOSPITAL_IDENTITY } from '../../data/clinicalData';

export default function ConsultationDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [division, setDivision] = useState<'ENT' | 'IVF'>('ENT');
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [visitType, setVisitType] = useState('Primary Specialist Consultation');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ division?: 'ENT' | 'IVF' }>;
      if (customEvent.detail?.division) {
        setDivision(customEvent.detail.division);
      }
      setSubmitted(false);
      setIsOpen(true);
    };

    window.addEventListener('open-consultation-drawer', handleOpen);
    return () => window.removeEventListener('open-consultation-drawer', handleOpen);
  }, []);

  const activeDoctor =
    division === 'ENT' ? SPECIALISTS[0] : SPECIALISTS[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const text = encodeURIComponent(
      `*PONNAIAH ENT & IVF — PRIORITY APPOINTMENT REQUEST*\n` +
        `• Division: ${division} Super Speciality\n` +
        `• Specialist: ${activeDoctor.name} (${activeDoctor.credentials})\n` +
        `• Patient Name: ${patientName}\n` +
        `• Contact: ${phone}\n` +
        `• Preferred Date: ${preferredDate || 'Immediate Next Slot'}\n` +
        `• Visit Protocol: ${visitType}`
    );
    window.open(
      `https://wa.me/${HOSPITAL_IDENTITY.conciergeWhatsApp}?text=${text}`,
      '_blank'
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-canvas border-l border-hairline-dark h-full overflow-y-auto p-8 sm:p-12 flex flex-col justify-between">
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-hairline-dark mb-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-caption text-lunar-cyan">
                DIRECT CLINICAL CONCIERGE
              </p>
              <h3 className="text-2xl font-medium text-white mt-1">
                Configure Specialist Appointment
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 border border-hairline-dark flex items-center justify-center text-white hover:bg-canvas-elevated rounded-none"
              aria-label="Close booking drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step 1: Select Division */}
          <div className="mb-8">
            <label className="block font-mono text-[11px] uppercase tracking-caption text-ink-body mb-3">
              01 · SELECT CLINICAL WING
            </label>
            <div className="grid grid-cols-2 border border-hairline-dark">
              <button
                type="button"
                onClick={() => setDivision('ENT')}
                className={`p-4 text-left rounded-none transition-colors ${
                  division === 'ENT'
                    ? 'bg-lunar-cyan text-canvas-deep font-bold'
                    : 'bg-canvas text-white hover:bg-canvas-elevated'
                }`}
              >
                <div className="font-mono text-[10px] uppercase">WING 01</div>
                <div className="text-sm mt-1">ENT & Micro-Ear Centre</div>
                <div className="text-xs opacity-80 mt-0.5">Dr. Gopinath</div>
              </button>
              <button
                type="button"
                onClick={() => setDivision('IVF')}
                className={`p-4 text-left border-l border-hairline-dark rounded-none transition-colors ${
                  division === 'IVF'
                    ? 'bg-rosso text-white font-bold'
                    : 'bg-canvas text-white hover:bg-canvas-elevated'
                }`}
              >
                <div className="font-mono text-[10px] uppercase">WING 02</div>
                <div className="text-sm mt-1">IVF & Fertility Centre</div>
                <div className="text-xs opacity-80 mt-0.5">Dr. Manopriya Gopinath</div>
              </button>
            </div>
          </div>

          {/* Active Specialist Summary Plate */}
          <div className="p-5 bg-canvas-elevated border border-hairline-dark mb-8">
            <div className="font-mono text-[10px] uppercase tracking-caption text-lunar-silver">
              ASSIGNED LEAD CONSULTANT
            </div>
            <div className="text-lg font-medium text-white mt-1">
              {activeDoctor.name}
            </div>
            <div className="text-xs text-ink-body mt-0.5">
              {activeDoctor.credentials}
            </div>
            <div className="mt-3 pt-3 border-t border-white/10 font-mono text-[11px] text-white/80">
              {activeDoctor.consultationTimings}
            </div>
          </div>

          {/* Step 2: Patient Telemetry Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-caption text-ink-body mb-2">
                02 · PATIENT FULL NAME
              </label>
              <input
                type="text"
                required
                placeholder="Enter full name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full h-12 px-4 bg-canvas-deep border border-hairline-dark text-white text-sm rounded-[4px] focus:outline-none focus:border-lunar-cyan"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-caption text-ink-body mb-2">
                  MOBILE / WHATSAPP NUMBER
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-12 px-4 bg-canvas-deep border border-hairline-dark text-white text-sm rounded-[4px] focus:outline-none focus:border-lunar-cyan"
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-caption text-ink-body mb-2">
                  PREFERRED DATE
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full h-12 px-4 bg-canvas-deep border border-hairline-dark text-white text-sm rounded-[4px] focus:outline-none focus:border-lunar-cyan"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-caption text-ink-body mb-2">
                CONSULTATION PROTOCOL
              </label>
              <select
                value={visitType}
                onChange={(e) => setVisitType(e.target.value)}
                className="w-full h-12 px-4 bg-canvas-deep border border-hairline-dark text-white text-sm rounded-[4px] focus:outline-none focus:border-lunar-cyan"
              >
                {division === 'ENT' ? (
                  <>
                    <option>Micro-Ear & Pure-Tone Audiometry Evaluation</option>
                    <option>4K Endoscopic Sinus & Allergy Assessment</option>
                    <option>Cochlear Implant & Hearing Aid Consultation</option>
                    <option>Vertigo, Tinnitus & Voice Clinic</option>
                  </>
                ) : (
                  <>
                    <option>Comprehensive Fertility & Couple Workup</option>
                    <option>IVF / ICSI Cycle Planning & Counseling</option>
                    <option>IUI & Ovulation Induction Protocol</option>
                    <option>Cryo-Preservation & Second Opinion</option>
                  </>
                )}
              </select>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className={`w-full h-12 rounded-none font-bold text-sm uppercase tracking-cta flex items-center justify-center gap-3 ${
                  division === 'ENT'
                    ? 'bg-lunar-cyan text-canvas-deep'
                    : 'bg-rosso text-white'
                }`}
              >
                <span>CONFIRM & DISPATCH PRIORITY OP SLOT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {submitted && (
              <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 flex items-center gap-3 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Appointment dossier prepared. Proceeding to direct hospital concierge confirmation.
                </span>
              </div>
            )}
          </form>
        </div>

        <div className="pt-8 border-t border-hairline-dark mt-8 flex items-center justify-between text-xs font-mono text-ink-body">
          <span>24/7 EMERGENCY LINE</span>
          <a href={`tel:${HOSPITAL_IDENTITY.emergencyHotline}`} className="text-white">
            {HOSPITAL_IDENTITY.emergencyHotline}
          </a>
        </div>
      </div>
    </div>
  );
}

