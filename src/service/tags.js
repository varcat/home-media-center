import { req } from "@/utils/http.js";

export function getTags() {
  return req("/v1/tag/list");
}

export function addOrEditTag(data) {
  return req("/v1/tag/addOrEdit", {
    data,
  });
}

export function deleteTag(id) {
  return req("/v1/tag/delete", {
    data: {
      id,
    },
  });
}
