import { Modal } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { Prescription } from "../../interfaces/Prescription";
import { parseIsoToDateOnly } from "../../utils/parseIsoToDateOnly";

interface PatientPrescriptEditModalProps {
  prescription: Prescription;
  editModalState: boolean;
  setEditModalState: (state: boolean) => void;
}

const PatientPrescriptEditModal = ({
  prescription,
  editModalState,
  setEditModalState,
}: PatientPrescriptEditModalProps) => {
  const [prescriptionData, setPrescriptionData] =
    useState<Prescription>(prescription);
  const [notes, setNotes] = useState<string>("");
  const notesAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setNotes(prescription.scriptNotes);
  }, [prescription.scriptNotes]);

  useEffect(() => {
    const notesAreaResize = () => {
      if (notesAreaRef.current) {
        notesAreaRef.current.style.height = "auto";
        notesAreaRef.current.style.height =
          notesAreaRef.current.scrollHeight + "px";
      }
    };

    notesAreaResize();
    notesAreaRef.current?.addEventListener("input", notesAreaResize);

    return () => {
      notesAreaRef.current?.removeEventListener("input", notesAreaResize);
    };
  }, [notes]);

  const closeDialog = () => {
    setPrescriptionData(prescription);
    setNotes(prescription.scriptNotes);
    setEditModalState(false);
  };

  const savePrescription = () => {};

  return (
    <Modal
      show={editModalState}
      onClose={() => setEditModalState(false)}
      aria-label={`Patient Prescription Edit Modal  ${
        prescription.scriptName
      } - ${parseIsoToDateOnly(prescription.scriptStartDate)}`}
    >
      <div className="m-4">
        <h3 className="flex flex-wrap justify-between mb-4">
          <strong>{prescriptionData.scriptName}</strong>
          <strong>{prescriptionData.scriptStartDate}</strong>
        </h3>
        <div className="flex max-md:flex-col justify-between">
          <div>
            <p>Dosage: {prescriptionData.scriptDose}</p>
            <p>Interval: {prescriptionData.scriptInterval}</p>
          </div>
          <p>Repeat: {prescriptionData.scriptRepeat ? "Yes" : "No"}</p>
        </div>
        <div className="mt-4">
          <p>Prescribing Physician:</p>
          <p>{`${prescription.prescribingStaff!.name} - ${
            prescription.prescribingStaff!.speciality
          } ${prescription.prescribingStaff!.role}`}</p>
          <p>{prescription.prescribingStaff!.practice}</p>
        </div>
        <div className="my-4">
          <textarea
            disabled={true}
            aria-label="Prescription Notes"
            className="w-full resize-none overflow-hidden"
            value={notes}
            ref={notesAreaRef}
          />
        </div>
        <div className="flex gap-16 mt-2">
          <button
            className="rounded-sm py-2 px-4 bg-zinc-400 hover:bg-zinc-700 active:bg-zinc-500 hover:text-white"
            onClick={closeDialog}
          >
            close
          </button>
          <button
            className="rounded-sm py-2 px-4 bg-blue-400 hover:bg-sky-700 active:bg-sky-500 hover:text-white"
            onClick={savePrescription}
          >
            Save Prescription
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PatientPrescriptEditModal;
