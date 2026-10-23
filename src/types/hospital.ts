export type UnitType = 'all' | 'ent' | 'ivf';

export interface DoctorProfile {
  id: string;
  name: string;
  title: string;
  unit: 'ent' | 'ivf';
  role: string;
  degrees: string;
  experienceYears: number;
  surgeriesCount?: string;
  babiesDelivered?: string;
  successRate?: string;
  image: string;
  bio: string;
  quote: string;
  specializations: string[];
  qualifications: { degree: string; institution: string; year: string }[];
  fellowships: string[];
  opdSchedule: { day: string; timings: string; room: string }[];
  awards: string[];
  contactEmail: string;
  languages: string[];
  publicationsCount: number;
}

export interface ProcedureItem {
  id: string;
  title: string;
  unit: 'ent' | 'ivf';
  category: string;
  shortDesc: string;
  fullDesc: string;
  recoveryDays: string;
  procedureType: 'Day Care' | 'Inpatient (1-2 Days)' | 'OPD Procedure' | 'Advanced Surgery';
  keyBenefits: string[];
  technologiesUsed: string[];
  iconName: string;
}

export interface TechnologyItem {
  id: string;
  name: string;
  category: 'ENT Diagnostics & Surgery' | 'IVF & Embryology' | 'Patient Safety';
  description: string;
  specs: string;
  image: string;
  impact: string;
}

export interface TestimonialItem {
  id: string;
  patientName: string;
  city: string;
  unit: 'ent' | 'ivf';
  treatment: string;
  doctorName: string;
  review: string;
  rating: number;
  date: string;
  outcome: string;
}

export interface AnatomyPart {
  id: string;
  name: string;
  system: 'ent' | 'ivf';
  category: string;
  description: string;
  clinicalSignificance: string;
  commonPathology: string;
  cameraPosition: [number, number, number];
  targetPosition: [number, number, number];
}

export interface AppointmentData {
  unit: 'ent' | 'ivf';
  doctorId: string;
  treatmentId: string;
  patientName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  consultationType: 'in-person' | 'video';
  notes?: string;
}
