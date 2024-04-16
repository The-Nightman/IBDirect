import { IBDirectAPI } from "./api";

export const patientUserMyDetails = (id) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.get(`/patients/${id}/my-details`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
