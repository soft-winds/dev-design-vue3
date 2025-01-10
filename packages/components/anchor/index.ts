import type { App } from "vue";
import Anchor from "./Anchor.vue";
import AnchorItem from "./AnchorItem.vue";
Anchor.install = (app: App) => {
  app.component(Anchor.name!, Anchor);
};
AnchorItem.install = (app: App) => {
  app.component(AnchorItem.name!, Anchor);
};
export default Anchor;
export { AnchorItem };
export * from "./types";
