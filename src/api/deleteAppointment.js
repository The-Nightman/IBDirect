import { IBDirectAPI } from "./api";

export const deleteAppointment = (id) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.delete(`Patients/deleteAppointment/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
