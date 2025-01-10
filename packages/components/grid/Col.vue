<template>
  <div :class="[ns.b(), ns.e(span + ''), ns.e('offset-' + offset + '')]">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useNamespace } from "../../hooks/use-namespace";
import type { ColProps } from "./types";
defineOptions({
  name: "DCol",
});
const props = withDefaults(defineProps<ColProps>(), {
  span: 24,
  offset: 0,
});
const ns = useNamespace("col");
const v_width = ref(
  props.span <= 24
    ? props.span % 1 == 0
      ? (100 / 24) * props.span + "%"
      : ""
    : ""
);
const v_offset = ref(
  props.offset <= 24
    ? props.offset % 1 == 0
      ? (100 / 24) * props.offset + "%"
      : ""
    : ""
);
</script>

<style scoped>
.t-col {
  width: v-bind(v_width);
  float: left;
  margin-left: v-bind(v_offset);
}
</style>
