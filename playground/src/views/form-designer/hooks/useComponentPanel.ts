import { computed, ref } from 'vue';

import { componentGroups } from '../mock';

export function useComponentPanel() {
  // 分组展开状态
  const expandedGroups = ref<Record<string, boolean>>({
    basic: true,
    form: true,
  });

  // 搜索关键词
  const searchKeyword = ref('');

  // 过滤后的组件分组
  const filteredGroups = computed(() => {
    return componentGroups
      .map((group) => ({
        ...group,
        components: group.components.filter(
          (component) =>
            component.name.includes(searchKeyword.value) ||
            group.title.includes(searchKeyword.value),
        ),
      }))
      .filter((group) => group.components.length > 0);
  });

  // 切换分组展开状态
  const toggleGroup = (key: string) => {
    expandedGroups.value[key] = !expandedGroups.value[key];
  };

  return {
    expandedGroups,
    searchKeyword,
    filteredGroups,
    toggleGroup,
  };
}
