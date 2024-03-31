import { Modal } from "flowbite-react";
import { parseIsoToDateOnly } from "../../utils/parseIsoToDateOnly";
import { useEffect, useRef, useState } from "react";
import { Prescription } from "../../interfaces/Prescription";

interface PatientAppDetailsModalProps {
  prescription: Prescription;
  detailsModalState: boolean;
  setDetailsModalState: (state: boolean) => void;
}

const PatientPrescriptDetailsModal = ({
  prescription,
  detailsModalState,
  setDetailsModalState,
}: PatientAppDetailsModalProps) => {
  const [notes, setNotes] = useState<string>("");
  const notesAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setNotes(prescription.notes);
  }, [prescription.notes]);

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

  return (
    <Modal
      show={detailsModalState}
      aria-label={`Patient Prescription Details Modal ${
        prescription.scriptName
      } - ${parseIsoToDateOnly(prescription.scriptStartDate)}`}
    >
      <div className="m-4">
        <h3 className="flex flex-wrap justify-between mb-4">
          <span>{prescription.scriptName}</span>
          <time>{parseIsoToDateOnly(prescription.scriptStartDate)}</time>
        </h3>
        <div className="flex max-md:flex-col justify-between">
          <div>
            <p>Dosage: {prescription.scriptDose}</p>
            <p>Interval: {prescription.scriptInterval}</p>
          </div>
          <p>Repeat: {prescription.scriptRepeat ? "Yes" : "No"}</p>
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
        <div className="flex flex-col items-center">
          <button
            className="rounded-sm py-2 px-4 bg-zinc-400 hover:bg-zinc-700 active:bg-zinc-500 hover:text-white"
            onClick={() => setDetailsModalState(false)}
          >
            close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PatientPrescriptDetailsModal;
