export default [
  {
    path: '/coupon/list',
    name: 'couponList',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/substation/coupon/List'], resolve)
  }
]
