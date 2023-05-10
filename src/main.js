import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar, Notify } from "quasar";
import "quasar/src/css/index.sass";
import "@quasar/extras/material-icons/material-icons.css";

const pinia = createPinia();

const myApp = createApp(App)
  .use(Quasar, {
    plugins: { Notify },
  })
  .use(pinia);

myApp.mount("#app");
