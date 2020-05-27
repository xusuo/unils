export default [
    {
      path: '/merchant/merchantList',
      name: 'merchantList',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/merchant/merchantList'], resolve)
    },
    {
      path: '/merchant/rechargeRecord',
      name: 'rechargeRecord',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/merchant/rechargeRecord'], resolve)
    }
  ]
  