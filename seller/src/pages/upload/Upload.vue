<template>
  <div class="upload">
    <Search />
    <div class="upload-box banxin">
      <h2 class="title">发货方式</h2>
      <p class="tips">
        当您同时为多人发货时，我们为您提供了如下四种提交
        <strong>收件人地址</strong>
        的方式
      </p>

      <div class="typeListBox">
        <div
          class="typeBox handTable"
          @click="handlelist('/upload/typeFour')"
        >
          <img
            src="./images/type_4.png"
            alt=""
            class="typeImg"
          >
          <strong class="typeTitle bold">自动发货
                <img src="@/assets/images/hot.gif" style="display: inline-block;vertical-align: 2px;" alt />
          </strong>
          <em class="oldType">自动标旗</em>
          <span class="typeDetail">
            {{stationName}}独家智能发货系统
          </span>
          <button class="toUse">去使用</button>
        </div>
        <div
          class="typeBox autoTable"
          @click="handlelist('/upload/typeOne')"
        >
          <img
            src="http://baoyitech.oss-cn-hangzhou.aliyuncs.com/15579976880003b8c908582e6127246a9778259f4cb0b"
            alt=""
            class="typeImg"
          >
          <strong class="typeTitle">原表导入发货</strong>
          <em class="oldType">智能筛选发货</em>
          <span class="typeDetail">
            无需修改原表，淘宝、京东、拼多多等平台导出直接上传使用，
            <br />
            系统自动筛选待发收件人信息。
          </span>
          <button class="toUse">去使用</button>
        </div>
        <div
          class="typeBox someTable"
          @click="handlelist('/upload/typeTwo')"
        >
          <img
            src="http://baoyitech.oss-cn-hangzhou.aliyuncs.com/15579956820004ac6c5be60c57435942caa00116b1c1e"
            alt=""
            class="typeImg"
          >
          <strong class="typeTitle">模板上传发货</strong>
          <em class="oldType">批量下单</em>
          <span class="typeDetail">
            根据平台要求收件人地址模板上传，需自行修改表格。
          </span>
          <button class="toUse">去使用</button>
        </div>
        <div
          class="typeBox handTable"
          @click="handlelist('/upload/typeThree')"
        >
          <img
            src="http://baoyitech.oss-cn-hangzhou.aliyuncs.com/b32454208786c327140441d9076f23e01558099733800"
            alt=""
            class="typeImg"
          >
          <strong class="typeTitle">手工下单发货</strong>
          <em class="oldType">手工输入下单</em>
          <span class="typeDetail">
            适合5个收货地址以下商家下单发货，大量收货人相对繁琐，不建议使用。
          </span>
          <button class="toUse">去使用</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../common/Search"; // 搜索
import { giftMixin } from "@/utils/mixin";
export default {
  components: { Search },
  mixins: [giftMixin],
  data() {
    return {
      tipsshow: null,
      remark: null,
      stationName: JSON.parse(localStorage.getItem("stationInfo")).stationName
    };
  },
  methods: {
    async selectNewAnnouncement() {
      let res = await this.$http({
        url: "/home/checkTaskSwitch",
        method: "get",
      });
      const { code, data } = res;
      this.loading = false;
      if (code === 200 && data){ 
        this.tipsshow = data.conf_value;
        this.remark = data.remark;
      }
    },
    async handlelist(url) {
      if(this.tipsshow == 1) {
        this.$alert(this.remark, '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
      }else {
        this.$router.push(url)
      }
    }
  },
  created() {
    this.selectNewAnnouncement();
    // 重置第一种方法
    this.setUploadTypeOne({
      uploadStep: 1,
      orderList: [],
      validedOrders: [],
      filterText: "",
      errorNum: 0,
      rightNum: 0,
      importId: ""
    });

    // 重置第二种方法
    this.setUploadTypeTwo({
      uploadStep: 1,
      orderList: [],
      validedOrders: [],
      errorNum: 0,
      rightNum: 0,
      importId: ""
    });
  }
};
</script>

<style lang="less" scoped>
.upload {
  min-height: 600px;
  background: #fff;
  font-weight: lighter;

  .upload-box {
    padding: 30px 0;
  }
}

.title {
  font-size: 24px;
  line-height: 28px;
  color: #464646;
  font-weight: lighter;
  margin-bottom: 15px;
}

.tips {
  font-size: 14px;
  line-height: 20px;
  color: #757575;
  margin-bottom: 45px;
  font-weight: lighter;

  strong {
    font-size: 16px;
    line-height: 20px;
    color: #ff4d70;
    font-weight: lighter;
  }
}

.typeListBox {
  display: flex;

  .typeBox {
    border-radius: 2px;
    padding: 30px 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    border: 1px solid #c4c4c4;
    // width: 380px;
    width: 300px;
    box-sizing: border-box;
    // margin-right: 60px;
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }

    .typeImg {
      height: 210px;
      margin-bottom: 35px;
    }

    .typeTitle {
      font-size: 16px;
      line-height: 22px;
      color: #000;
      font-weight: lighter;
      margin-bottom: 10px;
      &.bold{
        font-weight: bold;
      }
    }

    .oldType {
      font-size: 16px;
      line-height: 22px;
      color: #ff4d70;
      font-weight: 400;
      margin-bottom: 10px;
    }

    .typeDetail {
      font-size: 14px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.45);
      font-weight: 400;
      text-align: center;
      margin-bottom: 40px;
      height: 40px;
    }

    .toUse {
      width: 100px;
      height: 40px;
      border-radius: 2px;
      border: 1px solid #ff4d70;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      font-size: 16px;
      line-height: 24px;
      color: #ff4d70;
      font-weight: 400;
      transition: 0.2s;
      background: transparent;
      cursor: pointer;
    }

    &:hover {
      border: 1px solid #ff4d70;

      .toUse {
        background: #ff4d70;
        box-shadow: 0 0 2px 2px #fdb6c7;
        color: #fff;
      }
    }
  }
}
</style>
