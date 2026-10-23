import React, { useState } from 'react';
import { 
  X, 
  Volume2, 
  Sparkles, 
  ChevronRight, 
  Check, 
  AlertCircle, 
  Calendar 
} from 'lucide-react';

interface SymptomCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToBooking: (unit: 'ent' | 'ivf', symptom: string) => void;
}

export const SymptomCheckerModal: React.FC<SymptomCheckerModalProps> = ({
  isOpen,
  onClose,
  onProceedToBooking,
}) => {
  const [selectedUnit, setSelectedUnit] = useState<'ent' | 'ivf'>('ent');
  const [selectedSymptom, setSelectedSymptom] = useState<string>('');

  if (!isOpen) return null;

  const entSymptoms = [
    { id: 'ear-discharge', title: 'Ear Discharge or Perforated Eardrum', advice: 'Likely chronic otitis media. Micro-ear tympanoplasty recommended to prevent permanent ossicular erosion.' },
    { id: 'hearing-loss', title: 'Progressive or Sudden Hearing Loss / Tinnitus', advice: 'Requires high-precision pure-tone audiometry and BERA acoustic pathway screening by Dr. A. Ponnaiah.' },
    { id: 'sinus-headache', title: 'Chronic Sinus Congestion & Facial Pressure', advice: 'Likely chronic rhinosinusitis or polyposis. 3D Navigation FESS can open blocked sinus ostia scarlessly.' },
    { id: 'vertigo-spinning', title: 'Room Spinning (Vertigo) or Balance Loss', advice: 'Potential BPPV or vestibular disorder. Computerized VNG and canalith repositioning provides prompt relief.' },
    { id: 'snoring-apnea', title: 'Heavy Snoring & Daytime Fatigue (Sleep Apnea)', advice: 'Requires sleep endoscopy and low-temperature coblation palatoplasty to resolve airway obstruction.' },
    { id: 'voice-hoarseness', title: 'Persistent Voice Hoarseness (> 3 weeks)', advice: 'Requires high-definition video laryngostroboscopy to assess vocal fold vibratory margins.' },
  ];

  const ivfSymptoms = [
    { id: 'trying-over-year', title: 'Trying to Conceive for > 12 Months (or > 6 mos if age > 35)', advice: 'Primary indication for comprehensive fertility reserve workup (AMH, AFC, high-magnification semen analysis).' },
    { id: 'irregular-cycles', title: 'Irregular Menstrual Cycles or Suspected PCOS', advice: 'Endocrine mapping and mild individualized ovulation induction under Dr. S. Radhika Ponnaiah.' },
    { id: 'failed-prior-ivf', title: 'Previous Failed IVF / IUI Cycles at Other Centers', advice: 'Our cleanroom embryology lab with Day-5 Blastocyst culture and PGT-A genetic screening specializes in refractory cases.' },
    { id: 'male-factor', title: 'Low Sperm Count, Motility, or Abnormal Morphology', advice: 'Clear indication for single-cell ICSI or Micro-TESE micromanipulation.' },
    { id: 'recurrent-loss', title: 'Recurrent Pregnancy Loss / Repeated Miscarriages', advice: 'Parental karyotyping, 3D hysteroscopic cavity assessment, and thrombophilia panel evaluation.' },
    { id: 'social-freezing', title: 'Fertility Preservation / Social Egg Freezing', advice: 'Ultra-rapid vitrification program safeguards peak reproductive biology for future family planning.' },
  ];

  const currentList = selectedUnit === 'ent' ? entSymptoms : ivfSymptoms;
  const activeSymptomObj = currentList.find((s) => s.id === selectedSymptom);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="bg-white rounded-[26px] max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-black/[0.08] text-[#1d1d1f]">
        {/* Header */}
        <div className="p-6 border-b border-black/[0.06] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div>
            <span className="text-[12px] font-medium text-[#0071e3] block">
              Clinical Symptom Screener
            </span>
            <h3 className="text-[20px] font-semibold text-[#1d1d1f] tracking-[-0.02em] mt-0.5">
              Identify Your Clinical Care Pathway
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

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Step 1: Speciality Switcher */}
          <div>
            <label className="block text-[13px] font-semibold text-[#1d1d1f] mb-2.5">
              1. Choose Clinical Area
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setSelectedUnit('ent');
                  setSelectedSymptom('');
                }}
                className={`p-4 rounded-[16px] border text-left transition-all cursor-pointer ${
                  selectedUnit === 'ent'
                    ? 'bg-[#f5f5f7] border-[#0071e3] shadow-sm'
                    : 'bg-white border-black/[0.08] hover:bg-[#f5f5f7]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Volume2 className="w-4 h-4 text-[#0071e3]" />
                  <span className="text-[14px] font-semibold text-[#1d1d1f]">ENT & Hearing</span>
                </div>
                <span className="text-[12px] text-[#86868b] block">Ear, Nose, Sinus, Vertigo</span>
              </button>

              <button
                onClick={() => {
                  setSelectedUnit('ivf');
                  setSelectedSymptom('');
                }}
                className={`p-4 rounded-[16px] border text-left transition-all cursor-pointer ${
                  selectedUnit === 'ivf'
                    ? 'bg-[#f5f5f7] border-rose-500 shadow-sm'
                    : 'bg-white border-black/[0.08] hover:bg-[#f5f5f7]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span className="text-[14px] font-semibold text-[#1d1d1f]">IVF & Fertility</span>
                </div>
                <span className="text-[12px] text-[#86868b] block">Conception, ICSI, Gynae</span>
              </button>
            </div>
          </div>

          {/* Step 2: Symptom Selector */}
          <div>
            <label className="block text-[13px] font-semibold text-[#1d1d1f] mb-2.5">
              2. Primary Symptom or Clinical History
            </label>
            <div className="space-y-2">
              {currentList.map((item) => {
                const isSelected = selectedSymptom === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSymptom(item.id)}
                    className={`w-full p-3.5 rounded-[14px] border text-left text-[14px] transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? selectedUnit === 'ent'
                          ? 'bg-[#f5f5f7] border-[#0071e3] font-semibold text-[#0071e3]'
                          : 'bg-[#f5f5f7] border-rose-500 font-semibold text-rose-600'
                        : 'bg-white border-black/[0.08] text-[#1d1d1f] hover:bg-[#f5f5f7]'
                    }`}
                  >
                    <span>{item.title}</span>
                    <Check className={`w-4 h-4 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clinical Advice Box */}
          {activeSymptomObj && (
            <div className="p-4 rounded-[18px] bg-[#f5f5f7] border border-black/[0.06] animate-in fade-in zoom-in-95">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#0071e3] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[14px] font-semibold text-[#1d1d1f]">
                    Clinical Recommendation:
                  </h4>
                  <p className="text-[13px] text-[#424245] mt-1 leading-[1.4]">
                    {activeSymptomObj.advice}
                  </p>
                  <p className="text-[12px] text-[#86868b] mt-2 font-mono">
                    Supervising Lead: {selectedUnit === 'ent' ? 'Dr. A. Ponnaiah (ENT)' : 'Dr. S. Radhika Ponnaiah (IVF/OG)'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-black/[0.06] bg-[#fafafc] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="apple-btn-secondary !text-[13px] !px-4"
          >
            Cancel
          </button>

          <button
            disabled={!selectedSymptom}
            onClick={() => {
              if (activeSymptomObj) {
                onProceedToBooking(selectedUnit, activeSymptomObj.title);
                onClose();
              }
            }}
            className={`apple-btn-primary !text-[14px] !px-6 ${
              !selectedSymptom ? '!opacity-40 !cursor-not-allowed' : ''
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation for this Condition</span>
          </button>
        </div>
      </div>
    </div>
  );
};
