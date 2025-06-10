<script lang="ts" setup>
import { ref } from 'vue';

import ComponentPanel from './components/ComponentPanel/index.vue';
import FormDesignArea from './components/FormDesignArea/index.vue';
import PreviewForm from './components/PreviewForm/index.vue';
import PropertyPanel from './components/PropertyPanel/index.vue';
import ToolBar from './components/ToolBar/index.vue';
import { useFormDesignerStore } from './store';

const formDesignerStore = useFormDesignerStore();
const previewVisible = ref(false);

// 监听预览事件
formDesignerStore.$onAction(({ name, after }) => {
  if (name === 'setPreviewVisible') {
    after(() => {
      previewVisible.value = formDesignerStore.previewVisible;
    });
  }
});
</script>

<template>
  <div class="form-designer">
    <!-- 工具栏 -->
    <div class="tool-bar">
      <ToolBar />
    </div>

    <div class="designer-container">
      <!-- 设计区域 -->
      <div class="design-area">
        <FormDesignArea />
      </div>

      <!-- 组件面板 -->
      <div class="component-panel">
        <ComponentPanel />
      </div>

      <!-- 属性面板 -->
      <div class="property-panel">
        <PropertyPanel />
      </div>
    </div>

    <!-- 预览模态框 -->
    <a-modal
      v-model:visible="previewVisible"
      title="表单预览"
      width="800px"
      :footer="null"
    >
      <PreviewForm />
    </a-modal>
  </div>
</template>

<style lang="less" scoped>
.form-designer {
  display: flex;
  flex-direction: column;
  height: 100%;

  .tool-bar {
    padding: 16px;
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0;
  }

  .designer-container {
    flex: 1;
    display: flex;
    overflow: hidden;

    .design-area {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      background-color: #f5f5f5;
    }

    .component-panel {
      width: 280px;
      padding: 16px;
      border-left: 1px solid #f0f0f0;
      background-color: #fff;
      overflow-y: auto;
    }

    .property-panel {
      width: 320px;
      border-left: 1px solid #f0f0f0;
      background-color: #fff;
      overflow-y: auto;
    }
  }
}
</style>
