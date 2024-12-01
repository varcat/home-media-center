import { defineConfig } from "unocss";

export default defineConfig({
  presets: [],
  rules: [
    [
      /^([pm])([xytblr])?-(\d+)$/,
      ([, t, d, n]) => {
        const type = { p: "padding", m: "margin" }[t];
        if (d) {
          const direction = {
            x: "left,right",
            y: "top,bottom",
            t: "top",
            b: "bottom",
            l: "left",
            r: "right",
          }[d];
          return direction.split(",").map((i) => {
            return {
              [`${type}-${i}`]: `${n}px`,
            };
          });
        }
        return {
          [`${type}`]: `${n}px`,
        };
      },
    ],
  ],
});
