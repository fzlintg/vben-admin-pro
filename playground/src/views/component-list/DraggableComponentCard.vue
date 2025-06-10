<script lang="ts" setup>
import { Icon } from '@vben/icons';

import { message } from 'ant-design-vue';

const props = defineProps({
  component: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['drag-start']);

function handleDragStart(e) {
  // 设置拖拽数据
  e.dataTransfer.setData('component', JSON.stringify(props.component));
  emit('drag-start', props.component);
}

function handleDragEnd() {
  message.success(`已添加 ${props.component.name} 组件`);
}
</script>

<template>
  <div
    class="component-card"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <div class="card-content">
      <Icon :icon="component.icon" class="text-lg" />
      <div class="mt-2 text-sm">{{ component.name }}</div>
    </div>
  </div>
</template>

<style scoped>
.component-card {
  @apply cursor-move rounded border p-4 transition-all hover:shadow-md;

  user-select: none;
  background: #fafafa;

  &:active {
    @apply shadow-lg;
  }
}

.card-content {
  @apply flex flex-col items-center justify-center;
}
</style>
