import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import { parseDate } from "../../utils/parseDate";
import { parseStoma } from "../../utils/parseStoma";

interface PatientCardProps {
  id: number;
  name: string;
  dob: string;
  diagnosis: string;
  stoma: boolean | string;
}

const PatientCard = ({ id, name, dob, diagnosis, stoma }: PatientCardProps) => {
  const navigate = useNavigate();

  const openPatientDetails = () => {
    navigate(`/portal/staff/dashboard/patients/details/${id}`);
  };

  return (
    <>
      <div
        className="grid grid-cols-[35%_25%_25%_15%] md:grid-cols-[25%_20%_auto_20%_10%] min-h-[3.5rem] pl-1 md:pl-2 lg:text-xl items-center"
        tabIndex={0}
      >
        <p>{name}</p>
        <time className="text-center">{parseDate(dob, true)}</time>
        <p className="text-center">{diagnosis}</p>
        <p className="hidden md:inline text-center">Stoma: {parseStoma(stoma)}</p>
        <button
          className="rounded-full w-10 place-self-center leading-none hover:bg-slate-300 hover:text-blue-600 active:bg-slate-400 active:text-blue-200"
          type="button"
          title={`More details ${name}`}
          aria-label={`More details ${name}`}
          onClick={openPatientDetails}
        >
          <MoreHorizIcon />
        </button>
      </div>
    </>
  );
};

export default PatientCard;
