import { IBDirectAPI } from "./api";

export const getStaffByName = (searchName) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.get(`/staff/find-staff/${searchName}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
