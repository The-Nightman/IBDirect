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
        <section className="w-72 mt-8 shadow-xl">
          <div className="flex justify-center h-20 rounded-t bg-gradient-to-br from-sky-700 to-blue-400">
            <h2 className="text-4xl self-center text-white">Sign In</h2>
          </div>
          <StaffDashboard />
        </section>
      </div>
    </>
  );
}
