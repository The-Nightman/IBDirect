import { Datepicker, Modal } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { Prescription } from "../../interfaces/Prescription";
import { parseIsoToDateOnly } from "../../utils/parseIsoToDateOnly";
import { updatePrescription } from "../../api/updatePrescription";
import { ErrorState } from "../../interfaces/ErrorState";
import { Toast } from "..";
import { postNewPrescription } from "../../api/postNewPrescription";

interface PatientPrescriptEditModalProps {
  prescription: Prescription;
  editModalState: boolean;
  setEditModalState: (state: boolean) => void;
  updatePrescriptionsState: (
    prescription: Prescription,
    index: number,
    newPrescription?: boolean
  ) => void;
  index: number;
  newPrescription?: boolean;
  patientId?: number;
}

const PatientPrescriptEditModal = ({
  prescription,
  editModalState,
  setEditModalState,
  updatePrescriptionsState,
  index,
  newPrescription,
  patientId,
}: PatientPrescriptEditModalProps) => {
  const [prescriptionData, setPrescriptionData] =
    useState<Prescription>(prescription);
  const [editPrescription, setEditPrescription] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");
  const [editNotes, setEditNotes] = useState<boolean>(false);
  const [toastState, setToastState] = useState<ErrorState>({
    state: false,
    message: "",
    color: "failure",
  });
  const notesAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setNotes(prescription.scriptNotes);
  }, [prescription.scriptNotes]);

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
      setNotes(prescription.scriptNotes);
    }
    setEditNotes(!editNotes);
  };

  const handleEditPrescription = () => {
    if (editPrescription) {
      setPrescriptionData(prescription);
    }
    setEditPrescription(!editPrescription);
  };

  const handleSaveNotes = () => {
    setPrescriptionData({ ...prescriptionData, scriptNotes: notes });
    setEditNotes(false);
  };

  const handleDateSelect = (date: Date) => {
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    setPrescriptionData((prev) => ({
      ...prev,
      scriptStartDate: formattedDate.toString(),
    }));
  };

  const closeToastState = () => {
    setToastState({ state: false, message: "", color: "failure" });
  };

  const closeDialog = () => {
    setPrescriptionData(prescription);
    setNotes(prescription.scriptNotes);
    setEditPrescription(false);
    setEditNotes(false);
    setEditModalState(false);
  };

  const savePrescription = () => {
    if (!newPrescription) {
      const updatedPrescriptionObj: Prescription = {
        id: prescription.id,
        scriptName: prescriptionData.scriptName,
        scriptStartDate: prescriptionData.scriptStartDate,
        scriptDose: prescriptionData.scriptDose,
        scriptInterval: prescriptionData.scriptInterval,
        scriptNotes: prescriptionData.scriptNotes,
        scriptRepeat: prescriptionData.scriptRepeat,
        prescribingStaffId: prescription.prescribingStaff!.staffId,
      };

      updatePrescription(prescription.id, updatedPrescriptionObj)
        .then((_res) => {
          updatePrescriptionsState(prescriptionData, index);
          setToastState({
            state: true,
            message: "Prescription successfully updated",
            color: "success",
          });
        })
        .catch((err) => {
          if (err.response === undefined) {
            setToastState({ ...toastState, state: true });
          } else {
            setToastState({
              state: true,
              message: err.response.data,
              color: "failure",
            });
          }
        });
    } else if (newPrescription) {
      postNewPrescription(patientId, prescriptionData)
        .then((res) => {
          const newPrescriptionData = { ...prescriptionData, id: res.data };
          setPrescriptionData(newPrescriptionData);
          updatePrescriptionsState(newPrescriptionData, index, true);
          setEditModalState(false);
        })
        .catch((err) => {
          if (err.response === undefined) {
            setToastState({ ...toastState, state: true });
          } else {
            setToastState({
              state: true,
              message: err.response.data,
              color: "failure",
            });
          }
        });
    }
  };

  return (
    <Modal
      show={editModalState}
      onClose={() => setEditModalState(false)}
      aria-label={`Patient Prescription Edit Modal  ${
        prescription.scriptName
      } - ${parseIsoToDateOnly(prescription.scriptStartDate)}`}
    >
      <div className="relative m-4">
        <button
          className={`absolute right-0 rounded-sm px-1 ${
            !editPrescription
              ? "bg-zinc-400 hover:bg-zinc-700 active:bg-zinc-500"
              : "bg-red-400 hover:bg-red-700 active:bg-red-500"
          } hover:text-white`}
          onClick={handleEditPrescription}
        >
          {editPrescription ? "Cancel Edit Prescription" : "Edit Prescription"}
        </button>
        {editPrescription ? (
          <div className="flex flex-wrap justify-between mt-8 mb-4">
            <label className="flex flex-col">
              Prescription Name:
              <input
                type="text"
                defaultValue={prescriptionData.scriptName}
                onChange={(e) =>
                  setPrescriptionData({
                    ...prescriptionData,
                    scriptName: e.target.value,
                  })
                }
                aria-labelledby="prescNameHint"
              />
              <span className="sr-only" id="prescNameHint">
                Enter the prescription name e.g. Adalimumab or Infliximab
              </span>
            </label>
            <label className="flex flex-col w-56">
              Prescription Start Date:
              <Datepicker
                weekStart={2}
                defaultDate={new Date(prescriptionData.scriptStartDate)}
                onSelectedDateChanged={handleDateSelect}
                aria-labelledby="prescDateHint"
              />
              <span className="text-xs" id="prescDateHint">
                Only modify if writing for a prescription in advance, otherwise
                the current date will suffice.
              </span>
            </label>
          </div>
        ) : (
          <h3 className="flex flex-wrap justify-between mt-8 mb-4">
            <strong>{prescriptionData.scriptName}</strong>
            <strong>
              {parseIsoToDateOnly(prescriptionData.scriptStartDate)}
            </strong>
          </h3>
        )}
        <div className="flex max-md:flex-col justify-between">
          {editPrescription ? (
            <>
              <div>
                <label className="flex flex-col">
                  Dosage:
                  <input
                    type="text"
                    defaultValue={prescriptionData.scriptDose}
                    aria-labelledby="prescDoseHint"
                    onChange={(e) =>
                      setPrescriptionData({
                        ...prescriptionData,
                        scriptDose: e.target.value,
                      })
                    }
                  />
                  <span className="text-xs w-56" id="prescDoseHint">
                    Enter the prescribed dosage and any special conditions such
                    as tapers e.g. Reduce by 5mg every 7 days
                  </span>
                </label>
                <label className="flex flex-col">
                  Interval:
                  <input
                    type="text"
                    defaultValue={prescriptionData.scriptInterval}
                    onChange={(e) =>
                      setPrescriptionData({
                        ...prescriptionData,
                        scriptInterval: e.target.value,
                      })
                    }
                    aria-labelledby="prescIntervalHint"
                  />
                  <span className="sr-only" id="prescIntervalHint">
                    Enter the prescribed interval for the dosage provided e.g. 3
                    tablets per day spaced evenly or 2 Weeks
                  </span>
                </label>
              </div>
              <label className="flex flex-col">
                Repeat:
                <select
                  defaultValue={prescriptionData.scriptRepeat.toString()}
                  onChange={(e) =>
                    setPrescriptionData({
                      ...prescriptionData,
                      scriptRepeat: e.target.value === "true",
                    })
                  }
                  aria-labelledby="prescRepeatHint"
                >
                  <option value={"true"}>Yes</option>
                  <option value={"false"}>No</option>
                </select>
                <span className="sr-only" id="prescRepeatHint">
                  Select if the prescription is to be repeated or not.
                </span>
              </label>
            </>
          ) : (
            <>
              <div>
                <p>Dosage: {prescriptionData.scriptDose}</p>
                <p>Interval: {prescriptionData.scriptInterval}</p>
              </div>
              <p>Repeat: {prescriptionData.scriptRepeat ? "Yes" : "No"}</p>
            </>
          )}
        </div>
        <div className="mt-4">
          <p>Prescribing Physician:</p>
          <p>{`${prescription.prescribingStaff!.name} - ${
            prescription.prescribingStaff!.speciality
          } ${prescription.prescribingStaff!.role}`}</p>
          <p>{prescription.prescribingStaff!.practice}</p>
        </div>
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
            aria-label="Prescription Notes"
            aria-describedby="textareaHelper"
            className="w-full resize-none overflow-hidden"
            value={notes}
            ref={notesAreaRef}
            onChange={(e) => setNotes(e.target.value)}
          />
          <strong id="textareaHelper" className="font-normal">
            Notes are edited independently to prescription data, cancel to
            revert notes and save prescription to update saved notes.
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
            Please save prescription before closing to prevent loss of updates.
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
              onClick={savePrescription}
            >
              Save Prescription
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PatientPrescriptEditModal;
