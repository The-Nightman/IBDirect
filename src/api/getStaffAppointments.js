import { IBDirectAPI } from "./api";

export const getStaffAppointments = (id) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.get(`/staff/${id}/my-appointments`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
