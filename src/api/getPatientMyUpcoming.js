import { IBDirectAPI } from "./api";

export const getPatientMyUpcoming = (id) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.get(`/patients/${id}/my-upcoming`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
