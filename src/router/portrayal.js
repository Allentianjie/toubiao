// import router from './index'
// 画像 router

export default [
  {
    path: '/student',
    name: 'student',
    meta: {
      menuType: 'student',
      title: '学生画像',
      requireAuth: true
    },
    component: () => import('@/views/portrayal/student')
  },
  {
    path: '/teacher',
    name: 'teacher',
    meta: {
      menuType: 'teacher',
      title: '教师画像',
      requireAuth: true
    },
    component: () => import('@/views/portrayal/teacher')
  },
  {
    path: '/course',
    name: 'course',
    meta: {
      menuType: 'course',
      title: '课程画像',
      requireAuth: true
    },
    component: () => import('@/views/portrayal/course')
  },
  {
    path: '/major',
    name: 'major',
    meta: {
      menuType: 'major',
      title: '专业画像',
      requireAuth: true
    },
    component: () => import('@/views/portrayal/major')
  }
]
