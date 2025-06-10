import {
  Cascader,
  CheckboxGroup,
  DatePicker,
  Input,
  InputNumber,
  RadioGroup,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  Upload,
} from 'ant-design-vue';

// 获取表单组件
export const getFormComponent = (type: string) => {
  switch (type) {
    case 'cascader': {
      return Cascader;
    }
    case 'checkbox': {
      return CheckboxGroup;
    }
    case 'date': {
      return DatePicker;
    }
    case 'input': {
      return Input;
    }
    case 'number': {
      return InputNumber;
    }
    case 'radio': {
      return RadioGroup;
    }
    case 'rate': {
      return Rate;
    }
    case 'select': {
      return Select;
    }
    case 'slider': {
      return Slider;
    }
    case 'switch': {
      return Switch;
    }
    case 'textarea': {
      return Input.TextArea;
    }
    case 'time': {
      return TimePicker;
    }
    case 'upload': {
      return Upload;
    }
    default: {
      return Input;
    }
  }
};

// 获取组件默认属性
export const getDefaultProps = (type: string) => {
  const commonProps = {
    label: '未命名',
    name: '',
    required: false,
    rules: [],
  };

  switch (type) {
    case 'cascader': {
      return {
        ...commonProps,
        placeholder: '请选择',
        options: [],
      };
    }
    case 'checkbox': {
      return {
        ...commonProps,
        options: [
          { label: '选项1', value: 'option1' },
          { label: '选项2', value: 'option2' },
        ],
      };
    }
    case 'date': {
      return {
        ...commonProps,
        placeholder: '请选择日期',
        format: 'YYYY-MM-DD',
        showTime: false,
      };
    }
    case 'input': {
      return {
        ...commonProps,
        placeholder: '请输入',
        maxLength: undefined,
        prefix: '',
      };
    }
    case 'number': {
      return {
        ...commonProps,
        placeholder: '请输入',
        min: undefined,
        max: undefined,
        step: 1,
      };
    }
    case 'radio': {
      return {
        ...commonProps,
        options: [
          { label: '选项1', value: 'option1' },
          { label: '选项2', value: 'option2' },
        ],
      };
    }
    case 'rate': {
      return {
        ...commonProps,
        count: 5,
        allowHalf: false,
      };
    }
    case 'select': {
      return {
        ...commonProps,
        placeholder: '请选择',
        options: [
          { label: '选项1', value: 'option1' },
          { label: '选项2', value: 'option2' },
        ],
      };
    }
    case 'slider': {
      return {
        ...commonProps,
        min: 0,
        max: 100,
        step: 1,
      };
    }
    case 'switch': {
      return {
        ...commonProps,
        checkedChildren: '是',
        unCheckedChildren: '否',
      };
    }
    case 'textarea': {
      return {
        ...commonProps,
        placeholder: '请输入',
        maxLength: undefined,
        rows: 4,
      };
    }
    case 'time': {
      return {
        ...commonProps,
        placeholder: '请选择时间',
        format: 'HH:mm:ss',
      };
    }
    case 'upload': {
      return {
        ...commonProps,
        listType: 'text',
        maxCount: 1,
        action: '',
      };
    }
    default: {
      return commonProps;
    }
  }
};

// 获取验证规则配置
export const getValidationRules = () => {
  return {
    email: {
      pattern: /^[\w-]+@[\w-]+(\.[\w-]+)+$/,
      message: '请输入正确的邮箱地址',
    },
    url: {
      pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*$/,
      message: '请输入正确的网址',
    },
    phone: {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号',
    },
    idcard: {
      pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}([\dX])$)/i,
      message: '请输入正确的身份证号',
    },
  };
};
