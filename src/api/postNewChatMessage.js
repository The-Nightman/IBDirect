import { IBDirectAPI } from "./api";

export const postNewChatMessage = (messageObj) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.post(`/chat/create-message`, messageObj, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};