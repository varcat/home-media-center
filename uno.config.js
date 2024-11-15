import { defineConfig } from "unocss";

export default defineConfig({
  presets: [],
  rules: [
    [/^m-(\d+)$/, ([_, num]) => ({ margin: `${num}px` })],
    [/^p-(\d+)$/, ([_, num]) => ({ padding: `${num}px` })],
    [
      /^px-(\d+)$/,
      ([_, num]) => ({
        "padding-left": `${num}px`,
        "padding-right": `${num}px`,
      }),
    ],
  ],
});
