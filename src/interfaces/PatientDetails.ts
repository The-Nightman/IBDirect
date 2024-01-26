export interface PatientDetails {
  patientId: number;
  name: string;
  sex: string;
  hospital: string;
  diagnosis: string;
  diagnosisDate: string;
  stoma: boolean;
  notes: string;
  consultantName: string;
  nurseName: string;
  stomaNurseName: string;
  genpractName: string;
  dateOfBirth: string;
  address: string;
  appointments: Appointment[];
  surveys: Survey[];
  prescriptions: Prescription[];
}

interface Appointment {
  id: number;
  staffId: number;
  dateTime: string;
  location: string;
  appType: string;
  notes: string;
  patientDetailsId: number;
  patientDetails: string;
}

interface Prescription {
  id: number;
  scriptName: string;
  scriptStartDate: string;
  scriptDose: string;
  scriptInterval: string;
  scriptNotes: string;
  patientDetailsId: number;
  patientDetails: string;
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
