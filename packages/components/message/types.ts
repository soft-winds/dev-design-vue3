import type { ComponentInternalInstance, VNode } from "vue";

export interface MessageProps {
  id: string;
  type?: "info" | "success" | "warning" | "error" | "loading";
  class?: string;
  content: string | VNode | (() => VNode);
  duration?: number;
  icon?: VNode;
  onClick?: () => void;
  onClose?: () => void;
}

export interface MessageContextProps {
  id: string;
  vnode: VNode;
  vm: ComponentInternalInstance;
  props: MessageProps;
  close: () => void;
}
