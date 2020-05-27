export default [
  {
    path: '/findLoginPass',
    name: 'findLoginPass',
    meta: {},
    component: resolve => require(['@/pages/others/FindLoginPass'], resolve)
  },
  {
    path: '/inRegister',
    name: 'inRegister',
    meta: {},
    component: resolve => require(['@/pages/others/Register'], resolve)
  }
]
