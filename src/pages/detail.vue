<script setup>
import { useRoute } from "vue-router";
import { onBeforeUnmount, onMounted, ref, unref } from "vue";

const route = useRoute();
const vid = route.params.vid;
const src = ref("");
const curIdx = ref(0);
const uid = ref(0);
const duration = ref(0);
const curRate = ref(1);
const videoElRef = ref();
const rateList = [0.5, 1, 1.25, 1.5, 2, 3];
const recordInfo = ref(
  JSON.parse(localStorage.getItem(`recordInfo_${vid}`) ?? "{}"),
);

function fmtNum(idx) {
  return (idx + 1).toString().padStart(2, "0");
}

const list = ref([]);

Array.from({ length: 33 }, (_, idx) => {
  return {
    id: idx,
    title: `第${idx + 1}集`,
    video: `/video/${vid}/${fmtNum(idx)}.mp4`,
  };
});

function clickJi(x) {
  uid.value += 1;
  curIdx.value = x.id;
  src.value = x.video;
}

function onPlay() {
  recordInfo.value.index = unref(curIdx);
}

function onTimeupdate(event) {
  const currentTime = event.target.currentTime;
  recordInfo.value.recordTime = currentTime;
}

function changeRate(rate) {
  curRate.value = rate;
  unref(videoElRef).playbackRate = rate;
}

function onLoadedMetadata(evt) {
  duration.value = evt.target.duration;
  evt.target.currentTime = unref(recordInfo).recordTime || 0;
  evt.target.playbackRate = 1.5;
}

onMounted(() => {
  fetch(`/vInfo/${vid}.json`).then(async (resp) => {
    list.value = await resp.json();
    const record = unref(recordInfo).index;
    clickJi(unref(list)[record ? Number(record) : 0]);
  });
});

onBeforeUnmount(() => {
  localStorage.setItem(`recordInfo_${vid}`, JSON.stringify(unref(recordInfo)));
});
</script>

<template>
  <div class="pb-24">
    <div class="flex justify-center items-center mb-12">
      <div class="videoBox" ref="videoBox">
        <video
          :key="uid"
          ref="videoElRef"
          class="video"
          preload="metadata"
          controls
          @play="onPlay"
          @timeupdate="onTimeupdate"
          @loadedmetadata="onLoadedMetadata"
        >
          <source :src="src" />
        </video>
      </div>
    </div>
    <div class="flex items-center px-12">
      <div class="pr-8">播放速度</div>
      <div class="rateButton" v-for="(x, i) of rateList" @click="changeRate(x)">
        {{ x }}
      </div>
    </div>
    <div class="listContainer">
      <div
        v-for="(x, i) of list"
        class="btn"
        :class="[{ active: curIdx === i }]"
        @click="clickJi(x)"
      >
        {{ x.title }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.listContainer {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-auto-flow: row;
  gap: 12px 16px;
  justify-content: center;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 0;
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 3px;
  &.active {
    color: orange;
  }
}

.videoBox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vmin;
  height: 56vmin;
  position: relative;
  overflow: hidden;
  contain: content;
}

.video {
  display: inline-block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
  height: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
  backdrop-filter: blur(1px);
}
.rateButton {
  text-align: center;
  font-size: 12px;
  line-height: 1;
  padding: 4px 0;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 3px;
  width: 36px;
}
.rateButton:active {
  background: rgba(255, 255, 255, 0.5);
}
</style>
