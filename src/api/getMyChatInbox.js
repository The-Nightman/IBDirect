import { IBDirectAPI } from "./api";

export const getMyChatInbox = (id) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.get(`/chat/user-inbox/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
