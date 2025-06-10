<script lang="ts" setup>
import { computed, ref } from 'vue';

import { PageWrapper } from '@vben/common-ui';

import { InputSearch, Tabs } from 'ant-design-vue';

import DraggableComponentCard from './DraggableComponentCard.vue';

// 组件分类数据
const componentCategories = ref([
  {
    key: 'basic',
    name: '基础组件',
    components: [
      {
        _uid: 'input_123',
        type: 'Input',
        name: '输入框',
        icon: 'ant-design:edit-outlined',
        schema: {
          component: 'Input',
          fieldName: '',
          label: '输入框',
        },
      },
      {
        _uid: 'select_124',
        type: 'Select',
        name: '选择器',
        icon: 'ant-design:select-outlined',
        schema: {
          component: 'Select',
          fieldName: '',
          label: '选择器',
          options: [
            { label: '选项1', value: '1' },
            { label: '选项2', value: '2' },
          ],
        },
      },
      {
        _uid: 'date_125',
        type: 'DatePicker',
        name: '日期选择',
        icon: 'ant-design:calendar-outlined',
        schema: {
          component: 'DatePicker',
          fieldName: '',
          label: '日期选择',
          showTime: true,
        },
      },
      {
        _uid: 'switch_126',
        type: 'Switch',
        name: '开关',
        icon: 'ant-design:swap-outlined',
        schema: {
          component: 'Switch',
          fieldName: '',
          label: '开关',
        },
      },
    ],
  },
  {
    key: 'container',
    name: '容器组件',
    components: [
      {
        _uid: 'form-group_456',
        type: 'FormGroup',
        name: '表单组',
        icon: 'ant-design:appstore-outlined',
        schema: {
          component: 'FormGroup',
          fieldName: '',
          schema: [],
        },
      },
    ],
  },
]);

const searchText = ref('');
const activeCategory = ref('basic');

// 过滤后的分类数据
const filteredCategories = computed(() => {
  if (!searchText.value) {
    return componentCategories.value;
  }
  return componentCategories.value
    .map((category) => ({
      ...category,
      components: category.components.filter(
        (comp) =>
          comp.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
          comp.type.toLowerCase().includes(searchText.value.toLowerCase()),
      ),
    }))
    .filter((category) => category.components.length > 0);
});

// 拖拽开始处理
function handleDragStart(component) {
  // 生成新的唯一ID
  component.schema._uid = `${component.type}_${Date.now()}`;
  // 触发设计器添加组件
  emit('add-component', component.schema);
}
</script>

<template>
  <PageWrapper title="组件列表" content="从列表中选择组件拖拽到设计区域">
    <div class="component-library">
      <!-- 搜索栏 -->
      <div class="search-bar mb-4">
        <InputSearch
          v-model:value="searchText"
          placeholder="搜索组件..."
          class="w-1/3"
        />
      </div>

      <!-- 分类标签 -->
      <Tabs v-model:active-key="activeCategory">
        <TabPane
          v-for="category in filteredCategories"
          :key="category.key"
          :tab="category.name"
        >
          <!-- 组件网格 -->
          <div class="grid grid-cols-4 gap-4">
            <DraggableComponentCard
              v-for="comp in category.components"
              :key="comp._uid"
              :component="comp"
              @drag-start="handleDragStart"
            />
          </div>
        </TabPane>
      </Tabs>
    </div>
  </PageWrapper>
</template>

<style scoped>
.component-library {
  @apply rounded bg-white p-4;
}
</style>
