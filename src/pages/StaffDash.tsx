import { useEffect, useState } from "react";
import { userStaffDetails } from "../api/getStaffUserDetails";
import { useAuth } from "../context/AuthContext";
import { Link, Outlet } from "react-router-dom";

export default function StaffDash() {
  interface userData {
    name: string;
    practice: string;
    role: string;
    speciality: string;
    staffId: number | null;
  }

  const [userData, setUserData] = useState<userData>({
    name: "",
    practice: "",
    role: "",
    speciality: "",
    staffId: null,
  });
  const { user } = useAuth();

  useEffect(() => {
    userStaffDetails(user.userID)
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
        <div className="flex flex-nowrap flex-col md:flex-row justify-between text-white h-fit min-h-[5rem] py-1 px-2 bg-gradient-to-br from-sky-700 to-blue-400">
          <h2 className="text-3xl h-fit">{userData.name}</h2>
          <div className="flex flex-col pt-2 md:pl-8 md:items-end md:flex-row md:">
            <p className="md:pr-4">
              {userData.speciality} {userData.role}
            </p>
            <p>{userData.practice}</p>
          </div>
        </div>
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
                  to={"/dashboard/patients"}
                >
                  Patients
                </Link>
              </li>
              <li>
                <Link
                  className="select-none hover:text-blue-700 hover:underline active:text-blue-900"
                  draggable="false"
                  to={"/dashboard/staff"}
                >
                  Staff
                </Link>
              </li>
              <li>
                <Link
                  className="select-none hover:text-blue-700 hover:underline active:text-blue-900"
                  draggable="false"
                  to={"/dashboard/appointments"}
                >
                  My Appointments
                </Link>
              </li>
              <li>
                <Link
                  className="select-none hover:text-blue-700 hover:underline active:text-blue-900"
                  draggable="false"
                  to={"/dashboard/mydetails"}
                >
                  My Personal Details
                </Link>
              </li>
            </ul>
          </nav>
          <Outlet />
        </div>
      </section>
    </>
  );
}
