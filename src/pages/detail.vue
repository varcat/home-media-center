<script setup>
import { useRoute } from "vue-router";
import { onBeforeUnmount, onMounted, ref, unref } from "vue";

const route = useRoute();
const vid = route.params.vid;
const src = ref("");
const curId = ref();
const uid = ref(0);
const duration = ref(0);
const curRate = ref(1);
const videoElRef = ref();
const recordInfo = ref(
  JSON.parse(localStorage.getItem(`recordInfo_${vid}`)) || {},
);

const rateList = [0.1, 1, 1.5, 2, 3];

const list = ref([]);

function clickEpisode(x) {
  uid.value += 1;
  curId.value = x.id;
  src.value = x.link;
}

function onPlay() {
  recordInfo.value.id = unref(curId);
}

function onPause() {
  saveData();
}

function onEnded() {
  const idx = unref(list).findIndex(x => x.id === unref(curId));
  if (idx > -1 && idx < unref(list).length - 2) {
    clickEpisode(unref(list)[idx + 1]);
  }
}

function onCanplay() {
  unref(videoElRef).play();
}


function onTimeupdate(event) {
  const currentTime = event.target.currentTime;
  recordInfo.value.time = currentTime;
}

function changeRate(rate) {
  curRate.value = rate;
  unref(videoElRef).playbackRate = rate;
}

function onLoadedMetadata(evt) {
  duration.value = evt.target.duration;
  if (unref(recordInfo).id === unref(curId)) {
    evt.target.currentTime = unref(recordInfo).time || 0;
  }
}

function saveData() {
  localStorage.setItem(`recordInfo_${vid}`, JSON.stringify(unref(recordInfo)));
}

onMounted(() => {
  window.addEventListener('beforeunload', saveData);
  fetch(`/v1/video/${vid}`).then(async (resp) => {
    list.value = (await resp.json()).sort((a, b) => Number(a.id) - Number(b.id));
    const res = unref(list).find((x) => x.id === unref(recordInfo).id);
    clickEpisode(res || unref(list)[0]);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', saveData);
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
          @pause="onPause"
          @ended="onEnded"
          @canplay="onCanplay"
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
        v-for="x of list"
        class="btn"
        :class="[{ active: curId === x.id }]"
        @click="clickEpisode(x)"
      >
        {{ x.name }}
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
