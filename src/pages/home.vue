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
      <div v-for="(x, i) of menus" @click="toDetail(x)" class="subject" >
        <div class="posterBox flex justify-center items-start">
          <img :src="x.coverImg" :alt="x.title" class="poster" />
          <div class="subjectInfo">
            <div class="title">{{ x.title }}</div>
            <span class="text-3">({{ x.releaseDate }})</span>
          </div>
          
        </div>
      </div>
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
@media screen and (max-width: 320px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}


.posterBox {
  width: 100%;
  height: 100%;
  position: relative;
  font-size: 14px;
}
.poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.subjectInfo {
  height: 80px;
  padding: 2px 4px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.2),
    rgba(200, 200, 255, 0.2)
  );
  backdrop-filter: blur(4px);
}
.title {
  font-weight: bold;
}

.subject {
  height: 100%;
  font-size: 14px;
  cursor: pointer;
  contain: content;
  transition: all .3s;

  &:hover {
    transform: translateY(-3px);
  }
}
</style>
