export default [
  // 采购申请列表
  {
    path: '/takePlace/purchaseList',
    name: 'takePlacePurchaseList',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/takePlace/PurchaseList'], resolve)
  },
  // 代发申请列表
  {
    path: '/takePlace/inSocketlist',
    name: 'takePlaceInSocketlist',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/takePlace/InSocketlist'], resolve)
  },
  // 供货申请列表
  {
    path: '/takePlace/supplyList',
    name: 'takePlaceSupplyList',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/takePlace/SupplyList'], resolve)
  },
  // 底单申请列表
  {
    path: '/takePlace/endOrderList',
    name: 'takePlaceEndOrderList',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/takePlace/EndOrderList'], resolve)
  }
]
