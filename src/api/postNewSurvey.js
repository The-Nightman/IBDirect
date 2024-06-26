import { IBDirectAPI } from "./api";

export const postNewSurvey = (id, newSurvey) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.post(
    `/patients/${id}/add-survey`,
    { date: newSurvey },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  ).then((res) => {
    return res;
  });
};
