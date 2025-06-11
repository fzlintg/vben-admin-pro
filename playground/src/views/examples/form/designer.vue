<script lang="ts" setup>
import { ref } from 'vue';
// 可编辑属性计算
// 临时手动导入（配置生效后可删除）

import { Input, InputNumber, Select, Switch } from 'ant-design-vue';
import draggable from 'vue3-draggable-next';

import ComponentPanel from './components/ComponentPanel.vue';

const components = {
  Input,
  Select,
  Switch,
  InputNumber,
};

// 表单字段
const formFields = ref([]);
const selectedField = ref(null);
const editableProps = ref([]);

// 处理从ComponentPanel拖拽过来的组件
const handleComponentDrop = (componentType: string, componentName: string) => {
  formFields.value.push({
    id: `field_${Date.now()}`,
    type: componentType,
    props: {
      label: componentName,
      placeholder: `请输入${componentName}`,
    },
  });
};

// 获取组件实例
const getComponent = (type: string) => {
  return components[type] || 'div';
};

const onFieldsChange = (evt) => {
  if (evt.added) {
    const newItem = evt.added.element;
    selectedField.value = newItem;
  }
};
</script>

<template>
  <div class="form-designer">
    <!-- 组件面板 -->
    <div class="components-panel">
      <ComponentPanel />
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
