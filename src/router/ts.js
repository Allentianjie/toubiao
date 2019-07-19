// import router from './index'

export default [
    {
      path: '/mytask',
      name: 'mytask',
      meta: {
        menuType: 'taskReport',
        title: '我的任务',
        requireAuth: true
      },
      component:() => import('@/views/taskReport/mytask')
    },
    {
    path: '/assignmentdetail',
    name: 'assignmentdetail',
    meta: {
      menuType: 'taskReport',
      title: '任务分派',
      requireAuth: true
    },
    component:() => import('@/views/taskReport/mytask/AssignmentDetail')
  },
    {
        path: '/taskreports',
        name: 'taskreports',
        meta: {
          menuType: 'taskReport',
          title: '任务报表',
          requireAuth: true
        },
        component:() => import('@/views/taskReport/taskreports')
      },
    {
      path: '/taskplanning',
      name: 'taskplanning',
      meta: {
        menuType: 'taskReport',
        title: '个人规划',
        requireAuth: true
      },
      component:() => import('@/views/taskReport/taskplanning')
    },
    {
      path: '/taskdetail',
      name: 'taskdetail',
      meta: {
        menuType: 'taskReport',
        title: '任务明细',
        requireAuth: true
      },
      component:() => import('@/views/taskReport/taskdetails')
    },
    {
        path: '/tasksFull',
        name: 'tasksFull',
        meta: {
          menuType: 'tasksFull',
          title: '查看其它人员任务',
          requireAuth: true
        },
        component:() => import('@/views/taskReport/taskdetails/tasksFull/tasksFullIndex.vue')
      },
    {
        path: '/obligation',
        name: 'obligation',
        meta: {
          menuType: 'obligation',
          title: '岗位职责',
          requireAuth: true
        },
        component:() => import('@/views/taskReport/obligation/obligation.vue')
      },
    {
        path: '/standard',
        name: 'standard',
        meta: {
          menuType: 'standard',
          title: '工作标准',
          requireAuth: true
        },
        component:() => import('@/views/taskReport/standard/standard.vue')
      },
    {
      path: '/userPost',
      name: 'userPost',
      meta: {
        menuType: 'userPost',
        title: '工作标准',
        requireAuth: true
      },
      component:() => import('@/views/taskReport/userPost/userPost.vue')
    },
    {
      path: '/teacherDevStandard',
      name: 'teacherDevStandard',
      meta: {
        menuType: 'teacherDevStandard',
        title: '教师发展标准',
        requireAuth: true
      },
      component:() => import('@/views/taskReport/teacherDevStandard/teacherDevStandard.vue')
    },
    {
      path: '/majorDevStandard',
      name: 'majorDevStandard',
      meta: {
        menuType: 'majorDevStandard',
        title: '专业建设标准',
        requireAuth: true
      },
      component:() => import('@/views/taskReport/majorDevStandard/majorDevStandard.vue')
    },
    {
      path: '/courseStandard',
      name: 'courseStandard',
      meta: {
        menuType: 'courseStandard',
        title: '课程标准',
        requireAuth: true
      },
      component:() => import('@/views/taskReport/courseStandard/courseStandard.vue')
    },
    {
      path: '/reform',
      name: 'reform',
      meta: {
        menuType: 'reform',
        title: '诊改措施',
        requireAuth: true
      },
      component:() => import('@/views/taskReport/reform/reform.vue')
    },
    {
    path: '/ruleRegulate',
    name: 'ruleRegulate',
    meta: {
      menuType: 'ruleRegulate',
      title: '规章制度',
      requireAuth: true
    },
    component:() => import('@/views/taskReport/ruleRegulate/ruleRegulate.vue')
  },
    {
      path: '/myfile',
      name: 'myfile',
      meta: {
        menuType: 'myfile',
        title: '我的文件',
        requireAuth: true
      },
      component:() => import('@/views/taskReport/myFile')
    },
  ]
