import { IBDirectAPI } from "./api";

export const postNewAppointment = (id, newAppointment) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.post(`/patients/${id}/add-appointment`, newAppointment, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};