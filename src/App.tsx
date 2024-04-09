import {
  Header,
  LoginSwitchBoard,
  PatientLogin,
  StaffLogin,
  PatientDetailsView,
  PrivateRoutes,
  StaffDashboardPatients,
  StaffMyAppointments,
} from "./components";
import { Route, Routes } from "react-router-dom";
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
            <Route path="" element={<LoginSwitchBoard />} />
            <Route path="portal/patient/Login" element={<PatientLogin />} />
            <Route path="portal/staff/Login" element={<StaffLogin />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route
              path="/patient-portal/dashboard"
              element={<PatientDash />}
            ></Route>
            <Route path="/dashboard" element={<StaffDash />}>
              <Route
                path="/dashboard/patients"
                element={<StaffDashboardPatients />}
              />
              <Route
                path="/dashboard/patients/details/:id"
                element={<PatientDetailsView />}
              />
              <Route
                path="/dashboard/my-appointments"
                element={<StaffMyAppointments />}
              />
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
