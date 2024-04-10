import { IBDirectAPI } from "./api";

export const getPatientMySurveys = (id) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.get(`/Patients/${id}/mySurveys`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
