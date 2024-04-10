import { useEffect, useState } from "react";
import { userStaffDetails } from "../api/getStaffUserDetails";
import { useAuth } from "../context/AuthContext";
import { Link, Outlet } from "react-router-dom";
import {
  ExitToAppOutlined,
  MenuOpenOutlined,
  MenuOutlined,
} from "@mui/icons-material";

interface userData {
  name: string;
  practice: string;
  role: string;
  speciality: string;
  staffId: number | null;
}

const StaffDash = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<userData>({
    name: "",
    practice: "",
    role: "",
    speciality: "",
    staffId: null,
  });
  const { user, logout } = useAuth();

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
        <aside className="flex flex-nowrap flex-col md:flex-row justify-between text-white md:min-h-[5rem] h-fit py-1 px-2 bg-gradient-to-br from-sky-700 to-blue-400">
          <h2 className="text-3xl">{userData.name}</h2>
          <div className="flex flex-col pt-2 md:pl-8 md:items-end md:flex-row">
            <p className="md:pr-4">
              {userData.speciality} {userData.role}
            </p>
            <p>{userData.practice}</p>
          </div>
        </aside>
        <div className="md:grid grid-cols-[max-content_auto] h-full">
          <button
            className="absolute top-0 md:hidden text-white"
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
              menuOpen ? "absolute" : "hidden"
            } max-md:h-[calc(100%_-_12.3rem)] md:flex flex-col flex-1 p-5 bg-gray-200 border-slate-400 border-r`}
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
                  to={"/dashboard"}
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="select-none hover:text-blue-700 hover:underline active:text-blue-900"
                  draggable="false"
                  to={"/dashboard/patients"}
                  onClick={() => setMenuOpen(false)}
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
                  to={"/dashboard/my-appointments"}
                  onClick={() => setMenuOpen(false)}
                >
                  My Appointments
                </Link>
              </li>
              <li>
                <Link
                  className="select-none hover:text-blue-700 hover:underline active:text-blue-900"
                  draggable="false"
                  to={"/dashboard/my-details"}
                  onClick={() => setMenuOpen(false)}
                >
                  My Personal Details
                </Link>
              </li>
              <li>
                <button
                  className="mt-64 md:mt-12 select-none hover:text-blue-700 hover:underline active:text-blue-900"
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

export default StaffDash;
