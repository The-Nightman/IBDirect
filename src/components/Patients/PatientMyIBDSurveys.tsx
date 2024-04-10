import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ErrorState } from "../../interfaces/ErrorState";
import { PatientSurveyCard, SpinnerStatus, Toast } from "..";
import { Survey } from "../../interfaces/Survey";
import { getPatientMySurveys } from "../../api/getPatientMySurveys";

const PatientMyIBDSurveys = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [toastState, setToastState] = useState<ErrorState>({
    state: false,
    message: "",
    color: "",
  });
  const { user } = useAuth();

  useEffect(() => {
    getPatientMySurveys(user.userID)
      .then((res) => {
        setSurveys(res.data);
        setLoading(false);
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
        setLoading(false);
      });
  }, [user.userID]);

  const closeToastState = () => {
    setToastState({ state: false, message: "", color: "failure" });
  };

  const updateSurveys = (updatedSurvey: Survey, index: number) => {
    const newSurveyState = surveys.map((survey, i) =>
      i === index ? updatedSurvey : survey
    );
    setSurveys(newSurveyState);
  };

  return (
    <>
      {loading && <SpinnerStatus />}
      <section className="flex flex-col lg:flex-row gap-8 p-4">
        {toastState.state && (
          <Toast
            color={toastState.color || "failure"}
            message={toastState.message}
            handleErrorState={closeToastState}
          />
        )}

        <h3 className="border-b border-slate-400 mb-4">Surveys</h3>
        <section>
          <span className="sr-only">
            IBD Disease Activity Index score is calculated from the sum of
            responses to 1a, 1b and 3a to 3f. Each option is allocated a score
            of 0, 1 or 2. The Activity Index Score ranges from 0 (worst control
            and most activity) to 16 (best control and least activity).
          </span>
          <h4>Upcoming surveys</h4>
          <ol className="border-x border-t border-slate-500">
            {surveys.some((survey) => !survey.completed) ? (
              surveys.map((survey, index) => {
                if (!survey.completed) {
                  return (
                    <li key={index}>
                      <PatientSurveyCard
                        survey={survey}
                        updateSurveyState={updateSurveys}
                        patientUserEdit={true}
                        index={index}
                      />
                    </li>
                  );
                }
              })
            ) : (
              <li>
                <div className="w-full p-1 border-b border-slate-600 bg-slate-200">
                  <p>No upcoming surveys to display</p>
                </div>
              </li>
            )}
          </ol>
        </section>
        <section>
          <h4>Completed surveys</h4>
          <ol className="border-x border-t border-slate-500">
            {surveys.some((survey) => survey.completed) ? (
              surveys.map((survey, index) => {
                if (survey.completed) {
                  return (
                    <li key={index}>
                      <PatientSurveyCard
                        survey={survey}
                        patientUserEdit={true}
                      />
                    </li>
                  );
                }
              })
            ) : (
              <li>
                <div className="w-full p-1 border-b border-slate-600 bg-slate-200">
                  <p>No Completed surveys to display</p>
                </div>
              </li>
            )}
          </ol>
        </section>
      </section>
    </>
  );
};

export default PatientMyIBDSurveys;
