<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { Input } from 'ant-design-vue';

import DraggableComponentCard from '#/views/form-designer/components/DraggableComponentCard/src/index.vue';
import { useComponentPanel } from '#/views/form-designer/hooks/useComponentPanel';

const { filteredGroups, searchKeyword, expandedGroups, toggleGroup } =
  useComponentPanel();
</script>

<template>
  <div class="component-panel">
    <div class="search-box">
      <Input
        v-model:value="searchKeyword"
        placeholder="搜索组件..."
        allow-clear
      />
    </div>
    <div class="component-groups">
      <div
        v-for="group in filteredGroups"
        :key="group.key"
        class="component-group"
      >
        <div class="group-header" @click="toggleGroup(group.key)">
          <div class="group-title">{{ group.title }}</div>
          <Icon
            :icon="
              expandedGroups[group.key]
                ? 'ant-design:minus-outlined'
                : 'ant-design:plus-outlined'
            "
          />
        </div>
        <div v-show="expandedGroups[group.key]" class="group-components">
          <DraggableComponentCard
            v-for="component in group.components"
            :key="component.type"
            :component="component"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.component-panel {
  padding: 8px;
  height: 100%;
  display: flex;
  flex-direction: column;

  .search-box {
    padding: 8px;
    margin-bottom: 8px;
  }

  .component-groups {
    flex: 1;
    overflow-y: auto;
  }

  .component-group {
    margin-bottom: 8px;

    .group-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      background-color: #f5f5f5;
      cursor: pointer;

      .group-title {
        font-weight: 500;
      }
    }

    .group-components {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      gap: 8px;
      padding: 8px;
    }
  }
}
</style>
