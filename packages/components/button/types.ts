export interface ButtonProps {
  block: boolean;
  danger: boolean;
  disabled: boolean;
  ghost: boolean;
  href: string; // 暂不实现
  htmlType: HTMLButtonElement["type"];
  loading: boolean;
  shape: "circle" | "round";
  size: "large" | "middle" | "small";
  target: "_blank" | "_self" | "_parent" | "_top"; // 暂不实现
  type: "default" | "primary" | "dashed" | "text" | "link";
}

export interface ButtonEmits {
  (event: "click", args: MouseEvent): void;
}
