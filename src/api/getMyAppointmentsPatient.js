import { IBDirectAPI } from "./api";

export const getMyAppointmentsPatient = (id) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.get(`/patients/${id}/my-appointments`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
