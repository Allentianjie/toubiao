export default [
  {
    path: '/lead-cockpit',
    name: 'cockpit',
    meta: {
      menuType: 'cockpit',
      title: '领导驾驶舱',
      requireAuth: true
    },
    component: () => import('@/views/totle-cockpit/lead/index.vue')
  },
  {
    path: '/director',
    name: 'director',
    meta: {
      menuType: 'director',
      title: '系主任驾驶舱',
      requireAuth: true
    },
    component: () => import('@/views/totle-cockpit/director/index.vue')
  }
]
