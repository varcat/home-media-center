import { getTimeInfo } from "../utils/time.js";
import { onBeforeUnmount, onMounted, ref, unref } from "vue";

export function useEvent(domRef, name, handler) {
  onMounted(() => {
    unref(domRef).addEventListener(name, handler);
  });
  onBeforeUnmount(() => {
    unref(domRef).removeEventListener(name, handler);
  });
}
