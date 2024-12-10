import { createWebHashHistory, createRouter } from "vue-router";
import HomeView from "../pages/home.vue";
import adminRoutes from "./admin.js";

const routes = [
  { path: "/", component: HomeView },
  { path: "/v/:vid", component: () => import("../pages/detail.vue") },
  ...adminRoutes,
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
