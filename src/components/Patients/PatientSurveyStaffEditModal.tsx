import { Datepicker, Modal } from "flowbite-react";
import { parseIsoToDateOnly } from "../../utils/parseIsoToDateOnly";
import { Survey } from "../../interfaces/Survey";
import { useState } from "react";
import { rescheduleSurvey } from "../../api/rescheduleSurvey";
import { ErrorState } from "../../interfaces/ErrorState";
import Toast from "../UX/Toast";

interface PatientSurveyStaffEditModalProps {
  survey: Survey;
  editModalState: boolean;
  setEditModalState: (state: boolean) => void;
  updateSurveyState: (
    updatedSurvey: Survey,
    index: number,
    newSurvey?: boolean
  ) => void;
  index: number;
}

const PatientSurveyStaffEditModal = ({
  survey,
  editModalState,
  setEditModalState,
  updateSurveyState,
  index
}: PatientSurveyStaffEditModalProps) => {
  const [editSurvey, setEditSurvey] = useState<boolean>(false);
  const [surveyData, setSurveyData] = useState<Survey>(survey);
  const [toastState, setToastState] = useState<ErrorState>({
    state: false,
    message: "",
    color: "",
  });

  const handleDateSelect = (date: Date) => {
    const newDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    )
      .toISOString()
      .split("T")[0];
    setSurveyData((prev) => ({
      ...prev,
      date: newDate,
    }));
  };

  const closeToastState = () => {
    setToastState({ state: false, message: "", color: "failure" });
  };

  const saveSurvey = () => {
    rescheduleSurvey(surveyData.id, surveyData.date)
      .then((_res) => {
        updateSurveyState(surveyData, index);
        setToastState({
          state: true,
          message: "Survey successfully updated",
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

  const closeDialog = () => {
    setSurveyData(survey);
    setEditSurvey(false);
    setEditModalState(false);
  };

  return (
    <Modal
      show={editModalState}
      aria-label={`Patient IBD Survey Staff Edit Modal ${parseIsoToDateOnly(
        survey.date
      )}`}
    >
      <div className="m-4">
        <div className="flex w-full">
          <button
            className={`ms-auto max-md:w-32 rounded-sm px-1 ${
              !editSurvey
                ? "bg-zinc-400 hover:bg-zinc-700 active:bg-zinc-500"
                : "bg-red-400 hover:bg-red-700 active:bg-red-500"
            } hover:text-white`}
            onClick={() => setEditSurvey(!editSurvey)}
          >
            {editSurvey ? "Cancel Edit Survey" : "Edit Survey"}
          </button>
        </div>
        <h3 className="flex flex-wrap justify-between mb-4 text-lg font-semibold">
          <p>IBD Survey</p>
        </h3>
        {editSurvey ? (
          <label>
            Survey Due:
            <Datepicker
              onSelectedDateChanged={handleDateSelect}
              weekStart={2}
              defaultDate={new Date(surveyData.date)}
              aria-describedby="surveyDateHint"
            />
            <span className="sr-only" id="surveyDateHint">
              Enter the survey date
            </span>
          </label>
        ) : (
          <p>
            Survey Due: <br />
            <time>{parseIsoToDateOnly(surveyData.date, false)}</time>
          </p>
        )}
        <div className="flex flex-col items-center mt-8">
          {toastState.state && (
            <Toast
              color={toastState.color || "failure"}
              message={toastState.message}
              handleErrorState={closeToastState}
            />
          )}
          <strong>
            Survey content cannot be edited by staff, please save survey before
            closing to prevent loss of updates.
          </strong>
          <div className="flex gap-16 mt-2">
            <button
              className="rounded-sm py-2 px-4 bg-zinc-400 hover:bg-zinc-700 active:bg-zinc-500 hover:text-white"
              onClick={closeDialog}
            >
              Close
            </button>
            <button
              className="rounded-sm py-2 px-4 bg-blue-400 hover:bg-sky-700 active:bg-sky-500 hover:text-white"
              onClick={saveSurvey}
            >
              Save Survey
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PatientSurveyStaffEditModal;
