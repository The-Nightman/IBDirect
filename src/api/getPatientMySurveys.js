import { IBDirectAPI } from "./api";

export const getPatientMySurveys = (id) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.get(`/patients/${id}/my-surveys`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
