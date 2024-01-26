import jwtDecode from "jwt-decode";
import { IBDirectAPI } from "./api";

export const updatePatientNotes = (id, updatedNotes) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.put(`/Patients/${id}/updateNotes`, { notes: updatedNotes }, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};