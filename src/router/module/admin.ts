import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    component: () => import('@/pages/Admin.vue'),
    path: '/admin',
    redirect: { name: 'Dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/admin/Dashboard.vue'),
      },
      {
        path: 'userList',
        name: 'UserList',
        component: () => import('@/pages/admin/UserList.vue'),
      },
    ],
  },
];

export default routes;
