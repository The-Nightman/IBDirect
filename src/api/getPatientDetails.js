import jwtDecode from "jwt-decode";
import { IBDirectAPI } from "./api";

export const getPatientDetails = (id) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.get(`/patients/${id}/details`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};