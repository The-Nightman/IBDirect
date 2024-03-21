import { Modal } from "flowbite-react";
import { Appointment } from "../../interfaces/Appointment";
import { parseIsoToDateTime } from "../../utils/parseIsoToDateTime";
import { useEffect, useRef, useState } from "react";

interface PatientAppDetailsModalProps {
  appointment: Appointment;
  detailsModalState: boolean;
  setDetailsModalState: (state: boolean) => void;
}

const PatientAppDetailsModal = ({
  appointment,
  detailsModalState,
  setDetailsModalState,
}: PatientAppDetailsModalProps) => {
  const [notes, setNotes] = useState<string>("");
  const notesAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setNotes(appointment.notes);
  }, [appointment.notes]);

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
      aria-label={`Patient Appointment Edit Modal ${parseIsoToDateTime(
        appointment.dateTime
      )}`}
    >
      <div className="m-4">
        <h3 className="flex flex-wrap justify-between mb-4">
          <strong>{parseIsoToDateTime(appointment.dateTime)}</strong>
          <strong>{appointment.location}</strong>
        </h3>
        <p>{appointment.staffName}</p>
        <p>{appointment.appType}</p>
        <div className="my-4">
          <textarea
            disabled={true}
            aria-label="Appointment Notes"
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

export default PatientAppDetailsModal;
