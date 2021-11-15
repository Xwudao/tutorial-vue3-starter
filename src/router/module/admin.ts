import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    component: () => import('@/pages/Admin.vue'),
    path: '/admin',
  },
];

export default routes;
