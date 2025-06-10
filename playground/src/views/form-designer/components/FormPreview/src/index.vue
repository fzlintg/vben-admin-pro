<script lang="ts" setup>
import type { FormInstance } from 'ant-design-vue';

import { onMounted, ref } from 'vue';

import {
  getFormComponent,
  getValidationRules,
} from '../../../hooks/useFormComponents';

// 定义组件属性
const props = defineProps<{
  formData: any[];
  formDescription?: string;
  formTitle: string;
}>();

// 表单实例引用
const formRef = ref<FormInstance>();

// 表单数据模型
const formModel = ref<Record<string, any>>({});

// 提交结果相关
const resultVisible = ref(false);
const submitData = ref<Record<string, any>>({});

// 根据组件类型获取对应的组件
const getComponentByType = (type: string) => {
  return getFormComponent(type);
};

// 获取组件属性
const getComponentProps = (item: any) => {
  const baseProps = { ...item.props };

  // 移除表单项特有的属性，避免传递给实际组件
  delete baseProps.label;
  delete baseProps.required;

  // 根据组件类型处理特殊属性
  switch (item.type) {
    case 'checkbox':
    case 'radio': {
      return {
        ...baseProps,
        options: baseProps.options || [],
      };
    }
    case 'select': {
      return {
        ...baseProps,
        options: baseProps.options || [],
        placeholder: baseProps.placeholder || `请选择${item.label}`,
      };
    }
    case 'upload': {
      return {
        ...baseProps,
        action: baseProps.action || '/api/upload', // 实际使用时替换为真实的上传接口
        headers: {
          // 可以在这里添加上传需要的请求头
        },
      };
    }
    default: {
      return {
        ...baseProps,
        placeholder: baseProps.placeholder || `请输入${item.label}`,
      };
    }
  }
};

// 获取表单项的验证规则
const getItemRules = (item: any) => {
  return getValidationRules(item.type, item.props);
};

// 处理表单提交
const handleSubmit = (values: any) => {
  submitData.value = values;
  resultVisible.value = true;
};

// 处理表单重置
const handleReset = () => {
  formRef.value?.resetFields();
};

// 初始化表单数据模型
onMounted(() => {
  const initialModel: Record<string, any> = {};
  props.formData.forEach((item) => {
    // 根据组件类型设置初始值
    switch (item.type) {
      case 'checkbox': {
        initialModel[item.name] = [];
        break;
      }
      case 'number': {
        initialModel[item.name] = undefined;
        break;
      }
      case 'switch': {
        initialModel[item.name] = false;
        break;
      }
      default: {
        initialModel[item.name] = '';
      }
    }
  });
  formModel.value = initialModel;
});
</script>

<template>
  <div class="form-preview">
    <div class="preview-header">
      <h2 class="preview-title">{{ formTitle }}</h2>
      <p v-if="formDescription" class="preview-description">
        {{ formDescription }}
      </p>
    </div>

    <a-form
      ref="formRef"
      :model="formModel"
      :rules="formRules"
      layout="vertical"
      @finish="handleSubmit"
    >
      <template v-for="item in formData" :key="item.name">
        <a-form-item
          :label="item.label"
          :name="item.name"
          :rules="getItemRules(item)"
        >
          <component
            :is="getComponentByType(item.type)"
            v-model:value="formModel[item.name]"
            v-bind="getComponentProps(item)"
          />
        </a-form-item>
      </template>

      <div class="preview-actions">
        <a-space>
          <a-button type="primary" html-type="submit"> 提交 </a-button>
          <a-button @click="handleReset"> 重置 </a-button>
        </a-space>
      </div>
    </a-form>

    <!-- 提交结果对话框 -->
    <a-modal
      v-model:visible="resultVisible"
      title="表单数据"
      :footer="null"
      width="600px"
    >
      <pre class="preview-result">{{
        JSON.stringify(submitData, null, 2)
      }}</pre>
    </a-modal>
  </div>
</template>

<style lang="less" scoped>
.form-preview {
  padding: 24px;
  background-color: #fff;

  .preview-header {
    margin-bottom: 32px;
    text-align: center;

    .preview-title {
      margin-bottom: 8px;
      color: #000000d9;
      font-weight: 500;
      font-size: 24px;
    }

    .preview-description {
      color: #00000073;
      font-size: 14px;
    }
  }

  .preview-actions {
    margin-top: 24px;
    text-align: center;
  }

  .preview-result {
    max-height: 500px;
    overflow: auto;
    padding: 16px;
    background-color: #f5f5f5;
    border-radius: 2px;
    font-family: monospace;
  }
}
</style>
