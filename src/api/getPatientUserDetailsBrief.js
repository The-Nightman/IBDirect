import { IBDirectAPI } from "./api";

export const patientUserDetailsBrief = (id) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.get(`/Patients/${id}/myDetailsBrief`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
