<template>
    <button :class="classes" :disabled="disabled" :type="htmlType" @click="handleClick">
        <Icon name="icon-loading" spin v-if="loading"></Icon>
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
defineOptions({
    name: 'DButton'
})
import { computed } from 'vue';
import { useNamespace } from '../../hooks/use-namespace';
import type { ButtonEmits, ButtonProps } from './types';
import Icon from '../icon/Icon.vue';
const props = withDefaults(defineProps<Partial<ButtonProps>>(), {
    type: 'default',
    htmlType: 'button',
    size: 'middle'
})
const ns = useNamespace('button')


const classes = computed(() => [ns.b(), ns.b(props.type), ns.b(props.size), ns.is('circle', props.shape === 'circle'), ns.is('round', props.shape === 'round'),
ns.is('danger', props.danger), ns.is('ghost', props.ghost),
ns.is('disabled', props.disabled)])
const emits = defineEmits<ButtonEmits>()
const handleClick = (e: MouseEvent) => {
    if (props.disabled) return
    if (props.loading) return
    emits('click', e)
}
</script>

<style scoped></style>