import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, Outlet } from "react-router-dom";
import { patientUserDetailsBrief } from "../api/getPatientUserDetailsBrief";
import { parseDiagnosis } from "../utils/parseDiagnosis";
import {
  ExitToAppOutlined,
  MenuOpenOutlined,
  MenuOutlined,
} from "@mui/icons-material";

interface userData {
  name: string;
  diagnosis: string;
  hospital: string;
}

const PatientDash = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<userData>({
    name: "",
    diagnosis: "",
    hospital: "",
  });
  const { user, logout } = useAuth();

  useEffect(() => {
    patientUserDetailsBrief(user.userID)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [user.userID]);

  return (
    <>
      <section className="flex flex-1 flex-col justify-center">
        <aside className="flex flex-nowrap flex-col  justify-between text-white md:min-h-[5rem] h-fit py-1 px-2 bg-gradient-to-br from-sky-700 to-blue-400">
          <h2 className="text-3xl">
            {userData.name.split(",").reverse().join(" ")}
          </h2>
          <div className="flex flex-col pt-2 md:flex-row md:justify-between md:text-lg">
            <p>{parseDiagnosis(userData.diagnosis)}</p>
            <p>{userData.hospital}</p>
          </div>
        </aside>
        <div className="md:grid grid-cols-[max-content_auto] h-full">
          <button
            className={`${
              menuOpen ? "fixed text-stone-900" : "absolute text-white"
            } top-0 md:hidden z-20`}
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <MenuOpenOutlined sx={{ fontSize: 60 }} />
            ) : (
              <MenuOutlined sx={{ fontSize: 60 }} />
            )}
          </button>
          <nav
            className={`${
              menuOpen ? "max-md:fixed" : "max-md:hidden"
            } md:flex flex-col flex-1 max-md:h-full top-0 max-md:pt-24 p-5 bg-gray-200 border-slate-400 border-r z-10`}
            aria-labelledby="dashboardmenulabel"
          >
            <h3 className="text-2xl mb-6" id="dashboardmenulabel">
              Dashboard Menu
            </h3>
            <ul className="list-none text-lg space-y-4">
              <li>
                <Link
                  className="select-none hover:text-blue-700 hover:underline active:text-blue-900"
                  draggable="false"
                  to={"/patient-portal/dashboard"}
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="select-none hover:text-blue-700 hover:underline active:text-blue-900"
                  draggable="false"
                  to={"/patient-portal/dashboard/my-details"}
                  onClick={() => setMenuOpen(false)}
                >
                  My Details
                </Link>
              </li>
              <li>
                <Link
                  className="select-none hover:text-blue-700 hover:underline active:text-blue-900"
                  draggable="false"
                  to={"/patient-portal/dashboard/my-appointments"}
                  onClick={() => setMenuOpen(false)}
                >
                  My Appointments
                </Link>
              </li>
              <li>
                <Link
                  className="select-none hover:text-blue-700 hover:underline active:text-blue-900"
                  draggable="false"
                  to={"/patient-portal/dashboard/my-prescriptions"}
                  onClick={() => setMenuOpen(false)}
                >
                  My Prescriptions
                </Link>
              </li>
              <li>
                <Link
                  className="select-none hover:text-blue-700 hover:underline active:text-blue-900"
                  draggable="false"
                  to={"/patient-portal/dashboard/ibd-surveys"}
                  onClick={() => setMenuOpen(false)}
                >
                  IBD Surveys
                </Link>
              </li>
              <li>
                <button
                  className="mt-96 md:mt-12 select-none hover:text-blue-700 hover:underline active:text-blue-900"
                  onClick={logout}
                >
                  <ExitToAppOutlined className="mr-4" />
                  Logout
                </button>
              </li>
            </ul>
          </nav>
          <main>
            <Outlet />
          </main>
        </div>
      </section>
    </>
  );
};

export default PatientDash;
