/*
 * @Author: 陈晨 
 * @Date: 2019-05-27 10:57:49 
 * @Last Modified by: 陈晨
 * @Last Modified time: 2019-05-30 14:04:47
 */
<template>
  <div class="history banxin">
    <ul class="history__list">
      <li class="history__list__head">
        <p>
          <span>商品信息</span>
          <span>数量</span>
        </p>
        <p>
          <span>包裹总计</span>
          <span>操作</span>
        </p>
      </li>
      <li class="history__list__item">
        <div class="infoNum flex1">
          <div class="infoNumChildItem">
            <div class="info flex3 mr20">
              <img
                alt="沐新抽纸"
                class="mainPic"
                src="http://baoyitech.oss-cn-hangzhou.aliyuncs.com/1558329431437a017e0caf9119cc47e6729799c0161ba"
              >
              <div class="detail flex1">
                <p class="productName">沐新抽纸</p>
                <div class="priceWeight">
                  <span class="price">0.79元/件</span>
                  <span class="weight">0.06kg/件</span>
                </div>
              </div>
            </div>
            <div class="num flex1">
              <span class="text">1</span>
            </div>
          </div>
          <div class="infoNumChildItem">
            <div class="info flex3 mr20">
              <img
                alt="沐新抽纸"
                class="mainPic"
                src="http://baoyitech.oss-cn-hangzhou.aliyuncs.com/1558329431437a017e0caf9119cc47e6729799c0161ba"
              >
              <div class="detail flex1">
                <p class="productName">沐新抽纸</p>
                <div class="priceWeight">
                  <span class="price">0.79元/件</span>
                  <span class="weight">0.06kg/件</span>
                </div>
              </div>
            </div>
            <div class="num flex1">
              <span class="text">1</span>
            </div>
          </div>
        </div>
        <div class="countOperate flex1">
          <div class="countBox flex1">
            <div class="countDetail">
              <span>商品总额：</span>
              <strong>￥0.79</strong>
            </div>
            <div class="countDetail">
              <span>基础运费：</span>
              <strong>￥3.2</strong>
            </div>
            <div class="countDetail">
              <span>总计：</span>
              <strong>￥3.99</strong>
            </div>
          </div>
          <div class="operate flex1">
            <button class="sendAgain button-n">再次发货</button>
            <b class="button-text delete">删除</b>
          </div>
        </div>
      </li>
    </ul>
    <empty-box/>
  </div>
</template>

<script>
import EmptyBox from "../../common/EmptyBox";
export default {
  components: {
    EmptyBox
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang='less'>
@import './history.less';
</style>