export default [
  // 我的代理
  {
    path: '/market/myAgent',
    name: 'marketMyAgent',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/market/MyAgent'], resolve)
  },
  // 我的商家
  {
    path: '/market/mySeller',
    name: 'marketMySeller',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/market/MySeller'], resolve)
  },
  // 资金管理
  {
    path: '/market/withdrawApplay',
    name: 'marketWithdrawApplay',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/market/Withdraw'], resolve),
    redirect: '/market/withdraw/apply'
  },
  // 提现/入账流水
  {
    path: '/market/withdraw/:tabname',
    name: 'marketWithdrawApplayTab',
    meta: {
      requireAuth: true,
      parentPath: "/market/withdrawApplay"
    },
    component: resolve => require(['@/pages/market/Withdraw'], resolve)
  },
  // 运营报表
  {
    path: '/market/operateList',
    name: 'marketOperateList',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/market/OperateList'], resolve)
  },
  // 运营日报
  {
    path: '/market/operateList/:tabname',
    name: 'marketOperateListTab',
    meta: {
      requireAuth: true,
      parentPath: "/market/operateList"
    },
    component: resolve => require(['@/pages/market/OperateList'], resolve)
  },
  {
    path: '/market/profitTrial',
    name: 'marketnProfitTrial',
    meta: {
      requireAuth: true,
      parentPath: "/market/index"
    },
    component: resolve => require(['@/pages/market/ProfitTrial'], resolve)
  }
]
