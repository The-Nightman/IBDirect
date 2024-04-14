import { useEffect, useState } from "react";
import { SpinnerStatus, Toast } from "..";
import { ErrorState } from "../../interfaces/ErrorState";
import { StaffDetails } from "../../interfaces/StaffDetails";
import { userStaffDetails } from "../../api/getStaffUserDetails";
import { useParams } from "react-router-dom";

const StaffMemberDetails = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [staffDetails, setStaffDetails] = useState<StaffDetails | null>(null);
  const [toastState, setToastState] = useState<ErrorState>({
    state: false,
    message: "",
    color: "failure",
  });
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    setLoading(true);
    userStaffDetails(id)
      .then((res) => {
        setStaffDetails(res.data);
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
  }, [id]);

  const closeToastState = () => {
    setToastState({ state: false, message: "", color: "failure" });
  };

  return (
    <>
      {loading && <SpinnerStatus />}
      <article className="flex flex-col p-6">
        <h2 className="text-3xl mb-4 pb-2 border-b border-slate-300">
          Staff Member Details
        </h2>
        {toastState.state && (
          <Toast
            color={"failure"}
            message={toastState.message}
            handleErrorState={closeToastState}
          />
        )}
        <section className="mt-10">
          <h3 className="text-2xl mb-4">{staffDetails?.name}</h3>
          <div className="w-72 flex flex-col flex-wrap gap-6">
            <p>
              Staff Speciality: <br />
              <span className="mt-2 ml-4">{staffDetails?.speciality}</span>
            </p>
            <p>
              Staff Role: <br />
              <span className="mt-2 ml-4">{staffDetails?.role}</span>
            </p>
            <p>
              Staff Practice: <br />
              <span className="mt-2 ml-4">{staffDetails?.practice}</span>
            </p>
          </div>
        </section>
      </article>
    </>
  );
};

export default StaffMemberDetails;
