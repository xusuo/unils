<template>
  <div class="reg">
    <div class="new-log-base">
      <div class="cont-box">
        <div class="cont-box-l">
          <h2>欢迎来到 {{stationName}}</h2>
          <h3>我们提供赠品采购、发货、一站式服务。</h3>
          <div class="line">
            <span></span>
            <span class="active"></span>
          </div>
          <div class="box">
            <ul class="form">
              <li class="input-li">
                <input
                  v-model="form.loginAccount"
                  type="text"
                  placeholder="请输入手机号"
                  maxlength="11"
                >
              </li>
              <li class="input-li">
                <input
                  v-model="form.code"
                  type="text"
                  placeholder="请输入验证码"
                >
                <span
                  class="get-code"
                  @click="getCode"
                  v-show="!countDownTime"
                >验证码</span>
                <span
                  class="run-code get-code"
                  v-show="countDownTime"
                >{{countDownTime}} s</span>
              </li>
              <li class="input-li">
                <input
                  v-model="form.loginPassword"
                  type="password"
                  placeholder="请设置密码"
                  maxlength="16"
                >
              </li>
              <li class="input-li">
                <input
                  v-model="form.userQq"
                  type="text"
                  placeholder="请输入QQ号"
                  maxlength="16"
                >
              </li>
              <li class="input-li">
                <input
                  v-model="form.userWechat"
                  type="text"
                  placeholder="请输入微信号"
                  maxlength="20"
                >
              </li>
            </ul>
            <div class="operate">
              <strong>QQ和微信便于我们的客服为你更好地服务。</strong>
              <span @click="$router.push('/login')">返回登录</span>
            </div>

            <div class="footer">
              <b
                class="to-reg"
                @click="submit"
              >完成注册</b>
            </div>
          </div>
        </div>
        <div class="cont-box-r">
          <img
            src="http://106.14.154.124:8099/images/reg/登录_插图.png"
            alt="png"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginURL } from "@/utils/config";
import { mobileReg } from "@/utils/regular";
export default {
  data() {
    return {
      stationName: JSON.parse(localStorage.getItem("stationInfo")).stationName,
      form: {
        //
        stationId: JSON.parse(localStorage.getItem("stationInfo")).stationId,
        channelId: JSON.parse(localStorage.getItem("stationInfo")).channelId,
        code: "",
        loginAccount: "",
        loginPassword: "",
        userQq: "",
        userWechat: "",
        // 邀请码
        inviteCode: ""
      },
      countDownTime: 0,
      // 倒计时时长，单位是秒
      countDownMaxTime: 120,
      loading: false,
      authCode: ""
    };
  },
  methods: {
    async login(params) {
      try {
        this.loading = true;
        let res = await this.$http({
          url: `${loginURL}/insertSellerUser`,
          // url: `/seller/shop/login`,
          method: "post",
          data: params
        });
        this.loading = false;
        const { code, data } = res;
        if (code == 200) {
          this.$message.success("注册成功");
          this.$router.push("/login");
        }
      } catch (error) {
        this.loading = false;
        console.log(error);
        // this.setAuthCode();
      }
    },
    submit() {
      // if (!this.form.inviteCode) {
      //   this.$message.error("请联系客服，通过邀请码注册商家账号。");
      //   return false;
      // }

      if (this.form.loginAccount.trim() === "") {
        this.$message.error("请输入手机号");
        return false;
      }

      if (!mobileReg.test(this.form.loginAccount)) {
        this.$message.error("手机号码格式错误，请重新输入");
        return false;
      }

      if (this.form.code.trim() === "") {
        this.$message.error("请输入验证码");
        return false;
      }

      if (this.form.loginPassword.trim() === "") {
        this.$message.error("请输入密码");
        return false;
      }

      if (this.form.loginPassword.length < 6) {
        this.$message.error("密码最少6位");
        return false;
      }

      if (this.form.userQq.trim() === "") {
        this.$message.error("请输入QQ号");
        return false;
      }

      if (this.form.userWechat.trim() === "") {
        this.$message.error("请输入微信号");
        return false;
      }

      // if (this.authCode !== this.form.code.toLocaleUpperCase()) {
      //   this.$message.error("请输入正确的验证码");
      //   this.setAuthCode();
      //   return false;
      // }

      this.login(this.form);
    },
    // 验证码倒计时
    countDown() {
      // console.log(this.countDownTime, this.countDownMaxTime);
      if (this.countDownTime > 0) {
        setTimeout(() => {
          this.countDownTime--;
          this.countDown();
        }, 1000);
      }
    },
    // 获取验证码
    async getCode(num) {
      if (this.form.loginAccount.trim() === "") {
        this.$message.error("请输入手机号");
        return false;
      }

      if (!mobileReg.test(this.form.loginAccount)) {
        this.$message.error("手机号码格式错误，请重新输入");
        return false;
      }

      let res = await this.$http({
        url: this.$loginURL + `/getCode`,
        method: "get",
        params: {
          phone: this.form.loginAccount
        }
      });

      const { code, data } = res;
      if (code == 200 && data) {
        this.$message.success("验证码发送成功");

        // 重置倒计时时间，并开始倒计时
        this.countDownTime = this.countDownMaxTime;
        this.countDown();
      }
    }
  },
  created() {
    let inviteCode = this.$route.query.code;
    this.form.inviteCode = inviteCode;
    // 注册的时候，验证码可以不带了。
    // // 页面没有获取到邀请码，给一个提示
    // if (!inviteCode) {
    //   this.$confirm(
    //     "注册商家账号需要邀请码，当前没有邀请码，可以联系分站客服获取。",
    //     "提示",
    //     {
    //       confirmButtonText: "关闭",
    //       cancelButtonText: "取消",
    //       showCancelButton: false,
    //       type: "warning"
    //     }
    //   )
    //     .then(() => {})
    //     .catch(() => {});
    // }
  }
};
</script>

