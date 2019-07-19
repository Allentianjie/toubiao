import Vue from 'vue'
import Router from 'vue-router'
import lq from './lq'
import ts from './ts'
import ds from './ds'
import po from './portrayal' // 画像
import hx from './hx'
import an from './an'
import led from './led'
import downChar from './downChar'
import tuition from './tuition'
import classRoom from './classRoom'
import drives from './drives'
Vue.use(Router);

let routes = [
  {
    path: '/HelloWorld',
    name: 'HelloWorld',
    component: () => import('@/components/HelloWorld.vue')
  },
  {
    path: '/cassso',
    name: 'cassso',
    component: () => import ('@/components/cassso.vue')
  },
  {
    path: '/',
    name: '登录页',
    component: () => import('@/components/page/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      menuType: 'home',
      title: '首页',
      requireAuth: true
    },
    component: (resolve) => require(['@/components/common/Home.vue'], resolve),
    // component:() => import('@/views/home'),
    children: [
      {
        path: '/wuData',
        name: 'wuData',
        meta: {
          menuType: 'wuData',
          title: '无数据',
          requireAuth: true
        },
        component: () => import('@/views/home/wuData.vue')
      },
      {
        path: '/cockpit',
        name: 'cockpit',
        meta: {
          menuType: 'cockpit',
          title: '驾驶舱',
          requireAuth: true
        },
        component: () => import('@/views/cockpit')
      },
      {
        path: '/menuCustom',
        name: 'menuCustom',
        meta: {
          menuType: 'menuCustom',
          title: '自定义菜单',
          requireAuth: true
        },
        component: () => import('@/views/menuCustom')
      },
      {
        path: '/dataView',
        name: 'dataView',
        meta: {
          menuType: 'dataView',
          title: '数据看板',
          requireAuth: true
        },
        component: () => import('@/views/dataView'),
        children: [
          ...ds,
        ]
      },
      {
        path: '/monitoring',
        name: 'monitoring',
        meta: {
          menuType: 'monitoring',
          title: '监控大屏',
          requireAuth: true
        },
        component: () => import('@/views/monitoring')
      },
      {
        path: '/diagnosis',
        name: 'diagnosis',
        meta: {
          menuType: 'diagnosis',
          title: '体系层面',
          requireAuth: true
        },
        component: () => import('@/views/diagnosis'),
      },
      {
        path: '/diagnosdetails',
        name: 'diagnosdetails',
        meta: {
          menuType: 'diagnosis',
          title: '诊断报告',
          requireAuth: true
        },
        component: () => import('@/views/diagnosis/diagnosdetails.vue')
      },
      {
        path: '/indicatorsImport',
        name: 'indicatorsImport',
        meta: {
          menuType: 'indicatorsImport',
          title: '指标导入',
          requireAuth: true
        },
        component: () => import('@/views/indicatorsImport/index.vue')
      },
      {
        path: '/origanization',
        name: 'origanization',
        meta: {
          menuType: 'origanization',
          title: '组织架构图',
          requireAuth: true
        },
        component: () => import('@/views/origanization/index.vue')
      },
      {
        path: '/indexAnalysis',
        name: 'indexAnalysis',
        meta: {
          menuType: 'indexAnalysis',
          title: '诊改分析报告',
          requireAuth: true
        },
        component: () => import('@/views/diagnosis/indexAnalysis.vue')
      },
      {
        path: '/taskReport',
        name: 'taskReport',
        meta: {
          menuType: 'taskReport',
          title: '任务大厅',
          requireAuth: true
        },
        component: () => import('@/views/taskReport'),
        children: [
          ...ts,
        ]
      },
      {
        path: '/doubleStrand',
        name: 'doubleStrand',
        meta: {
          menuType: 'doubleStrand',
          title: '诊改双链',
          requireAuth: true
        },
        component: () => import('@/views/doubleStrand')
      },
      {
        path: '/analyze',
        name: 'analyze',
        meta: {
          menuType: 'analyze',
          title: '质量分析',
          requireAuth: true
        },
        component: () => import('@/views/analyze/index.vue')
      },
      {
        path: '/menuCustom',
        name: 'menuCustom',
        meta: {
          menuType: 'analyze',
          title: '超链接页面',
          requireAuth: true
        },
        component: () => import('@/views/menuCustom')
      },
        {
            path: '/WeChat',
            name: 'WeChat',
            meta: {
                menuType: 'WeChat',
                title: '微信',
                requireAuth: true
            },
            component: () => import('@/views/WeChat')
        },
      {
        path: '/fileManage',
        name: 'fileManage',
        meta: {
          menuType: 'fileManage',
          title: '文件管理',
          requireAuth: true
        },
        component: () => import('@/views/fileManage')
      },
      {
        path: '/systemManage',
        name: 'systemManage',
        meta: {
          menuType: 'systemManage',
          title: '系统管理',
          requireAuth: true
        },
        component: () => import('@/views/systemManage'),
        children: [
          ...lq,
        ]
      },
      {
        path: '/portrait',
        name: 'portrait',
        meta: {
          menuType: 'portrait',
          title: '画像分析',
          requireAuth: true
        },
        component: () => import('@/views/portrait'),
        children: [
          // ...hx,
        ]
      },
      {
        path: '/analysisSynthesis',
        name: 'analysisSynthesis',
        meta: {
          menuType: 'analysisSynthesis',
          title: '综合分析',
          requireAuth: true
        },
        component: () => import('@/views/analysisSynthesis'),
        children: [
          ...an,
        ]
      },
      {
        path: '/ledIndex',
        name: 'ledIndex',
        meta: {
          menuType: 'ledIndex',
          title: '校领导驾驶舱',
          requireAuth: true
        },
        component: () => import('@/views/ledDriver/index.vue'),
        children: [
          ...led,
        ]
      },
      // liao
      // 2019年5月24日15:29:42
      // Start
      { // 系领导驾驶舱 -- 明细
        path: '/cockpitInfo',
        name: 'cockpitInfo',
        meta: {
          menuType: 'cockpitInfo',
          title: '系领导驾驶舱--专业数据',
          requireAuth: true
        },
        component: () => import('@/views/ledDriver/cockpit-info')
      },
      ...drives,//驾驶舱及下钻页面（除校领导驾驶舱）--tianj
      ...tuition,//学费下钻--tianj
      ...classRoom,//教室下钻--tianj
      ...downChar,
      ...hx,
    ]
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    component: resolve => require(['../components/404.vue'], resolve),
    meta: { title: '404' }
  },
  {
    path: '/403',
    component: resolve => require(['../components/403.vue'], resolve),
    meta: { title: '403' }
  }
]
let router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  // Vue.$vux.loading.hide();
  // document.title = to.name
  next()
})

export default router

