import type { ComponentGroup } from './types';

export const componentGroups: ComponentGroup[] = [
  {
    title: '基础组件',
    key: 'basic',
    components: [
      {
        name: '按钮',
        type: 'Button',
        icon: 'ion:radio-button-off',
        group: 'basic',
        schema: {
          component: 'Button',
          componentProps: {
            type: 'default',
          },
        },
      },
      {
        name: '文本',
        type: 'Text',
        icon: 'ion:text-outline',
        group: 'basic',
        schema: {
          component: 'TypographyText',
        },
      },
    ],
  },
  {
    title: '表单输入',
    key: 'form',
    components: [
      {
        name: '输入框',
        type: 'Input',
        icon: 'ion:input-outline',
        group: 'form',
        schema: {
          component: 'Input',
          componentProps: {
            placeholder: '请输入',
          },
        },
      },
      {
        name: '选择框',
        type: 'Select',
        icon: 'ion:chevron-down-outline',
        group: 'form',
        schema: {
          component: 'Select',
          componentProps: {
            options: [],
          },
        },
      },
    ],
  },
];
