import { useEffect, useState } from "react";
import SpinnerStatus from "../UX/Spinner";
import Toast from "../UX/Toast";
import { ErrorState } from "../../interfaces/ErrorState";
import { useAuth } from "../../context/AuthContext";
import { getStaffMyDashboardHome } from "../../api/getStaffMyDashboardHome";
import { Appointment } from "../../interfaces/Appointment";
import StaffMyAppointmentCard from "./StaffMyAppointmentCard";

interface DashboardData {
  thisWeekAppointments: Appointment[];
}

const StaffMyDashboardHome = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    thisWeekAppointments: [],
  });
  const [loading, setLoading] = useState(true);
  const [toastState, setToastState] = useState<ErrorState>({
    state: false,
    message: "",
    color: "failure",
  });
  const { user } = useAuth();

  useEffect(() => {
    getStaffMyDashboardHome(user.userID)
      .then((res) => {
        setDashboardData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response === undefined) {
          setToastState({ ...toastState, state: true });
        } else {
          setToastState({ state: true, message: err.response.data, color: "failure" });
        }
      });
  }, [user.userID]);

  const closeToastState = () => {
    setToastState({ state: false, message: "", color: "failure" });
  };

  return (
    <>
      {loading && <SpinnerStatus />}
      <section className="flex flex-col p-6">
        <h2 className="text-3xl mb-4">My Dashboard</h2>
        {toastState.state && (
          <Toast
            color={"failure"}
            message={toastState.message}
            handleErrorState={closeToastState}
          />
        )}
        <div className="flex flex-col lg:flex-row">
          <section className="w-full">
            <h3>This Weeks Appointments</h3>
            <ol className="border-x border-t border-slate-500">
              {dashboardData.thisWeekAppointments.length ? (
                dashboardData.thisWeekAppointments.map((appointment, index) => {
                  return (
                    <li key={index}>
                      <StaffMyAppointmentCard appointment={appointment} />
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
        </div>
      </section>
    </>
  );
};

export default StaffMyDashboardHome;
