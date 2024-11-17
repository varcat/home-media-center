import { defineConfig } from "unocss";

export default defineConfig({
  presets: [],
  rules: [
    [/^m-(\d+)$/, ([_, num]) => ({ margin: `${num}px` })],
    [/^p-(\d+)$/, ([_, num]) => ({ padding: `${num}px` })],
    [
      /^([pm])([tblr])-(\d+)$/,
      ([_, type, direction, num]) => {
        const t = { p: "padding", m: "margin" }[type];
        const d = { t: "top", b: "bottom", l: "left", r: "right" }[direction];
        return {
          [`${t}-${d}`]: `${num}px`,
        };
      },
    ],
    [
      /^px-(\d+)$/,
      ([_, num]) => ({
        "padding-left": `${num}px`,
        "padding-right": `${num}px`,
      }),
    ],
  ],
});
