<template>
  <div class="layout">
    <el-header
      class="layout-header"
      height="70px"
      style="padding: 0;"
    >
      <div class="layout-header-inner f-cb">
        <div
          @click="$router.push('/index')"
          class="logo"
          style="cursor: pointer;"
        >
          <!-- <img
            :src="require('@/assets/images/logo.png')"
            alt
          >-->
          后台管理系统
        </div>

        <div class="header-nav">
          <ul>
            <li
              v-for="(item, i) in menuList"
              :key="i"
              :class="[`${item.isActive ? 'active' : ''}`]"
              @click="handleClickMainMenu(item)"
            ><a href="javascript:;">{{item.name}}</a></li>
          </ul>
        </div>

        <div class="operate">
          <!-- 操作 -->
        </div>
        <div
          @mouseenter="isShowInfo = true"
          @mouseleave="isShowInfo = false"
          class="user"
        >
          <strong class="user-mobile">{{userInfo.account}}</strong>
          <!-- <span class="user-login-out">13000000000</span> -->

          <transition name="el-fade-in">
            <div
              class="user-opt"
              v-show="isShowInfo"
            >
              <ul>
                <li>
                  <a
                    href="javascript:;"
                    @click="$refs.changePasswordDialog.show();"
                  >
                    <i class="el-icon-edit-outline"></i>
                    修改密码
                  </a>
                </li>
                <li>
                  <a
                    @click="loginOut"
                    href="javascript:;"
                  >
                    <i class="el-icon-circle-close"></i>
                    退出登录
                  </a>
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </div>
    </el-header>
    <el-container class="layout-inner">
      <el-aside
        class="layout-sidebar"
        width="210px"
      >
        <div
          :key="i"
          class="sidebar-nav"
          v-for="(item, i) in menuList"
        >
          <div
            v-if="item.isActive"
            :class="[`${item.isActive ? 'active' : ''}`]"
            @click="handleClickMainMenu(item)"
            class="sidebar-nav-title"
          >
            <!-- <i class="el-icon-setting"></i> -->
            <i :class="[`${item.icon}`]"></i>
            <span class="name">{{item.name}}</span>
            <!-- <i
              class="ts1"
              :class="{'el-icon-arrow-right': !item.isOpen, 'el-icon-arrow-down': item.isOpen}"
            ></i>-->
          </div>
          <ul
            class="sidebar-nav-list"
            v-if="item.isActive"
          >
            <li
              :key="j"
              v-for="(sub, j) in item.children"
            >
              <router-link :to="sub.url">{{sub.name}}</router-link>
            </li>
          </ul>
        </div>
      </el-aside>
      <el-main class="layout-page">
        <div class="page">
          <div class="inner">
            <router-view />
          </div>
        </div>
      </el-main>
    </el-container>

    <ChangePasswordDialog
      ref="changePasswordDialog"
      @success="changePasswordSuccess"
    />
  </div>
</template>

