import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface PatientCardProps {
  name: string;
  dob: string;
  diagnosis: string;
  stoma: boolean | string;
}

const PatientCard = ({ name, dob, diagnosis, stoma }: PatientCardProps) => {
  if (stoma === false) {
    stoma = "N";
  } else if (stoma === true) {
    stoma = "Y";
  }
  console.log(typeof dob);

  return (
    <>
      <div className="grid grid-cols-[25%_20%_auto_20%_10%] h-14 px-4 text-xl items-center">
        <p>{name}</p>
        <p>{dob.split("-").reverse().join("/")}</p>
        <p>{diagnosis}</p>
        <p>Stoma: {stoma}</p>
        <MoreHorizIcon />
      </div>
    </>
  );
};

export default PatientCard;
