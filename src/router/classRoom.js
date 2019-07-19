export default [
  {
    path: '/building',
    component: () => import('@/views/ledDriver/substratum/classRoom/Building'),
    meta: { title: '建筑物' }
  },
  {
    path: '/floor',
    component: () => import('@/views/ledDriver/substratum/classRoom/Floor'),
    meta: { title: '楼层' }
  },
  {
    path: '/classType',
    component: () => import('@/views/ledDriver/substratum/classRoom/classType'),
    meta: { title: '教室' }
  },
  {
    path: '/roomType',
    component: () => import('@/views/ledDriver/substratum/classRoom/RoomType'),
    meta: { title: '教室类型' }
  },
  {
    path: '/listDeails',
    component: () => import('@/views/ledDriver/substratum/classRoom/listDeails'),
    meta: { title: '教室明细' }
  },
]
