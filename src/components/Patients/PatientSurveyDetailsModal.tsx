import { Modal } from "flowbite-react";
import { Survey } from "../../interfaces/Survey";
import { parseIsoToDateOnly } from "../../utils/parseIsoToDateOnly";
import IBDSurveyForm from "../Forms/IBDSurveyForm";

interface PatientSurveyDetailsModalProps {
  survey: Survey;
  detailsModalState: boolean;
  setDetailsModalState: (state: boolean) => void;
}

const PatientSurveyDetailsModal = ({
  survey,
  detailsModalState,
  setDetailsModalState,
}: PatientSurveyDetailsModalProps) => {
  return (
    <Modal
      show={detailsModalState}
      theme={{
        content: {
          base: "relative h-full w-full p-4 md:h-auto overflow-hidden",
        },
      }}
      size={"4xl"}
      aria-label={`Patient IBD Survey Details Modal ${parseIsoToDateOnly(
        survey.date
      )}`}
    >
      <div className="m-4 px-2 overflow-y-scroll">
        <h3 className="flex flex-wrap justify-between mb-4 text-lg font-semibold">
          <p>IBD Survey</p>
          <time>{parseIsoToDateOnly(survey.date)}</time>
        </h3>
        <IBDSurveyForm survey={survey} />
        <div className="flex flex-col items-center">
          <button
            className="rounded-sm py-2 px-4 bg-zinc-400 hover:bg-zinc-700 active:bg-zinc-500 hover:text-white"
            onClick={() => setDetailsModalState(false)}
          >
            close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PatientSurveyDetailsModal;
