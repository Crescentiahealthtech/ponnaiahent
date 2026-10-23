import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  PhoneCall, 
  ChevronRight,
  ShieldCheck,
  Compass
} from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (unit?: 'ent' | 'ivf') => void;
  onOpenSymptomChecker: () => void;
  onOpenSitemap: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenSymptomChecker,
  onOpenSitemap,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -56;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Apple 44px Global Navigation Bar */}
      <div className="h-11 bg-[#000000] text-[#f5f5f7] border-b border-white/[0.08] flex items-center px-4 sm:px-8 text-[12px] font-normal tracking-[-0.01em]">
        <div className="max-w-[1080px] w-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-semibold text-white tracking-[-0.02em] hover:text-[#2997ff] transition-colors"
            >
              Ponnaiah Healthcare
            </a>
            <span className="hidden sm:inline text-white/30">/</span>
            <span className="hidden sm:inline text-[#86868b]">
              Centre of Excellence for Otolaryngology & Human Embryology
            </span>
          </div>

          <div className="flex items-center gap-5 text-[#86868b]">
            <a 
              href="tel:+914428478899"
              className="text-[#2997ff] hover:text-[#52aaff] flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3 h-3" />
              <span>24/7 Hotline: +91 44 2847 8899</span>
            </a>
            <span className="hidden md:inline text-white/20">|</span>
            <button
              onClick={onOpenSymptomChecker}
              className="hidden md:inline hover:text-white transition-colors cursor-pointer"
            >
              Symptom Screener
            </button>
            <span className="hidden md:inline text-white/20">|</span>
            <button
              onClick={onOpenSitemap}
              className="hidden md:inline hover:text-white transition-colors cursor-pointer"
            >
              Sitemap
            </button>
          </div>
        </div>
      </div>

      {/* Apple 52px Sticky Sub-Navigation (Frosted Glass) */}
      <nav 
        className={`h-[52px] px-4 sm:px-8 border-b transition-all duration-300 ${
          isScrolled 
            ? 'apple-frosted border-black/[0.08] shadow-[0_1px_4px_rgba(0,0,0,0.04)] text-[#1d1d1f]' 
            : 'bg-white/90 border-black/[0.05] text-[#1d1d1f]'
        }`}
      >
        <div className="max-w-[1080px] w-full mx-auto h-full flex items-center justify-between gap-6">
          {/* Brand Name (21px weight 600) */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[19px] sm:text-[21px] font-semibold tracking-[-0.025em] text-[#1d1d1f] hover:opacity-80 transition-opacity whitespace-nowrap shrink-0"
          >
            Ponnaiah ENT & IVF
          </a>

          {/* Desktop Nav Links (14px clean typography) */}
          <div className="hidden lg:flex items-center gap-7 text-[13px] text-[#424245] tracking-[-0.01em]">
            <button
              onClick={() => scrollToSection('ent-unit')}
              className="hover:text-[#0071e3] transition-colors cursor-pointer whitespace-nowrap"
            >
              ENT Surgery
            </button>
            <button
              onClick={() => scrollToSection('ivf-unit')}
              className="hover:text-[#0071e3] transition-colors cursor-pointer whitespace-nowrap"
            >
              IVF & Fertility
            </button>
            <button
              onClick={() => scrollToSection('anatomy-lab')}
              className="hover:text-[#0071e3] transition-colors cursor-pointer whitespace-nowrap"
            >
              3D Anatomy Lab
            </button>
            <button
              onClick={() => scrollToSection('doctors')}
              className="hover:text-[#0071e3] transition-colors cursor-pointer whitespace-nowrap"
            >
              Surgeon Profiles
            </button>
            <button
              onClick={() => scrollToSection('technology')}
              className="hover:text-[#0071e3] transition-colors cursor-pointer whitespace-nowrap"
            >
              Infrastructure
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="hover:text-[#0071e3] transition-colors cursor-pointer whitespace-nowrap"
            >
              Patient Outcomes
            </button>
          </div>

          {/* Right Action: Apple Action Blue Pill */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenBooking('ent')}
              className="apple-btn-primary !px-4 !py-1.5 !text-[13px]"
            >
              Book Consultation
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#1d1d1f] hover:text-[#0071e3] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Frosted Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed top-[96px] inset-x-0 bottom-0 bg-[#000000]/95 backdrop-blur-2xl text-white p-6 overflow-y-auto animate-in fade-in duration-200">
            <div className="flex flex-col gap-5 pt-4 text-[17px] font-normal tracking-[-0.02em] border-b border-white/10 pb-8">
              <button
                onClick={() => scrollToSection('ent-unit')}
                className="text-left text-white hover:text-[#2997ff] flex items-center justify-between py-1"
              >
                <span>ENT Microsurgery Wing</span>
                <ChevronRight className="w-4 h-4 text-[#86868b]" />
              </button>
              <button
                onClick={() => scrollToSection('ivf-unit')}
                className="text-left text-white hover:text-[#2997ff] flex items-center justify-between py-1"
              >
                <span>IVF & Reproductive Medicine</span>
                <ChevronRight className="w-4 h-4 text-[#86868b]" />
              </button>
              <button
                onClick={() => scrollToSection('anatomy-lab')}
                className="text-left text-white hover:text-[#2997ff] flex items-center justify-between py-1"
              >
                <span>Interactive 3D Anatomy Lab</span>
                <ChevronRight className="w-4 h-4 text-[#86868b]" />
              </button>
              <button
                onClick={() => scrollToSection('doctors')}
                className="text-left text-white hover:text-[#2997ff] flex items-center justify-between py-1"
              >
                <span>Doctor Profiles (Dr. Ponnaiah & Dr. Radhika)</span>
                <ChevronRight className="w-4 h-4 text-[#86868b]" />
              </button>
              <button
                onClick={() => scrollToSection('technology')}
                className="text-left text-white hover:text-[#2997ff] flex items-center justify-between py-1"
              >
                <span>Surgical Technology & Cleanroom</span>
                <ChevronRight className="w-4 h-4 text-[#86868b]" />
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-left text-white hover:text-[#2997ff] flex items-center justify-between py-1"
              >
                <span>Clinical Testimonials</span>
                <ChevronRight className="w-4 h-4 text-[#86868b]" />
              </button>
            </div>

            <div className="pt-6 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking('ent');
                }}
                className="w-full apple-btn-primary !py-3 !text-[15px]"
              >
                Book In-Person / Video Consultation
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSymptomChecker();
                }}
                className="w-full apple-btn-secondary !py-3 !text-[15px] !text-white !border-white/30"
              >
                Interactive Symptom Screener
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSitemap();
                }}
                className="text-center text-[14px] text-[#86868b] hover:text-white pt-2"
              >
                Browse Complete Sitemap
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
