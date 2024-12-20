import { req } from "@/utils/http.js";

export function getVideoList(data = {}) {
  return req("/v1/video/list", { data });
}

export function deleteVideo(data = {}) {
  return req("/v1/video/delete", { data });
}

export function apiAddVideo(data) {
  return req("/v1/video/add", { data });
}

export function apiUpdateVideo(data) {
  return req("/v1/video/update", { data });
}

export function apiGetVideoEditData(id) {
  return req("/v1/video/editData", {
    params: {
      id,
    },
  });
}
