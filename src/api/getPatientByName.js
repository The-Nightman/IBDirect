import { IBDirectAPI } from "./api";

export const getPatientByName = (searchName) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.get(`/patients/find-patient/${searchName}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
