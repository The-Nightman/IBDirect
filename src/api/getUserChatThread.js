import { IBDirectAPI } from "./api";

export const getUserChatThread = (currentId, recipientId) => {
  const jwt = sessionStorage.getItem("jwt");
  return IBDirectAPI.get(`/chat/user-thread/${currentId}/${recipientId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return res;
  });
};
