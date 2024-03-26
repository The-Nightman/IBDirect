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
import {
  SpinnerStatus,
  Toast,
  PatientAppointmentCard,
  PatientAppEditModal,
  PatientPrescriptionCard,
} from "..";
import { ErrorState } from "../../interfaces/ErrorState";
import { TabsComponent } from "flowbite-react";
import { TabItem } from "flowbite-react/lib/esm/components/Tab/TabItem";
import { parseStoma } from "../../utils/parseStoma";
import { Appointment } from "../../interfaces/Appointment";

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
  const [newAppointmentModalState, setNewAppointmentModalState] =
    useState<boolean>(false);
  const notesAreaRef = useRef<HTMLTextAreaElement>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (id === undefined) {
    return null;
  }

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

  const updateAppointments = (
    updatedAppointment: Appointment,
    index: number,
    newAppointment: boolean = false
  ) => {
    if (patientData) {
      if (!newAppointment) {
        const newAppointmentState = patientData.appointments.map(
          (appointment, i) => (i === index ? updatedAppointment : appointment)
        );
        setPatientData({ ...patientData, appointments: newAppointmentState });
      } else if (newAppointment) {
        const updatedAppointmentState = [
          ...patientData.appointments,
          updatedAppointment,
        ];
        setPatientData({
          ...patientData,
          appointments: updatedAppointmentState,
        });
      }
    }
  };

  const createNewAppointment = () => {
    if (patientData) {
      setNewAppointmentModalState(true);
    }
  };

  const removeAppointment = (id: number) => {
    if (patientData) {
      setPatientData({
        ...patientData,
        appointments: patientData.appointments.filter(
          (appointment) => appointment.id !== id
        ),
      });
    }
  };

  console.log(patientData);

  return (
    <>
      {loading && <SpinnerStatus />}
      <section className="flex flex-col">
        <div className="border-b border-slate-300">
          <button
            className="flex flex-row items-center gap-2 text-lg p-1 hover:bg-zinc-300 hover:text-blue-600 active:bg-slate-300 active:text-blue-700"
            type="button"
            aria-label="Back to Patients"
            onClick={() => navigate("/dashboard/patients")}
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
          <section className="mb-10">
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
          </section>
          <TabsComponent
            aria-label={`${patientData?.name
              .split(",")
              .reverse()
              .join(" ")} Details Tabs`}
            style="underline"
            className="border-b border-slate-300"
          >
            <TabItem active title="Care Notes">
              <section>
                <h3 className="border-b border-slate-400 mb-4">Care Notes</h3>
                <div className="w-80 flex flex-col mb-2 md:justify-between md:flex-row">
                  <p className="text-xl">{parseDiagnosis()}</p>
                  <p className="text-xl">
                    Stoma: {parseStoma(patientData?.stoma)}
                  </p>
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
                    <p>Consultant: {patientData?.consultant.name}</p>
                    <p>IBD Nurse: {patientData?.nurse.name}</p>
                    <p>
                      Stoma Care Nurse:{" "}
                      {patientData?.stomaNurse?.name != null
                        ? patientData?.stomaNurse?.name
                        : "N/A"}
                    </p>
                    <p>GP: {patientData?.genpract.name}</p>
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
              </section>
            </TabItem>
            <TabItem title="Appointments">
              <section>
                <h3 className="border-b border-slate-400 mb-4">Appointments</h3>
                <section>
                  <button
                    className="rounded-sm py-1 px-2 mb-8 bg-blue-400 hover:bg-sky-700 active:bg-sky-500 hover:text-white"
                    onClick={createNewAppointment}
                  >
                    Create New Appointment
                  </button>
                  {patientData && newAppointmentModalState ? (
                    <PatientAppEditModal
                      appointment={{
                        staffId: patientData.consultant.staffId,
                        staffName: patientData.consultant.name,
                        dateTime: new Date().toISOString(),
                        location: patientData.consultant.practice,
                        appType: "placeholder",
                        notes: "",
                      }}
                      editModalState={newAppointmentModalState}
                      setEditModalState={setNewAppointmentModalState}
                      updateAppointmentState={updateAppointments}
                      staff={{
                        consultant: patientData.consultant,
                        nurse: patientData.nurse,
                        stomaNurse: patientData.stomaNurse,
                        genpract: patientData.genpract,
                      }}
                      index={patientData.appointments.length}
                      newAppointment={true}
                      patientId={patientData.patientId}
                    />
                  ) : null}
                  <h4>Upcoming appointments</h4>
                  <ol className="border-x border-t border-slate-500">
                    {patientData?.appointments.some(
                      (appointment) =>
                        new Date(appointment.dateTime) > new Date()
                    ) ? (
                      patientData?.appointments.map((appointment, index) => {
                        if (new Date(appointment.dateTime) > new Date()) {
                          return (
                            <li key={index}>
                              <PatientAppointmentCard
                                appointment={appointment}
                                updateAppointmentState={updateAppointments}
                                removeAppointment={removeAppointment}
                                staff={{
                                  consultant: patientData?.consultant,
                                  nurse: patientData?.nurse,
                                  stomaNurse: patientData?.stomaNurse,
                                  genpract: patientData?.genpract,
                                }}
                                index={index}
                              />
                            </li>
                          );
                        }
                      })
                    ) : (
                      <li>
                        <div className="w-full p-1 border-b border-slate-600 bg-slate-200">
                          <p>No upcoming appointments to display</p>
                        </div>
                      </li>
                    )}
                  </ol>
                </section>
                <section>
                  <h4>Previous appointments</h4>
                  <ol className="border-x border-t border-slate-500">
                    {patientData?.appointments.some(
                      (appointment) =>
                        new Date(appointment.dateTime) <= new Date()
                    ) ? (
                      patientData?.appointments.map((appointment, index) => {
                        if (new Date(appointment.dateTime) <= new Date()) {
                          return (
                            <li key={index}>
                              <PatientAppointmentCard
                                appointment={appointment}
                                updateAppointmentState={updateAppointments}
                                removeAppointment={removeAppointment}
                                staff={{
                                  consultant: patientData?.consultant,
                                  nurse: patientData?.nurse,
                                  stomaNurse: patientData?.stomaNurse,
                                  genpract: patientData?.genpract,
                                }}
                                index={index}
                              />
                            </li>
                          );
                        }
                      })
                    ) : (
                      <li>
                        <div className="w-full p-1 border-b border-slate-600 bg-slate-200">
                          <p>No previous appointments to display</p>
                        </div>
                      </li>
                    )}
                  </ol>
                </section>
              </section>
            </TabItem>
            <TabItem title="Prescriptions">
              <section>
                <h3 className="border-b border-slate-400 mb-4">
                  Prescriptions
                </h3>
                <section>
                  <h4>Repeat Prescriptions</h4>
                  <ol className="border-x border-t border-slate-500">
                    {patientData?.prescriptions.some(
                      (prescription) => prescription.scriptRepeat === true
                    ) ? (
                      patientData?.prescriptions.map((prescription, index) => {
                        if (prescription.scriptRepeat === true) {
                          return (
                            <li key={index}>
                              <PatientPrescriptionCard
                                prescription={prescription}
                              />
                            </li>
                          );
                        }
                      })
                    ) : (
                      <li>
                        <div className="w-full p-1 border-b border-slate-600 bg-slate-200">
                          <p>No prescriptions to display</p>
                        </div>
                      </li>
                    )}
                  </ol>
                </section>
                <section>
                  <h4>Other Prescriptions</h4>
                  <ol className="border-x border-t border-slate-500">
                    {patientData?.prescriptions.some(
                      (prescription) => prescription.scriptRepeat === false
                    ) ? (
                      patientData?.prescriptions.map((prescription, index) => {
                        if (prescription.scriptRepeat === false) {
                          return (
                            <li key={index}>
                              <PatientPrescriptionCard
                                prescription={prescription}
                              />
                            </li>
                          );
                        }
                      })
                    ) : (
                      <li>
                        <div className="w-full p-1 border-b border-slate-600 bg-slate-200">
                          <p>No prescriptions to display</p>
                        </div>
                      </li>
                    )}
                  </ol>
                </section>
              </section>
            </TabItem>
            <TabItem title="IBD Surveys">Surveys</TabItem>
          </TabsComponent>
        </section>
      </section>
    </>
  );
};

export default PatientDetailsView;
