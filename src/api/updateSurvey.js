import { IBDirectAPI } from "./api";

export const updateSurvey = (id, formData) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.put(`/patients/update-survey/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
