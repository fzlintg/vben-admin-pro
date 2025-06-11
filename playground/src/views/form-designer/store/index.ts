import { ref } from 'vue';

import { defineStore } from 'pinia';

export interface FormItem {
  id: string;
  props: Record<string, any>;
  type: string;
}

export interface DraggingComponent {
  defaultProps: Record<string, any>;
  type: string;
}

export const useFormDesignerStore = defineStore('formDesigner', () => {
  // 预览状态
  const previewVisible = ref(false);

  // 表单标题
  const formTitle = ref<string>('未命名表单');

  // 表单描述
  const formDescription = ref<string>('');

  // 表单项列表
  const formItems = ref<FormItem[]>([]);

  // 当前选中的表单项ID
  const currentItemId = ref<string>('');

  // 拖拽中的组件
  const draggingComponent = ref<DraggingComponent | null>(null);

  // 设置预览状态
  const setPreviewVisible = (visible: boolean) => {
    previewVisible.value = visible;
  };

  // 设置表单标题
  const setFormTitle = (title: string) => {
    formTitle.value = title;
  };

  // 设置表单描述
  const setFormDescription = (description: string) => {
    formDescription.value = description;
  };

  // 添加表单项
  const addFormItem = (item: FormItem) => {
    formItems.value.push(item);
  };

  // 移除表单项
  const removeFormItem = (index: number) => {
    formItems.value.splice(index, 1);
    // 如果删除的是当前选中的表单项，清空选中状态
    if (
      formItems.value.length === 0 ||
      !formItems.value.find((item) => item.id === currentItemId.value)
    ) {
      currentItemId.value = '';
    }
  };

  // 当前选中的组件（响应式引用）
  const selectedComponent = ref<FormItem | null>(null);

  // 设置当前选中的表单项ID
  const setCurrentItemId = (id: string) => {
    currentItemId.value = id;
    updateSelectedComponent();
  };

  // 直接设置选中的组件
  const setSelectedComponent = (item: FormItem | null) => {
    selectedComponent.value = item;
    currentItemId.value = item ? item.id : '';
  };

  // 更新选中的组件引用
  const updateSelectedComponent = () => {
    if (currentItemId.value) {
      const item = formItems.value.find(
        (item) => item.id === currentItemId.value,
      );
      selectedComponent.value = item ? { ...item } : null;
    } else {
      selectedComponent.value = null;
    }
  };

  // 更新表单项
  const updateFormItem = (item: FormItem) => {
    const index = formItems.value.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      formItems.value[index] = { ...item };
      if (currentItemId.value === item.id) {
        selectedComponent.value = { ...item };
      }
    }
  };

  // 设置拖拽中的组件
  const setDraggingComponent = (component: DraggingComponent | null) => {
    draggingComponent.value = component;
  };

  // 清空表单设计器
  const clearDesigner = () => {
    formTitle.value = '未命名表单';
    formDescription.value = '';
    formItems.value = [];
    currentItemId.value = '';
    draggingComponent.value = null;
  };

  // 导入表单数据
  const importFormData = (data: {
    description: string;
    items: FormItem[];
    title: string;
  }) => {
    formTitle.value = data.title;
    formDescription.value = data.description;
    formItems.value = data.items;
    currentItemId.value = '';
    draggingComponent.value = null;
  };

  // 导出表单数据
  const exportFormData = () => {
    return {
      title: formTitle.value,
      description: formDescription.value,
      items: formItems.value,
    };
  };

  return {
    previewVisible,
    formTitle,
    formDescription,
    formItems,
    currentItemId,
    draggingComponent,
    setPreviewVisible,
    setFormTitle,
    setFormDescription,
    addFormItem,
    updateFormItem,
    removeFormItem,
    setCurrentItemId,
    setDraggingComponent,
    clearDesigner,
    importFormData,
    exportFormData,
  };
});