<script>
import ChangePasswordDialog from "@/components/ChangePasswordDialog";
export default {
  components: { ChangePasswordDialog },
  data() {
    return {
      menuList: [
        // {
        //   name: "首页",
        //   isActive: false,
        //   isOpen: false,
        //   url: "/index",
        //   icon: "el-icon-setting",
        //   children: [
        //     // {
        //     //   name: "业务概览",
        //     //   isActive: false,
        //     //   url: "/substation/index"
        //     // }
        //   ]
        // },
        {
          name: "渠道",
          isActive: false,
          isOpen: false,
          url: "/channel/list",
          icon: "el-icon-setting",
          children: [
            {
              name: "渠道列表",
              isActive: false,
              url: "/channel/list"
            },
            {
              name: "渠道报表",
              isActive: false,
              url: "/channel/report"
            },
            {
              name: "渠道账单",
              isActive: false,
              url: "/channel/bill"
            }
          ]
        },
        {
          name: "分站",
          isActive: false,
          isOpen: false,
          url: "/station/list",
          icon: "el-icon-setting",
          children: [
            {
              name: "分站列表",
              isActive: false,
              url: "/station/list"
            },
            {
              name: "分站报表",
              isActive: false,
              url: "/station/report"
            },
            {
              name: "分站账单",
              isActive: false,
              url: "/station/bill"
            }
          ]
        },
        {
          name: "商家",
          isActive: false,
          isOpen: false,
          url: "/merchant/merchantList",
          icon: "el-icon-setting",
          children: [
            {
              name: "商家列表",
              isActive: false,
              url: "/merchant/merchantList"
            },
            {
              name: "充值记录",
              isActive: false,
              url: "/merchant/rechargeRecord"
            }
          ]
        },
        {
          name: "仓库",
          isActive: false,
          isOpen: false,
          url: "/warehouse/list",
          icon: "el-icon-setting",
          children: [
            {
              name: "分仓列表",
              isActive: false,
              url: "/warehouse/list"
            },
            {
              name: "礼品分类管理",
              isActive: false,
              url: "/gift/category"
            },
            {
              name: "礼品列表",
              isActive: false,
              url: "/gift/list"
            }
          ]
        },
        {
          name: "提现充值扣费",
          isActive: false,
          isOpen: false,
          url: "/withdraw/list",
          icon: "el-icon-setting",
          children: [
            {
              name: "提现管理",
              isActive: false,
              url: "/withdraw/list"
            },
            {
              name: "充值",
              isActive: false,
              url: "/recharge/index"
            },
            {
              name: "扣费",
              isActive: false,
              url: "/deductMoney/index"
            },
            {
              name: "资金明细",
              isActive: false,
              url: "/agentMoney/index"
            },
            {
              name: "代理人费用",
              isActive: false,
              url: "/fundMoney/index"
            }
          ]
        },
        {
          name: "包裹管理",
          isActive: false,
          isOpen: false,
          url: "/package/list",
          icon: "el-icon-setting",
          children: [
            {
              name: "包裹列表",
              isActive: false,
              url: "/package/list"
            }
            // {
            //   name: "包裹手动结算",
            //   isActive: false,
            //   url: "/package/tally"
            // }
          ]
        },
        {
          name: "消息管理",
          isActive: false,
          isOpen: false,
          url: "/announcement/list",
          icon: "el-icon-setting",
          children: [
            {
              name: "公告列表",
              isActive: false,
              url: "/announcement/list"
            },
            {
              name: "系统开关",
              isActive: false,
              url: "/announcement/taskSwitch"
            }
          ]
        },
        {
          name: "工单管理",
          isActive: false,
          isOpen: false,
          url: "/workOrder/list",
          icon: "el-icon-setting",
          children: [
            {
              name: "工单列表",
              isActive: false,
              url: "/workOrder/list"
            }
          ]
        },
        {
          name: "代采代发供货",
          isActive: false,
          isOpen: false,
          url: "/takePlace/purchaseList",
          icon: "el-icon-setting",
          children: [
            {
              name: "代采申请列表",
              isActive: false,
              url: "/takePlace/purchaseList"
            },
            {
              name: "代发申请列表",
              isActive: false,
              url: "/takePlace/inSocketlist"
            },
            {
              name: "供货申请列表",
              isActive: false,
              url: "/takePlace/supplyList"
            },
            {
              name: "底单申请列表",
              isActive: false,
              url: "/takePlace/endOrderList"
            }
          ]
        }
        // {
        //   name: "系统管理",
        //   isActive: false,
        //   isOpen: false,
        //   url: "/index",
        //   icon: "el-icon-setting",
        //   children: [
        //     // {
        //     //   name: "业务概览",
        //     //   isActive: false,
        //     //   url: "/substation/index"
        //     // }
        //   ]
        // }
      ],
      isShowInfo: false
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  watch: {
    $route(to, from) {
      // console.log("route", this.$route);
      // console.log('to', to)
      // console.log('from', from)
      this.handleSelectNav();
    },
    menuList() {
      this.handleSelectNav();
    }
  },
  methods: {
    handleClickMainMenu(item) {
      // this.$router.push(item.url);
      this.$router.push(item.url);
      // item.isOpen = !item.isOpen;
    },
    handleClickSubMenu(item) {
      this.$router.push(item.url);
      // item.isShowSub = !item.isShowSub;
    },
    handleClickChiMenu(item) {
      // 跳转页面
      this.$router.push(item.url);
    },

    loginOut() {
      // console.log("退出登录");
      // 清空状态值
      localStorage.removeItem("TOKEN_ADMIN");
      localStorage.removeItem("userInfo");
      // 回到登录页
      this.$router.push("/login");
    },

    handleSelectNav() {
      const { path } = this.$route;
      const { parentPath } = this.$route.meta;
      let hasActive = false;
      let realPath = parentPath || path;

      // 清空选中
      this.menuList.forEach(m => {
        m.isActive = false;
        let children = m.children;
        children.forEach(s => {
          s.isActive = false;
        });
      });

      // 找出选中菜单，并设置选中
      this.menuList.forEach((m, i) => {
        if (m.children.length > 0) {
          m.children.forEach(s => {
            if (realPath === s.url) {
              m.isActive = true;
              m.isOpen = true;
              s.isActive = true;
            }
          });
        } else {
          if (realPath === m.url) {
            m.isActive = true;
            m.isOpen = true;
          }
        }
      });
    },

    changePasswordSuccess() {
      this.loginOut();
    }
  },
  created() {
    this.handleSelectNav();
  }
};
</script>

<style lang="less">
@import url("../assets/styles/variables.less");
@layout-orange: #f90;
.layout-inner {
  min-width: @layout-width;
  margin-top: 20px;

  .layout-sidebar {
    padding-bottom: 30px;
    background: #fff;
  }

  .layout-nav {
    height: 54px;
    background: @primary-color;
    color: #fff;
  }

  .layout-page {
    padding: 0;
    // margin-left: 20px;
    // background: #fff;

    > .page {
      // width: @layout-width;
      // margin: 10px auto 20px auto;
      min-height: 870px;
      margin-left: 20px;
      margin-right: 20px;
      margin-bottom: 20px;
      padding: 20px;
      background: #fff;
    }
  }
}

.layout-header {
  min-width: @layout-width;
  background: #000;
}
.layout-header-inner {
  margin: 0 20px;
  background: #000;

  > .logo {
    float: left;
    line-height: 70px;
    font-size: 20px;
    font-weight: 700;
    vertical-align: middle;
    color: #fff;
  }
  > .hidetip {
    float: left;
    margin-top: 25px;
    margin-left: 20px;
  }
  > .operate {
    float: left;
  }
  .user {
    position: relative;
    float: right;
    line-height: 69px;

    > .user-mobile {
      font-size: 16px;
      color: #fff;
    }

    > .user-login-out {
      padding-left: 10px;
      color: @layout-orange;
      cursor: pointer;
    }

    .user-opt {
      position: absolute;
      top: 70px;
      right: 0;
      z-index: 1;
      width: 150px;
      background: #fff;
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
        0 2px 4px 0 rgba(232, 237, 250, 0.5);

      li {
        line-height: 50px;
        text-align: center;

        &:hover {
          background: #f9f9f9;
        }

        a {
          display: block;
        }
      }
    }
  }
}

.sidebar-nav {
  &:last-child {
    margin-bottom: 0;
  }

  > .sidebar-nav-title {
    position: relative;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    font-size: 16px;
    font-weight: normal;
    cursor: pointer;

    &.active {
      color: @primary-color;
    }

    .name {
      margin-left: 10px;
    }

    > .ts1 {
      position: absolute;
      top: 16px;
      right: 20px;
    }
  }
  > .sidebar-nav-list {
    > li {
      line-height: 40px;

      > a {
        display: block;
        padding: 0 20px 0 48px;
        border-left: 2px solid #fff;
        color: #333;
        transition: 0.2s;
        font-size: 14px;

        &:hover {
          // border-color: @primary-color;
          // background: @primary-color;
          color: @primary-color;
        }

        &.active {
          // background: #eee;
          // color: @warning-color;
          border-color: @primary-color;
          background: rgba(72, 130, 240, 0.15);
          color: @primary-color;
        }
      }
    }
  }
}

.header-nav {
  float: left;
  height: 20px;
  line-height: 20px;
  margin-top: 26px;
  margin-left: 90px;
  font-size: 16px;

  > ul {
    > li {
      float: left;
      margin-right: 30px;
      a {
        position: relative;
        color: #fff;

        &::before {
          content: "";
        }
      }

      &.active {
        a {
          color: #fff;
          font-weight: bold;

          &::before {
            position: absolute;
            bottom: -10px;
            left: 0;
            right: 0;
            height: 2px;
            background: #fff;
          }
        }
      }
    }
  }
}
</style>
