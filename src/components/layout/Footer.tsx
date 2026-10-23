import React from 'react';
import { 
  Volume2, 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  ArrowUp, 
  ExternalLink 
} from 'lucide-react';

interface FooterProps {
  onOpenSitemap: () => void;
  onOpenBooking: (unit?: 'ent' | 'ivf') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSitemap, onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#f5f5f7] text-[#6e6e73] pt-16 pb-12 border-t border-black/[0.08] text-[12px]">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-8">
        {/* Footnote Disclaimers */}
        <div className="border-b border-black/[0.08] pb-6 mb-10 space-y-2 text-[11px] leading-relaxed text-[#86868b]">
          <p>
            1. Clinical success rates quoted for In Vitro Fertilization (IVF) and Intracytoplasmic Sperm Injection (ICSI) reflect audited live take-home baby deliveries per embryo transfer cycle conducted in accordance with ESHRE and ISAR reporting standards. Individual results depend upon ovarian reserve, age, and biological factors.
          </p>
          <p>
            2. Tympanic membrane graft uptake rates ($99.4\%$) represent cumulative microscopic tympanoplasty outcomes tracked across $15,200+$ documented surgical interventions by Dr. A. Ponnaiah.
          </p>
          <p>
            3. In medical emergencies such as acute airway obstruction, foreign body aspiration, severe epistaxis (nosebleeds), or acute obstetric distress, please immediately call our 24/7 dedicated emergency line at +91 44 2847 8899.
          </p>
        </div>

        {/* Apple 4-Column Directory (Relaxed Leading 2.41) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: ENT Speciality */}
          <div>
            <h4 className="font-semibold text-[#1d1d1f] text-[12px] uppercase tracking-wider mb-3">
              ENT Microsurgery (Primary)
            </h4>
            <ul className="space-y-1 text-[13px] leading-[2.2]">
              <li><a href="#ent-unit" className="hover:text-[#0071e3] transition-colors">Micro-Ear Tympanoplasty</a></li>
              <li><a href="#ent-unit" className="hover:text-[#0071e3] transition-colors">Cochlear Implant Center</a></li>
              <li><a href="#ent-unit" className="hover:text-[#0071e3] transition-colors">3D Navigation FESS (Sinus)</a></li>
              <li><a href="#ent-unit" className="hover:text-[#0071e3] transition-colors">Coblation Adenotonsillectomy</a></li>
              <li><a href="#ent-unit" className="hover:text-[#0071e3] transition-colors">Voice Clinic & Phonosurgery</a></li>
              <li><a href="#ent-unit" className="hover:text-[#0071e3] transition-colors">Vertigo & VNG Balance Suite</a></li>
              <li><a href="#ent-unit" className="hover:text-[#0071e3] transition-colors">Pediatric Airway Clinic</a></li>
            </ul>
          </div>

          {/* Column 2: IVF Speciality */}
          <div>
            <h4 className="font-semibold text-[#1d1d1f] text-[12px] uppercase tracking-wider mb-3">
              IVF & Embryology (2nd Focus)
            </h4>
            <ul className="space-y-1 text-[13px] leading-[2.2]">
              <li><a href="#ivf-unit" className="hover:text-[#0071e3] transition-colors">Single-Sperm ICSI Injection</a></li>
              <li><a href="#ivf-unit" className="hover:text-[#0071e3] transition-colors">Day 5 Blastocyst Culture</a></li>
              <li><a href="#ivf-unit" className="hover:text-[#0071e3] transition-colors">PGT-A Genetic Screening</a></li>
              <li><a href="#ivf-unit" className="hover:text-[#0071e3] transition-colors">Social Egg & Embryo Freezing</a></li>
              <li><a href="#ivf-unit" className="hover:text-[#0071e3] transition-colors">3D Laparoscopic Fertility Surgery</a></li>
              <li><a href="#ivf-unit" className="hover:text-[#0071e3] transition-colors">Male Infertility & Micro-TESE</a></li>
              <li><a href="#ivf-unit" className="hover:text-[#0071e3] transition-colors">Recurrent Implantation Clinic</a></li>
            </ul>
          </div>

          {/* Column 3: 3D Lab & Diagnostics */}
          <div>
            <h4 className="font-semibold text-[#1d1d1f] text-[12px] uppercase tracking-wider mb-3">
              3D Labs & Infrastructure
            </h4>
            <ul className="space-y-1 text-[13px] leading-[2.2]">
              <li><a href="#anatomy-lab" className="hover:text-[#0071e3] transition-colors">3D Anatomy Laboratory</a></li>
              <li><a href="#anatomy-diagram" className="hover:text-[#0071e3] transition-colors">Cross-Section Atlas</a></li>
              <li><a href="#technology" className="hover:text-[#0071e3] transition-colors">Carl Zeiss OPMI Sensera</a></li>
              <li><a href="#technology" className="hover:text-[#0071e3] transition-colors">Karl Storz 4K UHD Tower</a></li>
              <li><a href="#technology" className="hover:text-[#0071e3] transition-colors">ISO Class 5 Cleanroom Lab</a></li>
              <li><a href="#technology" className="hover:text-[#0071e3] transition-colors">RI Witness RFID Security</a></li>
              <li>
                <button onClick={onOpenSitemap} className="hover:text-[#0071e3] transition-colors flex items-center gap-1 cursor-pointer">
                  <span>Interactive Visual Sitemap</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Hospital & Leadership */}
          <div>
            <h4 className="font-semibold text-[#1d1d1f] text-[12px] uppercase tracking-wider mb-3">
              Hospital & Leadership
            </h4>
            <ul className="space-y-1 text-[13px] leading-[2.2]">
              <li><a href="#doctors" className="hover:text-[#0071e3] transition-colors">Dr. A. Ponnaiah (ENT)</a></li>
              <li><a href="#doctors" className="hover:text-[#0071e3] transition-colors">Dr. S. Radhika Ponnaiah (IVF)</a></li>
              <li><a href="#testimonials" className="hover:text-[#0071e3] transition-colors">Patient Success Case Studies</a></li>
              <li><a href="tel:+914428478899" className="text-[#0071e3] font-semibold hover:underline">24/7 Trauma: +91 44 2847 8899</a></li>
              <li><span className="text-[#1d1d1f]">OPD: 1800-ENT-BABY</span></li>
              <li>
                <a 
                  href="https://github.com/Crescentiahealthtech/ponnaiahent" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[#0071e3] hover:underline flex items-center gap-1"
                >
                  <span>Crescentia Healthtech Repo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Address and Accreditation row */}
        <div className="pt-6 border-t border-black/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[12px]">
          <div>
            <span className="font-semibold text-[#1d1d1f]">Ponnaiah ENT & IVF Super Speciality Hospital</span>
            <span className="text-[#86868b] block sm:inline sm:ml-2">
              #42, Crescent Healthcare Boulevard, Off Med-Tech Corridor, Chennai, TN – 600018
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[#0071e3] hover:underline cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#86868b]">
          <p>© {new Date().getFullYear()} Ponnaiah ENT & IVF Super Speciality Hospital. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#1d1d1f]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>NABH Accredited Tertiary Center</span>
            </span>
            <span>·</span>
            <span>ISO 9001:2015 Registered</span>
            <span>·</span>
            <span>ESHRE Quality Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
