import type { App } from "vue";
import BackTop from "./BackTop.vue";
BackTop.install = (app: App) => {
  app.component(BackTop.name!, BackTop);
};

export default BackTop;
export * from "./types";
