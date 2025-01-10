import { type App } from "vue";
import "./styles/base.css";
import Button from "./components/button";
import Space from "./components/space";
import Icon from "./components/icon";
import BackTop from "./components/backtop";
import { Col, Row } from "./components/grid";

const components = [Button, Space, Icon, BackTop, Col, Row];
const install = (app: App) => {
  components.forEach((item) => {
    app.component(item.name!, item);
  });
};
export default {
  install,
};
export { Button, Space, Icon, BackTop, Col, Row };
