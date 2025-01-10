<template>
  <div :class="[ns.b()]" :style="{ gap: gap + 'px' }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from "../../hooks/use-namespace";
import type { RowProps } from "./types";
withDefaults(defineProps<RowProps>(), {
  gap: 0,
});
const ns = useNamespace("row");
defineOptions({
  name: "TRow",
});
</script>

<style scoped></style>
