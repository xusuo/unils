export default [
  {
    path: '/count/stationList',
    name: 'stationList',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/substation/count/StationList'], resolve)
  },
  {
    path: '/count/operateCount',
    name: 'operateCount',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/substation/count/OperateCount'], resolve)
  },
  {
    path: '/count/marketCount',
    name: 'marketCount',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/substation/count/MarketCount'], resolve)
  },
  {
    path: '/count/agentCount',
    name: 'agentCount',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/substation/count/AgentCount'], resolve)
  }
]
