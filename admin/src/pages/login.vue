<template>
  <div class="login-layout">
    <div class="bd">
      <div class="bd-ctn">
        <div class="login">
          <div class="login-bg">
            <h3 class="l-tit">用户登录</h3>
            <form
              @submit.prevent
              class="login-form"
            >
              <div class="login-form-item">
                <input
                  class="form-control"
                  placeholder="请输入登录账号"
                  type="text"
                  v-model="form.loginAccount"
                >
              </div>
              <div class="login-form-item">
                <input
                  class="form-control"
                  placeholder="请输入登录密码"
                  type="password"
                  v-model="form.loginPassword"
                >
              </div>

              <!-- <div class="login-form-item">
                <input
                  class="form-control form-password"
                  placeholder="请输入验证码"
                  type="text"
                  v-model="form.code"
                >
                <img
                  class="codeUrl"
                  :src="codeUrl"
                  alt=""
                  @click="switchCode"
                >
              </div> -->

              <div class="login-form-item">
                <button
                  @click="submit"
                  class="form-button"
                  type="submit"
                >
                  <i
                    class="el-icon-loading"
                    v-if="loading"
                  ></i>
                  登录
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginURL } from "@/utils/config";
export default {
  data() {
    return {
      form: {
        loginAccount: localStorage.getItem("___au___")
          ? localStorage.getItem("___au___")
          : "",
        loginPassword: localStorage.getItem("___ap___")
          ? localStorage.getItem("___ap___")
          : ""
        // code: ""
      },
      loading: false,
      authCode: "",
      // 验证码先写死，本地没办法去设置
      codeUrl: "http://gift-admin.marymeng.com/gift-admin" + "/captcha?temp=1"
    };
  },
  methods: {
    async login(params) {
      // localStorage.setItem(
      //   "TOKEN_ADMIN",
      //   "Bearer-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiZXhwIjoxNTYxMzMyNTM0LCJpYXQiOjE1NTc3MzI1MzR9.1A-Btm5BXDHfXZNxTfNWjGVqWIyf3YK3KLDB0dmTQ_cFX58mWyrB1G4SyaAaqB51ORwHI00VUvPRTEAZXy-2tA"
      // );
      // this.$store.dispatch("changeUserInfo", {
      //   account: params.loginAccount,
      //   stationType: this.form.stationType
      // });

      // setTimeout(() => {
      //   this.$message.success("登录成功");
      //   this.$router.push("/index");
      // }, 200);

      // return false;

      try {
        this.loading = true;
        let res = await this.$http({
          url: `${loginURL}/login`,
          method: "post",
          data: params
        });
        console.log(res);
        this.loading = false;
        const { Authorization, SellerId } = res.data;
        localStorage.setItem("TOKEN_ADMIN", Authorization);
        this.$store.dispatch("changeUserInfo", {
          // sellerId: SellerId || "123",
          account: params.loginAccount
        });

        // 记住上次的账号和密码
        localStorage.setItem("___au___", params.loginAccount);
        localStorage.setItem("___ap___", params.loginPassword);

        setTimeout(() => {
          this.$message.success("登录成功");
          this.$router.push("/index");
        }, 200);
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    submit() {
      if (this.form.loginAccount.trim() === "") {
        // this.$alert("请输入账号", "操作提示", {
        //   confirmButtonText: "确定",
        //   type: "warning",
        //   center: true,
        //   callback: action => {
        //     this.$message({
        //       type: "info",
        //       message: `action: ${action}`
        //     });
        //   }
        // });
        this.$message.error("请输入账号");
        return false;
      }

      if (this.form.loginPassword.trim() === "") {
        this.$message.error("请输入密码");
        return false;
      }

      // if (this.form.code.trim() === "") {
      //   this.$message.error("请输入验证码");
      //   return false;
      // }

      // if (this.authCode !== this.form.code.toLocaleUpperCase()) {
      //   this.$message.error("请输入正确的验证码");
      //   return false;
      // }

      // console.log(this.form);

      this.login(this.form);
    },
    // 更换验证码
    switchCode() {
      this.codeUrl =
        "http://gift-site.marymeng.com/gift-site" +
        "/captcha?temp=" +
        new Date() * 1;
    }
  },
  created() {
    // let token = localStorage.getItem("TOKEN");
    // // 已登录跳转到首页
    // if (token) {
    //   this.$router.push("/index");
    // } else {
    //   this.setAuthCode();
    // }
  }
};
</script>

<style lang="less">
@import url("../assets/styles/variables.less");
@login-bd-height: 400px;
.login-layout {
  padding-top: 200px;
  height: 100%;

  > .bd {
    height: @login-bd-height;
    // background: url("../assets/images/login-banner.jpg") no-repeat center top;
  }

  .bd-ctn {
    position: relative;
    width: @layout-width;
    height: @login-bd-height;
    margin: 0 auto;
  }
}
.login {
  // position: absolute;
  // top: 40px;
  // right: 0;
  width: 320px;
  // height: 320px;
  margin: 0 auto;
  padding: 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  box-sizing: border-box;

  > .login-bg {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 10px;
  }

  .l-tit {
    margin: 0;
    height: 42px;
    border-bottom: 1px solid #ddd;
    line-height: 42px;
    padding-left: 20px;
    font-size: 16px;
    font-weight: lighter;
  }
}
.login-form {
  padding: 26px 20px 0 20px;

  > .login-form-item {
    position: relative;
    margin-bottom: 20px;

    > .form-control {
      width: 100%;
      height: 36px;
      padding: 0 10px;
      border: 1px solid #ddd;
      line-height: 36px;
      box-sizing: border-box;
    }

    > .form-button {
      width: 257px;
      height: 40px;
      display: block;
      background: #4882f0;
      border: 0;
      text-align: center;
      line-height: 40px;
      font-size: 16px;
      color: #fff;
      border-radius: 3px;
      cursor: pointer;
      font-weight: lighter;
    }

    .form-password {
      width: 120px;
    }

    .codeUrl {
      position: absolute;
      top: 0;
      right: 0;
      width: 142px;
      cursor: pointer;
    }
  }
}
</style>
