import type { App } from "vue";
import Space from "./Space.vue";
Space.install = (app: App) => {
  app.component(Space.name!, Space);
};
export default Space;

export * from "./types";
