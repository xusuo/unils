export default [
  {
    path: '/station/list',
    name: 'stationList',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/station/List'], resolve)
  },
  {
    path: '/station/report',
    name: 'stationReport',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/station/Report'], resolve)
  },
  {
    path: '/station/list/setCost',
    name: 'stationSetCost',
    meta: {
      requireAuth: true,
      parentPath: '/station/list'
    },
    component: resolve => require(['@/pages/station/SetCost'], resolve)
  },
  {
    path: '/station/bill',
    name: 'stationBill',
    meta: {
      requireAuth: true,
      parentPath: '/station/bill'
    },
    component: resolve => require(['@/pages/station/Bill'], resolve)
  }
]
