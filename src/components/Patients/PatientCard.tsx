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
    navigate(`/dashboard/patients/details/${id}`);
  };

  return (
    <>
      <div className="grid grid-cols-[25%_20%_auto_20%_10%] h-14 px-4 text-xl items-center" tabIndex={0}>
        <p>{name}</p>
        <time>{parseDate(dob)}</time>
        <p>{diagnosis}</p>
        <p>Stoma: {parseStoma(stoma)}</p>
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
