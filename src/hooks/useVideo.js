import { getTimeInfo } from "../utils/time.js";
import { onBeforeUnmount, onMounted, ref, unref } from "vue";

export function useVideo(videoRef) {
  const duration = ref(0);

  function onLoadedMetadata() {
    // unref(videoElRef).currentTime = 10;
    const { h, m, s } = getTimeInfo();
    `${h}:${m}:${s}`;
    duration.value = unref(videoElRef).duration;
  }
  function onTimeUpdate() {}

  onMounted(() => {
    unref(videoRef).addEventListener("loadedmetadata", onLoadedMetadata);
  });
  onBeforeUnmount(() => {
    unref(videoRef).removeEventListener("loadedmetadata", onLoadedMetadata);
  });
}
