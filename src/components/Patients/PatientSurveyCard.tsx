import {
  EditOutlined,
  InfoOutlined,
  PageviewOutlined,
} from "@mui/icons-material";
import { Survey } from "../../interfaces/Survey";
import { parseIsoToDateOnly } from "../../utils/parseIsoToDateOnly";
import { useState } from "react";
import { Tooltip } from "flowbite-react";
import {
  PatientSurveyDetailsModal,
  PatientSurveyPatientEditModal,
  PatientSurveyStaffEditModal,
} from "..";

interface PatientSurveyCardProps {
  survey: Survey;
  updateSurveyState?: (
    updatedSurvey: Survey,
    index: number,
    newSurvey?: boolean
  ) => void;
  index?: number;
  removeSurvey?: (index: number) => void;
  patientUserEdit?: boolean;
}

const PatientSurveyCard = ({
  survey,
  updateSurveyState,
  index,
  removeSurvey,
  patientUserEdit,
}: PatientSurveyCardProps) => {
  const [detailsModalState, setDetailsModalState] = useState<boolean>(false);
  const [editModalState, setEditModalState] = useState<boolean>(false);

  const controlPatientsDetailsModalAccess = () => {
    const detailsButton = (
      <button
        className="leading-3 text-4xl"
        aria-label={`Open Survey Details`}
        title="Open Survey Details"
        onClick={() => setDetailsModalState(true)}
      >
        <PageviewOutlined fontSize="inherit" />
      </button>
    );
    if (patientUserEdit && survey.completed) {
      return detailsButton;
    } else if (!patientUserEdit) {
      return detailsButton;
    } else {
      return null;
    }
  };

  const controlScoreSeverityColor = () => {
    const { contScore, completed } = survey;
    if (typeof contScore === "number" && completed) {
      const scoreColorMap = [
        { max: 16, min: 12, color: "bg-lime-200" },
        { max: 12, min: 8, color: "bg-yellow-200" },
        { max: 8, min: 4, color: "bg-orange-200" },
        { max: 4, min: 0, color: "bg-red-200" },
      ];

      const scoreColor = scoreColorMap.find(
        ({ max, min }) => contScore! <= max && contScore! > min
      );
      return scoreColor!.color;
    }
    return "bg-slate-200";
  };

  return (
    <>
      <article
        className={`w-full p-1 grid grid-cols-[auto_min-content] gap-3 border-b border-slate-600 ${controlScoreSeverityColor()} text-sm`}
        tabIndex={0}
        aria-label="Patient IBD Survey Card"
      >
        <div>
          <div className="flex flex-wrap max-md:flex-col justify-between gap-x-8 text-lg font-semibold">
            <p>IBD Survey</p>
            <time>{parseIsoToDateOnly(survey.date)}</time>
          </div>
          <div className="flex max-md:flex-col justify-between mt-5">
            <Tooltip
              className="max-w-[18rem]"
              aria-hidden="true"
              content="IBD Disease Activity Index score is calculated from the sum of responses to 1a, 1b and 3a to 3f. 
              Each option is allocated a score of 0, 1 or 2. The Activity Index Score ranges from 0 
              (worst control and most activity) to 16 (best control and least activity)."
            >
              <p>
                Activity Index Score:{" "}
                {typeof survey.contScore === "number" ? survey.contScore : 0}{" "}
                <InfoOutlined fontSize="small" aria-hidden="true" />
              </p>
            </Tooltip>
            <p>Completed: {survey.completed ? "Yes" : "No"}</p>
          </div>
        </div>
        <div>
          {controlPatientsDetailsModalAccess()}
          {!survey.completed && (
            <button
              className={`w-9 ${
                patientUserEdit && new Date(survey.date) > new Date()
                  ? "text-slate-500 cursor-not-allowed"
                  : ""
              }`}
              aria-label={`Edit Survey`}
              title="Edit Survey"
              onClick={() => setEditModalState(true)}
              {...(patientUserEdit && new Date(survey.date) > new Date()
                ? { disabled: true }
                : {})}
            >
              <EditOutlined fontSize="large" />
            </button>
          )}
        </div>
      </article>
      <PatientSurveyDetailsModal
        survey={survey}
        detailsModalState={detailsModalState}
        setDetailsModalState={setDetailsModalState}
      />
      {patientUserEdit ? (
        <PatientSurveyPatientEditModal
          survey={survey}
          editModalState={editModalState}
          setEditModalState={setEditModalState}
          removeCompletedSurvey={removeSurvey!}
        />
      ) : (
        <PatientSurveyStaffEditModal
          survey={survey}
          editModalState={editModalState}
          setEditModalState={setEditModalState}
          updateSurveyState={updateSurveyState!}
          index={index!}
          removeSurvey={removeSurvey}
        />
      )}
    </>
  );
};

export default PatientSurveyCard;
