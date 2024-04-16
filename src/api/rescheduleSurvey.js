import { IBDirectAPI } from "./api";

export const rescheduleSurvey = (id, newDate) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.patch(
    `/patients/reschedule-survey/${id}`,
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
