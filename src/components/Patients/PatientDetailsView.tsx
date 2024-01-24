import { useEffect, useState } from "react";
import { getPatientDetails } from "../../api/getPatientDetails";
import { useParams } from "react-router-dom";
import { PatientDetails } from "../../interfaces/PatientDetails";

const PatientDetailsView = () => {
  const [patientData, setPatientData] = useState<PatientDetails | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getPatientDetails(id)
      .then((res) => {
        setPatientData(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  },[id]);

  return (
    <>
    </>
  );
};

export default PatientDetailsView;
