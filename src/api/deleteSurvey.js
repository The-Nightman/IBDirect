import { IBDirectAPI } from "./api";

export const deleteSurvey = (id) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.delete(`Patients/deleteSurvey/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
