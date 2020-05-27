export default [
  // 包裹列表
  {
    path: '/package/list',
    name: 'packageList',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/package/List'], resolve)
  },
  // 手动结算包裹
  {
    path: '/package/tally',
    name: 'packageTally',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/package/TallyOrder'], resolve)
  }
]
