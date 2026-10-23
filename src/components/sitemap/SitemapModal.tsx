import React from 'react';
import { 
  X, 
  Map, 
  ChevronRight, 
  Volume2, 
  Sparkles, 
  Rotate3d, 
  Stethoscope, 
  Activity,
  Calendar,
  ShieldCheck
} from 'lucide-react';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (targetId: string) => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const sitemapGroups = [
    {
      title: 'ENT Microsurgery Institute (Primary Focus)',
      icon: Volume2,
      badge: 'Main Focus',
      links: [
        { label: 'Overview & 24/7 ENT Emergency Service', id: 'ent-unit' },
        { label: 'Micro-Ear Surgery & Tympanoplasty', id: 'ent-unit' },
        { label: '3D Navigation FESS (Sinus Surgery)', id: 'ent-unit' },
        { label: 'Cochlear Implantation Program', id: 'ent-unit' },
        { label: 'Coblation Adenotonsillectomy (Pediatric)', id: 'ent-unit' },
        { label: 'Phonosurgery & Professional Voice Clinic', id: 'ent-unit' },
        { label: 'Advanced Vertigo & Balance Clinic (VNG)', id: 'ent-unit' },
        { label: 'Interactive Auditory Frequency Spectrum Screener', id: 'ent-unit' },
      ],
    },
    {
      title: 'IVF & Human Embryology (Secondary Focus)',
      icon: Sparkles,
      badge: '2nd Focus',
      links: [
        { label: 'Overview & ISO Class 5 Cleanroom Lab', id: 'ivf-unit' },
        { label: 'Single-Cell ICSI Micro-Injection', id: 'ivf-unit' },
        { label: 'Day 5 Blastocyst Culture & PGT-A Genetics', id: 'ivf-unit' },
        { label: 'Cryopreservation & Social Egg Freezing', id: 'ivf-unit' },
        { label: '3D Laparoscopic Fertility Enhancing Surgery', id: 'ivf-unit' },
        { label: 'Male Infertility & Micro-TESE Program', id: 'ivf-unit' },
        { label: '5-Stage Interactive Fertility Journey Carousel', id: 'ivf-unit' },
        { label: 'Audited Clinical Live Birth Rate Calculator', id: 'ivf-unit' },
      ],
    },
    {
      title: '3D Interactive Anatomy Labs',
      icon: Rotate3d,
      badge: '3D Simulation',
      links: [
        { label: 'Interactive 3D Ear & Cochlea Anatomy', id: 'anatomy-lab' },
        { label: 'Interactive 3D Blastocyst & ICSI Micropipette', id: 'anatomy-lab' },
        { label: 'Exploded View Separation & Cutaways', id: 'anatomy-lab' },
        { label: 'Diagnostic Anatomical Cross-Section Atlas', id: 'anatomy-diagram' },
      ],
    },
    {
      title: 'Medical Leadership & Chief Surgeons',
      icon: Stethoscope,
      badge: 'Surgeons',
      links: [
        { label: 'Dr. A. Ponnaiah – Chief ENT & Head & Neck Surgeon', id: 'doctors' },
        { label: 'Dr. S. Radhika Ponnaiah – Chief Fertility Specialist (OG)', id: 'doctors' },
        { label: 'Surgeon Credentials & International Fellowships', id: 'doctors' },
        { label: 'OPD Consultation Schedules & Room Locations', id: 'doctors' },
      ],
    },
    {
      title: 'Surgical Technology & Infrastructure',
      icon: Activity,
      badge: 'Technology',
      links: [
        { label: 'Carl Zeiss OPMI Sensera Surgical Microscopes', id: 'technology' },
        { label: 'Karl Storz 4K UHD Endoscopy & Navigation', id: 'technology' },
        { label: 'ISO Class 5 Positive-Pressure Cleanroom Lab', id: 'technology' },
        { label: 'RI Witness RFID Electronic Matching System', id: 'technology' },
        { label: 'Verified Patient Recovery Stories & Testimonials', id: 'testimonials' },
      ],
    },
    {
      title: 'Direct Patient Services',
      icon: Calendar,
      badge: 'Patient Gateway',
      links: [
        { label: 'Schedule In-Person or Tele-Video Consultation', id: 'book-action' },
        { label: 'Interactive Clinical Symptom Screener', id: 'symptom-checker-trigger' },
        { label: '24/7 Acute Emergency Line (+91 44 2847 8899)', id: 'footer' },
        { label: 'Hospital Campus Address & Visiting Hours', id: 'footer' },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="bg-white rounded-[26px] max-w-4xl w-full max-h-[88vh] overflow-y-auto shadow-2xl border border-black/[0.08] text-[#1d1d1f]">
        {/* Header */}
        <div className="p-6 border-b border-black/[0.06] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div>
            <span className="text-[12px] font-medium text-[#0071e3] block">
              Hospital Directory
            </span>
            <h3 className="text-[20px] font-semibold text-[#1d1d1f] tracking-[-0.02em] mt-0.5">
              Comprehensive Architectural Sitemap
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f5f5f7] hover:bg-[#e5e5ea] text-[#1d1d1f] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Directory Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sitemapGroups.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div key={idx} className="p-5 rounded-[18px] bg-[#f5f5f7] border border-black/[0.05] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-4 h-4 text-[#0071e3]" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#86868b]">
                      {group.badge}
                    </span>
                  </div>
                  <h4 className="text-[15px] font-semibold text-[#1d1d1f] mb-3 tracking-[-0.01em]">
                    {group.title}
                  </h4>
                  <ul className="space-y-1.5 text-[13px]">
                    {group.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <button
                          onClick={() => {
                            onNavigate(link.id);
                            onClose();
                          }}
                          className="w-full text-left py-1 text-[#424245] hover:text-[#0071e3] transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <ChevronRight className="w-3 h-3 text-[#86868b] shrink-0" />
                          <span className="line-clamp-1">{link.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-6 bg-[#fafafc] border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#86868b]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0071e3]" />
            <span>Ponnaiah ENT & IVF Super Speciality Hospital · NABH Accredited</span>
          </div>
          <span className="font-mono text-[11px]">
            Repository: crescentiahealthtech/ponnaiahent
          </span>
        </div>
      </div>
    </div>
  );
};
