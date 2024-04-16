import { IBDirectAPI } from "./api";

export const deleteAppointment = (id) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.delete(`/patients/delete-appointment/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
