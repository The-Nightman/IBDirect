import { IBDirectAPI } from "./api";

export const cancelPrescription = (id) => {
    console.log(id)
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.put(`/Patients/cancelPrescription/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};