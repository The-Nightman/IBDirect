import { EditOutlined, PageviewOutlined } from "@mui/icons-material";
import { Prescription } from "../../interfaces/Prescription";
import { parseIsoToDateOnly } from "../../utils/parseIsoToDateOnly";
import { useState } from "react";
import { PatientPrescriptDetailsModal, PatientPrescriptEditModal } from "..";

interface PatientPrescriptionCardProps {
  prescription: Prescription;
  updatePrescriptionsState?: (
    prescription: Prescription,
    index: number
  ) => void;
  index: number;
  patientUser?: boolean;
}

const PatientPrescriptionCard = ({
  prescription,
  updatePrescriptionsState,
  index,
  patientUser,
}: PatientPrescriptionCardProps) => {
  const [detailsModalState, setDetailsModalState] = useState<boolean>(false);
  const [editModalState, setEditModalState] = useState<boolean>(false);

  return (
    <>
      <section
        className={`w-full p-1 grid grid-cols-[auto_min-content] gap-3 border-b border-slate-600 ${
          prescription.cancelled! ? "bg-red-200" : "bg-slate-200"
        } text-sm`}
        tabIndex={0}
        aria-label="Patient Prescription Card"
      >
        <div>
          <div className="flex flex-wrap max-md:flex-col justify-between gap-x-8 text-lg font-semibold">
            <p>{prescription.scriptName}</p>
            <time>{parseIsoToDateOnly(prescription.scriptStartDate)}</time>
          </div>
          <div className="flex max-md:flex-col justify-between">
            <div>
              <p>Dosage: {prescription.scriptDose}</p>
              <p>Interval: {prescription.scriptInterval}</p>
            </div>
            <div>
              <p>Repeat: {prescription.scriptRepeat ? "Yes" : "No"}</p>
              {prescription.cancelled ? <strong>CANCELLED</strong> : null}
            </div>
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
          {!patientUser ? (
            <button
              className="w-9"
              aria-label={`Edit Prescription`}
              title="Edit Prescription"
              onClick={() => setEditModalState(true)}
            >
              <EditOutlined fontSize="large" />
            </button>
          ) : null}
        </div>
      </section>
      <PatientPrescriptDetailsModal
        prescription={prescription}
        detailsModalState={detailsModalState}
        setDetailsModalState={setDetailsModalState}
      />
      <PatientPrescriptEditModal
        prescription={prescription}
        editModalState={editModalState}
        setEditModalState={setEditModalState}
        updatePrescriptionsState={updatePrescriptionsState!}
        index={index}
      />
    </>
  );
};

export default PatientPrescriptionCard;
