import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import "./assets/tailwind.css";
import { createHead } from "@vueuse/head"
import Embed from "v-video-embed"
createApp(App).use(store).use(router).use(i18n).use(createHead()).use(Embed).mount("#app");
