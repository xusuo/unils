export default [
  {
    path: '/recharge/index',
    name: 'rechargeIndex',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/recharge/Index'], resolve)
  },
  {
    path: '/deductMoney/index',
    name: 'deductMoney',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/recharge/DeductMoney'], resolve)
  },
  {
    path: '/agentMoney/index',
    name: 'agentMoney',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/recharge/AgentMoney'], resolve)
  },
  {
    path: '/fundMoney/index',
    name: 'fundMoney',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/recharge/FundMoney'], resolve)
  },
  {
    path: '/withdraw/list',
    name: 'WithdrawList',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/recharge/WithdrawList'], resolve)
  },
]
