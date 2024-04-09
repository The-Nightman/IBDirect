import { EditOutlined, PageviewOutlined } from "@mui/icons-material";
import { parseIsoToDateTime } from "../../utils/parseIsoToDateTime";
import { useEffect, useState } from "react";
import { Appointment } from "../../interfaces/Appointment";
import { PatientAppDetailsModal, PatientAppEditModal } from "..";
import { StaffDetails } from "../../interfaces/StaffDetails";
import { useSearchParams } from "react-router-dom";

interface Staff {
  consultant: StaffDetails;
  nurse: StaffDetails;
  stomaNurse: StaffDetails | null;
  genpract: StaffDetails;
}

interface PatientAppointmentProps {
  appointment: Appointment;
  staff?: Staff;
  index: number;
  updateAppointmentState?: (appointment: Appointment, index: number) => void;
  removeAppointment?: (index: number) => void;
}

const PatientAppointmentCard = ({
  appointment,
  staff,
  index,
  updateAppointmentState,
  removeAppointment,
}: PatientAppointmentProps) => {
  const [detailsModalState, setDetailsModalState] = useState<boolean>(false);
  const [editModalState, setEditModalState] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has("edit-appointment")) {
      if (
        parseInt(searchParams.get("edit-appointment") ?? "") === appointment.id
      ) {
        setEditModalState(true);
      }
    }
  }, [searchParams, appointment.id]);

  return (
    <>
      <section
        className="w-full p-1 grid grid-cols-[auto_min-content] gap-3 border-b border-slate-600 bg-slate-200 text-sm"
        aria-label="Patient Appointment Card"
        tabIndex={0}
      >
        <div>
          <div className="flex flex-wrap max-md:flex-col justify-between gap-x-8 text-lg font-semibold">
            <time>{parseIsoToDateTime(appointment.dateTime)}</time>
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
          {staff ? (
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
          ) : null}
        </div>
      </section>
      <PatientAppDetailsModal
        appointment={appointment}
        detailsModalState={detailsModalState}
        setDetailsModalState={setDetailsModalState}
      />
      <PatientAppEditModal
        appointment={appointment}
        editModalState={editModalState}
        setEditModalState={setEditModalState}
        updateAppointmentState={updateAppointmentState!}
        removeAppointment={removeAppointment}
        staff={staff!}
        index={index}
      />
    </>
  );
};

export default PatientAppointmentCard;
