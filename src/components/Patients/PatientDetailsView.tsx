import { useEffect, useRef, useState } from "react";
import { getPatientDetails } from "../../api/getPatientDetails";
import { useNavigate, useParams } from "react-router-dom";
import { PatientDetails } from "../../interfaces/PatientDetails";
import {
  ArrowBackOutlined,
  PermContactCalendarOutlined,
  HomeOutlined,
  LocalHospitalOutlined,
} from "@mui/icons-material";
import { parseDate } from "../../utils/parseDate";
import { updatePatientNotes } from "../../api/updatePatientNotes";
import { SpinnerStatus, Toast } from "..";
import { ErrorState } from "../../interfaces/ErrorState";
import { TabsComponent } from "flowbite-react";
import { TabItem } from "flowbite-react/lib/esm/components/Tab/TabItem";

const PatientDetailsView = () => {
  const [error, setError] = useState<ErrorState>({ state: false, message: "" });
  const [notesError, setNotesError] = useState<ErrorState>({
    state: false,
    message: "",
    color: "failure",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [patientData, setPatientData] = useState<PatientDetails | null>(null);
  const [editNotes, setEditNotes] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");
  const notesAreaRef = useRef<HTMLTextAreaElement>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    setError({ state: false, message: "" });
    getPatientDetails(id)
      .then((res) => {
        setLoading(false);
        setPatientData(res.data);
      })
      .catch((err) => {
        if (err.response === undefined) {
          setError({ ...error, state: true });
        } else {
          setError({ state: true, message: err.response.data });
        }
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    setNotes(patientData?.notes ?? "");
  }, [patientData]);

  useEffect(() => {
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
  }, [notes]);

  const parseStoma = () => {
    if (patientData?.stoma === false) {
      return "No";
    } else if (patientData?.stoma === true) {
      return "Yes";
    }
  };

  const handleEditNotes = () => {
    if (editNotes) {
      setNotes(patientData?.notes ?? "");
    }
    setEditNotes(!editNotes);
  };

  const handleSaveNotes = () => {
    updatePatientNotes(id, notes)
      .then((_res) => {
        setEditNotes(false);
        setNotesError({
          state: true,
          message: "Notes updated successfully",
          color: "success",
        });
      })
      .catch((err) => {
        if (err.response === undefined) {
          setNotesError({ ...error, state: true, color: "failure" });
        } else {
          setNotesError({
            state: true,
            message: err.response.data,
            color: "failure",
          });
        }
      });
  };

  const parseDiagnosis = () => {
    if (patientData?.diagnosis === "CD") {
      return "Crohn's Disease";
    } else if (patientData?.diagnosis === "UC") {
      return "Ulcerative Colitis";
    }
  };

  const closeErrorState = () => {
    setError({ state: false, message: "" });
  };

  const closeNotesErrorState = () => {
    setNotesError({ state: false, message: "", color: "failure" });
  };

  return (
    <>
      {loading && <SpinnerStatus />}
      <section className="flex flex-col">
        <div className="border-b border-slate-300">
          <button
            className="flex flex-row items-center gap-2 text-lg p-1 hover:bg-zinc-300 hover:text-blue-600 active:bg-slate-300 active:text-blue-700"
            type="button"
            aria-label="Back to Patients"
            onClick={() => navigate(-1)}
          >
            <ArrowBackOutlined />
            <p>Back to Patients</p>
          </button>
        </div>
        {error.state && (
          <Toast
            color={"failure"}
            message={error.message}
            handleErrorState={closeErrorState}
          />
        )}
        <section className="m-4">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-4">
              {`${patientData?.name.split(",").reverse().join(" ")}`}
            </h2>
            <div className="w-72 flex flex-col flex-wrap gap-6 md:flex-row">
              <div className="flex gap-2 mb-1">
                <PermContactCalendarOutlined />
                <p className="text-lg">
                  {patientData && typeof patientData.dateOfBirth === "string"
                    ? parseDate(patientData.dateOfBirth)
                    : null}
                </p>
              </div>
              <p className="mb-1 text-lg">Sex: {patientData?.sex}</p>
              <div className="w-60 flex gap-2 mb-1">
                <HomeOutlined />
                <p className="text-lg whitespace-pre-line">
                  {patientData?.address}
                </p>
              </div>
            </div>
          </div>
          <TabsComponent
            aria-aria-label={`${patientData?.name
              .split(",")
              .reverse()
              .join(" ")} Details Tabs`}
            style="underline"
          >
            <TabItem active title="Care Notes">
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
                    <LocalHospitalOutlined />
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
                  {notesError.state && (
                    <Toast
                      color={notesError.color || "failure"}
                      message={notesError.message}
                      handleErrorState={closeNotesErrorState}
                    />
                  )}
                  <div className="flex justify-between mb-1">
                    <button
                      className={`rounded-sm px-1 ${
                        !editNotes
                          ? "bg-zinc-400 hover:bg-zinc-700 active:bg-zinc-500"
                          : "bg-red-400 hover:bg-red-700 active:bg-red-500"
                      } hover:text-white`}
                      onClick={handleEditNotes}
                    >
                      {editNotes ? "Cancel Edit" : "Edit Notes"}
                    </button>
                    {editNotes && (
                      <button
                        className="rounded-sm px-1 bg-blue-400 hover:bg-sky-700 active:bg-sky-500 hover:text-white"
                        onClick={handleSaveNotes}
                      >
                        Save Notes
                      </button>
                    )}
                  </div>
                  <textarea
                    disabled={!editNotes}
                    aria-label="Patient Notes"
                    className="w-full resize-none overflow-hidden"
                    value={notes}
                    ref={notesAreaRef}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            </TabItem>
            <TabItem title="Appointments"></TabItem>
            <TabItem title="IBD Surveys"></TabItem>
          </TabsComponent>
        </section>
      </section>
    </>
  );
};

export default PatientDetailsView;
