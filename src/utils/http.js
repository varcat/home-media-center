import { isExist } from "wsp-toolkit";

export async function req(url, { data, params, method = "GET" } = {}) {
  if (params) {
    const s = new URLSearchParams();
    url =
      "?" +
      Object.entries(params)
        .reduce((searchParams, [name, value]) => {
          searchParams.append(name, value);
          return searchParams;
        }, s)
        .toString();
  }
  if (isExist(data)) {
    method = "POST";
  }
  const resp = await fetch(url, {
    method,
    body: data ? JSON.stringify(data) : undefined,
  });
  if (
    resp.status === 200 &&
    resp.headers.get("Content-Type").startsWith("application/json")
  ) {
    return await resp.json();
  }
  const err = new Error("无法解析的请求");
  err.cause = resp;
  throw err;
}
