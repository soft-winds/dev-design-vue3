<template>
    <i class="iconfont" :class="classes"
        :style="{ 'font-size': size, color: color, transform: `rotate(${rotate || 0}deg)` }">

    </i>
</template>

<script setup lang="ts">
import { useNamespace } from '../../hooks/use-namespace';
import { computed } from 'vue';
import type { IconProps } from './types';
const props = withDefaults(defineProps<IconProps>(), {

})
defineOptions({
    name: 'DIcon',
})
const ns = useNamespace('icon');
const classes = computed(() => [props.name, ns.b(), ns.is('spin', props.spin)])
</script>

<style scoped></style>