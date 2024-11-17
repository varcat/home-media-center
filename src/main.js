import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "uno.css";
import Routes from "./router";

createApp(App).use(Routes).mount("#app");
