import { EditOutlined, PageviewOutlined } from "@mui/icons-material";
import { parseIsoToDateTime } from "../../utils/parseIsoToDateTime";
import { useEffect, useRef, useState } from "react";
import { Appointment } from "../../interfaces/Appointment";
import { updateAppointment } from "../../api/updateAppointment";
import { PatientAppDetailsModal, PatientAppEditModal } from "..";

interface PatientAppointmentProps {
  appointment: Appointment;
}

const PatientAppointmentCard = ({ appointment }: PatientAppointmentProps) => {
  const [appointmentData, setAppointmentData] =
    useState<Appointment>(appointment);
  const [detailsModalState, setDetailsModalState] = useState<boolean>(false);
  const [editModalState, setEditModalState] = useState<boolean>(false);
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
    setDetailsModalState(false);
  };

  const saveAppointment = () => {
    updateAppointment(appointment.id, appointmentData);
    setDetailsModalState(false);
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
            onClick={() => setDetailsModalState(true)}
          >
            <PageviewOutlined fontSize="inherit" />
          </button>
          <button
            className="w-9"
            aria-label={`Edit Appointment ${parseIsoToDateTime(
              appointment.dateTime
            )}`}
            title="Edit Appointment"
            onClick={() => setEditModalState(true)}
          >
            <EditOutlined fontSize="large" />
          </button>
        </div>
      </div>
      <PatientAppDetailsModal
        appointment={appointment}
        detailsModalState={detailsModalState}
        setDetailsModalState={setDetailsModalState}
      />
      <PatientAppEditModal
        appointment={appointment}
        editModalState={editModalState}
        setEditModalState={setEditModalState}
      />
    </>
  );
};

export default PatientAppointmentCard;
