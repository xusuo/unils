export default [
  // 公告列表
  {
    path: '/announcement/list',
    name: 'announcementList',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/announcement/List'], resolve)
  },
  // 添加公告
  {
    path: '/announcement/list/create',
    name: 'announcementListCreate',
    meta: {
      requireAuth: true,
      parentPath: '/announcement/list'
    },
    component: resolve => require(['@/pages/announcement/CreateAnnouncement'], resolve)
  },
  // 修改公告
  {
    path: '/announcement/list/edit',
    name: 'announcementListEdit',
    meta: {
      requireAuth: true,
      parentPath: '/announcement/list'
    },
    component: resolve => require(['@/pages/announcement/EditAnnouncement'], resolve)
  },
  {
    path: '/announcement/taskSwitch',
    name: 'taskSwitch',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/announcement/TaskStatusSwitch'], resolve)
  },
]
