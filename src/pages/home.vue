<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const router = useRouter();

const menus = ref([]);

function toDetail(x) {
  router.push({
    path: `/v/${x.vid}`,
  });
}

onMounted(() => {
  fetch("/v1/videos").then(async (resp) => {
    const json = await resp.json();
    menus.value = json;
  });
});
</script>

<template>
  <div class="menus">
    <div class="container">
      <div v-for="(x, i) of menus" @click="toDetail(x)">
        <div class="posterBox">
          <img :src="x.coverImg" :alt="x.title" class="poster" />
          <div class="title">{{ x.title }}({{ x.releaseDate }})</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menus {
  padding: 12px;
}
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 25%));
  grid-gap: 8px;
}
.posterBox {
  width: 100%;
  position: relative;
  font-size: 14px;
}
.poster {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.title {
  padding: 2px 4px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.4),
    rgba(255, 255, 255, 0.4)
  );
  backdrop-filter: blur(4px);
}
</style>
