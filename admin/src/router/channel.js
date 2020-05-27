export default [
  {
    path: '/channel/list',
    name: 'channelList',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/channel/List'], resolve)
  },
  {
    path: '/channel/report',
    name: 'channelReport',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/channel/Report'], resolve)
  },
  {
    path: '/channel/list/setCost',
    name: 'channelSetCost',
    meta: {
      requireAuth: true,
      parentPath: '/channel/list'
    },
    component: resolve => require(['@/pages/channel/SetCost'], resolve)
  },
  {
    path: '/channel/bill',
    name: 'channelBill',
    meta: {
      requireAuth: true,
      parentPath: '/channel/bill'
    },
    component: resolve => require(['@/pages/channel/Bill'], resolve)
  }
]
