<template>
  <div class="header-main">
    <div class="header banxin">

      <div class="header__index">
        <router-link
          class="header__index__item"
          to="/index"
        >首页</router-link>
        <router-link
          class="header__index__item"
          to="/mall"
        >礼品商城</router-link>
      </div>

      <div class="header__welcome">
        <template v-if="account">
          <div class="header__welcome__user">
            <div class="header__welcome__user__account">
              <b>{{account}}</b>
              <i class="el-icon-arrow-up user-arrow-up"></i>
            </div>
            <div class="header__welcome__user__opt">
              <div
                @click="changePwd"
                class="transition-box"
              >修改密码</div>
              <div
                @click="logout"
                class="transition-box"
              >退出登录</div>
            </div>
          </div>
        </template>

        <template v-else>
          <span class="header__welcome__item">hi,欢迎来到{{stationName}}</span>
          <span
            class="header__welcome__item"
            @click="$router.push('/login')"
          >登录</span>
          <span
            class="header__welcome__item"
            @click="$router.push('/reg')"
          >免费注册</span>
        </template>

        <router-link
          class="header__welcome__item"
          to="/order"
        >订单管理</router-link>
        <router-link
          class="header__welcome__item"
          to="/userCenter"
        >个人中心</router-link>
        <router-link
          class="header__welcome__item upload"
          to="/upload"
        >
          批量上传
        </router-link>
      </div>
    </div>

    <ChangePasswordDialog ref="changePasswordDialog" />
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import ChangePasswordDialog from "@/components/ChangePasswordDialog";
export default {
  components: { ChangePasswordDialog },
  data() {
    return {
      stationName: JSON.parse(localStorage.getItem("stationInfo")).stationName,
      changeMsg: false,
      account: null
    };
  },
  methods: {
    showMsg() {
      this.changeMsg = true;
    },
    hideMsg() {
      this.changeMsg = false;
    },
    logout() {
      Cookies.remove("TOKEN");
      localStorage.removeItem("userInfo");
      this.$router.push("login");
    },
    changePwd() {
      this.$refs.changePasswordDialog.show();
    }
  },
  created() {
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      this.account = JSON.parse(userInfo).account;
    }
  }
};
</script>
<style lang='less' scoped>
.header-main {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #f5f5f5;
  border-bottom: 1px solid #eee;
  z-index: 10;
}
.header {
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #fff;
  font-weight: lighter;

  b {
    font-weight: normal;
  }

  .header__index {
    .header__index__item {
      margin-right: 20px;
      font-size: 16px;
      color: #000;

      &:hover {
        text-decoration: underline;
      }

      &.active {
        font-weight: bold;
        color: #ff4d70;
      }
    }
  }

  .header__welcome {
    flex: 1;
    text-align: right;
    .header__welcome__user {
      cursor: pointer;
      display: inline-block;
      padding: 0 12px;
      position: relative;

      .header__welcome__user__account {
        height: 40px;
        transition: 0.2s;
        letter-spacing: 1px;
        color: #000;
      }

      .header__welcome__user__opt {
        display: none;
        padding-bottom: 10px;
        text-align: center;

        .transition-box {
          line-height: 30px;
          color: #333;
          cursor: pointer;

          &:hover {
            color: #ff4d70;
          }
        }
      }

      &:hover {
        background: #fff;
        color: #ff4d70;
        box-shadow: 0px 1px 9px 0px rgba(58, 58, 58, 0.29);

        .user-arrow-up {
          transform: rotate(180deg);
        }

        .header__welcome__user__opt {
          display: block;
        }
      }
    }

    .header__welcome__item {
      margin-left: 20px;
      font-size: 16px;
      color: #000;
      vertical-align: top;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }

      &.active {
        font-weight: bold;
        color: #ff4d70;
      }

      &.upload {
        // padding-left: 17px;
        // background: url("./images/header_upload.png") no-repeat left 3px;
      }
    }
  }
}
</style>