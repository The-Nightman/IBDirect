import { useEffect, useState } from "react";
import { staffPatientsList } from "../../api/getStaffPatientsList";
import { PatientCard, SpinnerStatus, SkeletonPatientCard, Toast } from "..";
import { useAuth } from "../../context/AuthContext";
import { ErrorState } from "../../interfaces/ErrorState";

interface PatientsBrief {
  patientId: number;
  name: string;
  dateOfBirth: string;
  diagnosis: string;
  stoma: boolean;
}

const StaffDashboardPatients = () => {
  const [error, setError] = useState<ErrorState>({ state: false, message: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const [patients, setPatients] = useState<PatientsBrief[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    setError({ state: false, message: "" });
    staffPatientsList(user.userID)
      .then((res) => {
        setLoading(false);
        setPatients(res.data);
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

  const closeErrorState = () => {
    setError({ state: false, message: "" });
  };

  return (
    <>
      {loading && <SpinnerStatus />}
      <section className="flex flex-col">
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
