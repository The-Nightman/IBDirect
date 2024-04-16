import { IBDirectAPI } from "./api";

export const getPatientMyPrescriptions = (id) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.get(`/patients/${id}/my-prescriptions`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
