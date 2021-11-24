import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import "./assets/tailwind.css";
import {createHead } from "@vueuse/head"
createApp(App).use(store).use(router).use(i18n).use(createHead()).mount("#app");
