<template>
  <div class="myProfile">
    <div class="custom-bread-wrap">
      个人资料
      <em>登录账号 {{sellerInfo.sellerMobile}}</em>
    </div>

    <div class="myproData">
      <div class="item">
        <span>
          QQ：{{qq}}
        </span>
        <b @click="$refs.editInfoDialog.show({qq, weixin})">修改</b>
      </div>
      <div class="item">
        <span>
          微信：{{weixin}}
        </span>
        <b @click="$refs.editInfoDialog.show({qq, weixin})">修改</b>
      </div>
    </div>

    <EditInfoDialog
      ref="editInfoDialog"
      @success="getSellerInfo"
    />
  </div>
</template>

<script>
import EditInfoDialog from "../components/EditInfoDialog";
export default {
  components: { EditInfoDialog },
  data() {
    return {
      disabled: true,
      qq: "",
      weixin: "",
      sellerInfo: {}
    };
  },
  methods: {
    change() {
      this.disabled = !this.disabled;
    },
    changeData() {
      this.updateSellerInfo({
        sellerQq: this.qq,
        sellerWechat: this.weixin
      });
    },
    async getSellerInfo() {
      let res = await this.$http({
        url: "/admin/getSellerInfo",
        method: "post",
        params: {}
      });

      const { code, data } = res;
      if (code == 200) {
        let sellerInfo = data ? data : { sellerQq: "", sellerWechat: "" };
        this.sellerInfo = sellerInfo;
        this.qq = sellerInfo.sellerQq;
        this.weixin = sellerInfo.sellerWechat;
      }
    },
    async updateSellerInfo(params) {
      let res = await this.$http({
        url: "/admin/updateSellerInfo",
        method: "post",
        data: params
      });

      const { code, data } = res;
      if (code == 200) {
        this.$message.success("修改成功");
      }
    }
  },
  created() {
    this.getSellerInfo();
  }
};
</script>
<style lang='less'>
.myProfile {
  padding: 20px;

  .myproData {
    font-weight: lighter;

    .item {
      display: flex;
      align-items: center;
      line-height: 85px;
      padding: 0 25px;
      margin-bottom: 25px;
      border: 1px solid #ddd;

      span {
        flex: 1;
        font-weight: normal;
        color: #333;
      }

      b {
        display: inline-block;
        width: 105px;
        height: 32px;
        line-height: 32px;
        background: #f9f1ed;
        text-align: center;
        font-size: 14px;
        font-weight: lighter;
        color: #ff4d70;
        cursor: pointer;
      }
    }
  }

  // .myproData {
  //   border: 1px solid #eee;
  //   margin: 0 0 10px 0;

  //   .amand {
  //     border-bottom: 1px solid #eee;
  //     font-size: 15px;
  //     line-height: 20px;
  //     color: #f64f6f;
  //     font-weight: 400;
  //     padding: 6px;
  //     cursor: pointer;
  //   }
  // }
  // .myproContent {
  //   width: 350px;
  //   margin: 10px;
  //   p {
  //     margin-top: 10px;
  //     display: flex;
  //     font-size: 12px;
  //     line-height: 10px;
  //     color: rgba(0, 0, 0, 0.45);
  //     font-weight: 400;
  //     label {
  //       display: flex;
  //       justify-content: center;
  //       align-items: center;
  //       width: 100px;
  //     }
  //   }
  // }
  // .button-n {
  //   font-size: 14px;
  //   line-height: 38px;
  //   color: #fff;
  //   background: #f64f6f;
  //   padding: 0 32px;
  //   border: 1px solid #f64f6f;
  //   transition: all 0.3s;
  //   border-radius: 2px;
  //   white-space: nowrap;
  //   line-height: 26px;
  //   background: #f64f6f;
  //   margin-left: 150px;
  //   margin-top: 10px;
  //   color: #fff;
  //   border-radius: 4px;
  // }
}
</style>