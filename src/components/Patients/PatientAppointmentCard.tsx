import { CloseOutlined, PageviewOutlined } from "@mui/icons-material";
import { parseIsoToDateTime } from "../../utils/parseIsoToDateTime";
import { Modal } from "flowbite-react";
import { useState } from "react";
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
            <textarea
              aria-label="Appointment Notes"
              className="w-full resize-none overflow-hidden"
              value={appointment.notes}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PatientAppointmentCard;
