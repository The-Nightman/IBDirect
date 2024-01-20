import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom';

interface PatientCardProps {
  id: number;
  name: string;
  dob: string;
  diagnosis: string;
  stoma: boolean | string;
}

const PatientCard = ({ id, name, dob, diagnosis, stoma }: PatientCardProps) => {
  if (stoma === false) {
    stoma = "N";
  } else if (stoma === true) {
    stoma = "Y";
  }

  const navigate = useNavigate();

  const openPatientDetails = () => {
    navigate(`/dashboard/patients/details/${id}`);
  }

  return (
    <>
      <div className="grid grid-cols-[25%_20%_auto_20%_10%] h-14 px-4 text-xl items-center">
        <p>{name}</p>
        <p>{dob.split("-").reverse().join("/")}</p>
        <p>{diagnosis}</p>
        <p>Stoma: {stoma}</p>
        <button type='button' aria-label={`More details ${name}`} onClick={openPatientDetails}>
          <MoreHorizIcon />
        </button>
      </div>
    </>
  );
};

export default PatientCard;