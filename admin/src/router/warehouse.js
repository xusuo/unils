export default [
  {
    path: '/gift/list',
    name: 'giftList',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/warehouse/GiftList'], resolve)
  },
  {
    path: '/warehouse/list',
    name: 'WarehouseList',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/warehouse/WarehouseList'], resolve)
  },
  {
    path: '/warehouse/list/setCost',
    name: 'warehouseSetCost',
    meta: {
      requireAuth: true,
      parentPath: '/warehouse/list'
    },
    component: resolve => require(['@/pages/warehouse/SetCost'], resolve)
  },
  {
    path: '/gift/category',
    name: 'giftCategory',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/warehouse/Category'], resolve)
  },
  {
    path: '/gift/list/create',
    name: 'giftCreate',
    meta: {
      requireAuth: true,
      parentPath: '/gift/list'
    },
    component: resolve => require(['@/pages/warehouse/GiftCreate'], resolve)
  },
  {
    path: '/gift/list/edit',
    name: 'giftEdit',
    meta: {
      requireAuth: true,
      parentPath: '/gift/list'
    },
    component: resolve => require(['@/pages/warehouse/GiftEdit'], resolve)
  }
]
