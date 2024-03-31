import { IBDirectAPI } from "./api";

export const cancelPrescription = (id) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.patch(`/Patients/cancelPrescription/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};