import { IBDirectAPI } from "./api";

export const getStaffMyColleagues = (id) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.get(`/staff/${id}/my-colleagues`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
