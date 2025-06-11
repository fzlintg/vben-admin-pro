import { useFormDesignerStore } from '../store';

export function useDnd() {
  const formDesignerStore = useFormDesignerStore();

  const drag = (evt, component) => {
    evt.dataTransfer.setData('text/plain', JSON.stringify(component));
    formDesignerStore.setDraggingComponent(component);
  };

  const drop = (evt) => {
    const data = evt.dataTransfer.getData('text/plain');
    if (data) {
      return JSON.parse(data);
    }
    return null;
  };

  return {
    drag,
    drop,
  };
}
