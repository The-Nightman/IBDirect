import { IBDirectAPI } from "./api";

export const getStaffMyColleagues = (id) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.get(`/Staff/${id}/myColleagues`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
