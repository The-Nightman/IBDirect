import { EditOutlined, PageviewOutlined } from "@mui/icons-material";
import { parseIsoToDateTime } from "../../utils/parseIsoToDateTime";
import { useState } from "react";
import { Appointment } from "../../interfaces/Appointment";
import { PatientAppDetailsModal, PatientAppEditModal } from "..";
import { StaffDetails } from "../../interfaces/StaffDetails";

interface PatientAppointmentProps {
  appointment: Appointment;
  consultant: StaffDetails;
  nurse: StaffDetails;
  stomaNurse: StaffDetails | null;
  genpract: StaffDetails;
  index: number;
  updateAppointmentState: (appointment: Appointment, index: number) => void;
}

const PatientAppointmentCard = ({
  appointment,
  consultant,
  nurse,
  stomaNurse,
  genpract,
  index,
  updateAppointmentState,
}: PatientAppointmentProps) => {
  const [detailsModalState, setDetailsModalState] = useState<boolean>(false);
  const [editModalState, setEditModalState] = useState<boolean>(false);

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
        updateAppointmentState={updateAppointmentState}
        consultant={consultant}
        nurse={nurse}
        stomaNurse={stomaNurse}
        genpract={genpract}
        index={index}
      />
    </>
  );
};

export default PatientAppointmentCard;
