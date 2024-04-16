import { IBDirectAPI } from "./api";

export const updatePatientNotes = (id, updatedNotes) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.patch(`/patients/${id}/update-notes`, { notes: updatedNotes }, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};