<style lang="less" scoped>
.reg {
  width: 100%;
  height: 100%;

  .box {
    width: 360px;

    .form {
      border: 1px solid #ddd;
      border-radius: 10px;

      li {
        height: 60px;
        box-sizing: border-box;
        padding: 20px;
        display: flex;
        border-bottom: 1px solid #ddd;
        align-items: center;

        &:last-child {
          border-bottom: none;
        }

        input {
          flex: 1;
          border: none;
          outline: none;
          -webkit-appearance: none;
          font-size: 15px;
          line-height: 40px;
        }

        .get-code {
          min-width: 100px;
          font-size: 15px;
          line-height: 40px;
          color: #ff4d70;
          cursor: pointer;
          border-left: 1px solid #eee;
          text-align: center;
          padding-left: 20px;
        }

        .run-code {
          cursor: not-allowed;
        }
      }
    }

    .operate {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      line-height: 18px;
      margin-bottom: 30px;
      margin-top: 5px;

      strong {
        font-size: 12px;
        line-height: 18px;
        color: #999;
        font-weight: normal;
      }

      span {
        color: #ff4d70;
        cursor: pointer;
      }
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: center;

      b {
        width: 172px;
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        border-radius: 10px;
        cursor: pointer;
        background: #ff4d70;
        color: #fff;
        box-shadow: 0 0 5px RGBA(241, 101, 145, 0.3);
      }
    }
  }
}

.new-log-base {
  width: 100%;
  height: 100%;
  position: relative;
  background: #fcfcfc;

  .cont-box {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 1000px;
    height: 600px;
    background: #fff;
    box-shadow: 0 2px 38px rgba(241, 101, 145, 0.05);
    display: flex;

    .cont-box-l {
      flex: 1;
      padding-left: 35px;
      padding-top: 40px;

      > h2 {
        font-size: 28px;
        line-height: 40px;
        color: #333;
        font-weight: bold;
        margin-bottom: 10px;
        cursor: pointer;
      }

      > h3 {
        font-size: 16px;
        line-height: 20px;
        color: #333;
        margin-bottom: 20px;
      }

      .line {
        display: flex;
        margin-bottom: 20px;

        span {
          width: 56px;
          height: 3px;
          border-radius: 4px;
          background: #ddd;
          margin-right: 6px;
          cursor: pointer;

          &.active {
            background: #ff4d70;
          }
        }
      }

      .box {
        width: 360px;
      }
    }

    .cont-box-r {
      width: 444px;

      img {
        width: 100%;
      }
    }
  }
}
</style>
