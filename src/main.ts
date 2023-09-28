import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import Root from "./views/Root.vue";
import { PatientLogin, StaffLogin, SwitchBoard } from "./components";

const routes = [
  {
    path: "/",
    component: Root,
    children: [
      {
        path: "",
        name: "IBDirect",
        component: SwitchBoard,
      },
      {
        path: "/Portal/Patient/Login",
        name: "Patient portal login",
        component: PatientLogin,
      },
      {
        path: "/Portal/Staff/Login",
        name: "Staff portal login",
        component: StaffLogin,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
