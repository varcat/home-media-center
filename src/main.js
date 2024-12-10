import { createApp } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import "./style.css";
import "uno.css";
import Routes from "./router";
import App from "./App.vue";

createApp(App).use(Routes).use(Antd).mount("#app");
