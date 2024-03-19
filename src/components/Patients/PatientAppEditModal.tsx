import { Datepicker, Modal } from "flowbite-react";
import { Appointment } from "../../interfaces/Appointment";
import { parseIsoToDateTime } from "../../utils/parseIsoToDateTime";
import { useEffect, useRef, useState } from "react";
import { updateAppointment } from "../../api/updateAppointment";
import { StaffDetails } from "../../interfaces/StaffDetails";
import { ErrorState } from "../../interfaces/ErrorState";
import { Toast } from "..";
import { postNewAppointment } from "../../api/postNewAppointment";

interface Staff {
  consultant: StaffDetails;
  nurse: StaffDetails;
  stomaNurse: StaffDetails | null;
  genpract: StaffDetails;
}
interface PatientAppEditModalProps {
  appointment: Appointment;
  editModalState: boolean;
  staff: Staff;
  setEditModalState: (state: boolean) => void;
  updateAppointmentState: (appointment: Appointment, index: number) => void;
  index: number;
  newAppointment?: boolean;
  patientId?: number;
}

const PatientAppEditModal = ({
  appointment,
  editModalState,
  staff,
  setEditModalState,
  updateAppointmentState,
  index,
  newAppointment,
  patientId,
}: PatientAppEditModalProps) => {
  const [appointmentData, setAppointmentData] =
    useState<Appointment>(appointment);
  const [editAppointment, setEditAppointment] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");
  const [editNotes, setEditNotes] = useState<boolean>(false);
  const [selectedStaffPractice, setSelectedStaffPractice] = useState<string>(
    appointment.location
  );
  const [toastState, setToastState] = useState<ErrorState>({
    state: false,
    message: "",
    color: "failure",
  });
  const notesAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setNotes(appointment.notes);
  }, [appointment.notes]);

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
      setNotes(appointment.notes);
    }
    setEditNotes(!editNotes);
  };

  const handleEditAppointment = () => {
    if (editAppointment) {
      setAppointmentData(appointment);
    }
    setEditAppointment(!editAppointment);
  };

  const handleSelectStaff = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const staffId = parseInt(e.target.value);
    const staffName = e.target.selectedOptions[0].text.split(" - ")[0];
    setAppointmentData({ ...appointmentData, staffId, staffName });
    const { practice } = Object.values(staff).find(
      (member) => member.staffId === staffId
    ) as StaffDetails;
    setSelectedStaffPractice(practice);
  };

  const handleDateSelect = (date: Date) => {
    const newDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    )
      .toISOString()
      .split("T")[0];
    setAppointmentData((prev) => ({
      ...prev,
      dateTime: `${newDate}T${appointmentData.dateTime.split("T")[1]}`,
    }));
  };

  const handleTimeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    const _oldDateTime = new Date(appointmentData.dateTime);
    const appointmentDateTimeUTC = new Date(
      Date.UTC(
        _oldDateTime.getUTCFullYear(),
        _oldDateTime.getUTCMonth(),
        _oldDateTime.getUTCDate(),
        _oldDateTime.getUTCHours(),
        _oldDateTime.getUTCMinutes()
      )
    );
    const newTime = new Date(
      Date.UTC(
        appointmentDateTimeUTC.getFullYear(),
        appointmentDateTimeUTC.getMonth(),
        appointmentDateTimeUTC.getDate(),
        name === "hours" ? parseInt(value) : _oldDateTime.getUTCHours(),
        name === "minutes" ? parseInt(value) : _oldDateTime.getUTCMinutes()
      )
    ).toISOString();
    setAppointmentData((prev) => ({ ...prev, dateTime: newTime }));
  };

  const handleSaveNotes = () => {
    setAppointmentData({ ...appointmentData, notes: notes });
    setEditNotes(false);
  };

  const closeToastState = () => {
    setToastState({ state: false, message: "", color: "failure" });
  };

  const closeDialog = () => {
    setAppointmentData(appointment);
    setNotes(appointment.notes);
    setSelectedStaffPractice(appointment.location);
    setEditAppointment(false);
    setEditNotes(false);
    setEditModalState(false);
  };

  const saveAppointment = () => {
    if (!newAppointment) {
      updateAppointment(appointment.id, appointmentData)
        .then((_res) => {
          updateAppointmentState(appointmentData, index);
          setToastState({
            state: true,
            message: "Appointment successfully updated",
            color: "success",
          });
        })
        .catch((err) => {
          setToastState({
            state: true,
            message: err.message,
            color: "failure",
          });
        });
    } else if (newAppointment) {
      postNewAppointment(patientId, appointmentData)
        .then((res) => {
          setAppointmentData((prev) => {
            const updatedAppointmentData = { ...prev, id: res.data };
            updateAppointmentState(updatedAppointmentData, index);
            return updatedAppointmentData;
          });
          setEditModalState(false);
        })
        .catch((err) => {
          setToastState({
            state: true,
            message: err.message,
            color: "failure",
          });
        });
    }
  };

  return (
    <Modal
      show={editModalState}
      onClose={() => setEditModalState(false)}
      aria-label={`Patient Appointment Edit Modal ${parseIsoToDateTime(
        appointment.dateTime
      )}`}
    >
      <div className="relative m-4">
        <button
          className={`absolute right-0 rounded-sm px-1 ${
            !editAppointment
              ? "bg-zinc-400 hover:bg-zinc-700 active:bg-zinc-500"
              : "bg-red-400 hover:bg-red-700 active:bg-red-500"
          } hover:text-white`}
          onClick={handleEditAppointment}
        >
          {editAppointment ? "Cancel Edit Appointment" : "Edit Appointment"}
        </button>
        {editAppointment ? (
          <div className="flex flex-wrap justify-between mt-8 mb-4">
            <div>
              <label>
                Appointment Date:
                <Datepicker
                  onSelectedDateChanged={handleDateSelect}
                  weekStart={2}
                  defaultDate={new Date(appointment.dateTime)}
                  aria-describedby="appDateHint"
                />
                <span className="sr-only" id="appDateHint">
                  Enter the appointment date
                </span>
              </label>
              <label className="flex flex-col">
                Time:
                <div>
                  <select
                    title="Hours"
                    name="hours"
                    defaultValue={
                      new Date(appointmentData.dateTime)
                        .toLocaleTimeString("en", {
                          timeStyle: "short",
                          hour12: false,
                          timeZone: "UTC",
                        })
                        .split(":")[0]
                    }
                    onChange={(e) => handleTimeSelect(e)}
                    aria-describedby="appTimeHint"
                  >
                    {[...Array(24)].map((_, i) => (
                      <option key={i} value={i.toString().padStart(2, "0")}>
                        {i.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <span> : </span>
                  <select
                    title="Minutes"
                    name="minutes"
                    defaultValue={
                      new Date(appointmentData.dateTime)
                        .toLocaleTimeString("en", {
                          timeStyle: "short",
                          hour12: false,
                          timeZone: "UTC",
                        })
                        .split(":")[1]
                    }
                    onChange={(e) => handleTimeSelect(e)}
                    aria-describedby="appTimeHint"
                  >
                    {[...Array(12)].map((_, i) => (
                      <option
                        key={i}
                        value={(i * 5).toString().padStart(2, "0")}
                      >
                        {(i * 5).toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <span className="sr-only" id="appTimeHint">
                    Enter the appointment time in hours and minutes e.g. 14:30
                  </span>
                </div>
              </label>
            </div>
            <label className="flex flex-col">
              {" "}
              Location:
              <select
                aria-describedby="appLocationHint"
                defaultValue={appointmentData.location}
              >
                <option value={selectedStaffPractice}>
                  {selectedStaffPractice}
                </option>
                <option value="Telephone">Telephone</option>
              </select>
              <span className="sr-only" id="appLocationHint">
                Enter the appointment location e.g. Hospital, GP Practice or
                Telephone
              </span>
            </label>
          </div>
        ) : (
          <h3 className="flex flex-wrap justify-between mt-8 mb-4">
            <strong>{parseIsoToDateTime(appointment.dateTime)}</strong>
            <strong>{appointment.location}</strong>
          </h3>
        )}
        {editAppointment ? (
          <div className="flex flex-col w-min gap-4">
            <label>
              Staff:
              <select
                defaultValue={appointmentData.staffId}
                onChange={handleSelectStaff}
              >
                <option
                  value={staff.consultant.staffId}
                >{`${staff.consultant.name} - ${staff.consultant.role}`}</option>
                <option
                  value={staff.nurse.staffId}
                >{`${staff.nurse.name} - ${staff.nurse.role}`}</option>
                {staff.stomaNurse != null ? (
                  <option
                    value={staff.stomaNurse.staffId}
                  >{`${staff.stomaNurse.name} - ${staff.stomaNurse.role}`}</option>
                ) : null}
                <option
                  value={staff.genpract.staffId}
                >{`${staff.genpract.name} - ${staff.genpract.role}`}</option>
              </select>
            </label>
            <label>
              Appointment Type:
              <input
                type="text"
                aria-describedby="appTypeHint"
                defaultValue={appointmentData.appType}
                onChange={(e) =>
                  setAppointmentData({
                    ...appointmentData,
                    appType: e.target.value,
                  })
                }
              />
              <span className="sr-only" id="appTypeHint">
                Enter the appointment type e.g. Bloodwork or Checkup
              </span>
            </label>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p>{appointmentData.staffName}</p>
            <p>{appointmentData.appType}</p>
          </div>
        )}
        <div className="my-4">
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
            aria-label="Appointment Notes"
            aria-describedby="textareaHelper"
            className="w-full resize-none overflow-hidden"
            value={notes}
            ref={notesAreaRef}
            onChange={(e) => setNotes(e.target.value)}
          />
          <strong id="textareaHelper" className="font-normal">
            Notes are edited independently to appointment data, cancel to revert
            notes and save appointment to update saved notes.
          </strong>
        </div>
        <div className="flex flex-col items-center mt-8">
          {toastState.state && (
            <Toast
              color={toastState.color || "failure"}
              message={toastState.message}
              handleErrorState={closeToastState}
            />
          )}
          <strong>
            Please save appointment before closing to prevent loss of updates.
          </strong>
          <div className="flex gap-16 mt-2">
            <button
              className="rounded-sm py-2 px-4 bg-zinc-400 hover:bg-zinc-700 active:bg-zinc-500 hover:text-white"
              onClick={closeDialog}
            >
              close
            </button>
            <button
              className="rounded-sm py-2 px-4 bg-blue-400 hover:bg-sky-700 active:bg-sky-500 hover:text-white"
              onClick={saveAppointment}
            >
              Save Appointment
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PatientAppEditModal;
