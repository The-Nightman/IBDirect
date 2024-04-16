import { IBDirectAPI } from "./api";

export const updatePrescription = (id, updatedPrescription) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.put(`/patients/update-prescription/${id}`, updatedPrescription, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};