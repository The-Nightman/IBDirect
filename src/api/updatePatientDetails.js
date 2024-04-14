import { IBDirectAPI } from "./api";

export const updatePatientDetails = (id, updatedPatientData) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.patch(`/Patients/${id}/updateDetails`, updatedPatientData, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};