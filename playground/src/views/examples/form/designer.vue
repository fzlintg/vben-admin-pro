<script lang="ts" setup>
import { ref } from 'vue';
// 可编辑属性计算
// 临时手动导入（配置生效后可删除）
import { computed } from 'vue';

import { Input, InputNumber, Select, Switch } from 'ant-design-vue';
import draggable from 'vue3-draggable-next';

const components = {
  Input,
  Select,
  Switch,
  InputNumber,
};

// 组件定义
const componentDefs = {
  input: {
    label: '输入框',
    component: 'Input',
    props: { placeholder: '请输入' },
  },
  select: {
    label: '下拉框',
    component: 'Select',
    props: {
      placeholder: '请选择',
      options: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
      ],
    },
  },
  // 其他组件...
};

// 组件列表
const componentList = ref(
  Object.keys(componentDefs).map((type) => ({
    type,
    label: componentDefs[type].label,
  })),
);

// 表单字段
const formFields = ref([]);
const selectedField = ref(null);
const editableProps = computed(() => {
  if (!selectedField.value) return [];

  const fieldType = selectedField.value.type;
  const propsDef = componentDefs[fieldType]?.props || {};

  return Object.keys(propsDef).map((propName) => ({
    name: propName,
    label: propName,
    editor: 'Input',
    editorProps: { placeholder: `请输入${propName}` },
  }));
});

// 获取组件实例
const getComponent = (type: string) => {
  return componentDefs[type]?.component || 'div';
};

// 拖拽事件处理
let dragItem = null;

const onDragStart = (evt) => {
  dragItem = evt.item.__draggableContext.element;
  console.log('拖拽开始', dragItem);
};

const onDragEnd = () => {
  dragItem = null;
  console.log('拖拽结束');
};

const onFieldsChange = (evt) => {
  if (evt.added) {
    const newItem = evt.added.element;
    // 为拖拽过来的元素生成唯一ID和完整数据结构
    formFields.value = formFields.value.map((item) => {
      if (item === newItem) {
        return {
          ...newItem,
          id: `field_${Date.now()}`,
          props: { ...componentDefs[newItem.type]?.props },
        };
      }
      return item;
    });
  }
  console.log('表单字段变化', formFields.value);
};
</script>

<template>
  <div class="form-designer">
    <!-- 组件面板 -->
    <div class="components-panel">
      <h3>组件列表</h3>
      <draggable
        :list="componentList"
        :group="{ name: 'components', pull: 'clone', put: false }"
        item-key="type"
        @start="onDragStart"
        @end="onDragEnd"
      >
        <template #item="{ element }">
          <div class="component-item">
            {{ element.label }}
          </div>
        </template>
      </draggable>
    </div>

    <!-- 设计区域 -->
    <div class="design-area-container">
      <div class="design-area">
        <!-- 属性配置面板 -->
        <div class="properties-panel" v-if="selectedField">
          <h3>属性配置</h3>
          <div
            v-for="prop in editableProps"
            :key="prop.name"
            class="property-item"
          >
            <label>{{ prop.label }}</label>
            <component
              :is="prop.editor"
              v-model:value="selectedField.props[prop.name]"
              v-bind="prop.editorProps"
            />
          </div>
        </div>
        <h3>表单设计区</h3>
        <draggable
          v-model="formFields"
          group="components"
          item-key="id"
          handle=".drag-handle"
          @change="onFieldsChange"
        >
          <template #item="{ element }">
            <div class="form-field">
              <span class="drag-handle">☰</span>
              <component
                :is="getComponent(element.type)"
                v-bind="element.props"
              />
            </div>
          </template>
        </draggable>
      </div>
    </div>
    <!-- 属性面板容器 - 移到设计区外部 -->
    <teleport to="body">
      <div
        class="properties-container"
        v-if="selectedField"
        style="
          position: fixed;
          top: 80px;
          right: 20px;
          z-index: 1001;
          width: 320px;
          height: calc(100vh - 100px);
        "
      >
        <div class="properties-panel">
          <h3>属性配置</h3>
          <div
            class="property-item"
            v-for="prop in editableProps"
            :key="prop.name"
          >
            <label>{{ prop.label }}</label>
            <component
              :is="prop.editor"
              v-model:value="selectedField.props[prop.name]"
              v-bind="prop.editorProps"
            />
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<style scoped>
.form-designer {
  display: flex;
  height: 100vh;
}

.components-panel {
  width: 250px;
  padding: 16px;
  border-right: 1px solid #eee;
}

.design-area-container {
  position: relative;
  flex: 1;
  min-width: 600px;
  padding: 16px;
  overflow: auto;
  border-right: 1px dashed #eee;
}

.design-area {
  min-height: 100%;
  padding: 16px;
  background: #fafafa;
}

.design-area:empty::after {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 16px;
  color: #999;
  pointer-events: none;
  content: '拖拽组件到此处';
  opacity: 0.6;
  transform: translate(-50%, -50%);
}

.component-item {
  padding: 8px 12px;
  margin-bottom: 8px;
  cursor: grab;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-field {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  border: 1px dashed #ccc;
  border-radius: 4px;
}

.drag-handle {
  margin-right: 8px;
  cursor: move;
  user-select: none;
}
</style>
