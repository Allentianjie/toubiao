// import router from './index'

export default [
  {
    path: '/info',
    name: 'info',
    meta: {
      menuType: 'info',
      title: '驾驶舱',
      requireAuth: true
    },
    component:() => import('@/views/systemManage/cockpitManagement/info')
  },
  {
    path: '/func',
    name: 'func',
    meta: {
      menuType: 'func',
      title: '功能模块',
      requireAuth: true
    },
    component:() => import('@/views/systemManage/cockpitManagement/func')
  },
  {
    path: '/sysManage',
    name: 'sysManage',
    meta: {
      menuType: 'sysManage',
      title: '系统用户',
      requireAuth: true
    },
    component:() => import('@/views/systemManage/system/sysManage')
  },
  {
    path: '/userManage',
    name: 'userManage',
    meta: {
      menuType: 'userManage',
      title: '用户用户',
      requireAuth: true
    },
    component:() => import('@/views/systemManage/system/uesrManage')
  },
  {
    path: '/workersManage',
    name: 'workersManage',
    meta: {
      menuType: 'workersManage',
      title: '职工管理',
      requireAuth: true
    },
    component:() => import('@/views/systemManage/system/workersManage')
  },
  {
    path: '/teacherManage',
    name: 'teacherManage',
    meta: {
      menuType: 'teacherManage',
      title: '教师管理',
      requireAuth: true
    },
    component:() => import('@/views/systemManage/system/teacherManage')
  },
  {
    path: '/studentManage',
    name: 'studentManage',
    meta: {
      menuType: 'studentManage',
      title: '学生管理',
      requireAuth: true
    },
    component:() => import('@/views/systemManage/system/studentManage')
  },
  {
    path: '/menuManage',
    name: 'menuManage',
    meta: {
      menuType: 'menuManage',
      title: '菜单管理',
      requireAuth: true
    },
    component:() => import('@/views/systemManage/system/menuManage')
  },
  {
    path: '/roleManage',
    name: 'roleManage',
    meta: {
      menuType: 'roleManage',
      title: '角色管理',
      requireAuth: true
    },
    component:() => import('@/views/systemManage/system/roleManage')
  },
  {
  path: '/depManage',
  name: 'depManage',
  meta: {
  menuType: 'depManage',
    title: '部门管理',
    requireAuth: true
},
component:() => import('@/views/systemManage/system/depManage')
},
  {
    path: '/dictManage',
    name: 'dictManage',
    meta: {
      menuType: 'dictManage',
      title: '数据字典',
      requireAuth: true
    },
    component:() => import('@/views/systemManage/system/dictManage')
  },
  {
    path: '/menuManage',
    name: 'menuManage',
    meta: {
      menuType: 'menuManage',
      title: '菜单管理',
      requireAuth: true
    },
    component:() => import('@/views/systemManage/system/menuManage')
  },
  {
    path: '/sysParamMange',
    name: 'sysParamMange',
    meta: {
      menuType: 'sysParamMange',
      title: '系统参数',
      requireAuth: true
    },
    component:() => import('@/views/systemManage/system/paramsManage')
  },
  {
    path: '/basisData',
    name: 'basisData',
    meta: {
      menuType: 'basisData',
      title: '基础数据管理',
      requireAuth: true
    },
    component:() => import('@/views/systemManage/dataManage/basisData/basisIndex.vue')
  },
  {
    path: '/valueIndex',
    name: 'valueIndex',
    meta: {
      menuType: 'basisData',
      title: '数值管理',
      requireAuth: true
    },
    component:() => import('@/views/systemManage/dataManage/valueManage/valueIndex.vue')
  },
  {
    path: '/tolog',
    name: 'logIndex',
    meta: {
      menuType: 'basisData',
      title: '日志管理',
      requireAuth: true
    },
    component:() => import('@/views/systemManage/dataManage/tolog/tologIndex.vue')
  },
  {
    path: '/chartData',
    name: 'chartData',
    meta: {
      menuType: 'chartData',
      title: '图表数据',
      requireAuth: true
    },
    component:() => import('@/views/systemManage/dataManage/chartData/chartIndex.vue')
  },
  {
    path: '/analysisTemplate',
    name: 'analysisTemplate',
    meta: {
      menuType: 'analysisTemplate',
      title: '模版管理',
      requireAuth: true
    },
    component:() => import('@/views/systemManage/analysisTemplateManage/template/index.vue')
  },
  {
    path: '/analysisReport',
    name: 'analysisReport',
    meta: {
      menuType: 'analysisReport',
      title: '报告管理',
      requireAuth: true
    },
    component:() => import('@/views/systemManage/analysisTemplateManage/report/index.vue')
  },
]
