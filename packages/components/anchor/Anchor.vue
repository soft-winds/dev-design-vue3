<!-- 锚点 -->
<template>
  <t-affix v-if="affixProps" v-bind="affixPropsData">
    <div ref="anchorRef" :class="[ns.b(), ns.e(size)]">
      <div :class="[ns.e('line')]">
        <div :class="ns.e('line-cursor-wrapper')" :style="{
          opacity: activeLink ? 1 : 0,
          height: style.height + 'px',
          top: style.top + 'px',
        }">
          <slot name="cursor">
            <div :class="ns.e('line-cursor')"></div>
          </slot>
        </div>
      </div>
      <slot />
    </div>
  </t-affix>
  <div ref="anchorRef" :class="[ns.b(), ns.e(size)]" v-else>
    <div :class="[ns.e('line')]">
      <div :class="ns.e('line-cursor-wrapper')" :style="{
        opacity: activeLink ? 1 : 0,
        height: style.height + 'px',
        top: style.top + 'px',
      }">
        <slot name="cursor">
          <div :class="ns.e('line-cursor')"></div>
        </slot>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  provide,
  onMounted,
  watchEffect,
  nextTick,
  onUnmounted,
} from "vue";
import { useNamespace } from "../../hooks/use-namespace";
import { type AnchorProps, anchorContextKey, type AnchorEmits } from "./types";
import { getOffsetTop, getScroll, off, on, scrollTo } from "../../utils/dom";
const ns = useNamespace("anchor");
defineOptions({
  name: "DAnchor",
});
const anchorRef = ref<HTMLElement | null>(null);
const activeLink = ref("");
const props = withDefaults(defineProps<AnchorProps>(), {
  bounds: 5,
  targetOffset: 0,
});
const affixPropsData = ref(props.affixProps || {});
const emits = defineEmits<AnchorEmits>();
const style = ref({
  top: 0,
  height: 0,
});
const lock = ref(false);
// 点击锚点
const handleClick = (link: string, sty: any) => {
  if (link === activeLink.value) return;
  const preLink = JSON.stringify(activeLink.value);
  activeLink.value = link;
  style.value = sty;
  scrollToAnchor(link);
  emits("change", { currentLink: link, prevLink: preLink });
  emits("click", { href: sty.href, title: sty.title, e: sty.e });
};
// 获取锚点元素
const getAnchorTarget = (link: string): HTMLElement | void => {
  const matcher = link.match(/#(\S+)$/);
  if (!matcher) {
    return;
  }
  const anchor = document.getElementById(matcher[1]);
  if (!anchor) {
    return;
  }
  return anchor;
};
const targetElement = ref<HTMLElement | Window | Document | null>();
//
const scrollToAnchor = async (link: string) => {
  const anchor = getAnchorTarget(link);
  if (!anchor) {
    return;
  }
  if (!targetElement.value) {
    return;
  }
  lock.value = true;
  const { targetOffset } = props;
  const scrollTop = getScroll(targetElement.value);
  const offsetTop = getOffsetTop(anchor, targetElement.value);
  const top = scrollTop + offsetTop - targetOffset;
  await scrollTo(top, { container: targetElement.value });
  nextTick(() => {
    lock.value = false;
  });
};
const initScroll = () => {
  if (props.container) {
    targetElement.value = document.querySelector(
      props.container
    ) as HTMLElement;
    on(targetElement.value, "scroll", handleScroll);
    handleScroll();
  }
};
// 监听滚动事件
const handleScroll = () => {
  if (lock.value) return;
  if (!anchorRef.value) return;
  if (!targetElement.value) return;
  let active = "";
  const filters: {
    top: number;
    link: string;
    linkTop: number;
    height: number;
  }[] = [];
  const { bounds, targetOffset } = props;
  // 获取所有锚点
  const anchorLists = anchorRef.value.querySelectorAll("a");
  anchorLists.forEach((el) => {
    const link = el.getAttribute("href") || "";
    const anchor = getAnchorTarget(link) as HTMLElement;
    // 获取锚点距离顶部的距离
    const top = getOffsetTop(anchor, targetElement.value);
    // 如果锚点距离顶部的距离小于容器距离顶部的距离加上偏移量，就把锚点加入到filters中
    if (top < bounds + targetOffset) {
      filters.push({
        link,
        top,
        linkTop: el.offsetTop,
        height: el.clientHeight,
      });
    }
  });
  if (filters.length) {
    // 获取距离顶部最近的锚点
    const latest = filters.reduce((prev, cur) =>
      prev.top > cur.top ? prev : cur
    );
    active = latest.link;
    if (style.value.top !== latest.linkTop) {
      style.value.top = latest.linkTop;
    }
    if (style.value.height === 0) {
      style.value.height = latest.height;
    }
  }
  if (activeLink.value === active) return;
  activeLink.value = active;
};
onMounted(async () => {
  // 初始化滚动
  initScroll();
  if (activeLink.value) {
    await nextTick();
    scrollToAnchor(activeLink.value);
  }
});
watchEffect(() => {
  if (targetElement.value) {
    off(targetElement.value, "scroll", handleScroll);
  }
  initScroll();
});
onUnmounted(() => {
  if (targetElement.value) {
    off(targetElement.value, "scroll", handleScroll);
  }
});
provide(anchorContextKey, {
  activeLink,
  handleClick,
});
</script>
