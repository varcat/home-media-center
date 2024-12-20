import { isExist } from "wsp-toolkit";
import { message } from "ant-design-vue";

export async function req(url, { data, params, method = "GET" } = {}) {
  if (params) {
    const s = new URLSearchParams();
    url +=
      "?" +
      Object.entries(params)
        .reduce((searchParams, [name, value]) => {
          searchParams.append(name, value);
          return searchParams;
        }, s)
        .toString();
  }
  const headers = new Headers();
  if (isExist(data)) {
    headers.set("Content-Type", "application/json;charset=utf-8");
    method = "POST";
  } else {
    headers.set("Content-Type", "application/x-www-form-urlencoded");
  }

  const resp = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });
  if (resp.headers.get("Content-Type").startsWith("application/json")) {
    const res = await resp.json();
    if (!res.ok) {
      message.error(res.msg);
    }
    return res;
  }
  const err = new Error("无法解析的请求");
  err.cause = resp;
  throw err;
}
