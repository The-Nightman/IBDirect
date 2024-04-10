import { useEffect, useState } from "react";
import { Prescription } from "../../interfaces/Prescription";
import { ErrorState } from "../../interfaces/ErrorState";
import { useAuth } from "../../context/AuthContext";
import { PatientPrescriptionCard, SpinnerStatus, Toast } from "..";
import { getPatientMyPrescriptions } from "../../api/getPatientMyPrescriptions";

const PatientMyPrescriptions = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [toastState, setToastState] = useState<ErrorState>({
    state: false,
    message: "",
    color: "",
  });
  const { user } = useAuth();

  useEffect(() => {
    getPatientMyPrescriptions(user.userID)
      .then((res) => {
        setPrescriptions(res.data);
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
      <section className="flex flex-col lg:flex-row gap-8 p-4">
        {toastState.state && (
          <Toast
            color={toastState.color || "failure"}
            message={toastState.message}
            handleErrorState={closeToastState}
          />
        )}
        <h3 className="border-b border-slate-400 mb-4">My Appointments</h3>
        <section>
          <h4>Repeat Prescriptions</h4>
          <ol className="border-x border-t border-slate-500">
            {prescriptions.some(
              (prescription) => prescription.scriptRepeat === true
            ) ? (
              prescriptions.map((prescription, index) => {
                if (prescription.scriptRepeat === true) {
                  return (
                    <li key={index}>
                      <PatientPrescriptionCard
                        prescription={prescription}
                        patientUser={true}
                        index={index}
                      />
                    </li>
                  );
                }
              })
            ) : (
              <li>
                <div className="w-full p-1 border-b border-slate-600 bg-slate-200">
                  <p>No prescriptions to display</p>
                </div>
              </li>
            )}
          </ol>
        </section>
        <section>
          <h4>Other Prescriptions</h4>
          <ol className="border-x border-t border-slate-500">
            {prescriptions.some(
              (prescription) => prescription.scriptRepeat === false
            ) ? (
              prescriptions.map((prescription, index) => {
                if (prescription.scriptRepeat === false) {
                  return (
                    <li key={index}>
                      <PatientPrescriptionCard
                        prescription={prescription}
                        patientUser={true}
                        index={index}
                      />
                    </li>
                  );
                }
              })
            ) : (
              <li>
                <div className="w-full p-1 border-b border-slate-600 bg-slate-200">
                  <p>No prescriptions to display</p>
                </div>
              </li>
            )}
          </ol>
        </section>
      </section>
    </>
  );
};

export default PatientMyPrescriptions;
