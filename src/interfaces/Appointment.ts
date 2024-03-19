export interface Appointment {
  id?: number;
  staffId: number;
  staffName: string;
  dateTime: string;
  location: string;
  appType: string;
  notes: string;
}
