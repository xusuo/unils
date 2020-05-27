/*
 * @Author: 陈晨 
 * @Date: 2019-05-24 18:03:28 
 * @Last Modified by: 陈晨
 * @Last Modified time: 2019-05-25 17:41:16
 */
<template>
  <div class="footer">
    <ul class="footer__list banxin">
      <li class="footer__item">
        <img
          alt="降成本"
          src="./images/footer1.png"
        >
        <div class="item__descText">
          <strong>降成本</strong>
          <span>帮你降低50%发货成本，省去你能想到的所有发货成本</span>
        </div>
      </li>
      <li class="footer__item">
        <img
          alt="去库存"
          src="./images/footer2.png"
        >
        <div class="item__descText">
          <strong>去库存</strong>
          <span>回收库存/去礼品库存/去自有产品库存</span>
        </div>
      </li>
      <li class="footer__item">
        <img
          alt="保品质"
          src="./images/footer3.png"
        >
        <div class="item__descText">
          <strong>保品质</strong>
          <span>同样价格，给你更好的品质；同样品质，给你最低的价格</span>
        </div>
      </li>
      <li class="footer__item">
        <img
          alt="多选择"
          src="./images/footer4.png"
        >
        <div class="item__descText">
          <strong>多选择</strong>
          <span>非配重礼品/可配重礼品/高端礼品等</span>
        </div>
      </li>
    </ul>
    <div class="footer__href">
      <ul class="footer__otherLinks">
        <li>
          <!-- <strong>关于我们</strong> -->
          <router-link to="/userCenter/helpCenter/myService">客服中心</router-link>
          <!-- <router-link to="/">关于我们</router-link> -->
        </li>
        <li>
          <!-- <strong>商家指南</strong> -->
          <router-link to="/userCenter/helpCenter/commonQuestion">帮助中心</router-link>
          <!-- <router-link to="/">工单管理</router-link> -->
        </li>
        <!-- <li>
          <strong>电商资讯</strong>
          <router-link to="/">平台公告</router-link>
          <router-link to="/">行业资讯</router-link>
        </li> -->
        <!-- <li>
          <strong>商务合作</strong>
          <router-link to="/">代发申请</router-link>
          <router-link to="/">供货渠道</router-link>
        </li> -->
      </ul>
      <div class="footer__copyRight">Copyright@2020 <a target="_blank" href="http://www.beian.miit.gov.cn">{{record_code}} </a> All Rights Reserved.</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      record_code: JSON.parse(localStorage.getItem("stationInfo")).record_code,
    };
  },
  methods: {}
};
</script>
<style lang='less'>
.footer {
  width: 100%;
  font-weight: lighter;
  background: #fff;
  & > .footer__list {
    display: flex;
    align-items: center;
    padding: 30px 0;
    background: #fff;
    border-bottom: 1px solid #e0e0e0;

    & > .footer__item {
      margin-right: 65px;
      display: flex;
      flex: 1;
      &:last-child {
        margin-right: 0;
      }
      img {
        // width: 50px;
        // height: 56.5px;
        margin-right: 12px;
      }
      .item__descText {
        display: flex;
        flex-direction: column;
        strong {
          font-size: 14px;
          line-height: 20px;
          color: #333;
          font-family: 苹方;
          margin-bottom: 2px;
          font-weight: lighter;
        }
        span {
          font-size: 12px;
          line-height: 17px;
          color: #999;
          font-weight: 400;
          letter-spacing: 1px;
          font-family: 苹方;
        }
      }
    }
  }
  & > .footer__href {
    padding: 20px 0;
    .footer__copyRight {
      text-align: center;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: 12px;
      line-height: 18px;
      color: #898989;
      font-weight: 400;
      margin-bottom: 4px;
    }
    .footer__otherLinks {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      margin-bottom: 30px;
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 0 40px;
        // strong {
        //   font-size: 14px;
        //   line-height: 20px;
        //   color: #fff;
        //   font-weight: 700;
        //   margin-bottom: 10px;
        // }
        a {
          margin-bottom: 2px;
          font-size: 12px;
          line-height: 20px;
          color: #000;
          font-weight: 400;
        }
      }
    }
  }
}
</style>