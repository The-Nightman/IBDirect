import { StaffDetails } from "./StaffDetails";

export interface Prescription {
  id?: number;
  scriptName: string;
  scriptStartDate: string;
  scriptDose: string;
  scriptInterval: string;
  scriptNotes: string;
  scriptRepeat: boolean;
  prescribingStaffId?: number;
  prescribingStaff?: StaffDetails;
}
