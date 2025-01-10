import { type App } from "vue";
import Button from "./components/button/Button.vue";
import Space from "./components/space/Space.vue";
import Icon from "./components/icon/Icon.vue";

import "./styles/base.css";
const components = [Button, Space, Icon];
const install = (app: App) => {
  components.forEach((item) => {
    app.component(item.name!, item);
  });
};
export default {
  install,
};
export { Button, Space, Icon };
