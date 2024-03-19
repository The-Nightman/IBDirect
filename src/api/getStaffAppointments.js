import { IBDirectAPI } from "./api";

export const getStaffAppointments = (id) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.get(`/Staff/${id}/myAppointments`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
