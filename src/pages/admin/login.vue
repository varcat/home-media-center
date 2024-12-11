<script setup>
import { ref, unref } from "vue";
import { req } from "../../utils/http.js";
import { toPromiseTuple } from "wsp-toolkit";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

const router = useRouter();

const formData = ref({
  user: "",
  pwd: "",
});
const loading = ref(false);

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
  message.open({
    type: "success",
    content: "Login Success",
  });
  router.push("/admin/home");
}
</script>

<template>
  <div class="page">
    <div class="card">
      <a-input
        placeholder="User"
        v-model:value="formData.user"
        class="mb-12"
      ></a-input>
      <a-input
        placeholder="Password"
        type="password"
        v-model:value="formData.pwd"
        @keydown.enter="handleLogin"
      ></a-input>
    </div>
  </div>
</template>

<style scoped lang="less">
.page {
  height: 100dvh;
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
