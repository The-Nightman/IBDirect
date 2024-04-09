import { Tooltip } from "flowbite-react";
import { Survey } from "../../interfaces/Survey";
import { useState } from "react";

interface IBDSurveyFormProps {
  survey: Survey;
  patientUserEdit?: boolean;
}

const IBDSurveyForm = ({ survey, patientUserEdit }: IBDSurveyFormProps) => {
  const [formData, setFormData] = useState<Survey>(survey);

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [e.target.id]: parseInt(e.target.value),
      };
      updatedFormData.contScore = calculateActivityScore(updatedFormData);
      return updatedFormData;
    });
  };

  const calculateActivityScore = (updatedFormData: Survey) => {
    const keys = [
      "q3",
      "q4",
      ...Array.from({ length: 6 }, (_, i) => `q${i + 6}`),
    ];
    return keys.reduce(
      (sum, key) => sum + Number(updatedFormData[key as keyof Survey] || 0),
      0
    );
  };

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
                  id="q1"
                  className="mr-2"
                  type="radio"
                  name="Stool Frequency"
                  value="0"
                  required
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q1 === 0,
                        readOnly: true,
                        disabled: survey.q1 !== 0,
                      })}
                />
                Normal number of stools
              </label>
              <label>
                <input
                  id="q1"
                  className="mr-2"
                  type="radio"
                  name="Stool Frequency"
                  value="1"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q1 === 1,
                        readOnly: true,
                        disabled: survey.q1 !== 1,
                      })}
                />
                1-2 stools more than normal
              </label>
              <label>
                <input
                  id="q1"
                  className="mr-2"
                  type="radio"
                  name="Stool Frequency"
                  value="2"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q1 === 2,
                        readOnly: true,
                        disabled: survey.q1 !== 2,
                      })}
                />
                3-4 stools more than normal
              </label>
              <label>
                <input
                  id="q1"
                  className="mr-2"
                  type="radio"
                  name="Stool Frequency"
                  value="3"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q1 === 3,
                        readOnly: true,
                        disabled: survey.q1 !== 3,
                      })}
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
                  id="q2"
                  className="mr-2"
                  type="radio"
                  name="Abdominal Pain"
                  value="0"
                  required
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q2 === 0,
                        readOnly: true,
                        disabled: survey.q2 !== 0,
                      })}
                />
                None
              </label>
              <label>
                <input
                  id="q2"
                  className="mr-2"
                  type="radio"
                  name="Abdominal Pain"
                  value="1"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q2 === 1,
                        readOnly: true,
                        disabled: survey.q2 !== 1,
                      })}
                />
                Mild
              </label>
              <label>
                <input
                  id="q2"
                  className="mr-2"
                  type="radio"
                  name="Abdominal Pain"
                  value="2"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q2 === 2,
                        readOnly: true,
                        disabled: survey.q2 !== 2,
                      })}
                />
                Moderate
              </label>
              <label>
                <input
                  id="q2"
                  className="mr-2"
                  type="radio"
                  name="Abdominal Pain"
                  value="3"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q2 === 3,
                        readOnly: true,
                        disabled: survey.q2 !== 3,
                      })}
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
                  id="q3"
                  className="mr-2"
                  type="radio"
                  name="IBD Control"
                  value="2"
                  required
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q3 === 2,
                        readOnly: true,
                        disabled: survey.q3 !== 2,
                      })}
                />
                Yes
              </label>
              <label>
                <input
                  id="q3"
                  className="mr-2"
                  type="radio"
                  name="IBD Control"
                  value="0"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q3 === 0,
                        readOnly: true,
                        disabled: survey.q3 !== 0,
                      })}
                />
                No
              </label>
              <label>
                <input
                  id="q3"
                  className="mr-2"
                  type="radio"
                  name="IBD Control"
                  value="1"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q3 === 1,
                        readOnly: true,
                        disabled: survey.q3 !== 1,
                      })}
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
                  id="q4"
                  className="mr-2"
                  type="radio"
                  name="Treatment Efficacy"
                  value="2"
                  required
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q4 === 2,
                        readOnly: true,
                        disabled: survey.q4 !== 2,
                      })}
                />
                Yes
              </label>
              <label>
                <input
                  id="q4"
                  className="mr-2"
                  type="radio"
                  name="Treatment Efficacy"
                  value="0"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q4 === 0,
                        readOnly: true,
                        disabled: survey.q4 !== 0,
                      })}
                />
                No
              </label>
              <label>
                <input
                  id="q4"
                  className="mr-2"
                  type="radio"
                  name="Treatment Efficacy"
                  value="1"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q4 === 1,
                        readOnly: true,
                        disabled: survey.q4 !== 1,
                      })}
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
                id="q4a"
                className="mr-2"
                type="checkbox"
                name="No Treatment"
                {...(patientUserEdit
                  ? {
                      onChange: (e) =>
                        setFormData({ ...formData, q4a: e.target.checked }),
                    }
                  : {
                      checked: survey.q4a ?? false,
                      readOnly: true,
                      disabled: survey.q4a !== true,
                    })}
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
                  id="q5"
                  className="mr-2"
                  type="radio"
                  name="Symptom Improvement"
                  value="2"
                  required
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q5 === 2,
                        readOnly: true,
                        disabled: survey.q5 !== 2,
                      })}
                />
                Better
              </label>
              <label>
                <input
                  id="q5"
                  className="mr-2"
                  type="radio"
                  name="Symptom Improvement"
                  value="1"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q5 === 1,
                        readOnly: true,
                        disabled: survey.q5 !== 1,
                      })}
                />
                No changes
              </label>
              <label>
                <input
                  id="q5"
                  className="mr-2"
                  type="radio"
                  name="Symptom Improvement"
                  value="0"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q5 === 0,
                        readOnly: true,
                        disabled: survey.q5 !== 0,
                      })}
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
                  id="q6"
                  className="mr-2"
                  type="radio"
                  name="Missed Plans"
                  value="0"
                  required
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q6 === 0,
                        readOnly: true,
                        disabled: survey.q6 !== 0,
                      })}
                />
                Yes
              </label>
              <label>
                <input
                  id="q6"
                  className="mr-2"
                  type="radio"
                  name="Missed Plans"
                  value="2"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q6 === 2,
                        readOnly: true,
                        disabled: survey.q6 !== 2,
                      })}
                />
                No
              </label>
              <label>
                <input
                  id="q6"
                  className="mr-2"
                  type="radio"
                  name="Missed Plans"
                  value="1"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q6 === 1,
                        readOnly: true,
                        disabled: survey.q6 !== 1,
                      })}
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
                  id="q7"
                  className="mr-2"
                  type="radio"
                  name="Night Symptoms"
                  value="0"
                  required
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q7 === 0,
                        readOnly: true,
                        disabled: survey.q7 !== 0,
                      })}
                />
                Yes
              </label>
              <label>
                <input
                  id="q7"
                  className="mr-2"
                  type="radio"
                  name="Night Symptoms"
                  value="2"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q7 === 2,
                        readOnly: true,
                        disabled: survey.q7 !== 2,
                      })}
                />
                No
              </label>
              <label>
                <input
                  id="q7"
                  className="mr-2"
                  type="radio"
                  name="Night Symptoms"
                  value="1"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q7 === 1,
                        readOnly: true,
                        disabled: survey.q7 !== 1,
                      })}
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
                  id="q8"
                  className="mr-2"
                  type="radio"
                  name="Pain Discomfort"
                  value="0"
                  required
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q8 === 0,
                        readOnly: true,
                        disabled: survey.q8 !== 0,
                      })}
                />
                Yes
              </label>
              <label>
                <input
                  id="q8"
                  className="mr-2"
                  type="radio"
                  name="Pain Discomfort"
                  value="2"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q8 === 2,
                        readOnly: true,
                        disabled: survey.q8 !== 2,
                      })}
                />
                No
              </label>
              <label>
                <input
                  id="q8"
                  className="mr-2"
                  type="radio"
                  name="Pain Discomfort"
                  value="1"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q8 === 1,
                        readOnly: true,
                        disabled: survey.q8 !== 1,
                      })}
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
                  id="q9"
                  className="mr-2"
                  type="radio"
                  name="Fatigue"
                  value="0"
                  required
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q9 === 0,
                        readOnly: true,
                        disabled: survey.q9 !== 0,
                      })}
                />
                Yes
              </label>
              <label>
                <input
                  id="q9"
                  className="mr-2"
                  type="radio"
                  name="Fatigue"
                  value="2"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q9 === 2,
                        readOnly: true,
                        disabled: survey.q9 !== 2,
                      })}
                />
                No
              </label>
              <label>
                <input
                  id="q9"
                  className="mr-2"
                  type="radio"
                  name="Fatigue"
                  value="1"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q9 === 1,
                        readOnly: true,
                        disabled: survey.q9 !== 1,
                      })}
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
                  id="q10"
                  className="mr-2"
                  type="radio"
                  name="Mood"
                  value="0"
                  required
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q10 === 0,
                        readOnly: true,
                        disabled: survey.q10 !== 0,
                      })}
                />
                Yes
              </label>
              <label>
                <input
                  id="q10"
                  className="mr-2"
                  type="radio"
                  name="Mood"
                  value="2"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q10 === 2,
                        readOnly: true,
                        disabled: survey.q10 !== 2,
                      })}
                />
                No
              </label>
              <label>
                <input
                  id="q10"
                  className="mr-2"
                  type="radio"
                  name="Mood"
                  value="1"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q10 === 1,
                        readOnly: true,
                        disabled: survey.q10 !== 1,
                      })}
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
                  id="q11"
                  className="mr-2"
                  type="radio"
                  name="Change Treatment"
                  value="0"
                  required
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q11 === 0,
                        readOnly: true,
                        disabled: survey.q11 !== 0,
                      })}
                />
                Yes
              </label>
              <label>
                <input
                  id="q11"
                  className="mr-2"
                  type="radio"
                  name="Change Treatment"
                  value="2"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q11 === 2,
                        readOnly: true,
                        disabled: survey.q11 !== 2,
                      })}
                />
                No
              </label>
              <label>
                <input
                  id="q11"
                  className="mr-2"
                  type="radio"
                  name="Change Treatment"
                  value="1"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q11 === 1,
                        readOnly: true,
                        disabled: survey.q11 !== 1,
                      })}
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
                  id="q12"
                  type="range"
                  name="Overall IBD Control"
                  min={0}
                  max={10}
                  step={1}
                  {...(patientUserEdit
                    ? {
                        defaultValue: 5,
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        value:
                          typeof survey.q12 === "number"
                            ? `${survey.q12}`
                            : "5",
                        readOnly: true,
                      })}
                />
                {formData.q12 === null
                  ? "Move the slider to see a response"
                  : formData.q12}
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
            value={formData.contScore !== null ? formData.contScore : 0}
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
                  id="q13"
                  className="mr-2"
                  type="radio"
                  name="Smoking"
                  value="1"
                  required
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q13 === 1,
                        readOnly: true,
                        disabled: survey.q13 !== 1,
                      })}
                />
                Yes
              </label>
              <label>
                <input
                  id="q13"
                  className="mr-2"
                  type="radio"
                  name="Smoking"
                  value="0"
                  {...(patientUserEdit
                    ? {
                        onChange: (e) => handleFormInput(e),
                      }
                    : {
                        checked: survey.q13 === 0,
                        readOnly: true,
                        disabled: survey.q13 !== 0,
                      })}
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
