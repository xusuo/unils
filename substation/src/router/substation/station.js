export default [
  {
    path: '/station/priceRule',
    name: 'priceRule',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/substation/station/PriceRule'], resolve)
  },
  {
    path: '/station/operateManger',
    name: 'operateManger',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/substation/station/OperateManger'], resolve)
  },
  {
    path: '/station/marketManger',
    name: 'marketManger',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/substation/station/MarketManger'], resolve)
  },
  {
    path: '/station/agentManger',
    name: 'agentManger',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/substation/station/AgentManger'], resolve)
  },
  {
    path: '/station/agentManger/detail',
    name: 'agentMangerDetail',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/substation/station/AgentDetail'], resolve)
  }
]
