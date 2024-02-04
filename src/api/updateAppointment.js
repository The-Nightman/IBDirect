import { IBDirectAPI } from "./api";

export const updateAppointment = (id, updatedAppointment) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.put(`/Patients/updateAppointment/${id}`, updatedAppointment, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};