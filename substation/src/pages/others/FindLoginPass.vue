<template>
  <div class="find-password-layout">
    <div
      class="hd"
      @click="$router.push('/login')"
      style="cursor: pointer;"
    >
      <img
        :src="require('@/assets/images/login-logo.jpg')"
        alt=""
      >
    </div>
    <div class="bd">
      <div class="bd-ctn">
        <div class="find-password-title">找回密码</div>
        <div class="find-password-detail">
          <el-steps
            :active="active"
            finish-status="success"
            simple
          >
            <el-step title="第一步：验证会员信息"></el-step>
            <el-step title="第二步：重置密码"></el-step>
          </el-steps>

          <div class="f1">
            <el-form
              v-if="active === 0"
              ref="form1"
              :model="form1"
              :rules="rules1"
              label-width="100px"
            >

              <el-form-item
                label="手机号码："
                prop="mobile"
              >
                <el-input
                  class="custom-select-260"
                  maxlength="11"
                  placeholder="请输入11位手机号码"
                  v-model="form1.mobile"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="验证码："
                prop="mobile"
              >
                <el-input
                  class="custom-select-260"
                  maxlength="4"
                  placeholder="请输入4位验证码"
                  v-model="form1.mobile"
                ></el-input>
                <span>放验证码</span>
              </el-form-item>
              <el-form-item
                label="手机验证码："
                prop="mobile"
              >
                <el-input
                  class="custom-select-260"
                  maxlength="4"
                  placeholder="请输入6位手机验证码"
                  v-model="form1.mobile"
                ></el-input>
                <el-button
                  size="mini"
                  type="info"
                  round
                >获取验证码</el-button>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  round
                  @click="active = 1"
                >下一步</el-button>
              </el-form-item>
            </el-form>
            <el-form
              v-if="active === 1"
              ref="form2"
              :model="form2"
              :rules="rules2"
              label-width="100px"
            >

              <el-form-item
                label="设置密码："
                prop="newPassword"
              >
                <el-input
                  class="custom-select-260"
                  v-model="form2.newPassword"
                  maxlength="32"
                  placeholder="请输入新的登录密码（6-20位）"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="确认密码："
                prop="reNewPassword"
              >
                <el-input
                  class="custom-select-260"
                  v-model="form2.reNewPassword"
                  maxlength="32"
                  placeholder="请确认新的登录密码"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  round
                  @click="handleSureReset"
                >确定并重置密码</el-button>
              </el-form-item>
            </el-form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.form2.newPassword) {
        callback(new Error("新密码和确认密码不一致!请重新输入"));
      } else {
        callback();
      }
    };
    return {
      active: 0,
      form1: {
        mobile: ""
      },
      rules1: {},
      form2: {
        newPassword: "",
        reNewPassword: ""
      },
      rules2: {
        newPassword: [
          {
            required: true,
            message: "请输入新的登录密码（6-20）",
            trigger: "blur"
          },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        reNewPassword: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName, type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // let params = JSON.parse(JSON.stringify(this.form));
          // params.sellerId = this.userInfo.sellerId;
          // this.updateSellerBasicsInfo(params);
        } else {
          console.log("表单验证失败!!");
          return false;
        }
      });
    },
    handleSureValidator() {
      this.submitForm("form1", 1);
    },
    handleSureReset() {
      this.submitForm("form2", 2);
    }
  }
};
</script>


<style lang="less">
@import url("../../assets/styles/variables.less");
@find-bd-height: 520px;
.find-password-layout {
  > .hd {
    width: @layout-width;
    margin: 0 auto;

    > img {
      display: block;
    }
  }

  // > .bd {
  //   height: @login-bd-height;
  //   background: url("../assets/images/login-banner.jpg") no-repeat center top;
  // }

  .bd-ctn {
    position: relative;
    width: @layout-width;
    height: @find-bd-height;
    margin: 0 auto;
    margin-top: 20px;
    background: #fff;
  }

  .find-password-title {
    text-align: center;
    line-height: 100px;
    font-weight: 700;
    font-size: 25px;
    color: #0099e5;
  }

  .find-password-detail {
    margin: 0 180px;

    > .f1 {
      width: 460px;
      margin: 0 auto;
      margin-top: 40px;
    }
  }
}
</style>
