export default [
  {
    path: '/index/withdraw',
    name: 'withdrawApplay',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/substation/overview/Withdraw'], resolve),
    redirect: '/index/withdraw/apply'
  },
  {
    path: '/index/withdraw/:tabname',
    name: 'withdrawApplayTab',
    meta: {
      requireAuth: true,
      parentPath: "/substation/index"
    },
    component: resolve => require(['@/pages/substation/overview/Withdraw'], resolve)
  },
  {
    path: '/index/profitTrial',
    name: 'profitTrial',
    meta: {
      requireAuth: true,
      parentPath: "/substation/index"
    },
    component: resolve => require(['@/pages/substation/overview/ProfitTrial'], resolve)
  },
]
