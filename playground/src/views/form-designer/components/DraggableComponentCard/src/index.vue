<script lang="ts" setup>
import { defineProps } from 'vue';

import { useDnd } from '#/views/form-designer/hooks/useDnd';

const props = defineProps({
  component: {
    type: Object,
    required: true,
  },
});

const { drag } = useDnd();
</script>

<template>
  <div
    class="draggable-component-card"
    draggable="true"
    @dragstart="drag($event, component)"
  >
    <div class="component-icon">
      <component :is="component.icon" />
    </div>
    <div class="component-name">{{ component.name }}</div>
  </div>
</template>

<style lang="less" scoped>
@import '#/styles/variables.less';

.draggable-component-card {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 4px;
  cursor: move;
  transition: all 0.3s;
  border: 1px solid #f0f0f0;

  &:hover {
    border-color: @primary-color;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .component-icon {
    margin-right: 8px;
    font-size: 16px;
  }

  .component-name {
    font-size: 14px;
  }
}
</style>
