export default [
  {
    path: '/ledDriver',
    name: 'ledDriver',
    meta: {
      menuType: 'ledDriver',
      title: '校领导驾驶舱',
      requireAuth: true
    },
    component:() => import('@/views/ledDriver/ledDriver.vue')
  },


]
