import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: $t('page.dashboard.title'),
    },
    name: 'Dashboard',
    path: '/dashboard',
    children: [
      {
        name: 'Analytics',
        path: '/analytics',
        component: () => import('#/views/dashboard/analytics/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: $t('page.dashboard.analytics'),
        },
      },
      {
        name: 'Workspace',
        path: '/workspace',
        component: () => import('#/views/dashboard/workspace/index.vue'),
        meta: {
          icon: 'ion:briefcase-outline',
          title: $t('page.dashboard.workspace'),
          order: 2,
        },
      },
      {
        name: 'Monitor',
        path: '/monitor',
        component: () => import('#/views/dashboard/monitor/index.vue'),
        meta: {
          icon: 'ion:desktop-outline',
          title: $t('page.dashboard.monitor'),
          order: 1,
          badge: 'New',
        },
      },
    ],
  },
];

export default routes;
