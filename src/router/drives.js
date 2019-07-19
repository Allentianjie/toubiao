export default [
  {
    path: '/courseTable',
    name: 'courseTable',
    meta: {
      menuType: 'courseTable',
      title: '课程',
      requireAuth: true
    },
    component: () => import('@/views/ledDriver/substratum/courseTable.vue')
  },
  {
    // 专业下钻列表下钻到学生列表
    path: '/studentTable',
    name: 'studentTable',
    meta: {
      menuType: 'studentTable',
      title: '学生下钻列表',
      requireAuth: true
    },
    component: () => import('@/views/ledDriver/substratum/studentTable.vue')
  },
  {
    // 课程下钻列表下钻到图标
    path: '/theoryTwoChar',
    name: 'theoryTwoChar',
    meta: {
      menuType: 'theoryTwoChar',
      title: '课程下钻第一层图表',
      requireAuth: true
    },
    component: () => import('@/views/ledDriver/substratum/theoryChart/theoryTwoChar.vue')
  },
  {
    // 课程下钻列表下钻到图标
    path: '/theoryThreeChar',
    name: 'theoryThreeChar',
    meta: {
      menuType: 'courseTable',
      title: '课程下钻第二层图表',
      requireAuth: true
    },
    component: () => import('@/views/ledDriver/substratum/theoryChart/theoryThreeChar.vue')
  },
  {
    // 课程下钻列表下钻到图标
    path: '/theoryTable',
    name: 'courseTwoTable',
    meta: {
      menuType: 'courseTable',
      title: '课程下钻图表 - 列表',
      requireAuth: true
    },
    component: () => import('@/views/ledDriver/substratum/theoryChart/theoryTable.vue')
  },
  {
    path: '/indicatorsNum',
    name: 'indicatorsNum',
    meta: {
      menuType: 'indicatorsNum',
      title: '指标',
      requireAuth: true
    },
    component: () => import('@/views/ledDriver/substratum/indicatorsNum.vue')
  },
  {
    path: '/award',
    name: 'award',
    meta: {
      menuType: 'award',
      title: '论文/获奖',
      requireAuth: true
    },
    component: () => import('@/views/ledDriver/substratum/deanOffice/award.vue')
  },
  {
    path: '/indicatorsNum',
    name: 'indicatorsNum',
    meta: {
      menuType: 'indicatorsNum',
      title: '教师',
      requireAuth: true
    },
    component: () => import('@/views/ledDriver/substratum/indicatorsNum.vue')
  },
  {
    path: '/teacherTable',
    name: 'teacherTable',
    meta: {
      menuType: 'teacherTable',
      title: '教师',
      requireAuth: true
    },
    component: () => import('@/views/ledDriver/substratum/teacherTable.vue')
  },
  {
    path: '/twoChart',
    name: 'twoChart',
    meta: {
      menuType: 'twoChart',
      title: '领导驾驶舱-2级页面',
      requireAuth: true
    },
    component: () => import('@/views/ledDriver/substratum/school/twoChart.vue')
  },
  {
    path: '/studentTwoChart',
    name: 'studentTwoChart',
    meta: {
      menuType: 'studentTwoChart',
      title: '学生下钻1级页面',
      requireAuth: true
    },
    component: () => import('@/views/ledDriver/substratum/studentChart/studentTwoChart.vue')
  },
  {
    path: '/stdentThreeChart',
    name: 'stdentThreeChart',
    meta: {
      menuType: 'stdentThreeChart',
      title: '学生下钻2级页面',
      requireAuth: true
    },
    component: () => import('@/views/ledDriver/substratum/studentChart/stdentThreeChart.vue')
  },
  {
    path: '/studentfourChart',
    name: 'studentfourChart',
    meta: {
      menuType: 'studentfourChart',
      title: '学生下钻3级页面',
      requireAuth: true
    },
    component: () => import('@/views/ledDriver/substratum/studentChart/studentfourChart.vue')
  },
  {
    // / 除了专业下钻列表，其余下钻到学生列表
    path: '/studentFiveTable',
    name: 'studentFiveTable',
    meta: {
      menuType: 'studentFiveTable',
      title: '学生系专业班级下钻列表',
      requireAuth: true
    },
    component: () => import('@/views/ledDriver/substratum/studentChart/studentFiveTable.vue')
  },
  {
    path: '/majorTwoChart',
    name: 'majorTwoChart',
    meta: {
      menuType: 'majorTwoChart',
      title: '教务处-专业-2级页面',
      requireAuth: true
    },
    component: () => import('@/views/ledDriver/substratum/majorChart/majorTwoChart.vue')
  },
  {
    path: '/majorThreeTable',
    name: 'majorThreeTable',
    meta: {
      menuType: 'majorThreeTable',
      title: '教务处-专业-3级页面',
      requireAuth: true
    },
    component: () => import('@/views/ledDriver/substratum/majorChart/majorThreeTable.vue')
  },
  {
    path: '/fourTable',
    name: 'fourTable',
    meta: {
      menuType: 'fourTable',
      title: '领导驾驶舱-表格页面',
      requireAuth: true
    },
    component: () => import('@/views/ledDriver/substratum/school/fourTable.vue')
  },
  {
    path: '/departDriver',
    name: 'departDriver',
    meta: {
      menuType: 'departDriver',
      title: '系领导驾驶舱',
      requireAuth: true
    },
    component: () => import('@/views/departDriver')
  },
  {
    path: '/deanOffice',
    name: 'deanOffice',
    meta: {
      menuType: 'deanOffice',
      title: '教务处驾驶舱',
      requireAuth: true
    },
    component: () => import('@/views/deanOfficeDriver')
  },
  {
    path: '/studyWorker',
    name: 'studyWorker',
    meta: {
      menuType: 'studyWorker',
      title: '学工处驾驶舱',
      requireAuth: true
    },
    component: () => import('@/views/studyWorkerDriver')
  },
  {
    path: '/matters',
    name: 'matters',
    meta: {
      menuType: 'matters',
      title: '人事处驾驶舱',
      requireAuth: true
    },
    component: () => import('@/views/mattersDriver')
  },
]
