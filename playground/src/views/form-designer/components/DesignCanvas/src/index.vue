<script lang="ts" setup>
import { computed } from 'vue';

import {
  DeleteOutlined,
  DownOutlined,
  FormOutlined,
  UpOutlined,
} from '@ant-design/icons-vue';

import { getFormComponent } from '../../../hooks/useFormComponents';
import { useFormDesignerStore } from '../../../store';

const formDesignerStore = useFormDesignerStore();

// 表单项列表
const formItems = computed(() => formDesignerStore.formItems);

// 当前选中的表单项ID
const currentItemId = computed(() => formDesignerStore.currentItemId);

// 获取组件属性
const getComponentProps = (item: any) => {
  const { type, props } = item;
  const componentProps: Record<string, any> = { ...props };

  // 移除验证规则相关属性
  delete componentProps.rules;
  delete componentProps.required;

  return componentProps;
};

// 处理拖拽开始
const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  e.dataTransfer!.dropEffect = 'move';
};

// 处理拖拽放置
const handleDrop = (e: DragEvent) => {
  const component = formDesignerStore.draggingComponent;
  if (!component) return;

  // 生成唯一ID
  const id = `${component.type}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

  // 添加新组件
  formDesignerStore.addFormItem({
    id,
    type: component.type,
    props: {
      ...component.defaultProps,
      name: id,
    },
  });

  // 选中新添加的组件
  formDesignerStore.setCurrentItemId(id);

  // 清空拖拽组件
  formDesignerStore.setDraggingComponent(null);
};

// 处理表单项拖拽开始
const handleItemDragStart = (e: DragEvent, index: number) => {
  e.dataTransfer!.effectAllowed = 'move';
  e.dataTransfer!.setData('text/plain', index.toString());
};

// 处理表单项拖拽结束
const handleItemDragEnd = () => {
  // 可以在这里添加拖拽结束的处理逻辑
};

// 处理表单项拖拽经过
const handleItemDragOver = (e: DragEvent, index: number) => {
  e.preventDefault();
  e.dataTransfer!.dropEffect = 'move';
};

// 处理表单项放置
const handleItemDrop = (e: DragEvent, toIndex: number) => {
  const fromIndex = Number.parseInt(e.dataTransfer!.getData('text/plain'));
  if (fromIndex === toIndex) return;

  formDesignerStore.moveFormItem(fromIndex, toIndex);
};

// 处理表单项点击
const handleItemClick = (id: string) => {
  const item = formItems.value.find((item) => item.id === id);
  if (item) {
    console.log('Selected form item:', item);
    formDesignerStore.setCurrentItemId(id);
    // 确保属性面板能获取完整组件数据
    formDesignerStore.setSelectedComponent(JSON.parse(JSON.stringify(item)));
  }
};

// 处理向上移动
const handleMoveUp = (index: number) => {
  if (index === 0) return;
  formDesignerStore.moveFormItem(index, index - 1);
};

// 处理向下移动
const handleMoveDown = (index: number) => {
  if (index === formItems.value.length - 1) return;
  formDesignerStore.moveFormItem(index, index + 1);
};

// 处理删除
const handleDelete = (index: number) => {
  formDesignerStore.removeFormItem(index);
};
</script>

<template>
  <div
    class="design-canvas"
    :class="{ 'is-empty': formItems.length === 0 }"
    @dragover.prevent="handleDragOver"
    @drop.prevent="handleDrop"
  >
    <div v-if="formItems.length === 0" class="empty-tip">
      <div class="empty-icon">
        <FormOutlined />
      </div>
      <p>从左侧拖拽组件到这里开始设计表单</p>
    </div>

    <template v-else>
      <div class="form-container">
        <a-form layout="vertical">
          <div
            v-for="(item, index) in formItems"
            :key="item.id"
            class="form-item-wrapper"
            :class="{ 'is-selected': currentItemId === item.id }"
            draggable="true"
            @dragstart="handleItemDragStart($event, index)"
            @dragend="handleItemDragEnd"
            @dragover.prevent="handleItemDragOver($event, index)"
            @drop.prevent="handleItemDrop($event, index)"
            @click="handleItemClick(item.id)"
          >
            <div class="form-item-content">
              <a-form-item
                :label="item.props.label || '未命名'"
                :required="item.props.required"
              >
                <component
                  :is="getFormComponent(item.type)"
                  v-bind="getComponentProps(item)"
                  :disabled="true"
                >
                  <!-- 选项组件的插槽内容 -->
                  <template
                    v-if="['radio', 'checkbox', 'select'].includes(item.type)"
                  >
                    <template v-if="item.type === 'select'">
                      <a-select-option
                        v-for="option in item.props.options"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </a-select-option>
                    </template>
                    <template v-else>
                      <template
                        v-for="option in item.props.options"
                        :key="option.value"
                      >
                        <a-radio
                          v-if="item.type === 'radio'"
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
              </a-form-item>
            </div>

            <div class="form-item-actions">
              <a-space>
                <a-tooltip title="向上移动">
                  <a-button
                    type="text"
                    size="small"
                    :disabled="index === 0"
                    @click.stop="handleMoveUp(index)"
                  >
                    <template #icon><UpOutlined /></template>
                  </a-button>
                </a-tooltip>

                <a-tooltip title="向下移动">
                  <a-button
                    type="text"
                    size="small"
                    :disabled="index === formItems.length - 1"
                    @click.stop="handleMoveDown(index)"
                  >
                    <template #icon><DownOutlined /></template>
                  </a-button>
                </a-tooltip>

                <a-tooltip title="删除">
                  <a-button
                    type="text"
                    size="small"
                    danger
                    @click.stop="handleDelete(index)"
                  >
                    <template #icon><DeleteOutlined /></template>
                  </a-button>
                </a-tooltip>
              </a-space>
            </div>
          </div>
        </a-form>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
.design-canvas {
  min-height: 100%;
  background-color: #fff;
  border-radius: 2px;

  &.is-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fafafa;
    border: 2px dashed #d9d9d9;

    .empty-tip {
      text-align: center;
      color: #00000073;

      .empty-icon {
        font-size: 48px;
        margin-bottom: 16px;
      }

      p {
        margin: 0;
      }
    }
  }

  .form-container {
    padding: 24px;

    .form-item-wrapper {
      position: relative;
      padding: 8px 16px;
      margin-bottom: 8px;
      border: 1px solid transparent;
      border-radius: 2px;
      transition: all 0.3s;

      &:hover {
        border-color: #1890ff;

        .form-item-actions {
          opacity: 1;
        }
      }

      &.is-selected {
        border-color: #1890ff;
        background-color: #e6f7ff;

        .form-item-actions {
          opacity: 1;
        }
      }

      .form-item-content {
        pointer-events: none;
      }

      .form-item-actions {
        position: absolute;
        top: 50%;
        right: 16px;
        transform: translateY(-50%);
        opacity: 0;
        transition: opacity 0.3s;
      }
    }
  }
}
</style>
