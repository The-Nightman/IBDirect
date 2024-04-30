import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, Outlet } from "react-router-dom";
import { patientUserDetailsBrief } from "../api/getPatientUserDetailsBrief";
import { parseDiagnosis } from "../utils/parseDiagnosis";
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
import notifcation from "../assets/notificationSound.mp3";

interface userData {
  name: string;
  diagnosis: string;
  hospital: string;
  id: number | null;
}

const PatientDash = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<userData>({
    name: "",
    diagnosis: "",
    hospital: "",
    id: null,
  });
  const [chatState, setChatState] = useState<boolean>(false);
  const [onlineUsers, setOnlineUsers] = useState<number[]>([]);
  const [error, setError] = useState<ErrorState>({ state: false, message: "" });
  const [updatedUnreads, setUpdatedUnreads] = useState<ChatInboxUnreadItem[]>(
    []
  );
  const [unreadNotif, setUnreadNotif] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { user, logout } = useAuth();

  useEffect(() => {
    patientUserDetailsBrief(user.userID)
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
      if (unreads.length) {
        audioRef.current?.play();
        const unreadSum = unreads.reduce(
          (acc: number, curr: ChatInboxUnreadItem) => acc + curr.unreadMessages,
          0
        );
        document.title = `IBDirect (${unreadSum})`;
      }
      setUpdatedUnreads(unreads);
      setUnreadNotif(true);
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
        <audio ref={audioRef} src={notifcation} />
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
                  to={"/portal/patient/dashboard"}
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="select-none hover:text-blue-700 hover:underline active:text-blue-900"
                  draggable="false"
                  to={"/portal/patient/dashboard/my-details"}
                  onClick={() => setMenuOpen(false)}
                >
                  My Details
                </Link>
              </li>
              <li>
                <Link
                  className="select-none hover:text-blue-700 hover:underline active:text-blue-900"
                  draggable="false"
                  to={"/portal/patient/dashboard/my-appointments"}
                  onClick={() => setMenuOpen(false)}
                >
                  My Appointments
                </Link>
              </li>
              <li>
                <Link
                  className="select-none hover:text-blue-700 hover:underline active:text-blue-900"
                  draggable="false"
                  to={"/portal/patient/dashboard/my-prescriptions"}
                  onClick={() => setMenuOpen(false)}
                >
                  My Prescriptions
                </Link>
              </li>
              <li>
                <Link
                  className="select-none hover:text-blue-700 hover:underline active:text-blue-900"
                  draggable="false"
                  to={"/portal/patient/dashboard/ibd-surveys"}
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
          <main className="mb-24">
            {error.state && (
              <Toast
                color={"failure"}
                message={error.message}
                handleErrorState={closeErrorState}
              />
            )}
            {userData.id && chatState ? (
              <ChatHub
                setChatState={setChatState}
                userDetails={{
                  userId: userData.id,
                  name: userData.name,
                  role: "Patient",
                }}
                parentOnlineUsers={onlineUsers}
                parentNewUnreads={updatedUnreads}
                setParentUnreadAlert={setUnreadNotif}
              />
            ) : (
              <div>
                <button
                  className="fixed bottom-8 right-8 rounded-full p-2 bg-blue-500 text-white"
                  onClick={() => setChatState(true)}
                >
                  <QuestionAnswerOutlined fontSize="large" />
                </button>
                {unreadNotif && (
                  <div>
                    <span className="animate-ping fixed bottom-[4.25rem] right-7 h-4 w-4 rounded-full bg-red-600" />
                    <span className="fixed bottom-[4.25rem] right-7 h-4 w-4 rounded-full bg-red-600 shadow-sm shadow-slate-400" />
                  </div>
                )}
              </div>
            )}
            <Outlet />
          </main>
        </div>
      </section>
    </>
  );
};

export default PatientDash;
