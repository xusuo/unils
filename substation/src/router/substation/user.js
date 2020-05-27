export default [
  {
    path: '/user/userList',
    name: 'userList',
    meta: {},
    component: resolve => require(['@/pages/substation/user/UserList'], resolve)
  },
  {
    path: '/user/userSpare',
    name: 'userSpare',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/substation/user/UserSpare'], resolve)
  },
  {
    path: '/user/taskList',
    name: 'taskList',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/substation/user/TaskList'], resolve)
  },
  {
    path: '/user/packageList',
    name: 'packageList',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/substation/user/PackageList'], resolve)
  },
  {
    path: '/user/sellerWithdraw',
    name: 'sellerWithdraw',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/substation/user/SellerWithdraw'], resolve)
  },
  {
    path: '/user/rechargeRecord',
    name: 'rechargeRecord',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/substation/user/rechargeRecord'], resolve)
  }
]
