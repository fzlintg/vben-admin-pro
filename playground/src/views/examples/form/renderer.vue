<script lang="ts" setup>
import { ref } from 'vue';

import { Button, Form, FormItem, Input } from 'ant-design-vue';

interface FormItem {
  component: any;
  field: string;
  label: string;
  props: Record<string, any>;
  type: string;
}

const formItems = ref<FormItem[]>([
  {
    type: 'input',
    label: '用户名',
    field: 'username',
    component: Input,
    props: { placeholder: '请输入用户名' },
  },
  {
    type: 'input',
    label: '密码',
    field: 'password',
    component: Input,
    props: { placeholder: '请输入密码', type: 'password' },
  },
]);

const formData = ref<Record<string, any>>({});

const handleSubmit = () => {
  console.log('表单数据:', formData.value);
};
</script>

<template>
  <div class="p-4">
    <Page title="表单渲染demo" content="预览设计好的表单效果" />

    <div class="mx-auto max-w-2xl">
      <Form
        :model="formData"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <template v-for="item in formItems" :key="item.type">
          <FormItem :label="item.label">
            <component
              :is="item.component"
              v-bind="item.props"
              v-model="formData[item.field]"
            />
          </FormItem>
        </template>

        <FormItem :wrapper-col="{ offset: 6, span: 16 }">
          <Button type="primary" @click="handleSubmit">提交</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
