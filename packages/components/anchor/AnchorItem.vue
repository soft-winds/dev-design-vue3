<template>
  <div :class="[ns.e('item')]">
    <a
      :href="href"
      :title="title"
      :class="[ns.e('item-link'), ns.is('active', anchorActive)]"
      :target="target"
      @click="onclick"
      ref="anchorRef"
    >
      <slot name="title">{{ title }}</slot>
    </a>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { anchorContextKey, type AnchorItemProps } from ".";
import { useNamespace } from "../../hooks/use-namespace";
const ns = useNamespace("anchor");
defineOptions({
  name: "DAnchorItem",
});
const props = withDefaults(defineProps<AnchorItemProps>(), {
  target: "_self",
});
const anchorRef = ref<HTMLElement | null>(null);
const contextKey = inject(anchorContextKey);
const anchorActive = computed(
  () => contextKey?.activeLink.value === props.href
);
const onclick = (e: MouseEvent) => {
  e.preventDefault();
  contextKey?.handleClick(props.href, {
    top: anchorRef.value?.offsetTop + "",
    height: anchorRef.value?.clientHeight + "",
    title: props.title,
    e,
  });
};
</script>
