import type { Slot, InjectionKey, Ref } from "vue";
import type { AffixProps } from "../affix/types";

export interface AnchorProps {
  affixProps?: AffixProps;
  bounds?: number;
  container?: string;
  cursor?: Slot | Function;
  size?: "small" | "large";
  targetOffset?: number;
  onChange?: (currentLink: string, prevLink: string) => void;
  onClick?: (link: { href: string; title: string; e: MouseEvent }) => void;
}

export interface AnchorEmits {
  (e: "change", value: { currentLink: string; prevLink: string }): void;
  (e: "click", value: { href: string; title: string; e: MouseEvent }): void;
}

export interface AnchorItemProps {
  title?: string;
  href: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
}

export interface AnchorContext {
  activeLink: Ref<string>;
  handleClick: (
    e: string,
    value: { top: string; height: string; title?: string; e?: MouseEvent }
  ) => void;
}

export const anchorContextKey: InjectionKey<AnchorContext> =
  Symbol("anchorContextKey");
