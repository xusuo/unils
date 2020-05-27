export default [
  // 批量上传界面
  {
    path: '/upload',
    name: 'upload',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/upload/Upload'], resolve)
  },
  // 智能筛选发货
  {
    path: '/upload/typeOne',
    name: 'uploadTypeOne',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/upload/UploadTypeOne'], resolve)
  },
  // 批量导入发货
  {
    path: '/upload/typeTwo',
    name: 'uploadTypeTwo',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/upload/UploadTypeTwo'], resolve)
  },
  // 手工下单发货
  {
    path: '/upload/typeThree',
    name: 'uploadTypeThree',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/upload/UploadTypeThree'], resolve)
  },
  // 第四种导入方式，按订单号导入
  {
    path: '/upload/typeFour',
    name: 'uploadTypeFour',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/upload/UploadTypeFour'], resolve)
  },
  // 第四种导入方式，按订单选礼品
  {
    path: '/upload/typeFourGift',
    name: 'uploadTypeFourGift',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/upload/UploadTypeFourGift'], resolve)
  },
  // 辅助支付的界面，所有导入的订单，
  // 都可在以下单以后，跳转到这个界面来处理支付
  {
    path: '/upload/handPay',
    name: 'uploadHandPay',
    meta: {
      requireAuth: true
    },

    component: resolve => require(['@/pages/upload/HandPay'], resolve)
  }
]