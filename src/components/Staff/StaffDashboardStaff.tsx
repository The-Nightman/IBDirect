import { useEffect, useState } from "react";
import { getStaffMyColleagues } from "../../api/getStaffMyColleagues";
import { useAuth } from "../../context/AuthContext";
import { StaffDetails } from "../../interfaces/StaffDetails";
import { ErrorState } from "../../interfaces/ErrorState";
import { Toast, SpinnerStatus, StaffMemberCard } from "..";
import useDebounce from "../../hooks/useDebounce";
import { getStaffByName } from "../../api/getStaffByName";

const StaffDashboardStaff = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [myColleagues, setMyColleagues] = useState<StaffDetails[]>([]);
  const [searchResults, setSearchResults] = useState<StaffDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [toastState, setToastState] = useState<ErrorState>({
    state: false,
    message: "",
  });
  const debouncedSearch = useDebounce<string>(searchTerm, 700);
  const { user } = useAuth();

  useEffect(() => {
    getStaffMyColleagues(user.userID)
      .then((res) => {
        setLoading(false);
        setMyColleagues(res.data);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response === undefined) {
          setToastState({ ...toastState, state: true });
        } else {
          setToastState({
            state: true,
            message: err.response.data,
            color: "failure",
          });
        }
      });
  }, [user.userID]);

  useEffect(() => {
    if (!debouncedSearch) {
      setSearchResults([]);
      return;
    }
    getStaffByName(debouncedSearch)
      .then((res) => {
        setSearchResults(res.data);
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
      });
  }, [debouncedSearch]);

  const closeToastState = () => {
    setToastState({ state: false, message: "", color: "failure" });
  };

  return (
    <>
      {loading && <SpinnerStatus />}
      <section className="flex flex-col p-6">
        <h2 className="text-3xl mb-4">My Colleagues</h2>
        {toastState.state && (
          <Toast
            color={"failure"}
            message={toastState.message}
            handleErrorState={closeToastState}
          />
        )}
        <div className="flex flex-col xl:flex-row xl:justify-evenly xl:gap-24">
          <section className="w-full">
            <label>
              Search for a Staff Member
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Search for a Staff Member"
                  className="w-full p-2 mb-2 border border-slate-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </label>
            <ol className="mb-8 border-x border-t border-slate-500">
              {searchResults.length ? (
                searchResults.map((staff, index) => {
                  return (
                    <li key={index}>
                      <StaffMemberCard staffDetails={staff} />
                    </li>
                  );
                })
              ) : (
                <li>
                  <div className="w-full p-1 border-b border-slate-600 bg-slate-200">
                    <p>No search results to display</p>
                  </div>
                </li>
              )}
            </ol>
          </section>
          <section className="w-full">
            <h3>My Team Members</h3>
            <ol className="border-x border-t border-slate-500">
              {myColleagues.length ? (
                myColleagues.map((staff, index) => {
                  return (
                    <li key={index}>
                      <StaffMemberCard staffDetails={staff} />
                    </li>
                  );
                })
              ) : (
                <li>
                  <div className="w-full p-1 border-b border-slate-600 bg-slate-200">
                    <p>No staff members to display</p>
                  </div>
                </li>
              )}
            </ol>
          </section>
        </div>
      </section>
    </>
  );
};

export default StaffDashboardStaff;
