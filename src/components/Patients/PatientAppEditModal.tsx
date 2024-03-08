import { Modal } from "flowbite-react";
import { Appointment } from "../../interfaces/Appointment";
import { parseIsoToDateTime } from "../../utils/parseIsoToDateTime";
import { useEffect, useRef, useState } from "react";
import { updateAppointment } from "../../api/updateAppointment";
import { StaffDetails } from "../../interfaces/StaffDetails";

interface PatientAppEditModalProps {
  appointment: Appointment;
  editModalState: boolean;
  consultant: StaffDetails;
  nurse: StaffDetails;
  stomaNurse: StaffDetails | null;
  genpract: StaffDetails;
  setEditModalState: (state: boolean) => void;
  updateAppointmentState: (appointment: Appointment, index: number) => void;
  index: number;
}

const PatientAppEditModal = ({
  appointment,
  editModalState,
  consultant,
  nurse,
  stomaNurse,
  genpract,
  setEditModalState,
  updateAppointmentState,
  index,
}: PatientAppEditModalProps) => {
  const [appointmentData, setAppointmentData] =
    useState<Appointment>(appointment);
  const [editAppointment, setEditAppointment] = useState<boolean>(false);
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
    setAppointmentData({ ...appointmentData, notes: notes });
    setEditNotes(false);
  };

  const closeDialog = () => {
    setAppointmentData(appointment);
    setNotes(appointment.notes);
    setEditModalState(false);
  };

  const saveAppointment = () => {
    updateAppointment(appointment.id, appointmentData)
      .then((_res) => {
        updateAppointmentState(appointmentData, index);
      })
      .catch((err) => {
        console.error(err);
      });
    setEditModalState(false);
  };

  return (
    <Modal show={editModalState} onClose={() => setEditModalState(false)}>
      <div className="relative m-4">
        <button
          className={`absolute right-0 rounded-sm px-1 ${
            !editAppointment
              ? "bg-zinc-400 hover:bg-zinc-700 active:bg-zinc-500"
              : "bg-red-400 hover:bg-red-700 active:bg-red-500"
          } hover:text-white`}
          onClick={() => setEditAppointment(!editAppointment)}
        >
          {editAppointment ? "Cancel Edit Appointment" : "Edit Appointment"}
        </button>
        <h3 className="flex flex-wrap justify-between mt-8 mb-4">
          <strong>{parseIsoToDateTime(appointment.dateTime)}</strong>
          <strong>{appointment.location}</strong>
        </h3>
        {editAppointment ? (
          <div className="flex flex-col w-min gap-4">
            <select defaultValue={appointmentData.staffId}>
              <option
                value={consultant.staffId}
              >{`${consultant.name} - ${consultant.role}`}</option>
              <option
                value={nurse.staffId}
              >{`${nurse.name} - ${nurse.role}`}</option>
              {stomaNurse != null ? (
                <option
                  value={stomaNurse.staffId}
                >{`${stomaNurse.name} - ${stomaNurse.role}`}</option>
              ) : null}
              <option
                value={genpract.staffId}
              >{`${genpract.name} - ${genpract.role}`}</option>
            </select>
            <label>
              Appointment Type:
              <input type="text" aria-describedby="appTypeHint" defaultValue={appointmentData.appType} />
              <span className="sr-only" id="appTypeHint">
                Enter the appointment type e.g. Bloodwork or Checkup
              </span>
            </label>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p>{appointmentData.staffName}</p>
            <p>{appointmentData.appType}</p>
          </div>
        )}
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
        <div className="flex flex-col items-center">
          <strong>
            Please save appointment before closing to prevent loss of updates.
          </strong>
          <div className="flex gap-16 mt-2">
            <button
              className="rounded-sm py-2 px-4 bg-zinc-400 hover:bg-zinc-700 active:bg-zinc-500 hover:text-white"
              onClick={closeDialog}
            >
              close
            </button>
            <button
              className="rounded-sm py-2 px-4 bg-blue-400 hover:bg-sky-700 active:bg-sky-500 hover:text-white"
              onClick={saveAppointment}
            >
              Save Appointment
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PatientAppEditModal;
