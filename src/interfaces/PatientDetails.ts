import { Appointment } from "./Appointment";
import { Prescription } from "./Prescription";
import { StaffDetails } from "./StaffDetails";

export interface PatientDetails {
  patientId: number;
  name: string;
  sex: string;
  hospital: string;
  diagnosis: string;
  diagnosisDate: string;
  stoma: boolean;
  notes: string;
  consultant: StaffDetails;
  nurse: StaffDetails;
  stomaNurse: StaffDetails | null;
  genpract: StaffDetails;
  dateOfBirth: string;
  address: string;
  appointments: Appointment[];
  surveys: Survey[];
  prescriptions: Prescription[];
}

interface Survey {
  id: number;
  dateTime: string;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  q4a: true;
  q5: number;
  q6: number;
  q7: number;
  q8: number;
  q9: number;
  q10: number;
  q11: number;
  q12: number;
  contScore: number;
  q13: number;
  q14: number;
  q15: number;
  q16: number;
  q16a: string;
  q17: number;
  q18: number;
  q19: number;
  patientDetailsId: number;
  patientDetails: string;
}
