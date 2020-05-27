<template>
  <div class="rightBarBox">
    <div
      :class="showBox?'openBar':''"
      class="rightBar"
    >
      <div class="iconBox">
        <div
          :class="addviceShow?'iconActive':''"
          @click="showItem('addvice')"
          class="addvice hoverIcon iconItem"
        >
          <i
            alt="意见反馈"
            class="iconfont el-icon-edit"
          ></i>
          <span>意见反馈</span>
        </div>
        <div
          :class="messageShow?'iconActive':''"
          @click="showItem('message')"
          class="message hoverIcon iconItem"
        >
          <i
            alt="消息推送"
            class="iconfont el-icon-document"
          ></i>
          <span>消息推送</span>
        </div>
        <div
          :class="shopCarShow?'iconActive':''"
          @click="showItem('shopCar')"
          class="shopCar iconItem"
        >
          <i
            alt="购物车"
            class="iconfont el-icon-shopping-cart-2 carIcon"
          ></i>
          <strong>购</strong>
          <strong>物</strong>
          <strong>车</strong>
        </div>
        <div
          :class="helpCenterShow?'iconActive':''"
          @click="showItem('helpCenter')"
          class="helpCenter hoverIcon iconItem"
        >
          <i
            alt="客服中心"
            class="iconfont el-icon-service"
          ></i>
          <span class="fixedServe">客服中心</span>
        </div>
      </div>
      <div class="contentBox">
        <div
          class="addvice"
          v-show="addviceShow"
        >
          <h6 class="title">尊敬的用户</h6>
          <p class="desc">你好！如果您在使用我们平台时，有什么好或不好的地方，请大声说出来！我们会关注您的反馈，不断优化产品，为您提供更好地服务！</p>
          <textarea
            v-model="feedbackContent"
            class="textAreaInput"
          ></textarea>
          <div class="feedback">
            <button
              class="submit"
              @click="submitFeedback"
            >提交反馈</button>
          </div>
        </div>
        <div
          class="message"
          v-show="messageShow"
        >
          <h6 class="title">消息推送</h6>
          <empty-box />
        </div>
        <shop-car
          ref="ShopCar"
          :shopCarShow="shopCarShow"
        />
        <div
          class="helpCenterBox"
          v-show="helpCenterShow"
        >
          <div class="helpCenter">
            <div class="plantServe">
              <h6 class="stationName">{{stationName}}</h6>
              <img
                alt="分站联系方式"
                class="erCodeImg"
                :src="$baseImageUrl + url"
              >
              <!-- <span style="color: #fff;margin-top: 10px;">遇到问题，可以按照下方的提示操作，客服下一版本上线。</span> -->
            </div>
          </div>
          <div class="questionSearch flexS">
            <div class="solveQuit">
              <span>快速解决</span>
            </div>
            <div class="tips">
              <span>如果您遇到了以下问题，可以点击查看相关解决方案。</span>
              <p class="lookAll">
                <button
                  class="all button-text"
                  @click="goPage('/userCenter/helpCenter/commonQuestion')"
                >全部&gt;&gt;</button>
              </p>
            </div>
            <p class="commQues">
              <!-- <a
                class="button-text quesItem"
                href="https://pan.wps.cn/l/sapxl4yh9?f=101"
                target="_blank"
              >如何手工下单 &gt;&gt;</a> -->
              <a
                class="button-text quesItem"
                href="javascript:;"
                @click="goPage('/userCenter/helpCenter/commonQuestionDetail?i=0&j=0')"
              >如何进行充值 &gt;&gt;</a>
              <!-- <a
                class="button-text quesItem"
                href="https://drive.wps.cn/view/l/sQdLSVk2R?f=101%3Ff%3D101"
                target="_blank"
              >支付宝转账充值未到账 &gt;&gt;</a> -->
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      @click="closeEmpty"
      class="empty"
      v-show="emptyShow"
    ></div>
  </div>
</template>

<script>
import ShopCar from "./sldebar/ShopCar";
import EmptyBox from "./EmptyBox";
export default {
  components: {
    EmptyBox,
    ShopCar
  },
  data() {
    return {
      showBox: false,
      addviceShow: false,
      messageShow: false,
      shopCarShow: false,
      helpCenterShow: false,
      emptyShow: false,
      feedbackContent: "",
      stationName: JSON.parse(localStorage.getItem("stationInfo")).stationName,
      url: ""
    };
  },
  methods: {
    // 切换侧边栏Content
    showItem(item) {
      if (!this.showBox) {
        this.showBox = !this.showBox;
      }
      if (item === "shopCar") {
        this.$refs.ShopCar.getShopCar();
      }
      this.addviceShow = false;
      this.messageShow = false;
      this.shopCarShow = false;
      this.helpCenterShow = false;
      this.emptyShow = true;
      this[item + "Show"] = !this[item + "Show"];
    },
    closeEmpty() {
      this.emptyShow = false;
      this.showBox = false;
    },
    submitFeedback() {
      this.feedbackContent = "";
      this.$message.success("提交成功，感谢您的反馈。");
    },
    // 点击右侧里面的链接进行界面跳转
    goPage(url) {
      this.closeEmpty();
      this.$router.push(url);
    },
    async getCustomerServiceImg() {
      let res = await this.$http({
        url: this.$loginURL + "/getCustomerServiceImg",
        method: "get",
        params: {
          stationId: JSON.parse(localStorage.getItem("stationInfo")).stationId
        }
      });

      let { code, data } = res;
      if (code == 200) {
        this.url = data;
      }
    }
  },
  created() {
    this.getCustomerServiceImg();
  }
};
</script>
<style lang='less' scoped>
@import "./sldebar/sidebar.less";
</style>