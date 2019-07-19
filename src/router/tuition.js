export default [
  {
    path: '/sdeptTuition',
    component: () => import('@/views/ledDriver/substratum/tuitionChart/sdept'),
    meta: {title: '系部学费'}
  },
  {
    path: '/majorTuition',
    component: () => import('@/views/ledDriver/substratum/tuitionChart/major'),
    meta: {title: '专业学费'}
  },
  {
    path: '/classTuition',
    component: () => import('@/views/ledDriver/substratum/tuitionChart/class'),
    meta: {title: '班级学费'}
  },
  {
    path: '/listTuition',
    component: () => import('@/views/ledDriver/substratum/tuitionChart/list'),
    meta: {title: '学费明细'}
  },
]
