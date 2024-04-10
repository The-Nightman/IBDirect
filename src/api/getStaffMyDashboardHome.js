import { IBDirectAPI } from "./api";

export const getStaffMyDashboardHome = (id) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.get(`/Staff/${id}/myDashboardHub`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
