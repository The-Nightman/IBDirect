import {
  Header,
  LoginSwitchBoard,
  PatientLogin,
  StaffLogin,
  PatientDetailsStaffView,
  PrivateRoutes,
  StaffDashboardPatients,
  StaffMyAppointments,
  PatientMyUpcomingAppSurvey,
  PatientMyDetails,
  PatientMyAppointments,
  PatientMyPrescriptions,
  PatientMyIBDSurveys,
  StaffMyDashboardHome,
  StaffMyPersonalDetails,
  StaffDashboardStaff,
  StaffMemberDetails,
} from "./components";
import { Navigate, Route, Routes } from "react-router-dom";
import Root from "./pages/Root";
import StaffDash from "./pages/StaffDash";
import PatientDash from "./pages/PatientDash";

function App() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<LoginSwitchBoard />} />
            <Route path="portal/patient/login" element={<PatientLogin />} />
            <Route path="portal/staff/login" element={<StaffLogin />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/portal/patient/dashboard" element={<PatientDash />}>
              <Route index element={<PatientMyUpcomingAppSurvey />} />
              <Route
                path="my-details"
                element={<PatientMyDetails />}
              />
              <Route
                path="my-appointments"
                element={<PatientMyAppointments />}
              />
              <Route
                path="my-prescriptions"
                element={<PatientMyPrescriptions />}
              />
              <Route
                path="ibd-surveys"
                element={<PatientMyIBDSurveys />}
              />
            </Route>
            <Route path="/portal/staff/dashboard" element={<StaffDash />}>
              <Route index element={<StaffMyDashboardHome />} />
              <Route
                path="patients"
                element={<StaffDashboardPatients />}
              />
              <Route
                path="patients/details/:id"
                element={<PatientDetailsStaffView />}
              />
              <Route
                path="staff"
                element={<StaffDashboardStaff />}
              />
              <Route
                path="staff/details/:id"
                element={<StaffMemberDetails />}
              />
              <Route
                path="my-appointments"
                element={<StaffMyAppointments />}
              />
              <Route
                path="my-details"
                element={<StaffMyPersonalDetails />}
              />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
