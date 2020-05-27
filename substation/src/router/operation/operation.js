export default [
  // 用户列表
  {
    path: '/operation/userList',
    name: 'operationUserList',
    meta: {},
    component: resolve => require(['@/pages/operation/UserList'], resolve)
  },
  // 任务列表
  {
    path: '/operation/taskList',
    name: 'operationTaskList',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/operation/TaskList'], resolve)
  },
  // 包裹列表
  {
    path: '/operation/packageList',
    name: 'operationPackageList',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/operation/PackageList'], resolve)
  },
  // 运营报表
  {
    path: '/operation/myCount',
    name: 'operationMyCount',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/operation/MyCount'], resolve)
  },
  {
    path: '/operation/withdraw',
    name: 'operationWithdrawApplay',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/operation/Withdraw'], resolve),
    redirect: '/operation/withdraw/apply'
  },
  // 提现/入账流水
  {
    path: '/operation/withdraw/:tabname',
    name: 'operationWithdrawApplayTab',
    meta: {
      requireAuth: true,
      parentPath: "/operation/withdrawApplay"
    },
    component: resolve => require(['@/pages/operation/Withdraw'], resolve)
  },
  {
    path: '/operation/profitTrial',
    name: 'operationProfitTrial',
    meta: {
      requireAuth: true,
      parentPath: "/operation/index"
    },
    component: resolve => require(['@/pages/operation/ProfitTrial'], resolve)
  },
]