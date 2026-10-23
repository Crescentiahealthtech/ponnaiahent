import React, { useState } from 'react';
import { DOCTORS_DATA } from '../../data/hospitalData';
import { 
  X, 
  Calendar, 
  Clock, 
  Check, 
  Building2, 
  Video, 
  ShieldCheck, 
  Printer, 
  Volume2, 
  Sparkles 
} from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedUnit?: 'ent' | 'ivf';
  preselectedDoctorId?: string;
  preselectedReason?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedUnit = 'ent',
  preselectedDoctorId,
  preselectedReason,
}) => {
  const [step, setStep] = useState<number>(1);
  const [unit, setUnit] = useState<'ent' | 'ivf'>(preselectedUnit);
  const [doctorId, setDoctorId] = useState<string>(
    preselectedDoctorId || (preselectedUnit === 'ent' ? DOCTORS_DATA[0].id : DOCTORS_DATA[1].id)
  );
  const [consultType, setConsultType] = useState<'in-person' | 'video'>('in-person');
  const [reason, setReason] = useState<string>(preselectedReason || '');
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-24');
  const [selectedTime, setSelectedTime] = useState<string>('10:30 AM');
  
  // Patient details
  const [patientName, setPatientName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [tokenNumber, setTokenNumber] = useState<string>('');

  if (!isOpen) return null;

  const handleUnitChange = (newUnit: 'ent' | 'ivf') => {
    setUnit(newUnit);
    setDoctorId(newUnit === 'ent' ? DOCTORS_DATA[0].id : DOCTORS_DATA[1].id);
  };

  const selectedDoctor = DOCTORS_DATA.find((d) => d.id === doctorId) || DOCTORS_DATA[0];

  const timeSlots = [
    '09:30 AM', '10:30 AM', '11:30 AM', '12:30 PM',
    '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = unit === 'ent' ? 'PNH-ENT' : 'PNH-IVF';
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    setTokenNumber(`${prefix}-${randomDigits}`);
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="bg-white rounded-[26px] max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-black/[0.08] text-[#1d1d1f]">
        {/* Header */}
        <div className="p-6 border-b border-black/[0.06] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div>
            <span className="text-[12px] font-medium text-[#0071e3] block">
              Hospital Appointment Gateway
            </span>
            <h3 className="text-[20px] font-semibold text-[#1d1d1f] tracking-[-0.02em] mt-0.5">
              {step === 3 ? 'Appointment Confirmed' : 'Schedule Clinical Consultation'}
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

        {/* STEP 1 */}
        {step === 1 && (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Unit Selection */}
            <div>
              <label className="block text-[13px] font-semibold text-[#1d1d1f] mb-2.5">
                1. Select Speciality Division
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleUnitChange('ent')}
                  className={`p-4 rounded-[16px] border text-left transition-all cursor-pointer ${
                    unit === 'ent'
                      ? 'bg-[#f5f5f7] border-[#0071e3] shadow-sm'
                      : 'bg-white border-black/[0.08] hover:bg-[#f5f5f7]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Volume2 className="w-4 h-4 text-[#0071e3]" />
                    <span className="text-[14px] font-semibold text-[#1d1d1f]">ENT Microsurgery</span>
                  </div>
                  <span className="text-[12px] text-[#86868b] block">Chief Surgeon Dr. A. Ponnaiah</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleUnitChange('ivf')}
                  className={`p-4 rounded-[16px] border text-left transition-all cursor-pointer ${
                    unit === 'ivf'
                      ? 'bg-[#f5f5f7] border-rose-500 shadow-sm'
                      : 'bg-white border-black/[0.08] hover:bg-[#f5f5f7]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-rose-500" />
                    <span className="text-[14px] font-semibold text-[#1d1d1f]">IVF & Embryology</span>
                  </div>
                  <span className="text-[12px] text-[#86868b] block">Chief Specialist Dr. S. Radhika</span>
                </button>
              </div>
            </div>

            {/* Doctor Card */}
            <div>
              <label className="block text-[13px] font-semibold text-[#1d1d1f] mb-2">
                2. Attending Specialist
              </label>
              <div className="p-4 rounded-[16px] bg-[#f5f5f7] border border-black/[0.06] flex items-center gap-4">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-14 h-14 rounded-[12px] object-cover object-top border border-black/[0.08]"
                />
                <div>
                  <h4 className="font-semibold text-[#1d1d1f] text-[15px]">{selectedDoctor.name}</h4>
                  <p className="text-[12px] text-[#0071e3]">{selectedDoctor.degrees}</p>
                  <p className="text-[12px] text-[#86868b] mt-0.5">{selectedDoctor.title}</p>
                </div>
              </div>
            </div>

            {/* Format */}
            <div>
              <label className="block text-[13px] font-semibold text-[#1d1d1f] mb-2">
                3. Consultation Format
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setConsultType('in-person')}
                  className={`p-3 rounded-[12px] border text-[13px] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    consultType === 'in-person'
                      ? 'bg-[#1d1d1f] text-white border-[#1d1d1f]'
                      : 'bg-white text-[#424245] border-black/[0.08] hover:bg-[#f5f5f7]'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Hospital OPD Visit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setConsultType('video')}
                  className={`p-3 rounded-[12px] border text-[13px] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    consultType === 'video'
                      ? 'bg-[#1d1d1f] text-white border-[#1d1d1f]'
                      : 'bg-white text-[#424245] border-black/[0.08] hover:bg-[#f5f5f7]'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Tele-Video Second Opinion</span>
                </button>
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#1d1d1f] mb-2">
                  4. Preferred Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min="2026-10-23"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-2.5 rounded-[12px] border border-black/[0.12] text-[13px] focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] outline-none"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#1d1d1f] mb-2">
                  5. Time Slot
                </label>
                <div className="grid grid-cols-2 gap-1.5 max-h-32 overflow-y-auto p-1 bg-[#f5f5f7] rounded-[12px] border border-black/[0.06]">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`p-2 rounded-[8px] text-[12px] font-mono font-medium transition-all cursor-pointer ${
                        selectedTime === slot
                          ? 'bg-[#0071e3] text-white shadow-sm'
                          : 'bg-white text-[#1d1d1f] hover:bg-black/[0.03]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full apple-btn-primary !py-3 !text-[15px] !w-full"
            >
              Continue to Patient Details
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#1d1d1f] mb-1.5">
                Full Patient Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Anandha Kumar"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-[12px] border border-black/[0.12] text-[14px] focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#1d1d1f] mb-1.5">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98400 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[12px] border border-black/[0.12] text-[14px] focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] outline-none"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#1d1d1f] mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="patient@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[12px] border border-black/[0.12] text-[14px] focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#1d1d1f] mb-1.5">
                Clinical Concern or Existing Reports
              </label>
              <input
                type="text"
                placeholder="e.g. Perforated Eardrum repair / 2nd opinion on IVF protocol"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-[12px] border border-black/[0.12] text-[14px] focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] outline-none"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#1d1d1f] mb-1.5">
                Medical History & Notes
              </label>
              <textarea
                rows={2}
                placeholder="Brief summary of symptoms or previous treatments..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-[12px] border border-black/[0.12] text-[14px] focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] outline-none"
              />
            </div>

            <div className="pt-3 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="apple-btn-secondary !text-[13px] !px-4"
              >
                Back
              </button>

              <button
                type="submit"
                className="flex-1 apple-btn-primary !py-3 !text-[14px]"
              >
                Confirm Appointment & Generate Token
              </button>
            </div>
          </form>
        )}

        {/* STEP 3 (Apple Wallet Pass Style Confirmation) */}
        {step === 3 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="rounded-[22px] bg-[#161617] text-white p-6 sm:p-7 border border-white/10 apple-product-shadow">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#2997ff] block">
                    Ponnaiah Super Speciality Hospital
                  </span>
                  <h4 className="text-[18px] font-semibold text-white tracking-[-0.02em] mt-0.5">
                    Official OPD & Video Consultation Pass
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#86868b] block font-mono">TOKEN ID</span>
                  <span className="text-[17px] font-mono font-semibold text-[#2997ff] tabular-nums">
                    {tokenNumber}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[13px] mb-4">
                <div>
                  <span className="text-[#86868b] block text-[11px] font-mono uppercase">Patient Name</span>
                  <span className="font-semibold text-white">{patientName}</span>
                </div>
                <div>
                  <span className="text-[#86868b] block text-[11px] font-mono uppercase">Contact Phone</span>
                  <span className="font-mono text-white/90">{phone}</span>
                </div>
                <div>
                  <span className="text-[#86868b] block text-[11px] font-mono uppercase">Attending Specialist</span>
                  <span className="font-semibold text-[#2997ff]">{selectedDoctor.name}</span>
                </div>
                <div>
                  <span className="text-[#86868b] block text-[11px] font-mono uppercase">Clinic Location</span>
                  <span className="text-white/90">
                    {unit === 'ent' ? 'Suite 101, ENT Block' : 'Suite 204, IVF Block'}
                  </span>
                </div>
                <div>
                  <span className="text-[#86868b] block text-[11px] font-mono uppercase">Date & Timing</span>
                  <span className="font-semibold text-white">{selectedDate} at {selectedTime}</span>
                </div>
                <div>
                  <span className="text-[#86868b] block text-[11px] font-mono uppercase">Format</span>
                  <span className="text-emerald-400 font-medium">
                    {consultType === 'in-person' ? 'In-Person Hospital Visit' : 'Tele-Video Link sent to Email'}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#86868b]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2997ff]" />
                  <span>SMS confirmation & hospital pass dispatched to {phone}</span>
                </span>
                <span className="font-mono text-[10px]">NABH ACCREDITED</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="apple-btn-secondary !text-[13px] !px-4 flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Appointment Slip</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="apple-btn-primary !text-[13px] !px-6"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
