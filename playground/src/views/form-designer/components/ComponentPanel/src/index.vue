<script lang="ts" setup>
import { ref } from 'vue';

import DraggableComponentCard from '@/views/component-list/DraggableComponentCard.vue';
import {
  CalendarOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  ClusterOutlined,
  EditOutlined,
  FormOutlined,
  NumberOutlined,
  SlidersFilled,
  StarOutlined,
  SwitchOutlined,
  UnorderedListOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue';

import { getDefaultProps } from '../../../hooks/useFormComponents';
import { useFormDesignerStore } from '../../../store';

const componentList = ref([
  { name: '输入框', type: 'input', icon: 'edit' },
  { name: '选择器', type: 'select', icon: 'select' },
  { name: '日期选择', type: 'date-picker', icon: 'calendar' },
  { name: '按钮', type: 'button', icon: 'button' },
]);

const formDesignerStore = useFormDesignerStore();

// 当前激活的折叠面板
const activeKeys = ref<string[]>(['basic', 'advanced']);

// 基础组件列表
const basicComponents = [
  {
    type: 'input',
    name: '单行文本',
    icon: FormOutlined,
    defaultProps: getDefaultProps('input'),
  },
  {
    type: 'textarea',
    name: '多行文本',
    icon: EditOutlined,
    defaultProps: getDefaultProps('textarea'),
  },
  {
    type: 'number',
    name: '数字输入',
    icon: NumberOutlined,
    defaultProps: getDefaultProps('number'),
  },
  {
    type: 'radio',
    name: '单选框组',
    icon: CheckCircleOutlined,
    defaultProps: getDefaultProps('radio'),
  },
  {
    type: 'checkbox',
    name: '多选框组',
    icon: CheckSquareOutlined,
    defaultProps: getDefaultProps('checkbox'),
  },
  {
    type: 'select',
    name: '下拉选择',
    icon: UnorderedListOutlined,
    defaultProps: getDefaultProps('select'),
  },
];

// 高级组件列表
const advancedComponents = [
  {
    type: 'date',
    name: '日期选择',
    icon: CalendarOutlined,
    defaultProps: getDefaultProps('date'),
  },
  {
    type: 'time',
    name: '时间选择',
    icon: ClockCircleOutlined,
    defaultProps: getDefaultProps('time'),
  },
  {
    type: 'upload',
    name: '文件上传',
    icon: UploadOutlined,
    defaultProps: getDefaultProps('upload'),
  },
  {
    type: 'switch',
    name: '开关',
    icon: SwitchOutlined,
    defaultProps: getDefaultProps('switch'),
  },
  {
    type: 'slider',
    name: '滑动输入',
    icon: SlidersFilled,
    defaultProps: getDefaultProps('slider'),
  },
  {
    type: 'rate',
    name: '评分',
    icon: StarOutlined,
    defaultProps: getDefaultProps('rate'),
  },
  {
    type: 'cascader',
    name: '级联选择',
    icon: ClusterOutlined,
    defaultProps: getDefaultProps('cascader'),
  },
];

// 处理拖拽开始
const handleDragStart = (component: any) => {
  // 设置拖拽中的组件
  formDesignerStore.setDraggingComponent({
    type: component.type,
    defaultProps: component.defaultProps,
  });
};
</script>

<template>
  <div class="component-panel">
    <div class="panel-header">
      <h3>组件库</h3>
    </div>

    <div class="panel-content">
      <a-collapse v-model:active-key="activeKeys" :bordered="false">
        <!-- 组件列表 -->
        <a-collapse-panel key="component-list" header="组件列表">
          <div class="component-list">
            <DraggableComponentCard
              v-for="(component, index) in componentList"
              :key="index"
              :component="component"
            />
          </div>
        </a-collapse-panel>

        <!-- 基础组件 -->
        <a-collapse-panel key="basic" header="基础组件">
          <div class="component-list">
            <div
              v-for="component in basicComponents"
              :key="component.type"
              class="component-item"
              draggable="true"
              @dragstart="handleDragStart(component)"
            >
              <component :is="component.icon" class="component-icon" />
              <span class="component-name">{{ component.name }}</span>
            </div>
          </div>
        </a-collapse-panel>

        <!-- 高级组件 -->
        <a-collapse-panel key="advanced" header="高级组件">
          <div class="component-list">
            <div
              v-for="component in advancedComponents"
              :key="component.type"
              class="component-item"
              draggable="true"
              @dragstart="handleDragStart(component)"
            >
              <component :is="component.icon" class="component-icon" />
              <span class="component-name">{{ component.name }}</span>
            </div>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<style lang="less" scoped>
.component-panel {
  height: 100%;
  display: flex;
  flex-direction: column;

  .panel-header {
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;

    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .panel-content {
    flex: 1;
    padding: 0 8px;
    overflow-y: auto;

    :deep(.ant-collapse) {
      background-color: transparent;

      .ant-collapse-header {
        padding: 12px 8px;
        font-weight: 500;
      }

      .ant-collapse-content-box {
        padding: 8px 0;
      }
    }

    .component-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;

      .component-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 80px;
        padding: 8px;
        background-color: #fafafa;
        border: 1px solid #f0f0f0;
        border-radius: 2px;
        cursor: move;
        transition: all 0.3s;

        &:hover {
          border-color: #1890ff;
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
        }

        .component-icon {
          margin-bottom: 8px;
          font-size: 24px;
          color: #1890ff;
        }

        .component-name {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
