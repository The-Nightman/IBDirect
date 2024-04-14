import { useEffect, useState } from "react";
import { Appointment } from "../../interfaces/Appointment";
import { ErrorState } from "../../interfaces/ErrorState";
import { Toast, SpinnerStatus, PatientAppointmentCard } from "..";
import { useAuth } from "../../context/AuthContext";
import { getPatientMyAppointments } from "../../api/getPatientMyAppointments";

const PatientMyAppointments = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [appointments, setAppoinments] = useState<Appointment[]>([]);
  const [toastState, setToastState] = useState<ErrorState>({
    state: false,
    message: "",
    color: "",
  });
  const { user } = useAuth();

  useEffect(() => {
    getPatientMyAppointments(user.userID)
      .then((res) => {
        setAppoinments(res.data);
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

  return (
    <>
      {loading && <SpinnerStatus />}
      <section className="flex flex-col p-4">
        {toastState.state && (
          <Toast
            color={toastState.color || "failure"}
            message={toastState.message}
            handleErrorState={closeToastState}
          />
        )}
        <h3 className="border-b border-slate-400 mb-4">My Appointments</h3>
        <div className="flex flex-col lg:flex-row gap-8 p-4">
          <section className="flex flex-col lg:w-1/2">
            <h4>Upcoming appointments</h4>
            <ol className="border-x border-t border-slate-500">
              {appointments.some(
                (appointment) => new Date(appointment.dateTime) > new Date()
              ) ? (
                appointments.map((appointment, index) => {
                  if (new Date(appointment.dateTime) > new Date()) {
                    return (
                      <li key={index}>
                        <PatientAppointmentCard
                          appointment={appointment}
                          index={index}
                        />
                      </li>
                    );
                  }
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
          <section className="flex flex-col lg:w-1/2">
            <h4>Previous appointments</h4>
            <ol className="border-x border-t border-slate-500">
              {appointments.some(
                (appointment) => new Date(appointment.dateTime) <= new Date()
              ) ? (
                appointments.map((appointment, index) => {
                  if (new Date(appointment.dateTime) <= new Date()) {
                    return (
                      <li key={index}>
                        <PatientAppointmentCard
                          appointment={appointment}
                          index={index}
                        />
                      </li>
                    );
                  }
                })
              ) : (
                <li>
                  <div className="w-full p-1 border-b border-slate-600 bg-slate-200">
                    <p>No previous appointments to display</p>
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

export default PatientMyAppointments;
