import { IBDirectAPI } from "./api";

export const postNewPrescription = (id, newPrescription) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.post(`/Patients/${id}/addPrescription`, newPrescription, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
