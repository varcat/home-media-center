<script setup>
import { ref, unref } from "vue";
import { req } from "../../utils/http.js";
import { toPromiseTuple } from "wsp-toolkit";
import { useRouter } from "vue-router";

const router = useRouter();

const formData = ref({
  user: "",
  pwd: "",
});
const loading = ref(false);
const snackbar = ref(false);

async function handleLogin() {
  if (unref(loading)) return;
  loading.value = true;
  const [err, res] = await toPromiseTuple(
    req("/v1/login", {
      data: unref(formData),
    }),
  );
  loading.value = false;
  if (!res.ok) return;
  snackbar.value = true;
  router.push("/admin/home");
}
</script>

<template>
  <div class="page">
    <div class="card">
      <v-text-field
        label="User"
        v-model="formData.user"
        tabindex="0"
      ></v-text-field>
      <v-text-field
        label="Password"
        type="password"
        v-model="formData.pwd"
        tabindex="0"
        @keydown.enter="handleLogin"
      ></v-text-field>
    </div>
  </div>

  <v-snackbar v-model="snackbar" :timeout="2000">登录成功 </v-snackbar>
</template>

<style scoped lang="less">
.page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card {
  width: 300px;
  background: rgba(250, 250, 250, 0.4);
  backdrop-filter: blur(5px);
  padding: 24px;
  border-radius: 6px;
}
</style>
