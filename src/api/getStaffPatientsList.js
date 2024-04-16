import jwtDecode from "jwt-decode";
import { IBDirectAPI } from "./api";

export const staffPatientsList = (id) => {
  const jwt = sessionStorage.getItem("jwt");
  const { role } = jwtDecode(jwt)
  return IBDirectAPI.get(`/staff/my-patients/${role}/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};