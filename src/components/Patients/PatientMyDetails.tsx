import {
  HomeOutlined,
  LocalHospitalOutlined,
  PermContactCalendarOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Notes, SpinnerStatus, Toast } from "..";
import { ErrorState } from "../../interfaces/ErrorState";
import { parseDate } from "../../utils/parseDate";
import { patientUserMyDetails } from "../../api/getPatientMyDetails";
import { useAuth } from "../../context/AuthContext";
import { StaffDetails } from "../../interfaces/StaffDetails";
import { parseStoma } from "../../utils/parseStoma";

export interface PatientMyDetails {
  patientId: number;
  name: string;
  sex: string;
  hospital: string;
  diagnosis: string;
  diagnosisDate: string;
  stoma: boolean;
  notes: string;
  consultant: StaffDetails;
  nurse: StaffDetails;
  stomaNurse: StaffDetails | null;
  genpract: StaffDetails;
  dateOfBirth: string;
  address: string;
}

const PatientMyDetails = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [patientData, setPatientData] = useState<PatientMyDetails | null>();
  const [error, setError] = useState<ErrorState>({
    state: false,
    message: "",
    color: "",
  });
  const { user } = useAuth();

  useEffect(() => {
    patientUserMyDetails(user.userID)
      .then((res) => {
        setLoading(false);
        setPatientData(res.data);
      })
      .catch((err) => {
        if (err.response === undefined) {
          setError({ ...error, state: true });
        } else {
          setError({
            state: true,
            message: err.response.data,
            color: "failure",
          });
        }
        setLoading(false);
      });
  }, [user.userID]);

  const closeErrorState = () => {
    setError({ state: false, message: "" });
  };

  const parseDiagnosis = () => {
    if (patientData?.diagnosis === "CD") {
      return "Crohn's Disease";
    } else if (patientData?.diagnosis === "UC") {
      return "Ulcerative Colitis";
    }
  };

  return (
    <>
      {loading && <SpinnerStatus />}
      <article className="flex flex-col">
        {error.state && (
          <Toast
            color={"failure"}
            message={error.message}
            handleErrorState={closeErrorState}
          />
        )}
        <section className="m-4">
          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-4">
              {`${patientData?.name.split(",").reverse().join(" ")}`}
            </h2>
            <div className="w-72 flex flex-col flex-wrap gap-6 md:flex-row">
              <div className="flex gap-2 mb-1">
                <PermContactCalendarOutlined />
                <time className="text-lg" aria-label="Date Of Birth">
                  {patientData && typeof patientData.dateOfBirth === "string"
                    ? parseDate(patientData.dateOfBirth)
                    : null}
                </time>
              </div>
              <p className="mb-1 text-lg">Sex: {patientData?.sex}</p>
              <div className="w-60 flex gap-2 mb-1">
                <HomeOutlined />
                <p className="text-lg whitespace-pre-line">
                  Address: {patientData?.address}
                </p>
              </div>
            </div>
          </section>
          <section>
            <h3 className="border-b border-slate-400 mb-4">Care Notes</h3>
            <div className="max-w-[30rem] flex flex-col mb-2 md:justify-between md:flex-row">
              <p className="text-xl">Diagnosis: {parseDiagnosis()}</p>
              <p className="text-xl">Stoma: {parseStoma(patientData?.stoma)}</p>
            </div>
            <p className="mb-4">
              Date of diagnosis:
              <time>
                {patientData && typeof patientData.diagnosisDate === "string"
                  ? parseDate(patientData.diagnosisDate)
                  : null}
              </time>
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <LocalHospitalOutlined />
                <p>{patientData?.hospital}</p>
              </div>
              <section className="md:flex-row md:columns-2 ">
                <p>Consultant: {patientData?.consultant.name}</p>
                <p>IBD Nurse: {patientData?.nurse.name}</p>
                <p>
                  Stoma Care Nurse:{" "}
                  {patientData?.stomaNurse?.name != null
                    ? patientData?.stomaNurse?.name
                    : "N/A"}
                </p>
                <p>GP: {patientData?.genpract.name}</p>
              </section>
            </div>
            <section className="my-4">
              {patientData?.notes && (
                <Notes
                  parentData={patientData}
                  editControls={false}
                  ariaLabel="My Notes"
                  ariaDescription="My Patient Notes"
                />
              )}
            </section>
          </section>
        </section>
      </article>
    </>
  );
};

export default PatientMyDetails;
