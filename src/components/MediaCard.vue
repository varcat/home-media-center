<script setup>
const props = defineProps({
  coverImg: String,
  title: String,
  releaseDate: [String, Number],
});
</script>

<template>
  <div class="card">
    <div class="posterBox flex justify-center items-start">
      <div class="date">{{ releaseDate }}</div>
      <img :src="coverImg" :alt="title" class="poster" />
    </div>
    <div class="info">
      <div class="title">{{ title }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.card {
  height: 100%;
  cursor: pointer;
  contain: content;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.posterBox {
  position: relative;
}
.poster {
  display: block;
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: fill;
  border-radius: 6px;
}

.info {
  flex-grow: 1;
  line-height: 1.2;
  width: 100%;
  padding: 2px 4px;
}
.title {
  font-weight: bold;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.date {
  position: absolute;
  left: 2px;
  top: 2px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.6);
}
</style>
