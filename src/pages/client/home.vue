<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import MediaCard from "../../components/MediaCard.vue";
import { req } from "../../utils/http.js";

const router = useRouter();

const menus = ref([]);

function toDetail(x) {
  router.push({
    path: `/v/${x.id}`,
  });
}

onMounted(() => {
  req("/v1/video/list", { data: {} }).then((res) => {
    if (!res.ok) return;
    menus.value = res.data.rows;
  });
});
</script>

<template>
  <div class="menus">
    <div class="container">
      <MediaCard
        v-for="(x, i) of menus"
        @click="toDetail(x)"
        :cover-img="x.coverImg"
        :title="x.title"
        :releaseDate="x.releaseDate"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.menus {
  padding: 12px;
}

.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 200px));
  grid-gap: 8px;
}

@media screen and (max-width: 768px) {
  .container {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media screen and (max-width: 425px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 375px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
    font-size: 12px;
  }
}
</style>
