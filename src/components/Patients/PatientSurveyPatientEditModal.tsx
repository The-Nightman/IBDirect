import { Modal } from "flowbite-react";
import { Survey } from "../../interfaces/Survey";
import { parseIsoToDateOnly } from "../../utils/parseIsoToDateOnly";
import IBDSurveyForm from "../Forms/IBDSurveyForm";
import { useState } from "react";
import { updateSurvey } from "../../api/updateSurvey";
import Toast from "../UX/Toast";
import { ErrorState } from "../../interfaces/ErrorState";

interface PatientSurveyPatientEditModalProps {
  survey: Survey;
  editModalState: boolean;
  setEditModalState: (state: boolean) => void;
  removeCompletedSurvey?: (id: number) => void;
  updateSurveyState?: (updatedSurvey: Survey, index: number) => void;
  index: number;
}

const PatientSurveyPatientEditModal = ({
  survey,
  editModalState,
  setEditModalState,
  removeCompletedSurvey,
  updateSurveyState,
  index,
}: PatientSurveyPatientEditModalProps) => {
  const [formData, setFormData] = useState<Survey>(survey);
  const [toastState, setToastState] = useState<ErrorState>({
    state: false,
    message: "",
    color: "",
  });

  const saveSurvey = () => {
    if (Object.values(formData).some((value) => value === null)) {
      setToastState({
        state: true,
        message: "Please fill out all fields",
        color: "failure",
      });
      return null;
    }
    updateSurvey(survey.id, { ...formData, completed: true })
      .then((_res) => {
        if (removeCompletedSurvey) {
          removeCompletedSurvey(survey.id!);
        } else if (updateSurveyState) {
          updateSurveyState({...formData, completed: true }, index);
        }
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

  const closeToastState = () => {
    setToastState({ state: false, message: "", color: "failure" });
  };

  const closeDialog = () => {
    setFormData(survey);
    setEditModalState(false);
  };

  return (
    <Modal
      show={editModalState}
      theme={{
        content: {
          base: "relative h-full w-full p-4 md:h-auto overflow-hidden",
        },
      }}
      size={"4xl"}
      aria-label={`Patient IBD Survey Edit Modal ${parseIsoToDateOnly(
        survey.date
      )}`}
    >
      <div className="m-4 px-2 overflow-y-scroll">
        <h3 className="flex flex-wrap justify-between mb-4 text-lg font-semibold">
          <p>IBD Survey</p>
          <time>{parseIsoToDateOnly(survey.date)}</time>
        </h3>
        <IBDSurveyForm
          survey={survey}
          patientUserEdit={true}
          setParentFormData={setFormData}
        />
        <div className="flex flex-col items-center mt-8">
          {toastState.state && (
            <Toast
              color={toastState.color || "failure"}
              message={toastState.message}
              handleErrorState={closeToastState}
            />
          )}
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

export default PatientSurveyPatientEditModal;
