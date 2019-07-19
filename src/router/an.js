/* eslint-disable */

export default [
  {
    path: '/analysisProperty',
    name: 'analysisProperty',
    meta: {
      menuType: 'analysisProperty',
      title: '资产分析',
      requireAuth: true
    },
    component:() => import('@/views/analysisSynthesis/analysisProperty.vue')
  },
  {
    path: '/analysisTeachers',
    name: 'analysisTeachers',
    meta: {
      menuType: 'analysisTeachers',
      title: '师生分析',
      requireAuth: true
    },
    component:() => import('@/views/analysisSynthesis/analysisTeachers.vue')
  },
  {
    path: '/analysisCollege',
    name: 'analysisCollege',
    meta: {
      menuType: 'analysisCollege',
      title: '学院分析',
      requireAuth: true
    },
    component:() => import('@/views/analysisSynthesis/analysisCollege.vue')
  },
  {
    path: '/analysisExpenditure',
    name: 'analysisExpenditure',
    meta: {
      menuType: 'analysisExpenditure',
      title: '经费分析',
      requireAuth: true
    },
    component:() => import('@/views/analysisSynthesis/analysisExpenditure.vue')
  }
]
