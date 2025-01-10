<!-- 返回顶部 -->
<template>
  <div v-show="visable" :class="[ns.b(), ns.e(shape)]" :style="{
    bottom: bottom + 'px',
    right: right + 'px',
    position: 'absolute',
  }" @click="goBack">
    <slot>
      <Icon name="icon-less"></Icon>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useNamespace } from "../../hooks/use-namespace";
import { type BackTopPorps } from "./types";
import { scrollTo } from "../../utils/dom";
import Icon from "../icon/Icon.vue";
defineOptions({
  name: "DBackTop",
});
const ns = useNamespace("backtop");
const props = withDefaults(defineProps<BackTopPorps>(), {
  bottom: 40,
  right: 40,
  visibilityHeight: 400,
  traget: "body",
  shape: "circle",
});
const visable = ref(false);
onMounted(() => {
  if (props.traget === "body") {
    document.body.addEventListener("scroll", (event) => {
      //   visibilityHeight 大于或者等于 scrollTop 时显示
      visable.value = document.body.scrollTop >= props.visibilityHeight;
    });
  } else {
    const traget = document.querySelector(props.traget);
    traget?.addEventListener("scroll", (event) => {
      console.log(traget.scrollTop, event, "event");

      //   visibilityHeight 大于或者等于 scrollTop 时显示
      visable.value = traget.scrollTop >= props.visibilityHeight;
    });
  }
});
const goBack = async () => {
  if (props.traget === "body") {
    await scrollTo(0, { container: document.body });
  } else {
    const traget = document.querySelector(props.traget);
    await scrollTo(0, { container: traget as HTMLElement });
  }
};
</script>

<style scoped></style>
