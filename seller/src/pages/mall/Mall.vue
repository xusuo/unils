/*
 * @Author: 陈晨 
 * @Date: 2019-05-25 17:49:17 
 * @Last Modified by: 陈晨
 * @Last Modified time: 2019-05-30 17:01:53
 */
<template>
  <div class="mall ">
    <Search />
    <nav class="mall__nav">
      <div class="mall__list banxin">
        <router-link to="/mall/all">所有礼品</router-link>
        <router-link to="/mall/letter">信封件</router-link>
        <router-link to="/mall/private">私有仓库</router-link>
        <!-- <router-link to="/mall/history">历史购买</router-link> -->
      </div>
      <!-- <a
        class="mall__empty"
        href="javascript:;"
      >平台没有我想要的商品>></a> -->
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
import Search from "../common/Search";
export default {
  components: {
    Search
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang='less'>
.mall {
  padding: 0 0 10px 0;

  .mall__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 40px;
    background: #fff;
    font-weight: lighter;

    .mall__list {
      display: flex;
      border-bottom: 1px solid #ff4d70;

      a {
        width: 120px;
        height: 43px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.65);
        font-weight: medium;
        cursor: pointer;
        transition: all 0.2s;
        &.active {
          background: #ff4d70;
          color: #fff;
        }
      }
    }
    .mall__empty {
      font-size: 14px;
      line-height: 20px;
      color: #ff4d70;
      font-weight: 700;
      text-decoration: underline;
    }
  }
}
</style>