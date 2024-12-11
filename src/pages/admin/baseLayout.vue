<script setup>
import Menus from "../../components/Menus.vue";
import { LogoutOutlined } from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const title = computed(() => route.meta.title);
</script>

<template>
  <div class="page">
    <div class="sidebar">
      <div class="menuWrapper">
        <Menus />
      </div>
      <div class="btnWrapper">
        <div class="logoutBtn"><LogoutOutlined class="icon" />Log Out</div>
      </div>
    </div>
    <div class="main">
      <h1>{{ title }}</h1>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="less">
.page {
  height: 100dvh;
  background: rgb(231, 224, 218);
  color: #333;
  font-size: 16px;
  display: flex;
}
.sidebar {
  display: flex;
  flex-direction: column;
}
.menuWrapper {
  flex-grow: 1;
  width: 200px;
  padding: 16px 0 16px 16px;
}

.main {
  flex-grow: 1;
  background: #fafafa;
  margin: 16px;
  border-radius: 8px;
  box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.05);
  padding: 16px;
  overflow: auto;
}
.btnWrapper {
  text-align: center;
  padding-bottom: 16px;
}
.logoutBtn {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  padding: 8px;
  &:hover {
    color: #666;
  }

  .icon {
    margin-right: 8px;
  }
}
</style>
