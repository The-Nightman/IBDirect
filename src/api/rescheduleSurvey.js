import { IBDirectAPI } from "./api";

export const rescheduleSurvey = (id, newDate) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.patch(
    `/Patients/rescheduleSurvey/${id}`,
    { date: newDate },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  ).then((res) => {
    return res;
  });
};
