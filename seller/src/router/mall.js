export default [
  // 礼品商城页面
  {
    path: '/mall',
    component: resolve => require(['@/pages/mall/Mall'], resolve),
    redirect: '/mall/all',
    children: [
      {
        // 所有礼品
        path: '/mall/all',
        component: resolve => require(['@/pages/mall/components/All'], resolve),
      },
      {
        // 私有仓库
        path: '/mall/private',
        meta: {
          requireAuth: true
        },
        component: resolve => require(['@/pages/mall/components/Private'], resolve),
      },
      {
        // 历史购买
        path: '/mall/history',
        meta: {
          requireAuth: true
        },
        component: resolve => require(['@/pages/mall/components/History'], resolve),
      },
      {
        // 历史购买
        path: '/mall/letter',
        meta: {
          requireAuth: true
        },
        component: resolve => require(['@/pages/mall/components/Letter'], resolve),
      },
    ]
  },
  {
    path: '/mall/detail/:id',
    component: resolve => require(['@/pages/mall/components/all/ProductDetail'], resolve),
  },
  // 预购
  {
    path: '/mall/paySelfStore',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/mall/PaySelfStore'], resolve),
  }
]
