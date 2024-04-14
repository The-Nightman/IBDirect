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
  PatientPrescriptEditModal,
  PatientSurveyCard,
  PatientSurveyStaffEditModal,
} from "..";
import { ErrorState } from "../../interfaces/ErrorState";
import { TabsComponent } from "flowbite-react";
import { TabItem } from "flowbite-react/lib/esm/components/Tab/TabItem";
import { parseStoma } from "../../utils/parseStoma";
import { Appointment } from "../../interfaces/Appointment";
import { Prescription } from "../../interfaces/Prescription";
import { useUserDetails } from "../../context/userDetailsContext";
import { Survey } from "../../interfaces/Survey";
import { parseDiagnosis } from "../../utils/parseDiagnosis";
import { StaffDetails } from "../../interfaces/StaffDetails";
import { getStaffMyColleagues } from "../../api/getStaffMyColleagues";
import { updatePatientDetails } from "../../api/updatePatientDetails";

interface PatientDetailsEditData {
  name: string;
  address: string;
  diagnosis: string;
  diagnosisDate: string;
  stoma: boolean;
  consultantId: number;
  nurseId: number;
  stomaNurseId: number | null;
}

const PatientDetailsStaffView = () => {
  const { userDetails } = useUserDetails();
  const [error, setError] = useState<ErrorState>({
    state: false,
    message: "",
    color: "failure",
  });
  const [notesError, setNotesError] = useState<ErrorState>({
    state: false,
    message: "",
    color: "failure",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [patientData, setPatientData] = useState<PatientDetails | null>(null);
  const [editNotes, setEditNotes] = useState<boolean>(false);
  const [editDetails, setEditDetails] = useState<boolean>(false);
  const [editDetailsData, setEditDetailsData] =
    useState<PatientDetailsEditData | null>(null);
  const [hospitalStaff, setHospitalStaff] = useState<StaffDetails[]>([
    userDetails!,
  ]);
  const [notes, setNotes] = useState<string>("");
  const [newAppointmentModalState, setNewAppointmentModalState] =
    useState<boolean>(false);
  const [newPrescriptionModalState, setNewPrescriptionModalState] =
    useState<boolean>(false);
  const [newSurveyModalState, setNewSurveyModalState] =
    useState<boolean>(false);
  const notesAreaRef = useRef<HTMLTextAreaElement>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (isNaN(parseInt(id!))) {
      navigate(-1);
      return;
    }
    getPatientDetails(id)
      .then((res) => {
        setLoading(false);
        setPatientData(res.data);
        setNotes(res.data.notes ?? "");
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
    if (patientData) {
      setEditDetailsData({
        name: patientData.name,
        address: patientData.address,
        diagnosis: patientData.diagnosis,
        diagnosisDate: patientData.diagnosisDate,
        stoma: patientData.stoma,
        consultantId: patientData.consultant.staffId,
        nurseId: patientData.nurse.staffId,
        stomaNurseId: patientData.stomaNurse?.staffId ?? null,
      });
    }
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
        setPatientData({ ...patientData!, notes: notes });
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

  const handleEditDetails = () => {
    const staffListUserRedacted = hospitalStaff.filter(
      (staff) => staff.staffId !== userDetails?.staffId
    );
    if (!staffListUserRedacted.length) {
      getStaffMyColleagues(userDetails!.staffId)
        .then((res) => {
          setHospitalStaff([...hospitalStaff, ...res.data]);
        })
        .catch((err) => {
          if (err.response === undefined) {
            setError({ ...error, state: true });
          } else {
            setError({ state: true, message: err.response.data });
          }
        });
    }
    if (editDetails && patientData) {
      setEditDetailsData({
        name: patientData.name,
        address: patientData.address,
        diagnosis: patientData.diagnosis,
        diagnosisDate: patientData.diagnosisDate,
        stoma: patientData.stoma,
        consultantId: patientData.consultant.staffId,
        nurseId: patientData.nurse.staffId,
        stomaNurseId: patientData.stomaNurse?.staffId ?? null,
      });
    }
    setEditDetails(!editDetails);
  };

  const handleSaveDetails = () => {
    if (editDetailsData) {
      updatePatientDetails(id, editDetailsData!)
        .then((_res) => {
          setPatientData((prev) => ({
            ...prev!,
            name: editDetailsData.name,
            address: editDetailsData.address,
            diagnosis: editDetailsData.diagnosis,
            diagnosisDate: editDetailsData.diagnosisDate,
            stoma: editDetailsData.stoma,
            consultant: hospitalStaff.find(
              (staff) =>
                staff.staffId === editDetailsData.consultantId &&
                staff.role === "Consultant"
            )!,
            nurse: hospitalStaff.find(
              (staff) =>
                staff.staffId === editDetailsData.nurseId &&
                staff.role === "Nurse"
            )!,
            stomaNurse: editDetailsData.stomaNurseId
              ? hospitalStaff.find(
                  (staff) =>
                    staff.staffId === editDetailsData.stomaNurseId &&
                    staff.role === "Stoma Nurse"
                )!
              : null,
          }));
          setError({
            state: true,
            message: "Patient details updated successfully",
            color: "success",
          });
          setEditDetails(false);
        })
        .catch((err) => {
          if (err.response === undefined) {
            setError({ ...error, state: true });
          } else {
            setError({ state: true, message: err.response.data });
          }
        });
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

  const updatePrescriptions = (
    updatedPrescriptionObj: Prescription,
    index: number,
    newPrescription: boolean = false
  ) => {
    if (patientData) {
      if (!newPrescription) {
        const newPrescriptionState = patientData.prescriptions.map(
          (prescription, i) =>
            i === index ? updatedPrescriptionObj : prescription
        );
        setPatientData({ ...patientData, prescriptions: newPrescriptionState });
      } else if (newPrescription) {
        const updatedPrescriptionState = [
          ...patientData.prescriptions,
          updatedPrescriptionObj,
        ];
        setPatientData({
          ...patientData,
          prescriptions: updatedPrescriptionState,
        });
      }
    }
  };

  const updateSurveys = (
    updatedSurvey: Survey,
    index: number,
    newSurvey: boolean = false
  ) => {
    if (patientData) {
      if (!newSurvey) {
        const newSurveyState = patientData.surveys.map((survey, i) =>
          i === index ? updatedSurvey : survey
        );
        setPatientData({ ...patientData, surveys: newSurveyState });
      } else if (newSurvey) {
        const updatedSurveyState = [...patientData.surveys, updatedSurvey];
        setPatientData({
          ...patientData,
          surveys: updatedSurveyState,
        });
      }
    }
  };

  const createNewAppointment = () => {
    if (patientData) {
      setNewAppointmentModalState(true);
    }
  };

  const createNewPrescription = () => {
    if (patientData) {
      setNewPrescriptionModalState(true);
    }
  };

  const createNewSurvey = () => {
    if (patientData) {
      setNewSurveyModalState(true);
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

  const removeSurvey = (id: number) => {
    if (patientData) {
      setPatientData({
        ...patientData,
        surveys: patientData.surveys.filter((survey) => survey.id !== id),
      });
    }
  };

  return (
    <>
      {loading && <SpinnerStatus />}
      <article className="flex flex-col">
        <section className="border-b border-slate-300">
          <button
            className="flex flex-row items-center gap-2 text-lg p-1 hover:bg-zinc-300 hover:text-blue-600 active:bg-slate-300 active:text-blue-700"
            type="button"
            aria-label="Back to Patients"
            onClick={() => navigate("/portal/staff/dashboard/patients")}
          >
            <ArrowBackOutlined />
            Back to Patients
          </button>
        </section>
        {error.state && (
          <Toast
            color={error.color || "failure"}
            message={error.message}
            handleErrorState={closeErrorState}
          />
        )}
        <section className="m-4">
          {patientData && (
            <div className="flex mb-4">
              <button
                className={`rounded-sm px-1 ${
                  !editDetails
                    ? "bg-zinc-400 hover:bg-zinc-700 active:bg-zinc-500"
                    : "bg-red-400 hover:bg-red-700 active:bg-red-500"
                } hover:text-white`}
                onClick={handleEditDetails}
                aria-description={
                  editDetails
                    ? "Cancel Edit Patient Details"
                    : "Edit Patient Details"
                }
              >
                {editDetails ? "Cancel Edit" : "Edit Details"}
              </button>
              {editDetails && (
                <button
                  className="ml-auto rounded-sm px-1 bg-blue-400 hover:bg-sky-700 active:bg-sky-500 hover:text-white"
                  onClick={handleSaveDetails}
                  aria-description="Save Patient Details"
                >
                  Save Details
                </button>
              )}
            </div>
          )}
          <section className="mb-10">
            {editDetails ? (
              <label className="flex flex-col">
                <span className="flex flex-row">
                  Name:<span aria-hidden>(Last name, First name format)</span>
                </span>
                <input
                  type="text"
                  className="text-2xl font-bold mb-4"
                  aria-description="Patient Name in Last name comma First name format"
                  autoComplete="off"
                  defaultValue={editDetailsData?.name}
                  onChange={(e) =>
                    setEditDetailsData({
                      ...editDetailsData!,
                      name: e.target.value,
                    })
                  }
                />
              </label>
            ) : (
              <h2 className="text-3xl font-bold mb-4">
                {`${patientData?.name.split(",").reverse().join(" ")}`}
              </h2>
            )}
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
              {editDetails ? (
                <label className="flex flex-col">
                  Address:
                  <input
                    type="text"
                    aria-description="Patient Address"
                    autoComplete="off"
                    defaultValue={editDetailsData?.address}
                    onChange={(e) =>
                      setEditDetailsData({
                        ...editDetailsData!,
                        address: e.target.value,
                      })
                    }
                  />
                </label>
              ) : (
                <div className="w-60 flex gap-2 mb-1">
                  <HomeOutlined />
                  <p className="text-lg text-pretty">
                    Address: {patientData?.address}
                  </p>
                </div>
              )}
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
                <div className="max-w-[30rem] flex flex-col mb-2 md:justify-between md:flex-row">
                  {editDetails ? (
                    <>
                      <label className="flex flex-col mb-4">
                        Diagnosis:
                        <select
                          aria-description="Patient Diagnosis"
                          defaultValue={editDetailsData?.diagnosis}
                          onChange={(e) =>
                            setEditDetailsData({
                              ...editDetailsData!,
                              diagnosis: e.target.value,
                            })
                          }
                        >
                          <option value="CD">Crohn's Disease</option>
                          <option value="UC">Ulcerative Colitis</option>
                          <option value="IBDU">IBD Unclassified</option>
                          <option value="MC">Microscopic Colitis</option>
                        </select>
                      </label>
                      <label className="flex flex-col mb-4">
                        Stoma:
                        <select
                          aria-description="Does the patient have a stoma?"
                          defaultValue={editDetailsData?.stoma.toString()}
                          onChange={(e) =>
                            setEditDetailsData({
                              ...editDetailsData!,
                              stoma: e.target.value === "true",
                            })
                          }
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </label>
                    </>
                  ) : (
                    <>
                      <p className="text-xl">
                        Diagnosis: {parseDiagnosis(patientData?.diagnosis)}
                      </p>
                      <p className="text-xl">
                        Stoma: {parseStoma(patientData?.stoma)}
                      </p>
                    </>
                  )}
                </div>
                {editDetails ? (
                  <label>
                    Date Of Diagnosis:
                    <input
                      className="flex flex-col mb-4 invalid:bg-red-500"
                      type="text"
                      aria-description="Date of Diagnosis in Day Day / Month Month / Full Year format"
                      value={parseDate(editDetailsData?.diagnosisDate)}
                      minLength={10}
                      maxLength={10}
                      pattern="^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$"
                      autoComplete="off"
                      placeholder="DD/MM/YYYY"
                      onChange={(e) =>
                        setEditDetailsData({
                          ...editDetailsData!,
                          diagnosisDate: e.target.value
                            .split("/")
                            .reverse()
                            .join("-"),
                        })
                      }
                    />
                  </label>
                ) : (
                  <p className="mb-4">
                    Date of diagnosis:{" "}
                    <time>
                      {patientData &&
                      typeof patientData.diagnosisDate === "string"
                        ? parseDate(patientData.diagnosisDate)
                        : "ERROR"}
                    </time>
                  </p>
                )}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <LocalHospitalOutlined />
                    <p>{patientData?.hospital}</p>
                  </div>
                  {editDetails ? (
                    <section className="md:flex-row md:columns-2 ">
                      <label className="flex flex-col mb-4">
                        Consultant:
                        <select
                          aria-description="Consultant"
                          defaultValue={editDetailsData?.consultantId}
                          onChange={(e) =>
                            setEditDetailsData({
                              ...editDetailsData!,
                              consultantId: parseInt(e.target.value),
                            })
                          }
                        >
                          {hospitalStaff
                            .filter((staff) => staff.role === "Consultant")
                            .map((staff) => (
                              <option key={staff.staffId} value={staff.staffId}>
                                {staff.name} - {staff.role}
                              </option>
                            ))}
                        </select>
                      </label>
                      <label className="flex flex-col mb-4">
                        IBD Nurse:
                        <select
                          aria-description="IBD Nurse"
                          defaultValue={editDetailsData?.nurseId}
                          onChange={(e) =>
                            setEditDetailsData({
                              ...editDetailsData!,
                              nurseId: parseInt(e.target.value),
                            })
                          }
                        >
                          {hospitalStaff
                            .filter((staff) => staff.role === "Nurse")
                            .map((staff) => (
                              <option key={staff.staffId} value={staff.staffId}>
                                {staff.name} - {staff.role}
                              </option>
                            ))}
                        </select>
                      </label>
                      <label className="flex flex-col mb-4">
                        Stoma Care Nurse:
                        <select
                          aria-description="Stoma Care Nurse"
                          value={editDetailsData?.stomaNurseId ?? "null"}
                          onChange={(e) =>
                            setEditDetailsData({
                              ...editDetailsData!,
                              stomaNurseId:
                                e.target.value === "null"
                                  ? null
                                  : parseInt(e.target.value),
                            })
                          }
                        >
                          {hospitalStaff
                            .filter((staff) => staff.role === "Stoma Nurse")
                            .map((staff) => (
                              <option key={staff.staffId} value={staff.staffId}>
                                {staff.name} - {staff.role}
                              </option>
                            ))}
                          <option value={"null"}>N/A</option>
                        </select>
                        <span className="text-xs">
                          Note: Stoma Nurse is not required if the patient does
                          not have or is not being prepped for a stoma
                        </span>
                      </label>
                      <p>GP: {patientData?.genpract.name}</p>
                    </section>
                  ) : (
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
                  )}
                </div>
                <section className="my-4">
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
                </section>
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
                  <button
                    className="rounded-sm py-1 px-2 mb-8 bg-blue-400 hover:bg-sky-700 active:bg-sky-500 hover:text-white"
                    onClick={createNewPrescription}
                  >
                    Create New Prescription
                  </button>
                  {patientData && newPrescriptionModalState ? (
                    <PatientPrescriptEditModal
                      prescription={{
                        scriptName: "Prescription Name",
                        scriptStartDate: new Date()
                          .toISOString()
                          .split("T")[0]
                          .toString(),
                        scriptDose: "Prescription Dosage",
                        scriptInterval: "Dosing Interval",
                        notes: "Notes",
                        scriptRepeat: false,
                        prescribingStaff: userDetails!,
                        prescribingStaffId: userDetails!.staffId,
                      }}
                      editModalState={newPrescriptionModalState}
                      setEditModalState={setNewPrescriptionModalState}
                      updatePrescriptionsState={updatePrescriptions}
                      index={patientData.prescriptions.length}
                      newPrescription={true}
                      patientId={patientData.patientId}
                    />
                  ) : null}
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
                                updatePrescriptionsState={updatePrescriptions}
                                index={index}
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
                                updatePrescriptionsState={updatePrescriptions}
                                index={index}
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
            <TabItem title="IBD Surveys">
              <section>
                <h3 className="border-b border-slate-400 mb-4">Surveys</h3>
                <section>
                  <span className="sr-only">
                    IBD Disease Activity Index score is calculated from the sum
                    of responses to 1a, 1b and 3a to 3f. Each option is
                    allocated a score of 0, 1 or 2. The Activity Index Score
                    ranges from 0 (worst control and most activity) to 16 (best
                    control and least activity).
                  </span>
                  <button
                    className="rounded-sm py-1 px-2 mb-8 bg-blue-400 hover:bg-sky-700 active:bg-sky-500 hover:text-white"
                    onClick={createNewSurvey}
                  >
                    Create New Survey
                  </button>
                  {patientData && newSurveyModalState ? (
                    <PatientSurveyStaffEditModal
                      survey={{
                        date: new Date().toISOString().split("T")[0].toString(),
                        q1: null,
                        q2: null,
                        q3: null,
                        q4: null,
                        q4a: false,
                        q5: null,
                        q6: null,
                        q7: null,
                        q8: null,
                        q9: null,
                        q10: null,
                        q11: null,
                        q12: null,
                        contScore: null,
                        q13: null,
                        completed: false,
                      }}
                      editModalState={newSurveyModalState}
                      setEditModalState={setNewSurveyModalState}
                      updateSurveyState={updateSurveys}
                      index={patientData.surveys.length}
                      newSurvey={true}
                      patientId={patientData.patientId}
                    />
                  ) : null}
                  <h4>Upcoming surveys</h4>
                  <ol className="border-x border-t border-slate-500">
                    {patientData?.surveys.some(
                      (survey) => !survey.completed
                    ) ? (
                      patientData?.surveys.map((survey, index) => {
                        if (!survey.completed) {
                          return (
                            <li key={index}>
                              <PatientSurveyCard
                                survey={survey}
                                updateSurveyState={updateSurveys}
                                index={index}
                                removeSurvey={removeSurvey}
                              />
                            </li>
                          );
                        }
                      })
                    ) : (
                      <li>
                        <div className="w-full p-1 border-b border-slate-600 bg-slate-200">
                          <p>No upcoming surveys to display</p>
                        </div>
                      </li>
                    )}
                  </ol>
                </section>
                <section>
                  <h4>Completed surveys</h4>
                  <ol className="border-x border-t border-slate-500">
                    {patientData?.surveys.some((survey) => survey.completed) ? (
                      patientData?.surveys.map((survey, index) => {
                        if (survey.completed) {
                          return (
                            <li key={index}>
                              <PatientSurveyCard survey={survey} />
                            </li>
                          );
                        }
                      })
                    ) : (
                      <li>
                        <div className="w-full p-1 border-b border-slate-600 bg-slate-200">
                          <p>No Completed surveys to display</p>
                        </div>
                      </li>
                    )}
                  </ol>
                </section>
              </section>
            </TabItem>
          </TabsComponent>
        </section>
      </article>
    </>
  );
};

export default PatientDetailsStaffView;
