export default [
  // 分站管理
  {
    path: '/channel/stationManger',
    name: 'channelStationManger',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/channel/StationManger'], resolve)
  },
  // 渠道报表
  {
    path: '/channel/getwayList',
    name: 'channelGetwayList',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/channel/GetwayList'], resolve)
  },
  // 分站报表
  {
    path: '/channel/stationList',
    name: 'channelStationList',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/channel/StationList'], resolve)
  },
  // 分站详细
  {
    path: '/channel/stationDetail',
    name: 'channelStationDetail',
    meta: {
      requireAuth: true,
      parentPath: '/channel/stationManger'
    },
    component: resolve => require(['@/pages/channel/StationDetail'], resolve)
  },
  // 提现
  {
    path: '/channel/withdraw', 
    name: 'channelWithdraw',
    meta: {
      requireAuth: true,
      parentPath: '/channe/index'
    },
    component: resolve => require(['@/pages/channel/Withdraw'], resolve)
  },
  // 查看流水
  {
    path: '/channel/accountDetail',
    name: 'channelAccountDetail',
    meta: {
      requireAuth: true,
      parentPath: '/channe/index'
    },
    component: resolve => require(['@/pages/channel/AccountDetail'], resolve)
  },
  // 奖金趋势
  {
    path: '/channel/profitTrial',
    name: 'channelProfitTrial',
    meta: {
      requireAuth: true,
      parentPath: '/channe/index'
    },
    component: resolve => require(['@/pages/channel/ProfitTrial'], resolve)
  }
]
