<script lang="ts" setup>
import { computed } from 'vue';

import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';

import { useFormDesignerStore } from '../../../store';

const formDesignerStore = useFormDesignerStore();
// const { selectedComponent } = storeToRefs(formDesignerStore);

// 当前选中的表单项
const currentItem = computed(() => formDesignerStore.selectedComponent);

// 处理属性变更
const handlePropertyChange = () => {
  // 属性变更时更新表单项
  if (currentItem.value) {
    formDesignerStore.updateFormItem(currentItem.value);
  }
};

// 处理添加选项
const handleAddOption = () => {
  if (!currentItem.value || !currentItem.value.props.options) return;

  const options = currentItem.value.props.options;
  const newOption = {
    label: `选项${options.length + 1}`,
    value: `option${options.length + 1}`,
  };

  options.push(newOption);
  handlePropertyChange();
};

// 处理移除选项
const handleRemoveOption = (index: number) => {
  if (!currentItem.value || !currentItem.value.props.options) return;

  if (currentItem.value.props.options.length <= 1) {
    return;
  }

  currentItem.value.props.options.splice(index, 1);
  handlePropertyChange();
};
</script>

<template>
  <div class="property-panel">
    <div class="panel-header">
      <h3>属性设置</h3>
    </div>

    <div class="panel-content">
      <template v-if="currentItem">
        <a-form layout="vertical">
          <!-- 基础属性 -->
          <div class="property-section">
            <div class="section-title">基础属性</div>

            <a-form-item label="标签名称">
              <a-input
                v-model:value="currentItem.props.label"
                @change="handlePropertyChange"
              />
            </a-form-item>

            <a-form-item label="字段名称">
              <a-input
                v-model:value="currentItem.props.name"
                @change="handlePropertyChange"
              />
            </a-form-item>

            <a-form-item>
              <a-checkbox
                v-model:checked="currentItem.props.required"
                @change="handlePropertyChange"
              >
                必填项
              </a-checkbox>
            </a-form-item>
          </div>

          <!-- 特定组件属性 -->
          <div class="property-section">
            <div class="section-title">组件属性</div>

            <!-- 输入框属性 -->
            <template
              v-if="
                [
                  'input',
                  'textarea',
                  'number',
                  'select',
                  'date',
                  'time',
                  'cascader',
                ].includes(currentItem.type)
              "
            >
              <a-form-item label="占位文本">
                <a-input
                  v-model:value="currentItem.props.placeholder"
                  @change="handlePropertyChange"
                />
              </a-form-item>
            </template>

            <!-- 文本框特有属性 -->
            <template
              v-if="
                currentItem.type === 'input' || currentItem.type === 'textarea'
              "
            >
              <a-form-item label="最大长度">
                <a-input-number
                  v-model:value="currentItem.props.maxLength"
                  :min="0"
                  style="width: 100%"
                  @change="handlePropertyChange"
                />
              </a-form-item>
            </template>

            <!-- 多行文本特有属性 -->
            <template v-if="currentItem.type === 'textarea'">
              <a-form-item label="行数">
                <a-input-number
                  v-model:value="currentItem.props.rows"
                  :min="1"
                  style="width: 100%"
                  @change="handlePropertyChange"
                />
              </a-form-item>
            </template>

            <!-- 数字输入特有属性 -->
            <template v-if="currentItem.type === 'number'">
              <a-form-item label="最小值">
                <a-input-number
                  v-model:value="currentItem.props.min"
                  style="width: 100%"
                  @change="handlePropertyChange"
                />
              </a-form-item>

              <a-form-item label="最大值">
                <a-input-number
                  v-model:value="currentItem.props.max"
                  style="width: 100%"
                  @change="handlePropertyChange"
                />
              </a-form-item>

              <a-form-item label="步长">
                <a-input-number
                  v-model:value="currentItem.props.step"
                  :min="0"
                  :step="0.01"
                  style="width: 100%"
                  @change="handlePropertyChange"
                />
              </a-form-item>
            </template>

            <!-- 选项组件属性 -->
            <template
              v-if="['radio', 'checkbox', 'select'].includes(currentItem.type)"
            >
              <a-form-item label="选项列表">
                <div
                  v-for="(option, index) in currentItem.props.options"
                  :key="index"
                  class="option-item"
                >
                  <a-input
                    v-model:value="option.label"
                    placeholder="选项名称"
                    @change="handlePropertyChange"
                  />
                  <a-input
                    v-model:value="option.value"
                    placeholder="选项值"
                    @change="handlePropertyChange"
                  />
                  <a-button
                    type="text"
                    danger
                    @click="handleRemoveOption(index)"
                  >
                    <template #icon><DeleteOutlined /></template>
                  </a-button>
                </div>

                <a-button type="dashed" block @click="handleAddOption">
                  <template #icon><PlusOutlined /></template>
                  添加选项
                </a-button>
              </a-form-item>
            </template>

            <!-- 日期选择器特有属性 -->
            <template v-if="currentItem.type === 'date'">
              <a-form-item label="日期格式">
                <a-input
                  v-model:value="currentItem.props.format"
                  @change="handlePropertyChange"
                />
              </a-form-item>

              <a-form-item>
                <a-checkbox
                  v-model:checked="currentItem.props.showTime"
                  @change="handlePropertyChange"
                >
                  显示时间
                </a-checkbox>
              </a-form-item>
            </template>

            <!-- 时间选择器特有属性 -->
            <template v-if="currentItem.type === 'time'">
              <a-form-item label="时间格式">
                <a-input
                  v-model:value="currentItem.props.format"
                  @change="handlePropertyChange"
                />
              </a-form-item>
            </template>

            <!-- 上传组件特有属性 -->
            <template v-if="currentItem.type === 'upload'">
              <a-form-item label="列表类型">
                <a-select
                  v-model:value="currentItem.props.listType"
                  @change="handlePropertyChange"
                >
                  <a-select-option value="text">文本</a-select-option>
                  <a-select-option value="picture">图片</a-select-option>
                  <a-select-option value="picture-card">卡片</a-select-option>
                </a-select>
              </a-form-item>

              <a-form-item label="最大数量">
                <a-input-number
                  v-model:value="currentItem.props.maxCount"
                  :min="1"
                  style="width: 100%"
                  @change="handlePropertyChange"
                />
              </a-form-item>
            </template>

            <!-- 开关特有属性 -->
            <template v-if="currentItem.type === 'switch'">
              <a-form-item label="选中文本">
                <a-input
                  v-model:value="currentItem.props.checkedChildren"
                  @change="handlePropertyChange"
                />
              </a-form-item>

              <a-form-item label="非选中文本">
                <a-input
                  v-model:value="currentItem.props.unCheckedChildren"
                  @change="handlePropertyChange"
                />
              </a-form-item>
            </template>

            <!-- 滑动输入特有属性 -->
            <template v-if="currentItem.type === 'slider'">
              <a-form-item label="最小值">
                <a-input-number
                  v-model:value="currentItem.props.min"
                  style="width: 100%"
                  @change="handlePropertyChange"
                />
              </a-form-item>

              <a-form-item label="最大值">
                <a-input-number
                  v-model:value="currentItem.props.max"
                  style="width: 100%"
                  @change="handlePropertyChange"
                />
              </a-form-item>

              <a-form-item label="步长">
                <a-input-number
                  v-model:value="currentItem.props.step"
                  :min="0"
                  :step="0.01"
                  style="width: 100%"
                  @change="handlePropertyChange"
                />
              </a-form-item>
            </template>

            <!-- 评分特有属性 -->
            <template v-if="currentItem.type === 'rate'">
              <a-form-item label="星星数量">
                <a-input-number
                  v-model:value="currentItem.props.count"
                  :min="1"
                  :max="10"
                  style="width: 100%"
                  @change="handlePropertyChange"
                />
              </a-form-item>

              <a-form-item>
                <a-checkbox
                  v-model:checked="currentItem.props.allowHalf"
                  @change="handlePropertyChange"
                >
                  允许半星
                </a-checkbox>
              </a-form-item>
            </template>
          </div>

          <!-- 验证规则 -->
          <div class="property-section">
            <div class="section-title">验证规则</div>

            <a-form-item label="内置规则">
              <a-checkbox-group
                v-model:value="currentItem.props.rules"
                @change="handlePropertyChange"
              >
                <a-checkbox value="email">邮箱</a-checkbox>
                <a-checkbox value="url">网址</a-checkbox>
                <a-checkbox value="phone">手机号</a-checkbox>
                <a-checkbox value="idcard">身份证</a-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </div>
        </a-form>
      </template>

      <div v-else class="empty-tip">
        <p>请选择一个表单项进行编辑</p>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.property-panel {
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
    padding: 16px;
    overflow-y: auto;

    .property-section {
      margin-bottom: 24px;

      .section-title {
        margin-bottom: 16px;
        padding-bottom: 8px;
        font-weight: 500;
        border-bottom: 1px solid #f0f0f0;
      }

      .option-item {
        display: flex;
        align-items: center;
        margin-bottom: 8px;

        .ant-input {
          margin-right: 8px;
        }
      }
    }

    .empty-tip {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: #00000073;
      font-size: 14px;
    }
  }
}
</style>
