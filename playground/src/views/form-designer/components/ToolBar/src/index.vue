<script lang="ts" setup>
import { computed } from 'vue';

import {
  DeleteOutlined as DeleteIcon,
  ExportOutlined as ExportIcon,
  EyeOutlined as EyeIcon,
  ImportOutlined as ImportIcon,
} from '@ant-design/icons-vue';
import { message, Modal } from 'ant-design-vue';

import { useFormDesignerStore } from '../../../store';

const formDesignerStore = useFormDesignerStore();

// 表单标题
const formTitle = computed({
  get: () => formDesignerStore.formTitle,
  set: (value) => formDesignerStore.setFormTitle(value),
});

// 表单描述
const formDescription = computed({
  get: () => formDesignerStore.formDescription,
  set: (value) => formDesignerStore.setFormDescription(value),
});

// 处理预览
const handlePreview = () => {
  if (formDesignerStore.formItems.length === 0) {
    message.warning('请先添加表单项');
    return;
  }
  formDesignerStore.setPreviewVisible(true);
};

// 处理清空
const handleClear = () => {
  Modal.confirm({
    title: '确认清空',
    content: '确定要清空当前表单吗？所有内容将丢失',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      formDesignerStore.clearDesigner();
      message.success('表单已清空');
    },
  });
};

// 处理导入
const beforeImport = (file: File) => {
  const reader = new FileReader();
  reader.addEventListener('load', (e) => {
    try {
      const data = JSON.parse(e.target?.result as string);
      formDesignerStore.importFormData(data);
      message.success('表单导入成功');
    } catch {
      message.error('文件格式错误，请导入正确的表单配置文件');
    }
  });
  reader.readAsText(file);
  return false; // 阻止默认上传行为
};

// 处理导出
const handleExport = () => {
  if (formDesignerStore.formItems.length === 0) {
    message.warning('当前没有可导出的表单内容');
    return;
  }

  const data = formDesignerStore.exportFormData();
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `form-design-${Date.now()}.json`;
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);

  message.success('表单导出成功');
};

// 处理标题变更
const handleTitleChange = () => {
  formDesignerStore.setFormTitle(formTitle.value);
};

// 处理描述变更
const handleDescriptionChange = () => {
  formDesignerStore.setFormDescription(formDescription.value);
};
</script>

<template>
  <div class="tool-bar">
    <a-space>
      <!-- 预览按钮 -->
      <a-tooltip title="预览表单">
        <a-button type="primary" @click="handlePreview">
          <template #icon><EyeIcon /></template>
          预览
        </a-button>
      </a-tooltip>

      <!-- 清空按钮 -->
      <a-tooltip title="清空表单">
        <a-button danger @click="handleClear">
          <template #icon><DeleteIcon /></template>
          清空
        </a-button>
      </a-tooltip>

      <!-- 导入按钮 -->
      <a-tooltip title="导入表单配置">
        <a-upload
          :show-upload-list="false"
          :before-upload="beforeImport"
          accept=".json"
        >
          <a-button>
            <template #icon><ImportIcon /></template>
            导入
          </a-button>
        </a-upload>
      </a-tooltip>

      <!-- 导出按钮 -->
      <a-tooltip title="导出表单配置">
        <a-button @click="handleExport">
          <template #icon><ExportIcon /></template>
          导出
        </a-button>
      </a-tooltip>

      <!-- 表单标题 -->
      <a-input
        v-model:value="formTitle"
        placeholder="表单标题"
        style="width: 200px"
        @change="handleTitleChange"
      />

      <!-- 表单描述 -->
      <a-input
        v-model:value="formDescription"
        placeholder="表单描述"
        style="width: 200px"
        @change="handleDescriptionChange"
      />
    </a-space>
  </div>
</template>

<style lang="less" scoped>
.tool-bar {
  padding: 16px;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
}
</style>
