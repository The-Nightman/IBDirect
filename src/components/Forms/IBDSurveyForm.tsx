import { Tooltip } from "flowbite-react";
import { Survey } from "../../interfaces/Survey";

interface IBDSurveyFormProps {
    survey: Survey;
    patientUserEdit?: boolean;
}

const IBDSurveyForm = ({survey, patientUserEdit}:IBDSurveyFormProps) => {
  return (
    <form>
      <div>
        <h4 className="font-semibold text-blue-700 underline">
          Current symptoms over the past week
        </h4>
        <fieldset className="my-2 py-3 border-b">
          <div className="flex flex-col lg:flex-row lg:gap-x-8">
            <legend className="max-w-lg mb-2">
              How frequently are you having to take trips to the toilet to empty
              your bowels? (average number of trips, include trips even if only
              blood or liquid was passed)
            </legend>
            <div className="flex flex-col">
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Stool Frequency"
                  value="0"
                  checked={survey.q1 === 0}
                  readOnly
                  disabled={survey.q1 !== 0 && true}
                />
                Normal number of stools
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Stool Frequency"
                  value="1"
                  checked={survey.q1 === 1}
                  readOnly
                  disabled={survey.q1 !== 1 && true}
                />
                1-2 stools more than normal
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Stool Frequency"
                  value="2"
                  checked={survey.q1 === 2}
                  readOnly
                  disabled={survey.q1 !== 2 && true}
                />
                3-4 stools more than normal
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Stool Frequency"
                  value="3"
                  checked={survey.q1 === 3}
                  readOnly
                  disabled={survey.q1 !== 3 && true}
                />
                5 or more stools more than normal
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="my-2 py-3 border-b">
          <div className="flex flex-col lg:flex-row lg:gap-x-8">
            <legend className="max-w-lg mb-2">
              How would you rate the average abdominal pain or discomfort you
              have experienced over the past week?
            </legend>
            <div className="flex flex-col">
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Abdominal Pain"
                  value="0"
                  checked={survey.q2 === 0}
                  readOnly
                  disabled={survey.q2 !== 0 && true}
                />
                None
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Abdominal Pain"
                  value="1"
                  checked={survey.q2 === 1}
                  readOnly
                  disabled={survey.q2 !== 1 && true}
                />
                Mild
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Abdominal Pain"
                  value="2"
                  checked={survey.q2 === 2}
                  readOnly
                  disabled={survey.q2 !== 2 && true}
                />
                Moderate
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Abdominal Pain"
                  value="3"
                  checked={survey.q2 === 3}
                  readOnly
                  disabled={survey.q2 !== 3 && true}
                />
                Severe
              </label>
            </div>
          </div>
        </fieldset>
      </div>
      <div>
        <h4 className="font-semibold text-blue-700 underline">
          1. Do you believe that:
        </h4>
        <fieldset className="my-2 py-3 border-b">
          <div className="flex flex-col lg:flex-row lg:gap-x-8">
            <legend className="lg:w-[32rem] mb-2">
              A. Your IBD has been well controlled over the past 2 weeks?
            </legend>
            <div className="flex flex-col">
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="IBD Control"
                  value="2"
                  checked={survey.q3 === 2}
                  readOnly
                  disabled={survey.q3 !== 2 && true}
                />
                Yes
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="IBD Control"
                  value="0"
                  checked={survey.q3 === 0}
                  readOnly
                  disabled={survey.q3 !== 0 && true}
                />
                No
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="IBD Control"
                  value="1"
                  checked={survey.q3 === 1}
                  readOnly
                  disabled={survey.q3 !== 1 && true}
                />
                Not sure
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="my-2 py-3 border-b">
          <div className="flex flex-col lg:flex-row lg:gap-x-8">
            <legend className="max-w-lg mb-2">
              B. Your current treatment is working well for you in controlling
              your IBD?
            </legend>
            <div className="flex flex-col">
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Treatment Efficacy"
                  value="2"
                  checked={survey.q4 === 2}
                  readOnly
                  disabled={survey.q4 !== 2 && true}
                />
                Yes
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Treatment Efficacy"
                  value="0"
                  checked={survey.q4 === 0}
                  readOnly
                  disabled={survey.q4 !== 0 && true}
                />
                No
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Treatment Efficacy"
                  value="1"
                  checked={survey.q4 === 1}
                  readOnly
                  disabled={survey.q4 !== 1 && true}
                />
                Not sure
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="my-2 py-3 border-b">
          <div className="flex flex-col lg:flex-row lg:gap-x-8">
            <legend className="lg:w-[32rem] mb-2">
              If you are not taking any treatment please tick this box
            </legend>
            <label>
              <input
                className="mr-2"
                type="checkbox"
                name="No Treatment"
                checked={survey.q4a!}
                readOnly
                disabled={survey.q4a !== true && true}
              />
              I am not taking any treatment
            </label>
          </div>
        </fieldset>
      </div>
      <div>
        <fieldset className="my-2 py-3 border-b">
          <div className="flex flex-col lg:flex-row lg:gap-x-8">
            <legend className="max-w-lg mb-2">
              <h4 className="font-semibold text-blue-700 underline">
                2. Over the past 2 weeks, have your bowel symptoms gotten worse,
                gotten better or not changed?
              </h4>
            </legend>
            <div className="flex flex-col">
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Symptom Improvement"
                  value="0"
                  checked={survey.q5 === 0}
                  readOnly
                  disabled={survey.q5 !== 0 && true}
                />
                Better
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Symptom Improvement"
                  value="1"
                  checked={survey.q5 === 1}
                  readOnly
                  disabled={survey.q5 !== 1 && true}
                />
                No changes
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Symptom Improvement"
                  value="2"
                  checked={survey.q5 === 2}
                  readOnly
                  disabled={survey.q5 !== 2 && true}
                />
                Worse
              </label>
            </div>
          </div>
        </fieldset>
      </div>
      <div>
        <h4 className="font-semibold text-blue-700 underline">
          3. In the past two weeks, have you had to:
        </h4>
        <fieldset className="my-2 py-3 border-b">
          <div className="flex flex-col lg:flex-row lg:gap-x-8">
            <legend className="lg:w-[32rem] mb-2">
              A. Miss any planned activities because of your IBD?
              <br />
              <span>
                (e.g. attending school/college/university, social events or
                work)
              </span>
            </legend>
            <div className="flex flex-col">
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Missed Plans"
                  value="0"
                  checked={survey.q6 === 0}
                  readOnly
                  disabled={survey.q6 !== 0 && true}
                />
                Yes
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Missed Plans"
                  value="2"
                  checked={survey.q6 === 2}
                  readOnly
                  disabled={survey.q6 !== 2 && true}
                />
                No
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Missed Plans"
                  value="1"
                  checked={survey.q6 === 1}
                  readOnly
                  disabled={survey.q6 !== 1 && true}
                />
                Not sure
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="my-2 py-3 border-b">
          <div className="flex flex-col lg:flex-row lg:gap-x-8">
            <legend className="lg:w-[32rem] mb-2">
              B. Wake up at night because of your symptoms?
            </legend>
            <div className="flex flex-col">
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Night Symptoms"
                  value="0"
                  checked={survey.q7 === 0}
                  readOnly
                  disabled={survey.q7 !== 0 && true}
                />
                Yes
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Night Symptoms"
                  value="2"
                  checked={survey.q7 === 2}
                  readOnly
                  disabled={survey.q7 !== 2 && true}
                />
                No
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Night Symptoms"
                  value="1"
                  checked={survey.q7 === 1}
                  readOnly
                  disabled={survey.q7 !== 1 && true}
                />
                Not sure
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="my-2 py-3 border-b">
          <div className="flex flex-col lg:flex-row lg:gap-x-8">
            <legend className="lg:w-[32rem] mb-2">
              C. Suffer from significant pain or discomfort?
            </legend>
            <div className="flex flex-col">
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Pain Discomfort"
                  value="0"
                  checked={survey.q8 === 0}
                  readOnly
                  disabled={survey.q8 !== 0 && true}
                />
                Yes
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Pain Discomfort"
                  value="2"
                  checked={survey.q8 === 2}
                  readOnly
                  disabled={survey.q8 !== 2 && true}
                />
                No
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Pain Discomfort"
                  value="1"
                  checked={survey.q8 === 1}
                  readOnly
                  disabled={survey.q8 !== 1 && true}
                />
                Not sure
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="my-2 py-3 border-b">
          <div className="flex flex-col lg:flex-row lg:gap-x-8">
            <legend className="lg:w-[32rem] mb-2">
              D. Often feel tired or having no energy? (fatigue) <br />
              <span>("Often" meaning more than half the time)</span>
            </legend>
            <div className="flex flex-col">
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Fatigue"
                  value="0"
                  checked={survey.q9 === 0}
                  readOnly
                  disabled={survey.q9 !== 0 && true}
                />
                Yes
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Fatigue"
                  value="2"
                  checked={survey.q9 === 2}
                  readOnly
                  disabled={survey.q9 !== 2 && true}
                />
                No
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Fatigue"
                  value="1"
                  checked={survey.q9 === 1}
                  readOnly
                  disabled={survey.q9 !== 1 && true}
                />
                Not sure
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="my-2 py-3 border-b">
          <div className="flex flex-col lg:flex-row lg:gap-x-8">
            <legend className="lg:w-[32rem] mb-2">
              E. Feel depressed or a sense of anxiety because of your IBD?
            </legend>
            <div className="flex flex-col">
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Mood"
                  value="0"
                  checked={survey.q10 === 0}
                  readOnly
                  disabled={survey.q10 !== 0 && true}
                />
                Yes
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Mood"
                  value="2"
                  checked={survey.q10 === 2}
                  readOnly
                  disabled={survey.q10 !== 2 && true}
                />
                No
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Mood"
                  value="1"
                  checked={survey.q10 === 1}
                  readOnly
                  disabled={survey.q10 !== 1 && true}
                />
                Not sure
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="my-2 py-3 border-b">
          <div className="flex flex-col lg:flex-row lg:gap-x-8">
            <legend className="lg:w-[32rem] mb-2">
              F. Think you need to change your treatment?
            </legend>
            <div className="flex flex-col">
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Change Treatment"
                  value="0"
                  checked={survey.q11 === 0}
                  readOnly
                  disabled={survey.q11 !== 0 && true}
                />
                Yes
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Change Treatment"
                  value="2"
                  checked={survey.q11 === 2}
                  readOnly
                  disabled={survey.q11 !== 2 && true}
                />
                No
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Change Treatment"
                  value="1"
                  checked={survey.q11 === 1}
                  readOnly
                  disabled={survey.q11 !== 1 && true}
                />
                Not sure
              </label>
            </div>
          </div>
        </fieldset>
      </div>
      <div>
        <fieldset className="my-2 py-3 border-b">
          <div className="flex flex-col lg:flex-row lg:gap-x-8">
            <legend className="max-w-lg mb-2">
              <h4 className="font-semibold text-blue-700 underline">
                4. How would you rate the OVERALL control of your IBD over the
                past 2 weeks?
              </h4>
              <br />
              <span className="text-black">
                (0 = worst control, 10 = best control)
              </span>
            </legend>
            <div className="flex flex-col px-2 items-center">
              <label className="w-11/12 flex flex-col text-center">
                <div className="flex mt-8 justify-between" aria-hidden>
                  <span className="relative flex h-1 w-px bg-neutral-900 justify-center">
                    <span className="absolute -top-6">0</span>
                  </span>
                  <span className="relative flex h-1 w-px bg-neutral-900 justify-center">
                    <span className="absolute -top-6">5</span>
                  </span>
                  <span className="relative flex h-1 w-px bg-neutral-900 justify-center">
                    <span className="absolute -top-6">10</span>
                  </span>
                </div>
                <input
                  type="range"
                  name="Overall IBD Control"
                  min={0}
                  max={10}
                  step={1}
                  value={typeof survey.q12 === "number" ? `${survey.q12}` : "5"}
                  readOnly
                />
                {survey.q12 === null
                  ? "Move the slider to see a response"
                  : survey.q12}
              </label>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="my-2 py-3 border-b">
        <label className="flex flex-col gap-8 md:flex-row">
          <div className="md:w-[32rem]">
            <span className="sr-only">
              IBD Disease Activity Index score is calculated from the sum of
              responses to 1a, 1b and 3a to 3f. Each option is allocated a score
              of 0, 1 or 2. The Activity Index Score ranges from 0 (worst
              control and most activity) to 16 (best control and least
              activity).
            </span>
            <Tooltip
              className="max-w-[18rem]"
              aria-hidden="true"
              content="IBD Disease Activity Index score is calculated from the sum of responses to 1a, 1b 
                and 3a to 3f. Each option is allocated a score of 0, 1 or 2. The Activity Index Score ranges 
                from 0 (worst control and most activity) to 16 (best control and least activity)."
            >
              <h4 className="font-bold text-blue-700 underline decoration-dotted">
                Activity Index Score
              </h4>
            </Tooltip>
          </div>
          <input
            className="w-20 text-center bg-gray-100 border border-gray-300 rounded-sm"
            type="number"
            name="Score"
            value={survey.contScore !== null ? survey.contScore : 0}
            readOnly
          />
        </label>
      </div>
      <div>
        <fieldset className="my-2 py-3 border-b">
          <div className="flex flex-col lg:flex-row lg:gap-x-8">
            <legend className="lg:w-[32rem] mb-2">
              Are you smoking at the moment? <br />
              <span>
                (one or more cigarettes per day including e-cigarettes)
              </span>
            </legend>
            <div className="flex flex-col">
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Smoking"
                  value="0"
                  checked={survey.q13 === 0}
                  readOnly
                  disabled={survey.q13 !== 0 && true}
                />
                Yes
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="Smoking"
                  value="1"
                  checked={survey.q13 === 1}
                  readOnly
                  disabled={survey.q13 !== 1 && true}
                />
                No
              </label>
            </div>
          </div>
        </fieldset>
      </div>
    </form>
  );
};

export default IBDSurveyForm;
