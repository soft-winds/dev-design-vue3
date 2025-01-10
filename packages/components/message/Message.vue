<template>
    <Transition name="message-fade" @before-enter="handleBeforeEnter" @after-leave="handleAfterLeave">
        <div ref="message_ref" v-if="show" :class="classes" @mouseenter="handleClearTime" @mouseleave="handleReadyTime"
            @click="handleClick">
            <RenderVnode v-if="icon" :v-node="icon"></RenderVnode>
            <span>{{ content }}</span>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, unref } from 'vue';
import { useNamespace } from '../../hooks/use-namespace';
import type { MessageProps } from './types';
import RenderVnode from '../../common/RenderVnode';
defineOptions({
    name: 'DMessage'
})
const ns = useNamespace('message')
const props = withDefaults(defineProps<MessageProps>(), {
    duration: 3,
    type: 'info'
})
const classes = computed(() => [ns.b(),
props.class
])
const show = ref(false)
onMounted(() => {
    show.value = true
    handleReadyTime()
})
let timer: any = null
const handleReadyTime = () => {
    if (props.duration === 0) return
    timer = setTimeout(() => show.value = false, props.duration * 1000)
}
const handleClearTime = () => {
    clearTimeout(timer)
}
const msgHeight = ref(0)
const message_ref = ref<Element | null>(null)
// 创建之前
const handleBeforeEnter = () => {
    msgHeight.value = unref(message_ref)?.getBoundingClientRect().height || 0
}
// 销毁之后
const handleAfterLeave = () => {
    props.onClose && props.onClose()
}
const handleClick = () => {
    props.onClick && props.onClick()
}
const handleClose = () => {
    show.value = false
    props.onClose && props.onClose()
}
defineExpose({
    show,
    handleClose
})
</script>

<style scoped></style>