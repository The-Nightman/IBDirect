import { IBDirectAPI } from "./api";

export const updatePrescription = (id, updatedPrescription) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.put(`/Patients/updatePrescription/${id}`, updatedPrescription, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};