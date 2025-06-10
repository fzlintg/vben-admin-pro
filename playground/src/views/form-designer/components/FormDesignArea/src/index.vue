<script lang="ts" setup>
import { computed } from 'vue';

import { DeleteOutlined, HolderOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { v4 as uuidv4 } from 'uuid';
import draggable from 'vue3-draggable-next';

import { getFormComponent } from '../../../hooks/useFormComponents';
import { useFormDesignerStore } from '../../../store';

const formDesignerStore = useFormDesignerStore();

// 表单标题
const formTitle = computed(() => formDesignerStore.formTitle);

// 表单描述
const formDescription = computed(() => formDesignerStore.formDescription);

// 表单项列表
const formItems = computed(() => formDesignerStore.formItems);

// 当前选中的表单项ID
const currentItemId = computed(() => formDesignerStore.currentItemId);

// 表单项列表模型（用于拖拽排序）
const formItemsModel = computed({
  get: () => formDesignerStore.formItems,
  set: (value) => {
    // 更新表单项顺序
    formDesignerStore.formItems = value;
  },
});

// 获取组件属性
const getComponentProps = (item: any) => {
  const { type, props } = item;
  const componentProps: Record<string, any> = { ...props };

  // 添加表单项标签
  componentProps.label = props.label;

  // 根据组件类型设置特定属性
  switch (type) {
    case 'cascader':
    case 'date':
    case 'input':
    case 'number':
    case 'select':
    case 'textarea':
    case 'time': {
      componentProps.placeholder = props.placeholder;
      break;
    }
  }

  return componentProps;
};

// 处理拖拽经过
const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
};

// 处理拖拽放置
const handleDrop = (e: DragEvent) => {
  e.preventDefault();

  const draggingComponent = formDesignerStore.draggingComponent;
  if (!draggingComponent) return;

  // 创建新的表单项
  const newItem = {
    id: uuidv4(),
    type: draggingComponent.type,
    props: {
      ...draggingComponent.defaultProps,
      name: `field_${formItems.value.length + 1}`,
    },
  };

  // 添加表单项
  formDesignerStore.addFormItem(newItem);

  // 选中新添加的表单项
  formDesignerStore.setCurrentItemId(newItem.id);

  // 清空拖拽中的组件
  formDesignerStore.setDraggingComponent(null);
};

// 处理拖拽排序结束
const handleDragEnd = () => {
  // 拖拽排序结束后的处理
};

// 处理表单项点击
const handleItemClick = (id: string) => {
  formDesignerStore.setCurrentItemId(id);
};

// 处理表单项删除
const handleItemDelete = (index: number) => {
  Modal.confirm({
    title: '确认删除',
    content: '确定要删除此表单项吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      formDesignerStore.removeFormItem(index);
    },
  });
};
</script>

<template>
  <div
    class="form-design-area"
    @dragover.prevent="handleDragOver"
    @drop.prevent="handleDrop"
  >
    <div class="design-header">
      <h2 class="form-title">{{ formTitle }}</h2>
      <p v-if="formDescription" class="form-description">
        {{ formDescription }}
      </p>
    </div>

    <div class="design-content" :class="{ 'is-empty': formItems.length === 0 }">
      <template v-if="formItems.length > 0">
        <draggable
          v-model="formItemsModel"
          item-key="id"
          handle=".drag-handle"
          ghost-class="ghost-item"
          @end="handleDragEnd"
        >
          <template #item="{ element, index }">
            <div
              class="form-item-wrapper"
              :class="{ 'is-selected': element.id === currentItemId }"
              @click="handleItemClick(element.id)"
            >
              <div class="form-item-content">
                <component
                  :is="getFormComponent(element.type)"
                  v-bind="getComponentProps(element)"
                  disabled
                >
                  <!-- 选项组件的插槽内容 -->
                  <template
                    v-if="
                      ['radio', 'checkbox', 'select'].includes(element.type)
                    "
                  >
                    <template v-if="element.type === 'select'">
                      <a-select-option
                        v-for="option in element.props.options"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </a-select-option>
                    </template>
                    <template v-else>
                      <template
                        v-for="option in element.props.options"
                        :key="option.value"
                      >
                        <a-radio
                          v-if="element.type === 'radio'"
                          :value="option.value"
                        >
                          {{ option.label }}
                        </a-radio>
                        <a-checkbox v-else :value="option.value">
                          {{ option.label }}
                        </a-checkbox>
                      </template>
                    </template>
                  </template>
                </component>
              </div>

              <div class="form-item-actions">
                <a-tooltip title="拖动排序">
                  <div class="drag-handle">
                    <HolderOutlined />
                  </div>
                </a-tooltip>

                <a-tooltip title="删除">
                  <a-button
                    type="text"
                    danger
                    @click.stop="handleItemDelete(index)"
                  >
                    <template #icon><DeleteOutlined /></template>
                  </a-button>
                </a-tooltip>
              </div>
            </div>
          </template>
        </draggable>
      </template>

      <div v-else class="empty-tip">
        <p>从左侧拖拽组件到此处</p>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.form-design-area {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;

  .design-header {
    padding: 24px;
    text-align: center;
    border-bottom: 1px solid #f0f0f0;

    .form-title {
      margin: 0 0 8px;
      font-size: 24px;
      font-weight: 500;
    }

    .form-description {
      margin: 0;
      color: #00000073;
    }
  }

  .design-content {
    flex: 1;
    padding: 24px;
    overflow-y: auto;

    &.is-empty {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fafafa;
      border: 2px dashed #d9d9d9;
      border-radius: 2px;

      .empty-tip {
        color: #00000073;
        font-size: 16px;
      }
    }

    .form-item-wrapper {
      position: relative;
      margin-bottom: 16px;
      padding: 16px;
      border: 1px solid #f0f0f0;
      border-radius: 2px;
      transition: all 0.3s;

      &:hover {
        border-color: #d9d9d9;
      }

      &.is-selected {
        border-color: #1890ff;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      }

      .form-item-content {
        min-height: 32px;
      }

      .form-item-actions {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        align-items: center;

        .drag-handle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          cursor: move;
          color: #00000073;

          &:hover {
            color: #000000;
          }
        }
      }
    }

    .ghost-item {
      opacity: 0.5;
      background: #c8ebfb;
    }
  }
}
</style>
