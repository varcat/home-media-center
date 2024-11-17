<script setup>
import poster小巷人家 from "./p2907416715.webp";
import poster玫瑰的故事 from "./img.png";
import { useRouter } from "vue-router";

const router = useRouter();

const menus = [
  {
    title: "小巷人家",
    poster: poster小巷人家,
    releaseDate: "2024",
    id: "01",
  },
  {
    title: "玫瑰的故事",
    poster: poster玫瑰的故事,
    releaseDate: "2024",
    id: "02",
  },
];

function toDetail(x) {
  router.push({
    path: `/v/${x.id}`,
  });
}
</script>

<template>
  <div class="menus">
    <div class="container">
      <div v-for="(x, i) of menus" @click="toDetail(x)">
        <div class="posterBox">
          <img :src="x.poster" :alt="x.title" class="poster" />
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
