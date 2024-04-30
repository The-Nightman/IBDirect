import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
const API_HUB_URL = import.meta.env.VITE_APP_HUB_URL;

export const messageConnection = (user, recipient) => {
  return new HubConnectionBuilder()
    .withUrl(API_HUB_URL + `/message?user=${recipient}`, {
      accessTokenFactory: () => sessionStorage.getItem("jwt"),
      withCredentials: true,
    })
    .configureLogging(LogLevel.Error)
    .withAutomaticReconnect()
    .build();
};
