import { useEffect, useState } from "react";
import { userStaffDetails } from "../api/getStaffUserDetails";
import { useAuth } from "../context/AuthContext";
import { StaffDashboard } from "../components";

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
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <section className="shadow-xl">
          <div className="w-screen flex flex-nowrap flex-col md:flex-row justify-between text-white h-fit min-h-[5rem] py-1 px-2 bg-gradient-to-br from-sky-700 to-blue-400">
            <h2 className="text-3xl h-fit">{userData.name}</h2>
            <div className="flex flex-col pt-2 md:pl-8 md:items-end md:flex-row md:">
              <p className="md:pr-4">
                {userData.speciality} {userData.role}
              </p>
              <p>{userData.practice}</p>
            </div>
          </div>
          <StaffDashboard />
        </section>
      </div>
    </>
  );
}
