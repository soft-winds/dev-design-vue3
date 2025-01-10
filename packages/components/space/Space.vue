<template>
  <div :class="classes" :style="style">
    <div class="devui-space__item" v-for="vnode in slot.default()">
      <RenderVnode :v-node="vnode"></RenderVnode>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed,  useSlots } from "vue";
import { useNamespace } from "../../hooks/use-namespace";
const ns = useNamespace("space");
import { type SpaceProps } from "./types";
import RenderVnode from "../../common/RenderVnode";
defineOptions({
  name: "DSpace",
});
const props = withDefaults(defineProps<SpaceProps>(), {
  direction: "horizontal",
});
const slot: any = useSlots();
const classes = computed(() => {
  return [
    ns.b(),
    ns.is("inline", props.inline),
    ns.is(props.direction),
    ns.is("wrap", props.wrap),
  ];
});
const style = computed(() => {
  return {
    gap: `${props.size || "10"}px`,
    "justify-content": props.direction === "horizontal" ? props.align : "",
    "align-items": props.direction === "vertical" ? props.align : "",
  };
});
</script>

<style scoped></style>
