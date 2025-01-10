import type { VNode } from "vue";

interface MenuItemType {
  disabled?: boolean;
  icon?: VNode;
  label: string;
  title?: string;
}
export interface MenuProps {
  items: MenuItemType[];
  mode: "horizontal" | "vertical" | "inline";
  openKeys: (number | string)[];
  selectedKeys: (number | string)[];
  theme: "light" | "dark";
  triggerSubMenuAction: "click" | "hover";
}
