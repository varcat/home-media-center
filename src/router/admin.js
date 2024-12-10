import BaseLayout from "../pages/admin/baseLayout.vue";

export default [
  { path: "/admin/login", component: () => import("../pages/admin/login.vue") },
  {
    path: "/admin",
    redirect: "login",
    component: BaseLayout,
    children: [
      {
        path: "home",
        component: () => import("../pages/admin/home.vue"),
      },
    ],
  },
];
