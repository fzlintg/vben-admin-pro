<script lang="ts" setup>
import { computed, reactive } from 'vue';

import { UploadOutlined as UploadIcon } from '@ant-design/icons-vue';

import { useFormDesignerStore } from '../../../store';

const formDesignerStore = useFormDesignerStore();

// 表单标题
const formTitle = computed(() => formDesignerStore.formTitle);

// 表单描述
const formDescription = computed(() => formDesignerStore.formDescription);

// 表单项列表
const formItems = computed(() => formDesignerStore.formItems);

// 表单数据模型
const formModel = reactive<Record<string, any>>({});

// 初始化表单数据
formItems.value.forEach((item) => {
  formModel[item.props.name] = item.type === 'checkbox' ? [] : undefined;
});

// 获取验证规则
const getRules = (item: any) => {
  const rules = [];

  if (item.props.required) {
    rules.push({
      required: true,
      message: `请输入${item.props.label}`,
    });
  }

  // 添加内置验证规则
  if (item.props.rules) {
    item.props.rules.forEach((rule: string) => {
      switch (rule) {
        case 'email': {
          rules.push({
            type: 'email',
            message: '请输入有效的邮箱地址',
          });
          break;
        }
        case 'idcard': {
          rules.push({
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}([\dX])$)/i,
            message: '请输入有效的身份证号',
          });
          break;
        }
        case 'phone': {
          rules.push({
            pattern: /^1[3-9]\d{9}$/,
            message: '请输入有效的手机号',
          });
          break;
        }
        case 'url': {
          rules.push({
            type: 'url',
            message: '请输入有效的网址',
          });
          break;
        }
      }
    });
  }

  return rules;
};

// 处理表单提交
const handleSubmit = () => {
  console.log('表单数据:', formModel);
  // TODO: 实际提交逻辑
};

// 处理表单重置
const handleReset = () => {
  Object.keys(formModel).forEach((key) => {
    formModel[key] = Array.isArray(formModel[key]) ? [] : undefined;
  });
};
</script>

