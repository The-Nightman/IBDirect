import { IBDirectAPI } from "./api";

export const postNewAppointment = (id, newAppointment) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.post(`/Patients/${id}/addAppointment`, newAppointment, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};