import { useEffect, useState } from "react";
import { staffPatientsList } from "../../api/getStaffPatientsList";
import { PatientCard } from "..";
import { useAuth } from "../../context/AuthContext";

interface PatientsBrief {
  patientId: number;
  name: string;
  dateOfBirth: string;
  diagnosis: string;
  stoma: boolean;
}

const StaffDashboardPatients = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState<PatientsBrief[]>([]);

  useEffect(() => {
    staffPatientsList(user.userID)
      .then((res) => {
        setPatients(res.data);
      })
      .catch((res) => {
        console.log(res.response);
      });
  }, []);

  return (
    <>
      <section className="flex flex-col">
        <div className="grid grid-cols-[25%_20%_auto_20%_10%] h-10 px-4 text-lg border-b border-slate-700 items-center">
          <p>Name</p>
          <p>Date Of Birth</p>
          <p>Diagnosis</p>
          <p>Stoma</p>
        </div>
        <ul>
          {patients.map((p) => {
            return (
              <li className="border-b border-slate-400">
                <PatientCard
                  key={p.patientId}
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
