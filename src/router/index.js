import { createWebHashHistory, createRouter } from "vue-router";
import HomeView from "../pages/client/home.vue";
import BaseLayout from "../pages/client/baseLayout.vue";
import adminRoutes from "./admin.js";

const routes = [
  {
    path: "/",
    component: BaseLayout,
    children: [
      { path: "", component: HomeView },
      {
        path: "v/:vid",
        component: () => import("../pages/client/detail.vue"),
      },
    ],
  },

  ...adminRoutes,
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
