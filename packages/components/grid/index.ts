import Row from "./Row.vue";
import Col from "./Col.vue";
import type { App } from "vue";
Row.install = (app: App) => {
  app.component(Row.name!, Row);
};
Col.install = (app: App) => {
  app.component(Col.name!, Col);
};
export { Row, Col };
export * from "./types";
