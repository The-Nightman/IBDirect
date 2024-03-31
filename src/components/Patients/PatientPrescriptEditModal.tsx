import { Datepicker, Modal } from "flowbite-react";
import { useState } from "react";
import { Prescription } from "../../interfaces/Prescription";
import { parseIsoToDateOnly } from "../../utils/parseIsoToDateOnly";
import { updatePrescription } from "../../api/updatePrescription";
import { ErrorState } from "../../interfaces/ErrorState";
import { Toast, Notes } from "..";
import { postNewPrescription } from "../../api/postNewPrescription";
import { cancelPrescription } from "../../api/cancelPrescription";

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
  const [toastState, setToastState] = useState<ErrorState>({
    state: false,
    message: "",
    color: "failure",
  });

  const handleEditPrescription = () => {
    if (editPrescription) {
      setPrescriptionData(prescription);
    }
    setEditPrescription(!editPrescription);
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
    setEditPrescription(false);
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
        notes: prescriptionData.notes,
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
          const newPrescriptionData: Prescription = {
            ...prescriptionData,
            id: res.data,
          };
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

  const handleCancelPrescription = () => {
    cancelPrescription(prescription.id)
      .then((_res) => {
        const newPrescriptionData: Prescription = {
          ...prescriptionData,
          cancelled: true,
        };
        setPrescriptionData(newPrescriptionData);
        updatePrescriptionsState(newPrescriptionData, index);
        setToastState({
          state: true,
          message: "Prescription successfully cancelled",
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
  };

  return (
    <Modal
      show={editModalState}
      onClose={() => setEditModalState(false)}
      aria-label={`Patient Prescription Edit Modal  ${
        prescription.scriptName
      } - ${parseIsoToDateOnly(prescription.scriptStartDate)}`}
    >
      <div className="m-4">
        <div className="flex w-full">
          {!newPrescription ? (
            <button
              className="max-md:w-32 rounded-sm px-1 bg-red-400 hover:bg-red-700 active:bg-red-500 hover:text-white"
              onClick={handleCancelPrescription}
            >
              CANCEL PRESCRIPTION
            </button>
          ) : null}
          <button
            className={`ms-auto max-md:w-32 rounded-sm px-1 ${
              !editPrescription
                ? "bg-zinc-400 hover:bg-zinc-700 active:bg-zinc-500"
                : "bg-red-400 hover:bg-red-700 active:bg-red-500"
            } hover:text-white`}
            onClick={handleEditPrescription}
          >
            {editPrescription
              ? "Cancel Edit Prescription"
              : "Edit Prescription"}
          </button>
        </div>
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
                aria-describedby="prescNameHint"
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
                aria-describedby="prescDateHint"
              />
              <span className="text-xs" id="prescDateHint">
                Only modify if writing for a prescription in advance, otherwise
                the current date will suffice.
              </span>
            </label>
          </div>
        ) : (
          <h3 className="flex flex-wrap justify-between mt-8 mb-4 font-bold">
            <span>{prescriptionData.scriptName}</span>
            <time>{parseIsoToDateOnly(prescriptionData.scriptStartDate)}</time>
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
                    aria-describedby="prescDoseHint"
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
                    aria-describedby="prescIntervalHint"
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
                  aria-describedby="prescRepeatHint"
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
              <div>
                <p>Repeat: {prescriptionData.scriptRepeat ? "Yes" : "No"}</p>
                {prescriptionData.cancelled ? <strong>CANCELLED</strong> : null}
              </div>
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
          <Notes
            parentData={prescriptionData}
            setParentData={setPrescriptionData}
            ariaLabel="Prescription Notes"
            ariaDescription="Notes are edited independently to prescription data, cancel to
            revert notes and save prescription to update saved notes."
            editControls={true}
          />
          <strong className="font-normal">
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
