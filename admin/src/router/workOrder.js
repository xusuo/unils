export default [
  // 公告列表
  {
    path: '/workOrder/list',
    name: 'workOrderList',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/workOrder/List'], resolve)
  }
]
