import BaseLayout from "../pages/admin/baseLayout.vue";

export default [
  { path: "/admin/login", component: () => import("../pages/admin/login.vue") },
  {
    path: "/admin",
    redirect: "/admin/login",
    component: BaseLayout,
    children: [
      {
        path: "home",
        component: () => import("../pages/admin/home.vue"),
        meta: {
          title: "Home",
        },
      },
      {
        path: "video/manage",
        component: () => import("../pages/admin/video/manage.vue"),
        meta: {
          title: "Video Manage",
        },
      },
      {
        path: "user/manage",
        component: () => import("../pages/admin/user/manage.vue"),
        meta: {
          title: "User Manage",
        },
      },
      {
        path: "tags",
        component: () => import("../pages/admin/video/tags.vue"),
        meta: {
          title: "Tags",
        },
      },
    ],
  },
];
