export default [
  // 我的商家
  {
    path: '/agency/mySeller',
    name: 'agencymMySeller',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/agency/MySeller'], resolve)
  },
  // 资金管理 (暂时弃用，用下面的)
  {
    path: '/agency/withdrawApplay',
    name: 'agencyWithdrawApplay',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/agency/Withdraw'], resolve),
    redirect: '/agency/withdraw/apply'
  },
  // 运营日报
  {
    path: '/agency/operateList',
    name: 'agencyOperateList',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/agency/OperateList'], resolve)
  },
  // 提现/入账流水
  {
    path: '/agency/withdraw/:tabname',
    name: 'agencyWithdrawApplayTab',
    meta: {
      requireAuth: true,
      parentPath: "/agency/withdrawApplay"
    },
    component: resolve => require(['@/pages/agency/Withdraw'], resolve)
  },
  // 奖金趋势
  {
    path: '/agency/profitTrial',
    name: 'agencyProfitTrial',
    meta: {
      requireAuth: true,
      parentPath: '/agency/index'
    },
    component: resolve => require(['@/pages/agency/ProfitTrial'], resolve)
  }
]
