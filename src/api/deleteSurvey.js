import { IBDirectAPI } from "./api";

export const deleteSurvey = (id) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.delete(`/patients/delete-survey/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
