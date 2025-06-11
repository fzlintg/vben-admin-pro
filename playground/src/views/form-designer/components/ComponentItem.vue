<script lang="ts" setup>
import { Icon } from 'ant-design-vue';

const props = defineProps<{
  component: {
    icon?: string;
    name: string;
    schema: any;
  };
}>();

const handleDragStart = (e: DragEvent) => {
  if (e.dataTransfer) {
    e.dataTransfer.setData(
      'text/plain',
      JSON.stringify(props.component.schema),
    );
    e.dataTransfer.effectAllowed = 'copy';
  }
};
</script>

<template>
  <div class="component-item" draggable="true" @dragstart="handleDragStart">
    <div class="component-icon">
      <Icon :icon="component.icon || 'ion:cube-outline'" />
    </div>
    <div class="component-name">
      {{ component.name }}
    </div>
  </div>
</template>

<style scoped>
.component-item {
  display: flex;
  align-items: center;
  padding: 8px 12px 8px 24px;
  cursor: grab;
  transition: background-color 0.2s;
}

.component-item:hover {
  background-color: #f5f5f5;
}

.component-icon {
  margin-right: 8px;
  font-size: 16px;
  color: #666;
}

.component-name {
  font-size: 13px;
}
</style>
