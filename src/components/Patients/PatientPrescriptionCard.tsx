import { EditOutlined, PageviewOutlined } from "@mui/icons-material";
import { Prescription } from "../../interfaces/Prescription";
import { parseIsoToDateOnly } from "../../utils/parseIsoToDateOnly";
import { useState } from "react";
import { PatientPrescriptDetailsModal } from "..";

interface PatientPrescriptionCardProps {
  prescription: Prescription;
}

const PatientPrescriptionCard = ({
  prescription,
}: PatientPrescriptionCardProps) => {
  const [detailsModalState, setDetailsModalState] = useState<boolean>(false);
  const [editModalState, setEditModalState] = useState<boolean>(false);

  return (
    <>
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
        <div>
          <button
            className="leading-3 text-4xl"
            aria-label={`Open Prescription Details`}
            title="Open Prescription Details"
            onClick={() => setDetailsModalState(true)}
          >
            <PageviewOutlined fontSize="inherit" />
          </button>
          <button
            className="w-9"
            aria-label={`Edit Prescription`}
            title="Edit Prescription"
            onClick={() => setEditModalState(true)}
          >
            <EditOutlined fontSize="large" />
          </button>
        </div>
      </div>
      <PatientPrescriptDetailsModal
        prescription={prescription}
        detailsModalState={detailsModalState}
        setDetailsModalState={setDetailsModalState}
      />
    </>
  );
};

export default PatientPrescriptionCard;