<template>
  <div class="preview-form">
    <div class="preview-header">
      <h2>{{ formTitle }}</h2>
      <p v-if="formDescription">{{ formDescription }}</p>
    </div>

    <a-form
      :model="formModel"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <template v-for="item in formItems" :key="item.id">
        <!-- 输入框 -->
        <a-form-item
          v-if="item.type === 'input'"
          :label="item.props.label"
          :name="item.props.name"
          :rules="getRules(item)"
        >
          <a-input
            v-model:value="formModel[item.props.name]"
            :placeholder="item.props.placeholder"
          />
        </a-form-item>

        <!-- 多行文本 -->
        <a-form-item
          v-else-if="item.type === 'textarea'"
          :label="item.props.label"
          :name="item.props.name"
          :rules="getRules(item)"
        >
          <a-textarea
            v-model:value="formModel[item.props.name]"
            :placeholder="item.props.placeholder"
            :rows="item.props.rows"
          />
        </a-form-item>

        <!-- 数字输入 -->
        <a-form-item
          v-else-if="item.type === 'number'"
          :label="item.props.label"
          :name="item.props.name"
          :rules="getRules(item)"
        >
          <a-input-number
            v-model:value="formModel[item.props.name]"
            :placeholder="item.props.placeholder"
            :min="item.props.min"
            :max="item.props.max"
            :step="item.props.step"
            style="width: 100%"
          />
        </a-form-item>

        <!-- 单选框 -->
        <a-form-item
          v-else-if="item.type === 'radio'"
          :label="item.props.label"
          :name="item.props.name"
          :rules="getRules(item)"
        >
          <a-radio-group v-model:value="formModel[item.props.name]">
            <a-radio
              v-for="option in item.props.options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </a-radio>
          </a-radio-group>
        </a-form-item>

        <!-- 多选框 -->
        <a-form-item
          v-else-if="item.type === 'checkbox'"
          :label="item.props.label"
          :name="item.props.name"
          :rules="getRules(item)"
        >
          <a-checkbox-group v-model:value="formModel[item.props.name]">
            <a-checkbox
              v-for="option in item.props.options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </a-checkbox>
          </a-checkbox-group>
        </a-form-item>

        <!-- 下拉选择 -->
        <a-form-item
          v-else-if="item.type === 'select'"
          :label="item.props.label"
          :name="item.props.name"
          :rules="getRules(item)"
        >
          <a-select
            v-model:value="formModel[item.props.name]"
            :placeholder="item.props.placeholder"
          >
            <a-select-option
              v-for="option in item.props.options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <!-- 日期选择 -->
        <a-form-item
          v-else-if="item.type === 'date'"
          :label="item.props.label"
          :name="item.props.name"
          :rules="getRules(item)"
        >
          <a-date-picker
            v-model:value="formModel[item.props.name]"
            :placeholder="item.props.placeholder"
            :format="item.props.format"
            :show-time="item.props.showTime"
            style="width: 100%"
          />
        </a-form-item>

        <!-- 时间选择 -->
        <a-form-item
          v-else-if="item.type === 'time'"
          :label="item.props.label"
          :name="item.props.name"
          :rules="getRules(item)"
        >
          <a-time-picker
            v-model:value="formModel[item.props.name]"
            :placeholder="item.props.placeholder"
            :format="item.props.format"
            style="width: 100%"
          />
        </a-form-item>

        <!-- 文件上传 -->
        <a-form-item
          v-else-if="item.type === 'upload'"
          :label="item.props.label"
          :name="item.props.name"
          :rules="getRules(item)"
        >
          <a-upload
            v-model:file-list="formModel[item.props.name]"
            :list-type="item.props.listType"
          >
            <a-button>
              <UploadIcon />
              点击上传
            </a-button>
          </a-upload>
        </a-form-item>

        <!-- 开关 -->
        <a-form-item
          v-else-if="item.type === 'switch'"
          :label="item.props.label"
          :name="item.props.name"
          :rules="getRules(item)"
        >
          <a-switch
            v-model:checked="formModel[item.props.name]"
            :checked-children="item.props.checkedChildren"
            :un-checked-children="item.props.unCheckedChildren"
          />
        </a-form-item>

        <!-- 滑动输入 -->
        <a-form-item
          v-else-if="item.type === 'slider'"
          :label="item.props.label"
          :name="item.props.name"
          :rules="getRules(item)"
        >
          <a-slider
            v-model:value="formModel[item.props.name]"
            :min="item.props.min"
            :max="item.props.max"
            :step="item.props.step"
          />
        </a-form-item>

        <!-- 评分 -->
        <a-form-item
          v-else-if="item.type === 'rate'"
          :label="item.props.label"
          :name="item.props.name"
          :rules="getRules(item)"
        >
          <a-rate
            v-model:value="formModel[item.props.name]"
            :count="item.props.count"
            :allow-half="item.props.allowHalf"
          />
        </a-form-item>

        <!-- 级联选择 -->
        <a-form-item
          v-else-if="item.type === 'cascader'"
          :label="item.props.label"
          :name="item.props.name"
          :rules="getRules(item)"
        >
          <a-cascader
            v-model:value="formModel[item.props.name]"
            :placeholder="item.props.placeholder"
            :options="item.props.options"
            style="width: 100%"
          />
        </a-form-item>
      </template>

      <a-form-item :wrapper-col="{ span: 16, offset: 6 }">
        <a-button type="primary" @click="handleSubmit"> 提交 </a-button>
        <a-button style="margin-left: 10px" @click="handleReset">
          重置
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="less" scoped>
.preview-form {
  padding: 24px;
  background-color: #fff;

  .preview-header {
    margin-bottom: 24px;
    text-align: center;

    h2 {
      margin-bottom: 8px;
    }

    p {
      color: #666;
    }
  }
}
</style>
