import { useEffect, useState } from "react";
import { userStaffDetails } from "../api/getStaffUserDetails";
import { useAuth } from "../context/AuthContext";
import { Link, Outlet } from "react-router-dom";
import {
  ExitToAppOutlined,
  MenuOpenOutlined,
  MenuOutlined,
  QuestionAnswerOutlined,
} from "@mui/icons-material";
import { ChatHub, Toast } from "../components";
import { presenceConnection } from "../SignalR/presenceConnection";
import { ErrorState } from "../interfaces/ErrorState";
import { ChatInboxUnreadItem } from "../interfaces/ChatInboxUnreadItem";

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
  const [chatState, setChatState] = useState<boolean>(false);
  const [onlineUsers, setOnlineUsers] = useState<number[]>([]);
  const [error, setError] = useState<ErrorState>({ state: false, message: "" });
  const [updatedUnreads, setUpdatedUnreads] = useState<ChatInboxUnreadItem[]>(
    []
  );
  const { user, logout } = useAuth();

  useEffect(() => {
    userStaffDetails(user.userID)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((_err) => {
        setError({
          state: true,
          message: "An error has occured trying to retrieve user details",
        });
      });
  }, [user.userID]);

  useEffect(() => {
    presenceConnection.start().catch((_err) => {
      setError({
        state: true,
        message: "An error has occured trying to connect to presence services",
      });
    });

    presenceConnection.on("GetOnlineUsers", (onlineUsers: number[]) => {
      setOnlineUsers(onlineUsers);
    });

    presenceConnection.on("NewMessageReceived", (unreads) => {
      setUpdatedUnreads(unreads);
    });

    return () => {
      presenceConnection.off("GetOnlineUsers");
      presenceConnection.off("NewMessageReceived");
      presenceConnection.stop();
    };
  }, [user.userID]);

  const closeErrorState = () => {
    setError({ state: false, message: "" });
  };

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
                  to={"/portal/staff/dashboard"}
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="select-none hover:text-blue-700 hover:underline active:text-blue-900"
                  draggable="false"
                  to={"/portal/staff/dashboard/patients"}
                  onClick={() => setMenuOpen(false)}
                >
                  Patients
                </Link>
              </li>
              <li>
                <Link
                  className="select-none hover:text-blue-700 hover:underline active:text-blue-900"
                  draggable="false"
                  to={"/portal/staff/dashboard/staff"}
                  onClick={() => setMenuOpen(false)}
                >
                  Staff
                </Link>
              </li>
              <li>
                <Link
                  className="select-none hover:text-blue-700 hover:underline active:text-blue-900"
                  draggable="false"
                  to={"/portal/staff/dashboard/my-appointments"}
                  onClick={() => setMenuOpen(false)}
                >
                  My Appointments
                </Link>
              </li>
              <li>
                <Link
                  className="select-none hover:text-blue-700 hover:underline active:text-blue-900"
                  draggable="false"
                  to={"/portal/staff/dashboard/my-details"}
                  onClick={() => setMenuOpen(false)}
                >
                  My Personal Details
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
            {error.state && (
              <Toast
                color={"failure"}
                message={error.message}
                handleErrorState={closeErrorState}
              />
            )}
            {userData.staffId && chatState ? (
              <ChatHub
                setChatState={setChatState}
                userDetails={{
                  userId: userData.staffId,
                  name: userData.name,
                  role: userData.role,
                }}
                parentOnlineUsers={onlineUsers}
                parentNewUnreads={updatedUnreads}
              />
            ) : (
              <button
                className="fixed bottom-8 right-8 rounded-full p-2 bg-blue-500 text-white"
                onClick={() => setChatState(true)}
              >
                <QuestionAnswerOutlined fontSize="large" />
              </button>
            )}
            <Outlet />
          </main>
        </div>
      </section>
    </>
  );
};

export default StaffDash;
