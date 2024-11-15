<template>
  <div class="videoBox" ref="videoBox">
    <div class="operationBox" @click="handleClickBg">
      <div class="footer px-16" @click.stop>
        <Icon name="icon-zanting" v-if="play" @click="togglePlay" />
        <Icon name="icon-bofang" v-else @click="togglePlay" />
        <div class="progressBarInfo flex items-center font-size-3">
          <div class="progressBarBox">
            <div class="progressBar" />
          </div>
          <div>{{ videoCurrentTime }}/{{ videoDuration }}</div>
        </div>
        <div class="rateButton" @click.capture.stop="showRateMenu = true">
          x{{ curRate }}
        </div>
      </div>

      <div class="rateMenu" :class="{ show: showRateMenu }" @click.stop>
        <div
          class="rateItem flex justify-center border-rd"
          v-for="(x, i) of rateList"
          :key="i"
          @click="changeRate(x)"
        >
          {{ x }}
        </div>
      </div>
    </div>
    <video
      ref="videoElRef"
      class="video"
      preload="metadata"
      @play="handlePlay"
      @loadedmetadata="onLoadedMetadata"
    >
      <source src="./oceans.mp4" />
    </video>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, unref } from "vue";
import { useVideo } from "../hooks/useVideo.js";
import Icon from "./Icon.vue";
import dayjs from "dayjs";
import { getTimeInfo } from "../utils/time.js";

const videoBox = ref();
const videoElRef = ref();

const rateList = [1, 1.25, 1.5, 2, 3];
const showRateMenu = ref(false);
const curRate = ref(1);
const play = ref(false);
const videoDuration = ref("0");
const videoCurrentTime = ref("0");

function handlePlay() {
  // unref(videoBox).requestFullscreen();
}

function onLoadedMetadata() {
  // unref(videoElRef).currentTime = 10;
  const { h, m, s } = getTimeInfo(unref(videoElRef).duration);
  videoDuration.value = `${h}:${m}:${s}`;
}

function handleClickBg() {
  if (unref(showRateMenu)) {
    showRateMenu.value = false;
    return;
  }
  togglePlay();
}

function changeRate(rate) {
  curRate.value = rate;
  showRateMenu.value = false;
  unref(videoElRef).playbackRate = rate;
}

function togglePlay() {
  play.value = !unref(play);
  if (unref(play)) {
    unref(videoElRef).play();
  } else {
    unref(videoElRef).pause();
  }
}
</script>

<style scoped>
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
.operationBox {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
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
  width: 20px;
  height: 16px;
}
.rateMenu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  width: 60px;
  right: 0;
  height: 100%;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  transform: translateX(100%);
  transition: all 0.2s;

  &.show {
    transform: translateX(0);
  }
}
.rateItem {
  width: 80%;
  transition: all 0.2s;

  &:active {
    background: rgba(255, 255, 255, 0.5);
  }
}
.progressBarInfo {
}
.progressBarBox {
  height: 3px;
  width: 100px;
  background: aliceblue;
  border-radius: 3px;
  contain: content;
}
</style>
