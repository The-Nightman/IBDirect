import { useEffect, useState } from "react";
import { SpinnerStatus, Toast } from "..";
import { ErrorState } from "../../interfaces/ErrorState";
import { StaffDetails } from "../../interfaces/StaffDetails";
import { useAuth } from "../../context/AuthContext";
import { userStaffDetails } from "../../api/getStaffUserDetails";

const StaffMyPersonalDetails = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [myDetails, setMyDetails] = useState<StaffDetails | null>(null);
  const [toastState, setToastState] = useState<ErrorState>({
    state: false,
    message: "",
    color: "failure",
  });
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    userStaffDetails(user.userID)
      .then((res) => {
        setMyDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response === undefined) {
          setToastState({ ...toastState, state: true });
        } else {
          setToastState({
            state: true,
            message: err.response.data,
            color: "failure",
          });
        }
        setLoading(false);
      });
  }, [user.userID]);

  const closeToastState = () => {
    setToastState({ state: false, message: "", color: "failure" });
  };

  return (
    <>
      {loading && <SpinnerStatus />}
      <article className="flex flex-col p-6">
        <h2 className="text-3xl mb-4 pb-2 border-b border-slate-300">My Details</h2>
        {toastState.state && (
          <Toast
            color={"failure"}
            message={toastState.message}
            handleErrorState={closeToastState}
          />
        )}
        <section className="mt-10">
          <h3 className="text-2xl mb-4">{myDetails?.name}</h3>
          <div className="w-72 flex flex-col flex-wrap gap-6">
            <p>
              My Speciality: <br />
              <span className="mt-2 ml-4">{myDetails?.speciality}</span>
            </p>
            <p>
              My Role: <br />
              <span className="mt-2 ml-4">{myDetails?.role}</span>
            </p>
            <p>
              My Practice: <br />
              <span className="mt-2 ml-4">{myDetails?.practice}</span>
            </p>
          </div>
        </section>
      </article>
    </>
  );
};

export default StaffMyPersonalDetails;
