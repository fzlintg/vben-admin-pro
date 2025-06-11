<script lang="ts" setup>
import { Icon, Input } from 'ant-design-vue';

import { useComponentPanel } from '../hooks/useComponentPanel';
import ComponentGroup from './ComponentGroup.vue';

const { expandedGroups, searchKeyword, filteredGroups, toggleGroup } =
  useComponentPanel();
</script>

<template>
  <div class="component-panel">
    <div class="search-box">
      <Input v-model:value="searchKeyword" placeholder="搜索组件" allow-clear>
        <template #prefix>
          <Icon icon="ion:search-outline" />
        </template>
      </Input>
    </div>

    <div class="group-list">
      <ComponentGroup
        v-for="group in filteredGroups"
        :key="group.key"
        :group="group"
        :expanded="expandedGroups[group.key]"
        @toggle="toggleGroup(group.key)"
      />
    </div>
  </div>
</template>

<style scoped>
.component-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.search-box {
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.group-list {
  flex: 1;
  overflow-y: auto;
}
</style>
