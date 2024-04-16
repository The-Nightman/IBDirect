import { IBDirectAPI } from "./api";

export const updateAppointment = (id, updatedAppointment) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.put(`/patients/update-appointment/${id}`, updatedAppointment, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};