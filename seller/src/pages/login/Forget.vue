<template>
  <div class="reg">
    <div class="new-log-base">
      <div class="cont-box">
        <div class="cont-box-l">
          <h2>欢迎来到xxxx</h2>
          <h3>我们提供赠品采购、发货、一站式服务。</h3>
          <div class="line">
            <span class="active"></span>
            <span></span>
          </div>
          <div class="box">
            <ul class="form">
              <li class="input-li">
                <input
                  type="text"
                  placeholder="请输入手机号"
                >
              </li>
              <li class="input-li">
                <input
                  type="text"
                  placeholder="请输入验证码"
                >
                <span class="get-code">验证码</span>
                <span
                  class="run-code get-code"
                  style="display: none;"
                >s</span>
              </li>
              <li class="input-li">
                <input
                  type="password"
                  placeholder="新密码(6-20个字符)"
                >
              </li>
              <li class="input-li">
                <input
                  type="password"
                  placeholder="确认新密码"
                >
              </li>
            </ul>
            <div class="operate">
              <strong></strong>
              <span @click="$router.push('/login')">返回登录</span>
            </div>

            <div class="footer">
              <b class="to-reg">确认重置</b>
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
export default {
  data() {
    return {
      form: {
        loginAccount: "",
        loginPassword: "",
        code: ""
      },
      loading: false,
      authCode: ""
    };
  },
  methods: {
    async login(params) {
      localStorage.setItem(
        "TOKEN",
        "Bearer-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNyIsImV4cCI6MTU1NDY3NTA0NywiaWF0IjoxNTUxMDc1MDQ3fQ.GfW1ZJHhdskW-qCwLE-5dQkgEf3xvYE5Hu1Wtrd6BVhlgwyXaGaPQtJXQv3CeEmEhO_t_qMqZnDCB8p5QTOcaQ"
      );
      this.$store.dispatch("changeUserInfo", {
        sellerId: "1100578249588948994"
      });

      setTimeout(() => {
        this.$router.push("/index");
      }, 200);

      return false;
      try {
        this.loading = true;
        delete params.code;
        let res = await this.$http({
          url: `${loginURL}/login`,
          // url: `/seller/shop/login`,
          method: "post",
          data: params
        });
        this.loading = false;
        const { Authorization, SellerId } = res.data;
        Cookies.set('TOKEN', Authorization, { expires: 7 });
        this.$store.dispatch("changeUserInfo", {
          // sellerId: SellerId || "123",
          account: params.loginAccount
        });
        console.log("========1");
        setTimeout(() => {
          this.$message.success("登录成功");
          console.log(this.$router);
          this.$router.push("/index");
          console.log("========2");
        }, 200);
      } catch (error) {
        this.loading = false;
        console.log(error);
        // this.setAuthCode();
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
      //   this.setAuthCode();
      //   return false;
      // }

      this.login(this.form);
    },
    // 随机获取 0 - number之间的数
    randomNumber(number) {
      return parseInt(Math.random() * number);
    },
    // 生成随机的验证码
    getCode(num) {
      let dectList = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ];
      let arr = [];
      for (let i = 0; i < num; i++) {
        let m = this.randomNumber(dectList.length - 1);
        arr.push(dectList[m]);
      }
      console.log(arr);
      return arr.join("");
    },
    // 设置随机验证码
    setAuthCode() {
      this.authCode = this.getCode(4);
    },
    onMetchantRegister() {
      this.$alert(
        "请联系推荐人，获取注册链接，或加qq：97681408推荐！",
        "操作提示",
        {
          confirmButtonText: "关闭",
          callback: action => {}
        }
      );
    }
  },
  created() {
    // let token = Cookies.get("TOKEN");
    // // 已登录跳转到首页
    // if (token) {
    //   this.$router.push("/index");
    // } else {
    //   this.setAuthCode();
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
