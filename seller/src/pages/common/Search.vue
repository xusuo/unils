/*
 * @Author: 陈晨 
 * @Date: 2019-05-24 17:27:44 
 * @Last Modified by: 陈晨
 * @Last Modified time: 2019-05-28 18:59:21
 * 搜索组件，首页，商城用到
 */
<template>
  <div class="search">
    <div class="banxin search__inner">
      <div
        class="search__logo"
        @click="$router.push('/index')"
      >
        <div>
          <img
            :src="$baseImageUrl + logoUrl"
            alt=""
          >
        </div>
        <div>
          <div class="stationName">
            {{stationName}}
          </div>
          <div class="stationUrl">
            {{stationUrl}}
          </div>
        </div>
      </div>
      <div class="search__wrap">
        <div class="search__input__button">
          <el-input
            class="search__input"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="input"
          ></el-input>
          <b
            @click="searchGift"
            class="searchBtn"
          >搜索</b>
        </div>
        <div class="search__list">
          <router-link
            class="search__item"
            to="/mall/all?name=纸巾"
          >纸巾</router-link>
          <router-link
            class="search__item"
            to="/mall/all?name=抽纸"
          >抽纸</router-link>
          <router-link
            class="search__item"
            to="/mall/all?name=牙刷"
          >牙刷</router-link>
          <router-link
            class="search__item"
            to="/mall/all?name=垃圾袋"
          >垃圾袋</router-link>
          <router-link
            class="search__item"
            to="/mall/all?name=笔"
          >笔</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      logoUrl: JSON.parse(localStorage.getItem("stationInfo")).logoUrl,
      stationName: JSON.parse(localStorage.getItem("stationInfo")).stationName,
      stationUrl: ""
    };
  },
  methods: {
    searchGift() {
      this.$router.push(`/mall/all?name=${this.input}`);
    }
  },
  watch: {
    $route() {
      let name = this.$route.query.name;
      if (name) {
        this.input = name;
      }
    }
  },
  created() {
    let name = this.$route.query.name;
    if (name) {
      this.input = name;
    }

    // 设置logo上的网站链接
    this.stationUrl = location.host;
  }
};
</script>
<style lang="less" scoped>
.search {
  background: #fff;
  border-bottom: 1px solid #ddd;

  .search__inner {
    display: flex;
    height: 117px;
  }

  .search__logo {
    display: flex;
    margin-right: 177px;
    cursor: pointer;

    img {
      width: 55px;
      height: 55px;
      margin-top: 31px;
    }

    .stationName {
      margin-left: 10px;
      margin-top: 31px;
      font-size: 24px;
      font-weight: lighter;
      color: #000;
    }

    .stationUrl {
      margin-left: 10px;
      font-size: 12px;
      line-height: 14px;
      color: #666;
      font-weight: 400;
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .search__wrap {
    width: 532px;
    margin-top: 36px;
  }

  /deep/.search__input__button {
    display: flex;
    height: 40px;

    .search__input {
      flex: 1;
      border: 2px solid #ff4d70;
      border-right: 0;

      > .el-input__inner {
        height: 36px;
        border: none;
      }
    }
    .searchBtn {
      height: 100%;
      width: 96px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      background: #ff4d70;
      font-size: 18px;
      line-height: 28px;
      color: #fff;
      font-weight: lighter;
      letter-spacing: 2px;
      cursor: pointer;
    }
    .search__button {
      width: 102px;
      height: 46px;
      font-size: 20px;
    }
  }

  .search__list {
    display: flex;
    justify-content: flex-start;
    font-weight: lighter;

    .search__item {
      position: relative;
      margin: 10px 0 0 10px;
      padding-right: 10px;
      height: 12px;
      line-height: 12px;
      font-size: 12px;
      color: #ff4d70;
      // border-right: 1px solid #fd8200;

      &::after {
        content: "";
        position: absolute;
        top: 3px;
        right: 0;
        width: 1px;
        height: 8px;
        background: #ff4d70;
      }

      &:hover {
        text-decoration: underline;
        color: #f64f6f;
      }

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        &::after {
          display: none;
        }
      }
    }
  }
}
</style>