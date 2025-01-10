import { createApp } from "vue";
// import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import devui from "../packages";
const app = createApp(App);
// app.use(createPinia());
app.use(devui);
app.use(router);
app.mount("#app");
