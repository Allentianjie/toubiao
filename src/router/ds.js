// import router from './index'

export default [
    {
      path: '/trend',
      name: 'trend',
      meta: {
        menuType: 'trend',
        title: '数据看板',
        requireAuth: true
      },
      component:() => import('@/views/dataView/revisetrend')
    },
    {
      path: '/reviseAnalysis',
      name: 'reviseAnalysis',
      meta: {
        menuType: 'reviseAnalysis',
        title: '数据趋势分析',
        requireAuth: true
      },
      component:() => import('@/views/dataView/reviseAnalysis.vue')
    },
    {
      path: '/indexdetails',
      name: 'indexdetails',
      meta: {
        menuType: 'dataView',
        title: '指标下砖',
        requireAuth: true
      },
      component:() => import('@/views/dataView/Indexdetails')
    },
    {
        path: '/setup',
        name: 'setup',
        meta: {
          menuType: 'dataView',
          title: '诊改架构体系',
          requireAuth: true
        },
        component:() => import('@/views/dataView/revisesetup')
      },
    {
        path: '/process',
        name: 'process',
        meta: {
          menuType: 'dataView',
          title: '诊改流程',
          requireAuth: true
        },
        component:() => import('@/views/dataView/reviseprocess')
      },
  ]
