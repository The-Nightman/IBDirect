import {
  EditOutlined,
  InfoOutlined,
  PageviewOutlined,
} from "@mui/icons-material";
import { Survey } from "../../interfaces/Survey";
import { parseIsoToDateOnly } from "../../utils/parseIsoToDateOnly";
import { useState } from "react";
import { Tooltip } from "flowbite-react";

interface PatientSurveyCardProps {
  survey: Survey;
}

const PatientSurveyCard = ({ survey }: PatientSurveyCardProps) => {
  const [detailsModalState, setDetailsModalState] = useState<boolean>(false);
  const [editModalState, setEditModalState] = useState<boolean>(false);

  const calculateActivityScore = () => {
    const keys = Array.from({ length: 12 }, (_, i) => `q${i + 1}`);
    return keys.reduce(
      (sum, key) => sum + Number(survey[key as keyof Survey] || 0),
      0
    );
  };

  return (
    <>
      <section
        className={`w-full p-1 grid grid-cols-[auto_min-content] gap-3 border-b border-slate-600 ${
          survey.completed ? "bg-lime-200" : "bg-slate-200"
        } text-sm`}
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
                Activity Index Score: {calculateActivityScore()}{" "}
                <InfoOutlined fontSize="small" aria-hidden="true" />
              </p>
            </Tooltip>
            <p>Completed: {survey.completed ? "Yes" : "No"}</p>
          </div>
        </div>
        <div>
          <button
            className="leading-3 text-4xl"
            aria-label={`Open Survey Details`}
            title="Open Survey Details"
            onClick={() => setDetailsModalState(true)}
          >
            <PageviewOutlined fontSize="inherit" />
          </button>
          <button
            className="w-9"
            aria-label={`Edit Survey`}
            title="Edit Survey"
            onClick={() => setEditModalState(true)}
          >
            <EditOutlined fontSize="large" />
          </button>
        </div>
      </section>
    </>
  );
};

export default PatientSurveyCard;