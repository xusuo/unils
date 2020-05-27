<template>
  <div class="login">
    <div class="new-log-base">
      <div class="cont-box">
        <div class="cont-box-l">
          <h2>欢迎来到 {{stationName}}</h2>
          <h3>我们提供赠品采购、发货、一站式服务。</h3>
          <div class="line">
            <span class="active"></span>
            <span></span>
          </div>
          <div class="box">
            <ul class="form">
              <li class="input-li">
                <!-- <span class="el-icon-s-custom"></span> -->
                <span class="admin"></span>
                <input
                  v-model="form.loginAccount"
                  type="text"
                  placeholder="账号"
                >
              </li>
              <li class="input-li">
                <span class="lock"></span>
                <input
                  v-model="form.loginPassword"
                  type="password"
                  placeholder="密码"
                >
              </li>
            </ul>
            <div class="operate">
              <span></span>
              <!-- <span @click="$router.push('/forget')">忘记密码？</span> -->
            </div>

            <div class="footer">
              <b
                class="login"
                @click="submit"
              >登录</b>
              <b
                class="to-reg"
                @click="$router.push('/reg')"
              >去注册</b>
            </div>

            <div class="to-index">
              <i class="el-icon-house"></i>
              <span @click="$router.push('/index')">返回首页</span>
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
import Cookies from 'js-cookie'
import { loginURL } from "@/utils/config";
export default {
  data() {
    return {
      stationName: JSON.parse(localStorage.getItem("stationInfo")).stationName,
      form: {
        // loginAccount: "123456",
        // loginAccount: "13609668870",
        stationId: JSON.parse(localStorage.getItem("stationInfo")).stationId,
        loginAccount: localStorage.getItem("___u___")
          ? localStorage.getItem("___u___")
          : "",
        loginPassword: localStorage.getItem("___p___")
          ? localStorage.getItem("___p___")
          : "",
        code: ""
      },
      loading: false,
      authCode: ""
    };
  },
  methods: {
    async login(params) {
      // localStorage.setItem(
      //   "TOKEN",
      //   "Bearer-eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNyIsImV4cCI6MTU1NDY3NTA0NywiaWF0IjoxNTUxMDc1MDQ3fQ.GfW1ZJHhdskW-qCwLE-5dQkgEf3xvYE5Hu1Wtrd6BVhlgwyXaGaPQtJXQv3CeEmEhO_t_qMqZnDCB8p5QTOcaQ"
      // );
      // this.$store.dispatch("changeUserInfo", {
      //   sellerId: "1100578249588948994"
      // });

      // setTimeout(() => {
      //   this.$router.push("/index");
      // }, 200);

      // return false;
      try {
        this.loading = true;
        delete params.code;
        let res = await this.$http({
          url: `${loginURL}/login`,
          method: "post",
          data: params
        });
        this.loading = false;
        const { Authorization, SellerId } = res.data;
        Cookies.set('TOKEN', Authorization, { expires: 7 }); 
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            account: params.loginAccount
          })
        );

        // 记住上次登录成功的账号和密码
        localStorage.setItem("___u___", params.loginAccount);
        localStorage.setItem("___p___", params.loginPassword);
        // this.$store.dispatch("changeUserInfo", {
        //   // sellerId: SellerId || "123",
        //   account: params.loginAccount
        // });
        // console.log("========1");
        setTimeout(() => {
          this.$message.success("登录成功");
          console.log(this.$router);
          this.$router.push("/index");
          // console.log("========2");
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
    },
    // 测试一下本地代理 多个外链，可以先留着。
    async test() {
      // console.log("/admin/getPackageTaskListPage");
      let res = await this.$http({
        url: "/admin/getPackageTaskListPage",
        method: "post",
        data: {}
      });

      console.log(res);
    }
  },
  created() {
    // this.test();
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
.login {
  width: 100%;
  height: 100%;

  .box {
    .form {
      border: 1px solid #ddd;
      border-radius: 10px;

      li {
        height: 72px;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        border-bottom: 1px solid #ddd;

        &:last-child {
          border-bottom: none;
        }

        span {
          width: 18px;
          margin-top: 3px;
          margin-right: 20px;
          vertical-align: middle;
          font-size: 24px;
          color: #ff4d70;

          &.admin {
            background: url("./images/user.png") no-repeat;
            background-size: 100%;
          }

          &.lock {
            background: url("./images/lock.png") no-repeat;
            background-size: 100%;
          }
        }

        input {
          flex: 1;
          border: none;
          outline: none;
          -webkit-appearance: none;
          font-size: 20px;
          line-height: 50px;
        }
      }
    }

    .operate {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      line-height: 28px;
      color: #333;
      cursor: pointer;
      margin-bottom: 60px;
      margin-top: 10px;

      span {
        font-size: 14px;
        line-height: 18px;
        color: #333;
      }
    }

    .footer {
      display: flex;
      align-items: center;

      b {
        width: 172px;
        height: 45px;
        line-height: 44px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin-right: 50px;
        border-radius: 10px;
        cursor: pointer;

        &.login {
          background: #ff4d70;
          box-shadow: 8px 5px 11px rgba(241, 101, 145, 0.3);
          color: #fff;
        }

        &.to-reg {
          background: #fff;
          box-shadow: 0 -1px 11px rgba(241, 101, 145, 0.23);
          color: #ff4d70;
        }
      }
    }

    .to-index {
      margin-top: 80px;
      width: 100px;
      display: flex;
      cursor: pointer;
      align-items: center;
      font-size: 15px;

      span {
        margin-left: 10px;
        color: #666;
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
        width: 410px;
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
