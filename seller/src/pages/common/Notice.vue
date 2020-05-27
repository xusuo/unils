/*
 * @Author: 陈晨 
 * @Date: 2019-05-24 17:26:51 
 * @Last Modified by: 陈晨
 * @Last Modified time: 2019-05-28 10:28:17
 * 通知组件。首页，个人中心有用到
 */
<template>
  <div class="notice">
    <div class="notice__img__main">
      <img
        alt
        class="notice__img"
        src="./images/notice.png"
      >
    </div>

    <el-carousel
      :autoplay="true"
      arrow="never"
      class="notice__carousel"
      :direction="vertical"
      height="36px"
      indicator-position="none"
      loop="true"
    >
      <el-carousel-item>
        <h3 class="notice__text medium ellipsis">
          {{stationName}}全新上线！
        </h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stationName: JSON.parse(localStorage.getItem("stationInfo")).stationName,
      vertical: true
    };
  },
  methods: {}
};
</script>
<style lang='less' scoped>
.notice {
  height: 36px;
  background: #fff;
  display: flex;
  align-items: center;
  overflow: hidden;
  font-weight: lighter;

  .notice__img__main {
    position: relative;
    width: 74px;
    height: 100%;
    z-index: 9;
    margin-right: 12px;
    // border-right: 1px solid rgba(0, 0, 0, 0.1);
    background: #fff;

    .notice__img {
      // width: 49px;
      // height: 22px;
      padding: 10px 12px 0 12px;
    }

    &::after {
      content: "";
      position: absolute;
      top: 13px;
      right: 0;
      width: 1px;
      height: 13px;
      background: #ddd;
    }
  }

  .notice__carousel {
    flex: 1;
    height: 36px;
    line-height: 36px;

    .notice__text {
      font-size: 14px;
      font-weight: lighter;
      color: #333;
    }
  }
}
</style>