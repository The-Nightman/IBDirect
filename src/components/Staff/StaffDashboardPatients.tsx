import { useEffect, useState } from "react";
import { staffPatientsList } from "../../api/getStaffPatientsList";
import { PatientCard, SpinnerStatus, SkeletonPatientCard, Toast } from "..";
import { useAuth } from "../../context/AuthContext";
import { ErrorState } from "../../interfaces/ErrorState";
import { Spinner } from "flowbite-react";
import useDebounce from "../../hooks/useDebounce";
import { getPatientByName } from "../../api/getPatientByName";
import { PatientsBrief } from "../../interfaces/PatientDetailsBrief";

const StaffDashboardPatients = () => {
  const [error, setError] = useState<ErrorState>({ state: false, message: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [patients, setPatients] = useState<PatientsBrief[]>([]);
  const [cachedPatients, setCachedPatients] = useState<PatientsBrief[]>([]);
  const debouncedSearch = useDebounce<string>(searchTerm, 700);
  const { user } = useAuth();

  useEffect(() => {
    setError({ state: false, message: "" });
    staffPatientsList(user.userID)
      .then((res) => {
        setLoading(false);
        setPatients(res.data);
        setCachedPatients(res.data);
      })
      .catch((err) => {
        if (err.response === undefined) {
          setError({ ...error, state: true });
        } else {
          setError({ state: true, message: err.response.data });
        }
        setLoading(false);
      });
  }, [user.userID]);

  useEffect(() => {
    if (!debouncedSearch) {
      setSearchLoading(false);
      setPatients(cachedPatients);
      return;
    }
    getPatientByName(debouncedSearch)
      .then((res) => {
        setSearchLoading(false);
        setPatients(res.data);
      })
      .catch((err) => {
        setSearchLoading(false);
        if (err.response === undefined) {
          setError({ ...error, state: true });
        } else {
          setError({ state: true, message: err.response.data });
        }
      });
  }, [debouncedSearch]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSearchLoading(true);
  };

  const closeErrorState = () => {
    setError({ state: false, message: "" });
  };

  return (
    <>
      {loading && <SpinnerStatus />}
      <section className="flex flex-col">
        <section className="w-full overflow-hidden">
          <label>
            <span className="ml-2 md:ml-4">Search for a Patient</span>
            <div className="relative flex flex-col z-0">
              <input
                type="text"
                placeholder="Search for a Patient (Surname, Firstname)"
                className="w-full p-2 mb-2 border border-slate-500"
                value={searchTerm}
                onChange={(e) => handleSearchInput(e)}
              />
              {searchLoading && (
                <div
                  role="status"
                  className="absolute h-[2.6rem] right-1 top-0 animate-pulse flex items-center justify-center"
                >
                  <Spinner size={"lg"} />
                  <span className="sr-only">Loading search results</span>
                </div>
              )}
            </div>
          </label>
        </section>
        <div className="grid grid-cols-[35%_25%_25%_15%] md:grid-cols-[25%_20%_auto_20%_10%] min-h-10 pl-1 md:pl-2 lg:text-lg border-b border-slate-700 text-center items-center">
          <p>Name</p>
          <p>
            <span className="md:hidden">DOB</span>
            <span className="max-md:sr-only">Date Of Birth</span>
          </p>
          <p>Diagnosis</p>
          <p className="hidden md:inline">Stoma</p>
          <p>Details</p>
        </div>
        <ul>
          {error.state && (
            <Toast
              color={"failure"}
              message={error.message}
              handleErrorState={closeErrorState}
            />
          )}
          {loading && (
            <li className="border-b border-slate-400">
              <SkeletonPatientCard />
            </li>
          )}
          {patients.length === 0 && !loading && !error.state && (
            <li className="border-b border-slate-400">
              <p className="lg:text-lg text-center py-4">No patients found</p>
            </li>
          )}
          {patients.map((p) => {
            return (
              <li className="border-b border-slate-400" key={p.patientId}>
                <PatientCard
                  id={p.patientId}
                  name={p.name}
                  dob={p.dateOfBirth}
                  diagnosis={p.diagnosis}
                  stoma={p.stoma}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default StaffDashboardPatients;
