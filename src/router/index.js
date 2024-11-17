import { createWebHashHistory, createRouter } from "vue-router";
import HomeView from "../pages/home.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/v/:vid", component: () => import("../pages/detail.vue") },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
