import { IBDirectAPI } from "./api";

export const updatePatientDetails = (id, updatedPatientData) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.patch(`/patients/${id}/update-details`, updatedPatientData, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};