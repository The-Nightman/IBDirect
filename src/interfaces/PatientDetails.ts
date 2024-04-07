import { Appointment } from "./Appointment";
import { Prescription } from "./Prescription";
import { StaffDetails } from "./StaffDetails";
import { Survey } from "./Survey";

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
