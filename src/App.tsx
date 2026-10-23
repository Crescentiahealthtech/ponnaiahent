import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HospitalHero } from './components/hero/HospitalHero';
import { AnatomyViewer3D } from './components/3d/AnatomyViewer3D';
import { InteractiveAnatomyDiagram } from './components/anatomy/InteractiveAnatomyDiagram';
import { ENTUnitSection } from './components/units/ENTUnitSection';
import { IVFUnitSection } from './components/units/IVFUnitSection';
import { DoctorProfiles } from './components/doctors/DoctorProfiles';
import { TechInfrastructure } from './components/technology/TechInfrastructure';
import { PatientTestimonials } from './components/testimonials/PatientTestimonials';
import { Footer } from './components/layout/Footer';
import { AppointmentModal } from './components/booking/AppointmentModal';
import { SymptomCheckerModal } from './components/checker/SymptomCheckerModal';
import { SitemapModal } from './components/sitemap/SitemapModal';
import { ProcedureItem } from './types/hospital';
import { 
  Rotate3d, 
  Calendar, 
  HelpCircle, 
  PhoneCall, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedUnitForBooking, setSelectedUnitForBooking] = useState<'ent' | 'ivf'>('ent');
  const [selectedDoctorIdForBooking, setSelectedDoctorIdForBooking] = useState<string | undefined>();
  const [selectedReasonForBooking, setSelectedReasonForBooking] = useState<string | undefined>();

  const [symptomModalOpen, setSymptomModalOpen] = useState(false);
  const [sitemapModalOpen, setSitemapModalOpen] = useState(false);
  const [anatomy3DInitialSystem, setAnatomy3DInitialSystem] = useState<'ent' | 'ivf'>('ent');

  const handleOpenBooking = (unit: 'ent' | 'ivf' = 'ent', doctorId?: string, reason?: string) => {
    setSelectedUnitForBooking(unit);
    setSelectedDoctorIdForBooking(doctorId);
    setSelectedReasonForBooking(reason);
    setBookingModalOpen(true);
  };

  const handleBookProcedure = (proc: ProcedureItem) => {
    handleOpenBooking(proc.unit, undefined, `Consultation for ${proc.title}`);
  };

  const handleBookWithDoctor = (docId: string) => {
    const isEnt = docId.includes('ent');
    handleOpenBooking(isEnt ? 'ent' : 'ivf', docId);
  };

  const handleExplore3DAnatomy = (unit: 'ent' | 'ivf' = 'ent') => {
    setAnatomy3DInitialSystem(unit);
    const element = document.getElementById('anatomy-lab');
    if (element) {
      const yOffset = -56;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleNavigateFromSitemap = (targetId: string) => {
    if (targetId === 'book-action') {
      handleOpenBooking('ent');
      return;
    }
    if (targetId === 'symptom-checker-trigger') {
      setSymptomModalOpen(true);
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -56;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] flex flex-col font-sans selection:bg-[#0071e3] selection:text-white">
      {/* 1. Apple-Style Dual-Row Navigation */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenSymptomChecker={() => setSymptomModalOpen(true)}
        onOpenSitemap={() => setSitemapModalOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Full-Bleed Dark Product Tile: Hero */}
        <HospitalHero
          onOpenBooking={handleOpenBooking}
          onExplore3DAnatomy={handleExplore3DAnatomy}
        />

        {/* 3. Full-Bleed Dark Tile: Interactive 3D Anatomy Laboratory */}
        <section id="anatomy-lab" className="py-24 bg-[#161617] text-white border-b border-white/[0.08]">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-8">
            <div className="max-w-2xl mb-14">
              <span className="text-[13px] font-medium text-[#2997ff] tracking-[-0.01em] block mb-2">
                Realtime 3D Biomechanical Laboratory
              </span>
              <h2 className="text-[34px] sm:text-[44px] lg:text-[50px] font-semibold tracking-[-0.03em] leading-[1.08] text-white">
                Inspect human anatomy at the microscopic scale.
              </h2>
              <p className="mt-4 text-[19px] sm:text-[22px] font-normal text-[#86868b] leading-[1.28] tracking-[-0.015em]">
                Rotate, zoom, and explode procedural 3D models. Switch between <strong>ENT Auditory Anatomy</strong> and <strong>IVF Blastocyst Embryology</strong>.
              </p>
            </div>

            {/* Three.js 3D Viewport Component */}
            <AnatomyViewer3D
              initialSystem={anatomy3DInitialSystem}
              onScheduleConsultation={(system) => handleOpenBooking(system)}
            />
          </div>
        </section>

        {/* 4. Apple Parchment Canvas: Interactive Cross-Section Atlas */}
        <section id="anatomy-diagram" className="py-24 bg-[#f5f5f7] border-b border-black/[0.08]">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-8">
            <InteractiveAnatomyDiagram
              onBookAppointment={(unit, reason) => handleOpenBooking(unit, undefined, reason)}
            />
          </div>
        </section>

        {/* 5. Pure White Canvas: ENT Super-Speciality (Primary Focus) */}
        <ENTUnitSection onBookProcedure={handleBookProcedure} />

        {/* 6. Dark Tile Canvas: IVF & Reproductive Medicine (Secondary Focus) */}
        <IVFUnitSection onBookProcedure={handleBookProcedure} />

        {/* 7. Apple Parchment Canvas: The Two Chief Doctor Profiles */}
        <DoctorProfiles onBookWithDoctor={handleBookWithDoctor} />

        {/* 8. Pure White Canvas: Technology & Operating Infrastructure */}
        <TechInfrastructure />

        {/* 9. Apple Parchment Canvas: Patient Outcomes & Clinical Testimonials */}
        <PatientTestimonials />

        {/* 10. Apple Dark Canvas: Pre-Footer Conversion */}
        <section className="py-24 bg-[#000000] text-white border-t border-white/[0.08]">
          <div className="max-w-[1080px] mx-auto px-4 sm:px-8 text-center flex flex-col items-center">
            <span className="text-[13px] font-medium text-[#2997ff] tracking-[-0.01em] block mb-2">
              Tertiary Surgical Referral Center · Zero Waiting Time
            </span>
            <h2 className="text-[34px] sm:text-[46px] lg:text-[54px] font-semibold tracking-[-0.03em] leading-[1.06] text-white max-w-2xl">
              Ready to experience world-class clinical care?
            </h2>
            <p className="mt-4 text-[19px] sm:text-[22px] font-normal text-[#86868b] leading-[1.28] tracking-[-0.015em] max-w-xl">
              Consult with our chief surgeons in-person at Chennai or schedule an online tele-video second opinion.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => handleOpenBooking('ent')}
                className="apple-btn-primary !px-7 !py-3.5 !text-[16px]"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule ENT Consultation</span>
              </button>

              <button
                onClick={() => handleOpenBooking('ivf')}
                className="apple-btn-secondary !px-7 !py-3.5 !text-[16px] !text-white !border-white/30 hover:!border-white/60 hover:!bg-white/5"
              >
                <span>Schedule IVF Consultation</span>
              </button>

              <button
                onClick={() => setSymptomModalOpen(true)}
                className="apple-link-dark !text-[16px] ml-2"
              >
                <HelpCircle className="w-4 h-4 mr-1 text-[#2997ff]" />
                <span>Screen Symptoms</span>
                <span className="text-sm">›</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 11. Apple Parchment Footer */}
      <Footer
        onOpenSitemap={() => setSitemapModalOpen(true)}
        onOpenBooking={handleOpenBooking}
      />

      {/* Floating Apple-Frosted Emergency Pill */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="tel:+914428478899"
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#161617]/90 text-white border border-white/10 shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all backdrop-blur-xl group cursor-pointer text-decoration-none"
        >
          <div className="w-6 h-6 rounded-full bg-[#0071e3] flex items-center justify-center text-white">
            <PhoneCall className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <span className="text-[10px] text-[#2997ff] block font-mono leading-none">24/7 EMERGENCY</span>
            <span className="text-[13px] font-semibold text-white leading-tight font-mono tabular-nums">+91 44 2847 8899</span>
          </div>
        </a>
      </div>

      {/* Interactive Modals */}
      <AppointmentModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedUnit={selectedUnitForBooking}
        preselectedDoctorId={selectedDoctorIdForBooking}
        preselectedReason={selectedReasonForBooking}
      />

      <SymptomCheckerModal
        isOpen={symptomModalOpen}
        onClose={() => setSymptomModalOpen(false)}
        onProceedToBooking={(unit, symptom) => handleOpenBooking(unit, undefined, symptom)}
      />

      <SitemapModal
        isOpen={sitemapModalOpen}
        onClose={() => setSitemapModalOpen(false)}
        onNavigate={handleNavigateFromSitemap}
      />
    </div>
  );
}
