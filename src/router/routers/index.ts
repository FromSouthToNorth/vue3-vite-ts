import type { AppRouteRecordRaw } from '/@/router/types'

// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: 'helloWorld',
  component: () => import('/@/layouts/default/content/index.vue'),
  meta: {
    title: 'Root',
  },
  children: [
    {
      path: 'helloWorld',
      name: 'HelloWorld',
      component: () => import('/@/views/index.vue'),
      meta: {
        title: 'helloWorld',
      },
    },
  ],
}

export const basicRoutes = [
  RootRoute,
]
