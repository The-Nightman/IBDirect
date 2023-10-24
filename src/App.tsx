import { Header, PrivateRoutes, StaffDashboardPatients } from "./components";
import { Route, Routes } from "react-router-dom";
import Root from "./pages/Root";
import { LoginSwitchBoard, PatientLogin, StaffLogin } from "./components";
import StaffDash from "./pages/StaffDash";

function App() {
  return (
    <>
    <div className="flex flex-col h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="" element={<LoginSwitchBoard />}/>
          <Route path="Portal/Patient/Login" element={<PatientLogin />}/>
          <Route path="Portal/Staff/Login" element={<StaffLogin />}/>
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<StaffDash />}>
            <Route path="/dashboard/patients" element={<StaffDashboardPatients />} />
          </Route>
        </Route>
      </Routes>
      </div>
    </>
  );
}

export default App;
