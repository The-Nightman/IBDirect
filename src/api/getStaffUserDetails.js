import { IBDirectAPI } from "./api";

export const userStaffDetails = (id) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.get(`/staff/${id}/details`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
