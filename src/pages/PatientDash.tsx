import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, Outlet } from "react-router-dom";
import { patientUserDetailsBrief } from "../api/getPatientUserDetailsBrief";

interface userData {
  name: string;
  diagnosis: string;
  hospital: string;
}

const PatientDash = () => {
  const [userData, setUserData] = useState<userData>({
    name: "",
    diagnosis: "",
    hospital: "",
  });
  const { user } = useAuth();

  useEffect(() => {
    patientUserDetailsBrief(user.userID)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [user.userID]);

  const parseDiagnosis = () => {
    if (userData.diagnosis === "CD") {
      return "Crohn's Disease";
    } else if (userData.diagnosis === "UC") {
      return "Ulcerative Colitis";
    }
  };

  return (
    <>
      <section className="flex flex-1 flex-col justify-center">
        <aside className="flex flex-nowrap flex-col  justify-between text-white md:min-h-[5rem] h-fit py-1 px-2 bg-gradient-to-br from-sky-700 to-blue-400">
          <h2 className="text-3xl">
            {userData.name.split(",").reverse().join(" ")}
          </h2>
          <div className="flex flex-col pt-2 md:flex-row md:justify-between md:text-lg">
            <p>{parseDiagnosis()}</p>
            <p>{userData.hospital}</p>
          </div>
        </aside>
        <div className="md:grid grid-cols-[max-content_auto] h-full">
          <nav
            className="hidden md:flex flex-col flex-1 p-5 border-slate-400 border-r"
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
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="select-none hover:text-blue-700 hover:underline active:text-blue-900"
                  draggable="false"
                  to={"/patient-portal/dashboard/my-details"}
                >
                  My Details
                </Link>
              </li>
              <li>
                <Link
                  className="select-none hover:text-blue-700 hover:underline active:text-blue-900"
                  draggable="false"
                  to={"/patient-portal/dashboard/my-appointments"}
                >
                  My Appointments
                </Link>
              </li>
              <li>
                <Link
                  className="select-none hover:text-blue-700 hover:underline active:text-blue-900"
                  draggable="false"
                  to={"/patient-portal/dashboard/my-prescriptions"}
                >
                  My Prescriptions
                </Link>
              </li>
              <li>
                <Link
                  className="select-none hover:text-blue-700 hover:underline active:text-blue-900"
                  draggable="false"
                  to={"/patient-portal/dashboard/ibd-surveys"}
                >
                  IBD Surveys
                </Link>
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
