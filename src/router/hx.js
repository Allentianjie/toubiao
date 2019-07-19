// import router from './index'

export default [
  {
    path: '/student',
    name: 'student',
    meta: {
      menuType: 'student',
      title: '学生画像',
      requireAuth: true
    },
    component:() => import('@/views/portrait/studentPortrait.vue')
  },
  {
    path: '/teacher',
    name: 'teacher',
    meta: {
      menuType: 'teacher',
      title: '教师画像',
      requireAuth: true
    },
    component:() => import('@/views/portrait/teacherPortrait.vue')
  },
  {
    path: '/major',
    name: 'major',
    meta: {
      menuType: 'major',
      title: '专业画像',
      requireAuth: true
    },
    component:() => import('@/views/portrait/majorPortrait.vue')
  },
  {
    path: '/course',
    name: 'course',
    meta: {
      menuType: 'course',
      title: '课程画像',
      requireAuth: true
    },
    component:() => import('@/views/portrait/coursePortrait.vue')
  },

]
