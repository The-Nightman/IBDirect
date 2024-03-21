import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getStaffAppointments } from "../../api/getStaffAppointments";
import { Appointment } from "../../interfaces/Appointment";
import { StaffMyAppointmentCard } from "..";

const StaffMyAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    getStaffAppointments(user.userID)
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [user.userID]);

  return (
    <section className="flex flex-col p-6">
      <h2 className="text-3xl mb-4">My Appointments</h2>
      <div className="flex flex-col xl:flex-row xl:justify-evenly xl:gap-24">
        <section className="w-full">
          <h3>Upcoming Appointments</h3>
          <ol className="border-x border-t border-slate-500">
            {appointments.some(
              (appointment) => new Date(appointment.dateTime) > new Date()
            ) ? (
              appointments.map((appointment, index) => {
                if (new Date(appointment.dateTime) > new Date()) {
                  return (
                    <li key={index}>
                      <StaffMyAppointmentCard appointment={appointment} />
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
        <section className="w-full">
          <h3>Previous Appointments</h3>
          <ol className="border-x border-t border-slate-500">
            {appointments.some(
              (appointment) => new Date(appointment.dateTime) <= new Date()
            ) ? (
              appointments.map((appointment, index) => {
                if (new Date(appointment.dateTime) <= new Date()) {
                  return (
                    <li key={index}>
                      <StaffMyAppointmentCard appointment={appointment} />
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
  );
};

export default StaffMyAppointments;
