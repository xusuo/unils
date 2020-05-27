export default [
  // 个人中心页面
  {
    path: '/userCenter',
    component: resolve => require(['@/pages/userCenter/UserCenter'], resolve),
    redirect: '/userCenter/myInfo/myProfile',
    children: [{
      // 行业资讯
      path: '/userCenter/messageCenter/sysMessage',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/userCenter/messageCenter/SysMessage'], resolve),
    },
    {
      // 系统消息
      path: '/userCenter/messageCenter/messageCenter',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/userCenter/messageCenter/MessageCenter'], resolve),
    },
    {
      // 公告
      path: '/userCenter/messageCenter/noticeList',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/userCenter/messageCenter/NoticeList'], resolve),
    },
    {
      // 公告详情
      path: '/userCenter/messageCenter/noticeList/notice',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/userCenter/messageCenter/NoticeDetail'], resolve),
    },
    {
      // 个人资料
      path: '/userCenter/myInfo/myProfile',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/userCenter/myInfo/MyProfile'], resolve),
    },
    {
      // 价格成本
      path: '/userCenter/myInfo/myPrice',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/userCenter/myInfo/MyPrice'], resolve),
    },
    {
      // 我的库存
      path: '/userCenter/socketManger/mySocket',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/userCenter/socketManger/MySocket'], resolve),
    },
    {
      // 代发申请
      path: '/userCenter/socketManger/inSocketManger',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/userCenter/socketManger/InSocketManger'], resolve),
    },
    {
      // 代采申请
      path: '/userCenter/socketManger/purchaseAgent',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/userCenter/socketManger/PurchaseAgent'], resolve),
    },
    // {
    //   // 充值
    //   path: '/userCenter/moneyManger/payRecharge',
    //   meta: {
    //     requireAuth: true
    //   },
    //   component: resolve => require(['@/pages/userCenter/moneyManger/PayRecharge'], resolve),
    // },
    {
      // 充值
      path: '/userCenter/moneyManger/payRecharge',
      meta: {
        requireAuth: true
      },
      redirect: '/userCenter/payMain',
      component: resolve => require(['@/pages/userCenter/moneyManger/PayRecharge'], resolve),
      children: [{
        // 充值主页
        path: '/userCenter/payMain',
        meta: {
          requireAuth: true,
          parent: '/userCenter/moneyManger/payRecharge'
        },
        component: resolve => require(['@/pages/userCenter/PayMain'], resolve),
      },
      {
        // 银行充值
        path: '/userCenter/payRechargeBank',
        meta: {
          requireAuth: true,
          parent: '/userCenter/moneyManger/payRecharge'
        },
        component: resolve => require(['@/pages/userCenter/PayRechargeBank'], resolve),
      },
      {
        // 支付宝充值
        path: '/userCenter/alipay',
        meta: {
          requireAuth: true,
          parent: '/userCenter/moneyManger/payRecharge'
        },
        component: resolve => require(['@/pages/userCenter/Alipay'], resolve),
      },
      ]
    },
    {
      // 流水/对账
      path: '/userCenter/moneyManger/foundFlow',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/userCenter/moneyManger/FoundFlow'], resolve),
    },
    {
      // 财务备注管理
      path: '/userCenter/moneyManger/financialRemarks',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/userCenter/moneyManger/FinancialRemarks'], resolve),
    },
    {
      // 充值中心
      path: '/userCenter/moneyManger/Recharge',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/userCenter/moneyManger/Recharge'], resolve),
    },

    {
      // 我的客服
      path: '/userCenter/helpCenter/myService',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/userCenter/helpCenter/MyService'], resolve),
    },
    {
      // 常见问题
      path: '/userCenter/helpCenter/commonQuestion',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/userCenter/helpCenter/CommonQuestion'], resolve),
    },
    {
      // 常见问题详细
      path: '/userCenter/helpCenter/commonQuestionDetail',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/userCenter/helpCenter/CommonQuestionDetail'], resolve),
    },
    {
      // 我的工单
      path: '/userCenter/helpCenter/myWorkOrder',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/userCenter/helpCenter/MyWorkOrder'], resolve),
    },
    {
      // 关于我们
      path: '/userCenter/aboutUs/aboutUsDetail',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/userCenter/aboutUs/AboutUsDetail'], resolve),
    },
    {
      // 供货商加盟
      path: '/userCenter/aboutUs/joinUs',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/userCenter/aboutUs/JoinUs'], resolve),
    },
    {
      // 添加店铺
      path: '/userCenter/shop/shopList',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/userCenter/shop/ShopList'], resolve),
    },
    ]
  },
]
