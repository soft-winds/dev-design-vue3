export interface BackTopPorps {
  traget?: string;
  visibilityHeight?: number;
  right?: number;
  bottom?: number;
  shape?: "circle" | "square";
}

export interface BackTopEmits {
  (e: "click"): void;
}
