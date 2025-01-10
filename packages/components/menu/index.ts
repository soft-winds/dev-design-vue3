import Menu from "./Menu.vue";
import type { App } from "vue";
Menu.install = (app: App) => {
  app.component(Menu.name!, Menu);
};

export default Menu;

export * from "./types";
