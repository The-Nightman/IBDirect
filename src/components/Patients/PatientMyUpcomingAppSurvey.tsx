import { useEffect, useState } from "react";
import { getPatientMyUpcoming } from "../../api/getPatientMyUpcoming";
import { useAuth } from "../../context/AuthContext";
import { Appointment } from "../../interfaces/Appointment";
import { Survey } from "../../interfaces/Survey";
import { ErrorState } from "../../interfaces/ErrorState";
import Toast from "../UX/Toast";
import PatientAppointmentCard from "./PatientAppointmentCard";
import PatientSurveyCard from "./PatientSurveyCard";
import SpinnerStatus from "../UX/Spinner";

interface UpcomingData {
  appointments: Appointment[];
  surveys: Survey[];
}

const PatientMyUpcomingAppSurvey = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [upcomingData, setUpcomingData] = useState<UpcomingData>({
    appointments: [],
    surveys: [],
  });
  const [toastState, setToastState] = useState<ErrorState>({
    state: false,
    message: "",
    color: "",
  });
  const { user } = useAuth();

  useEffect(() => {
    getPatientMyUpcoming(user.userID)
      .then((res) => {
        setUpcomingData(res.data);
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

  const removeCompletedSurvey = (id: number) => {
    setUpcomingData({
      ...upcomingData,
      surveys: upcomingData.surveys.filter((survey) => survey.id !== id),
    });
  };

  return (
    <>
      {loading && <SpinnerStatus />}
      <section className="flex flex-col">
        {toastState.state && (
          <Toast
            color={toastState.color || "failure"}
            message={toastState.message}
            handleErrorState={closeToastState}
          />
        )}
        <div className="flex lg:flex-row gap-8 p-4">
          <section className="lg:w-2/4">
            <h3 className="border-b border-slate-400 mb-4">
              My Upcoming Appointments
            </h3>
            <ol className="border-x border-t border-slate-500">
              {upcomingData.appointments.length > 0 ? (
                upcomingData.appointments.map((appointment, index) => {
                  return (
                    <li key={index}>
                      <PatientAppointmentCard
                        appointment={appointment}
                        index={index}
                      />
                    </li>
                  );
                })
              ) : (
                <li>
                  <div className="w-full p-1 border-b border-slate-600 bg-slate-200">
                    <p>No upcoming appointments to display</p>
                  </div>
                </li>
              )}
            </ol>
          </section>
          <section className="lg:w-2/4">
            <h3 className="border-b border-slate-400 mb-4">
              My Upcoming Surveys
            </h3>
            <ol className="border-x border-t border-slate-500">
              {upcomingData.surveys.length > 0 ? (
                upcomingData.surveys.map((survey, index) => {
                  return (
                    <li key={index}>
                      <PatientSurveyCard
                        survey={survey}
                        patientUserEdit={true}
                        index={index}
                        removeSurvey={removeCompletedSurvey}
                      />
                    </li>
                  );
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
        </div>
      </section>
    </>
  );
};

export default PatientMyUpcomingAppSurvey;
