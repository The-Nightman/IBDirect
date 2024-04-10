import { OpenInNewOutlined } from "@mui/icons-material";
import { parseIsoToDateTime } from "../../utils/parseIsoToDateTime";
import { Appointment } from "../../interfaces/Appointment";
import { useNavigate } from "react-router-dom";

interface StaffMyAppointmentCardProps {
  appointment: Appointment;
}

const StaffMyAppointmentCard = ({
  appointment,
}: StaffMyAppointmentCardProps) => {
  const navigate = useNavigate();

  return (
    <>
      <article className="w-full p-1 grid grid-cols-[auto_min-content] gap-3 border-b border-slate-600 bg-slate-200 text-sm">
        <div>
          <div className="flex flex-wrap max-md:flex-col justify-between gap-x-8 text-lg font-semibold">
            <p>{parseIsoToDateTime(appointment.dateTime)}</p>
            <p>{appointment.location}</p>
          </div>
          <p>{appointment.patientName}</p>
          <p>{appointment.appType}</p>
        </div>
        <div>
          <button
            className="leading-3 text-4xl"
            aria-label={`Open Appointment Details ${
              appointment.patientName
            } ${parseIsoToDateTime(appointment.dateTime)}`}
            title={`Open Appointment Details ${appointment.patientName}`}
            onClick={() =>
              navigate(
                `/dashboard/patients/details/${appointment.patientId}?edit-appointment=${appointment.id}`
              )
            }
          >
            <OpenInNewOutlined fontSize="inherit" />
          </button>
        </div>
      </article>
    </>
  );
};

export default StaffMyAppointmentCard;
