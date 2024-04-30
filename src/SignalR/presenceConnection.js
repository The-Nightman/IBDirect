import { HubConnectionBuilder } from "@microsoft/signalr";
const API_HUB_URL = import.meta.env.VITE_APP_HUB_URL;

export const presenceConnection = new HubConnectionBuilder()
  .withUrl(API_HUB_URL + "/presence", { accessTokenFactory: () => sessionStorage.getItem("jwt"), withCredentials: true })
  .withAutomaticReconnect()
  .build();
