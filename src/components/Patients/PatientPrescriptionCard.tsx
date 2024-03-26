import { Prescription } from "../../interfaces/Prescription";
import { parseIsoToDateOnly } from "../../utils/parseIsoToDateOnly";

interface PatientPrescriptionCardProps {
  prescription: Prescription;
}

const PatientPrescriptionCard = ({
  prescription,
}: PatientPrescriptionCardProps) => {
  return (
    <div className="w-full p-1 grid grid-cols-[auto_min-content] gap-3 border-b border-slate-600 bg-slate-200 text-sm">
      <div>
        <div className="flex flex-wrap max-md:flex-col justify-between gap-x-8 text-lg font-semibold">
          <p>{prescription.scriptName}</p>
          <p>{parseIsoToDateOnly(prescription.scriptStartDate)}</p>
        </div>
        <div className="flex max-md:flex-col justify-between">
          <div>
            <p>Dosage: {prescription.scriptDose}</p>
            <p>Interval: {prescription.scriptInterval}</p>
          </div>
          <p>Repeat: {prescription.scriptRepeat ? "Yes" : "No"}</p>
        </div>
        <div className="mt-4">
          <p>
            Prescribed by:
            {` ${prescription.prescribingStaff!.name} - ${
              prescription.prescribingStaff!.speciality
            } ${prescription.prescribingStaff!.role}`}
          </p>
          <p>{prescription.prescribingStaff!.practice}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientPrescriptionCard;
