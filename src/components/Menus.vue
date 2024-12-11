<script setup>
import {
  VideoCameraOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const menuList = [
  {
    title: "Home",
    icon: HomeOutlined,
    path: "/admin/home",
  },
  {
    title: "Video Manage",
    icon: VideoCameraOutlined,
    path: "/admin/video/manage",
  },
  {
    title: "User Manage",
    icon: UserOutlined,
    path: "/admin/user/manage",
  },
];

function onClickMenu(menu) {
  if (!menu.path) return;
  router.push(menu.path);
}
</script>

<template>
  <div
    class="menu"
    :class="{ active: route.path === menu.path }"
    v-for="menu of menuList"
    @click="onClickMenu(menu)"
  >
    <component class="icon" :is="menu.icon" />
    <div>{{ menu.title }}</div>
  </div>
</template>

<style scoped lang="less">
.menu {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  height: 40px;
  padding: 0 16px;
  transition: all 0.2s;
  border-radius: 8px;

  &:hover {
    background: rgb(245, 245, 245);
  }

  & + & {
    margin-top: 8px;
  }
}
.icon {
  margin-right: 8px;
}
.active {
  background: rgb(218, 211, 208);
}
</style>
