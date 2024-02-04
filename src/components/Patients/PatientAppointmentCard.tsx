import { CloseOutlined, PageviewOutlined } from "@mui/icons-material";
import { parseIsoToDateTime } from "../../utils/parseIsoToDateTime";
import { Modal } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { Appointment } from "../../interfaces/PatientDetails";

interface PatientAppointmentProps {
  appointment: Appointment;
  patientId: string;
}

const PatientAppointmentCard = ({
  appointment,
  patientId,
}: PatientAppointmentProps) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");
  const [editNotes, setEditNotes] = useState<boolean>(false);
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

  const handleEditNotes = () => {
    if (editNotes) {
      setNotes(appointment.notes);
    }
    setEditNotes(!editNotes);
  };

  const handleSaveNotes = () => {
    // Save notes to the server
    setEditNotes(false);
  };

  return (
    <>
      <div className="w-full p-1 grid grid-cols-[auto_min-content] gap-3 border-b border-slate-600 bg-slate-200 text-sm">
        <div>
          <div className="flex flex-wrap max-md:flex-col justify-between gap-x-8 text-lg font-semibold">
            <p>{parseIsoToDateTime(appointment.dateTime)}</p>
            <p>{appointment.location}</p>
          </div>
          <p>{appointment.staffName}</p>
          <p>{appointment.appType}</p>
        </div>
        <div>
          <button
            className="leading-3 text-4xl"
            aria-label={`Open Appointment Details ${parseIsoToDateTime(
              appointment.dateTime
            )}`}
            title="Open Appointment Details"
            onClick={() => setModalState(true)}
          >
            <PageviewOutlined fontSize="inherit" />
          </button>
        </div>
      </div>
      <Modal dismissible show={modalState} onClose={() => setModalState(false)}>
        <button
          className="w-8 h-8 place-self-end"
          onClick={() => setModalState(false)}
          aria-label="Close Appointment Details"
          title="Close Appointment Details"
        >
          <CloseOutlined />
        </button>
        <div className="m-4">
          <h3 className="flex flex-wrap justify-between mb-4">
            <strong>{parseIsoToDateTime(appointment.dateTime)}</strong>
            <strong>{appointment.location}</strong>
          </h3>
          <p>{appointment.staffName}</p>
          <p>{appointment.appType}</p>
          <div className="my-4">
            <div className="flex justify-between mb-1">
              <button
                className={`rounded-sm px-1 ${
                  !editNotes
                    ? "bg-zinc-400 hover:bg-zinc-700 active:bg-zinc-500"
                    : "bg-red-400 hover:bg-red-700 active:bg-red-500"
                } hover:text-white`}
                onClick={handleEditNotes}
              >
                {editNotes ? "Cancel Edit" : "Edit Notes"}
              </button>
              {editNotes && (
                <button
                  className="rounded-sm px-1 bg-blue-400 hover:bg-sky-700 active:bg-sky-500 hover:text-white"
                  onClick={handleSaveNotes}
                >
                  Save Notes
                </button>
              )}
            </div>
            <textarea
              disabled={!editNotes}
              aria-label="Appointment Notes"
              className="w-full resize-none overflow-hidden"
              value={notes}
              ref={notesAreaRef}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PatientAppointmentCard;