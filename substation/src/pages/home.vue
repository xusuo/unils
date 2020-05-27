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
          > -->
          {{stationName}}后台管理系统
        </div>

        <div class="operate">
          <!-- 操作 -->
        </div>
        <div
          class="user"
          @mouseenter="isShowInfo = true"
          @mouseleave="isShowInfo = false"
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
                    href="javascript:;"
                    @click="loginOut"
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
            class="sidebar-nav-title"
            :class="[`${item.isActive ? 'active' : ''}`]"
            @click="handleClickMainMenu(item)"
          >
            <!-- <i class="el-icon-setting"></i> -->
            <i :class="[`${item.icon}`]"></i>
            <span class="name">{{item.name}}</span>
            <!-- <i
              class="ts1"
              :class="{'el-icon-arrow-right': !item.isOpen, 'el-icon-arrow-down': item.isOpen}"
            ></i> -->
          </div>
          <ul class="sidebar-nav-list">
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
      menuList: [],
      stationMenu: {
        // 渠道后台菜单
        2: [
          {
            name: "总览",
            isActive: false,
            isOpen: false,
            url: "/channe/index",
            icon: "el-icon-setting",
            children: []
          },
          {
            name: "分站管理",
            isActive: false,
            isOpen: false,
            url: "/channel/stationManger",
            icon: "el-icon-bangzhu",
            children: []
          },
          {
            name: "渠道报表",
            isActive: false,
            isOpen: false,
            url: "/channel/getwayList",
            icon: "el-icon-orange",
            children: []
          },
          {
            name: "分站报表",
            isActive: false,
            isOpen: false,
            url: "/channel/stationList",
            icon: "el-icon-tickets",
            children: []
          },
          {
            name: "账单",
            isActive: false,
            isOpen: false,
            url: "/channel/Bill",
            icon: "el-icon-document",
            children: []
          }
        ],
        // 分站后台菜单
        3: [
          {
            name: "总览",
            isActive: false,
            isOpen: false,
            url: "/substation/index",
            icon: "el-icon-setting",
            children: [
              {
                name: "业务概览",
                isActive: false,
                url: "/substation/index"
              }
            ]
          },
          {
            name: "用户管理",
            isActive: false,
            isOpen: false,
            url: "/user/userList",
            icon: "el-icon-user",
            children: [
              {
                name: "用户列表",
                isActive: false,
                url: "/user/userList"
              },
              {
                name: "用户分配",
                isActive: false,
                url: "/user/userSpare"
              },
              {
                name: "任务列表",
                isActive: false,
                url: "/user/taskList"
              },
              {
                name: "包裹列表",
                isActive: false,
                url: "/user/packageList"
              },
              {
                name: "商家提现",
                isActive: false,
                url: "/user/sellerWithdraw"
              },
              {
                name: "充值记录",
                isActive: false,
                url: "/user/rechargeRecord"
              }
            ]
          },
          {
            name: "站点管理",
            isActive: false,
            isOpen: false,
            url: "/station/priceRule",
            icon: "el-icon-bangzhu",
            children: [
              {
                name: "定价策略",
                isActive: false,
                url: "/station/priceRule"
              },
              {
                name: "运营管理",
                isActive: false,
                url: "/station/operateManger"
              },
              {
                name: "销售管理",
                isActive: false,
                url: "/station/marketManger"
              },
              {
                name: "代理人管理",
                isActive: false,
                url: "/station/agentManger"
              }
            ]
          },
          {
            name: "业绩统计",
            isActive: false,
            isOpen: false,
            url: "/count/stationList",
            icon: "el-icon-orange",
            children: [
              {
                name: "营收日报",
                isActive: false,
                url: "/count/stationList"
              },
              {
                name: "运营业绩",
                isActive: false,
                url: "/count/operateCount"
              },
              {
                name: "销售业绩",
                isActive: false,
                url: "/count/marketCount"
              },
              {
                name: "代理业绩",
                isActive: false,
                url: "/count/agentCount"
              }
            ]
          },
          {
            name: "红包管理",
            isActive: false,
            isOpen: false,
            url: "/coupon/list",
            icon: "el-icon-orange",
            children: [
              {
                name: "红包列表",
                isActive: false,
                url: "/coupon/list"
              }
            ]
          },
          {
            name: "账单",
            isActive: false,
            isOpen: false,
            url: "/channel/Bill",
            icon: "el-icon-document",
            children: []
          }
        ],
        // 代理人后台菜单
        4: [
          {
            name: "总览",
            isActive: false,
            isOpen: false,
            url: "/agency/index",
            icon: "el-icon-setting",
            children: []
          },
          {
            name: "我的商家",
            isActive: false,
            isOpen: false,
            url: "/agency/mySeller",
            icon: "el-icon-bangzhu",
            children: []
          },
          {
            name: "资金管理",
            isActive: false,
            isOpen: false,
            url: "/agency/withdrawApplay",
            icon: "el-icon-orange",
            children: []
          },
          {
            name: "运营日报",
            isActive: false,
            isOpen: false,
            url: "/agency/operateList",
            icon: "el-icon-tickets",
            children: []
          },
          {
            name: "账单",
            isActive: false,
            isOpen: false,
            url: "/channel/Bill",
            icon: "el-icon-document",
            children: []
          }
        ],
        // 运营端后台菜单
        5: [
          {
            name: "总览",
            isActive: false,
            isOpen: false,
            url: "/operation/index",
            icon: "el-icon-setting",
            children: [
              {
                name: "业务概览",
                isActive: false,
                url: "/operation/index"
              }
            ]
          },
          {
            name: "用户管理",
            isActive: false,
            isOpen: false,
            url: "/operation/userList",
            icon: "el-icon-user",
            children: [
              {
                name: "用户列表",
                isActive: false,
                url: "/operation/userList"
              },
              {
                name: "任务列表",
                isActive: false,
                url: "/operation/taskList"
              },
              {
                name: "包裹列表",
                isActive: false,
                url: "/operation/packageList"
              }
            ]
          },
          {
            name: "业绩统计",
            isActive: false,
            isOpen: false,
            url: "/operation/myCount",
            icon: "el-icon-orange",
            children: [
              {
                name: "运营报表",
                isActive: false,
                url: "/operation/myCount"
              },
              {
                name: "资金管理",
                isActive: false,
                url: "/operation/withdraw"
              }
            ]
          },
          {
            name: "账单",
            isActive: false,
            isOpen: false,
            url: "/channel/Bill",
            icon: "el-icon-document",
            children: []
          }
        ],
        // 销售端后台菜单
        6: [
          {
            name: "总览",
            isActive: false,
            isOpen: false,
            url: "/market/index",
            icon: "el-icon-setting",
            children: []
          },
          {
            name: "我的代理",
            isActive: false,
            isOpen: false,
            url: "/market/myAgent",
            icon: "el-icon-bangzhu",
            children: []
          },
          {
            name: "我的商家",
            isActive: false,
            isOpen: false,
            url: "/market/mySeller",
            icon: "el-icon-orange",
            children: []
          },
          {
            name: "资金管理",
            isActive: false,
            isOpen: false,
            url: "/market/withdrawApplay",
            icon: "el-icon-tickets",
            children: []
          },
          {
            name: "运营报表",
            isActive: false,
            isOpen: false,
            url: "/market/operateList",
            icon: "el-icon-tickets",
            children: []
          },
          {
            name: "账单",
            isActive: false,
            isOpen: false,
            url: "/channel/Bill",
            icon: "el-icon-document",
            children: []
          }
        ]
      },
      isShowInfo: false,
      stationName: ""
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
      localStorage.removeItem("TOKEN_SITE");
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

    // 获取角色权限菜单列表
    async findRoleMenus() {
      // let res = await this.$http({
      //   url: '/sys/menu/findMenuAll',
      //   method: 'get',
      //   params: {}
      // });
      let res = await this.$http({
        url: "/sys/role/findRoleMenus",
        method: "get",
        params: {
          roleId: this.userInfo.roleId
        }
      });
      const { data } = res;
      // console.log(data);
      // 获取目录
      let catalogList = [];
      data.map(m => {
        if (m.parentId == 0 && m.relation == true) {
          catalogList.push({
            menuId: m.menuId,
            icon: m.menuIcon,
            name: m.menuName,
            isActive: false,
            isHover: false,
            children: []
          });
        }
      });

      // 获取目录的子菜单
      catalogList.map(m => {
        data.map(it => {
          if (m.menuId == it.parentId) {
            m.children.push({
              icon: it.menuIcon,
              name: it.menuName,
              isActive: false,
              url: it.menuUri
            });
          }
        });
      });
      // console.log(catalogList)

      this.menuList = catalogList;
    },
    // 获取头部公告，
    async getTopNotice(noticeType) {
      let res = await this.$http({
        url: "/notice/getTopNotice",
        method: "get",
        params: {
          noticeType: noticeType
        }
      });
      if (res.code === 200 && res.data) {
        this.noticeContent = res.data.noticeContent;
      } else {
        this.noticeContent = "";
      }
    },

    changePasswordSuccess() {
      this.loginOut();
    },
  },
  created() {
    let stationType = this.userInfo.stationType;
    let relation = {
      2: "渠道",
      3: "分站",
      4: "代理人",
      5: "运营端",
      6: "销售端"
    };
    // console.log("stationType: ", this.userInfo.stationType);
    this.menuList = this.stationMenu[stationType];
    this.handleSelectNav();

    this.stationName = relation[stationType];
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

// .header-nav {
//   float: left;
//   height: 20px;
//   line-height: 20px;
//   margin-top: 30px;
//   margin-left: 20px;
//   font-size: 18px;
//   font-weight: bold;

//   > ul {
//     > li {
//       float: left;
//       margin-right: 30px;
//       a {
//         color: #333;
//       }

//       &.active {
//         a {
//           color: #4882f0;
//         }
//       }
//     }
//   }
// }
</style>
