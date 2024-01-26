import { useEffect, useRef, useState } from "react";
import { getPatientDetails } from "../../api/getPatientDetails";
import { useParams } from "react-router-dom";
import { PatientDetails } from "../../interfaces/PatientDetails";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import { parseDate } from "../../utils/parseDate";

const PatientDetailsView = () => {
  const [patientData, setPatientData] = useState<PatientDetails | null>(null);
  const [editNotes, setEditNotes] = useState<boolean>(false);
  const notesAreaRef = useRef<HTMLTextAreaElement>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getPatientDetails(id)
      .then((res) => {
        setPatientData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    const notesAreaResize = () => {
      if (notesAreaRef.current) {
        notesAreaRef.current.style.height = "auto";
        notesAreaRef.current.style.height =
          notesAreaRef.current.scrollHeight + "px";
      }
    };

    notesAreaResize();
    notesAreaRef.current?.addEventListener("input", notesAreaResize);

    return () => {
      notesAreaRef.current?.removeEventListener("input", notesAreaResize);
    };
  }, [id]);

  const parseStoma = () => {
    if (patientData?.stoma === false) {
      return "No";
    } else if (patientData?.stoma === true) {
      return "Yes";
    }
  };

  const handleSaveNotes = () => {
    setEditNotes(false);
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
      <section className="flex flex-col">
        <div className="border-b border-slate-300">
          <button
            className="flex flex-row items-center gap-2 text-lg p-1"
            type="button"
            aria-label="Back to Patients"
          >
            <ArrowBackOutlinedIcon />
            <p>Back to Patients</p>
          </button>
        </div>
        <section className="m-4">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-4">
              {`${patientData?.name.split(",").reverse().join(" ")}`}
            </h2>
            <div className="w-72 flex flex-col flex-wrap gap-6 md:flex-row">
              <div className="flex gap-2 mb-1">
                <PermContactCalendarOutlinedIcon />
                <p className="text-lg">
                  {patientData && typeof patientData.dateOfBirth === "string"
                    ? parseDate(patientData.dateOfBirth)
                    : null}
                </p>
              </div>
              <p className="mb-1 text-lg">Sex: {patientData?.sex}</p>
              <div className="w-60 flex gap-2 mb-1">
                <HomeOutlinedIcon />
                <p className="text-lg whitespace-pre-line">
                  {patientData?.address}
                </p>
              </div>
            </div>
          </div>
          <div className="text-l">
            <h3 className="border-b border-slate-400 mb-4">Care Notes</h3>
            <div className="w-80 flex flex-col mb-2 md:justify-between md:flex-row">
              <p className="text-xl">{parseDiagnosis()}</p>
              <p className="text-xl">Stoma: {parseStoma()}</p>
            </div>
            <p className="mb-4">
              Date of diagnosis:{" "}
              {patientData && typeof patientData.diagnosisDate === "string"
                ? parseDate(patientData.diagnosisDate)
                : null}
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <LocalHospitalOutlinedIcon />
                <p>{patientData?.hospital}</p>
              </div>
              <div className=" md:flex-row md:columns-2 ">
                <p>Consultant: {patientData?.consultantName}</p>
                <p>IBD Nurse: {patientData?.nurseName}</p>
                <p>Stoma Care Nurse: {patientData?.stomaNurseName}</p>
                <p>GP: {patientData?.genpractName}</p>
              </div>
            </div>
            <div className="my-4">
              <div className="flex justify-between mb-1">
                <button
                  className={`rounded-sm px-1 ${
                    !editNotes
                      ? "bg-zinc-400 hover:bg-zinc-700"
                      : "bg-red-400 hover:bg-red-700"
                  } hover:text-white`}
                  onClick={() => setEditNotes(!editNotes)}
                >
                  {editNotes ? "Cancel Edit" : "Edit Notes"}
                </button>
                {editNotes && (
                  <button className="rounded-sm px-1 bg-blue-400 hover:bg-sky-700 hover:text-white" onClick={handleSaveNotes}>
                    Save Notes
                  </button>
                )}
              </div>
              <textarea
                disabled={!editNotes}
                aria-label="Patient Notes"
                className="w-full resize-none overflow-hidden"
                value={patientData?.notes ? patientData.notes : ""}
                ref={notesAreaRef}
              />
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default PatientDetailsView;
