import { IBDirectAPI } from "./api";

export const getStaffMyDashboardHome = (id) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.get(`/staff/${id}/my-dashboard-hub`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
