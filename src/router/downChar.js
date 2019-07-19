export default [
  {
    path: '/propertyTwoChar',
    name: 'propertyTwoChar',
    meta: {
      menuType: 'propertyTwoChar',
      title: '全校资产下钻1级图标',
      requireAuth: true
    },
    component:() => import('@/views/ledDriver/substratum/propertyChart/propertyTwoChar.vue')
  },
  {
    path: '/propertyTable',
    name: 'propertyTable',
    meta: {
      menuType: 'propertyTwoChar',
      title: '全校资产下钻2级图标',
      requireAuth: true
    },
    component:() => import('@/views/ledDriver/substratum/propertyChart/propertyTable.vue')
  },
  {
    path: '/courseTwoChart',
    name: 'courseTwoChart',
    meta: {
      menuType: 'courseTwoChart',
      title: '总课程下钻2级图表',
      requireAuth: true
    },
    component:() => import('@/views/ledDriver/substratum/courseChart/courseTwoChart.vue')
  },
  {
    path: '/courseThreeChart',
    name: 'courseThreeChart',
    meta: {
      menuType: 'courseThreeChart',
      title: '总课程下钻3级图表',
      requireAuth: true
    },
    component:() => import('@/views/ledDriver/substratum/courseChart/courseThreeChart.vue')
  },
  {
    path: '/courseFourChart',
    name: 'courseFourChart',
    meta: {
      menuType: 'courseFourChart',
      title: '全校资产下钻4级图表',
      requireAuth: true
    },
    component:() => import('@/views/ledDriver/substratum/courseChart/courseFourChart.vue')
  },
  {
    path: '/courseDetailTable',
    name: 'courseDetailTable',
    meta: {
      menuType: 'courseDetailTable',
      title: '课程总数 明细下钻',
      requireAuth: true
    },
    component: () => import('@/views/ledDriver/substratum/courseChart/courseDetailTable.vue')
  },
  {
    path: '/courseFiveTable',
    name: 'courseFiveTable',
    meta: {
      menuType: 'courseFiveTable',
      title: '全校资产下钻5级表格',
      requireAuth: true
    },
    component:() => import('@/views/ledDriver/substratum/courseChart/courseFiveTable.vue')
  },
  {
    path: '/leftUphonor',
    name: 'leftUphonor',
    meta: {
      menuType: 'leftUphonor',
      title: '办学荣誉/实训基地表格',
      requireAuth: true
    },
    component:() => import('@/views/ledDriver/substratum/leftUphonor.vue')
  },
  {
    path: '/LedDriverDetails',
    name: 'LedDriverDetails',
    meta: {
      menuType: 'LedDriverDetails',
      title: '校领导驾驶舱-预警概况',
      requireAuth: true
    },
    component:() => import('@/views/ledDriver/substratum/LedDriverDetails.vue')
  },
  {
    path: '/collectTabel',
    name: 'collectTabel',
    meta: {
      menuType: 'collectTabel',
      title: '收藏指标',
      requireAuth: true
    },
    component:() => import('@/views/collectIndex/collectTabel.vue')
  },
  {
    path: '/attentionTabel',
    name: 'attentionTabel',
    meta: {
      menuType: 'attentionTabel',
      title: '关注指标',
      requireAuth: true
    },
    component:() => import('@/views/collectIndex/attentionTabel.vue')
  },
  {
    path: '/shareTabel',
    name: 'shareTabel',
    meta: {
      menuType: 'shareTabel',
      title: '分享指标',
      requireAuth: true
    },
    component:() => import('@/views/collectIndex/shareTabel.vue')
  },
  {
    path: '/receiveTabel',
    name: 'receiveTabel',
    meta: {
      menuType: 'receiveTabel',
      title: '共享指标',
      requireAuth: true
    },
    component:() => import('@/views/collectIndex/receiveTabel.vue')
  },

]
