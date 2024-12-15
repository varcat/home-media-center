import { req } from "@/utils/http.js";

export function getTags() {
  return req("/v1/tags/get");
}

export function addOrEditTag(data) {
  return req("/v1/tags/addOrEdit", {
    data,
  });
}
