import { IBDirectAPI } from "./api";

export const postNewPrescription = (id, newPrescription) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.post(`/patients/${id}/add-prescription`, newPrescription, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
