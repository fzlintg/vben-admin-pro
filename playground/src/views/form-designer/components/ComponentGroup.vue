<script lang="ts" setup>
import { Icon } from 'ant-design-vue';

import ComponentItem from './ComponentItem.vue';

defineProps<{
  expanded: boolean;
  group: {
    components: any[];
    title: string;
  };
}>();

defineEmits(['toggle']);
</script>

<template>
  <div class="component-group">
    <div class="group-header" @click="$emit('toggle')">
      <div class="group-title">
        <Icon :icon="expanded ? 'ion:chevron-down' : 'ion:chevron-forward'" />
        <span>{{ group.title }}</span>
      </div>
    </div>

    <div v-show="expanded" class="component-list">
      <ComponentItem
        v-for="component in group.components"
        :key="component.name"
        :component="component"
      />
    </div>
  </div>
</template>

<style scoped>
.component-group {
  border-bottom: 1px solid #f0f0f0;
}

.group-header {
  padding: 8px 12px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s;
}

.group-header:hover {
  background-color: #f5f5f5;
}

.group-title {
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: 500;
}

.component-list {
  padding: 4px 0;
}
</style>
