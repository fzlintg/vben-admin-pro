import type { ComponentType } from '@core/ui-kit/form-ui/src/types';

export interface FormComponent {
  group: string;
  icon?: string;
  name: string;
  schema: Record<string, any>;
  type: ComponentType;
}

export interface ComponentGroup {
  components: FormComponent[];
  key: string;
  title: string;
}
