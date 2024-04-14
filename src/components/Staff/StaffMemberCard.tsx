import { OpenInNewOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { StaffDetails } from "../../interfaces/StaffDetails";

interface StaffMyAppointmentCardProps {
  staffDetails: StaffDetails;
}

const StaffMemberCard = ({ staffDetails }: StaffMyAppointmentCardProps) => {
  const navigate = useNavigate();

  return (
    <>
      <article
        className="w-full p-1 grid grid-cols-[auto_min-content] gap-3 border-b border-slate-600 bg-slate-200 text-sm"
        tabIndex={0}
        aria-label="Staff Member Card"
      >
        <div>
          <div className="flex flex-wrap max-md:flex-col justify-between gap-x-8 text-lg font-semibold">
            <p>{staffDetails.name}</p>
            <p>{staffDetails.role}</p>
          </div>
          <p>{staffDetails.speciality}</p>
          <p>{staffDetails.practice}</p>
        </div>
        <div>
          <button
            className="leading-3 text-4xl"
            aria-label={`Open Staff Details ${staffDetails.name} ${staffDetails.practice} ${staffDetails.role} ${staffDetails.speciality}`}
            title={`Open Staff Details ${staffDetails.name}`}
            onClick={() =>
              navigate(`/portal/staff/dashboard/staff/details/${staffDetails.staffId}`)
            }
          >
            <OpenInNewOutlined fontSize="inherit" />
          </button>
        </div>
      </article>
    </>
  );
};

export default StaffMemberCard;
