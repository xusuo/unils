export default [
  // 订单管理页面
  {
    path: '/order',
    component: resolve => require(['@/pages/order/Order'], resolve),
    redirect: '/order/orderManger',
    children: [{
      // 订单管理
      path: '/order/orderManger',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/order/OrderManger'], resolve),
    },
    {
      // 包裹管理
      path: '/order/packageManger',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/order/PackageManger'], resolve),
    },
    {
      // 售后订单
      path: '/order/saledOrder',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/order/SaledOrder'], resolve),
    },
    {
      // 商品采购订单
      path: '/order/purchaseOrder',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/order/PurchaseOrder'], resolve),
    },
    {
      // 包裹管理
      path: '/order/sheetOrder',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/order/SheetOrder'], resolve),
    },
    {
      // 订单管理
      path: '/order/taskList',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/order/OrderTaskList'], resolve),
    },
    ]
  },
]
