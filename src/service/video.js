import { req } from "@/utils/http.js";

export function getVideoList(data = {}) {
  return req("/v1/video/list", { data });
}

export function deleteVideo(data = {}) {
  return req("/v1/video/delete", { data });
}
