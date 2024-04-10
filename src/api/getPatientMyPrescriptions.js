import { IBDirectAPI } from "./api";

export const getPatientMyPrescriptions = (id) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.get(`/Patients/${id}/myPrescriptions`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
