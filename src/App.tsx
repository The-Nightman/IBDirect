import { Header } from "./components";
import { Route, Routes } from "react-router-dom";
import Root from "./pages/Root";
import { LoginSwitchBoard, PatientLogin, StaffLogin } from "./components";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="" element={<LoginSwitchBoard />}/>
          <Route path="Portal/Patient/Login" element={<PatientLogin />}/>
          <Route path="Portal/Staff/Login" element={<StaffLogin />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
