<template>
  <div class="logoBox">
    <div
      class="logoItem"
      :class="[`${value === 'tb' ? 'active' : ''}`]"
      v-show="value === '' || value === 'tb' "
      @click="select('tb')"
    >
      <div class="topLogo">
        <img
          src="../images/tb.png"
          alt=""
          class="logoImg"
        >
      </div>
      <div class="bottomName">
        <span>菜鸟面单</span>
      </div>
    </div>

    <div
      class="logoItem"
      :class="[`${value === 'tm' ? 'active' : ''}`]"
      v-show="value === '' || value === 'tm' "
      @click="select('tm')"
    >
      <div class="topLogo">
        <img
          src="../images/tm.png"
          alt=""
          class="logoImg"
        >
      </div>
      <div class="bottomName">
        <span>菜鸟面单</span>
      </div>
    </div>

    <div
      class="logoItem"
      :class="[`${value === 'jd' ? 'active' : ''}`]"
      v-show="value === '' || value === 'jd' "
      @click="select('jd')"
    >
      <div class="topLogo">
        <img
          src="../images/jd.png"
          alt=""
          class="logoImg"
        >
      </div>
      <div class="bottomName">
        <span>热敏面单</span>
      </div>
    </div>

    <div
      class="logoItem"
      :class="[`${value === 'pdd' ? 'active' : ''}`]"
      v-show="value === '' || value === 'pdd' "
      @click="select('pdd')"
    >
      <div class="topLogo">
        <img
          src="../images/pdd.png"
          alt=""
          class="logoImg"
        >
      </div>
      <div class="bottomName">
        <span>拼多多面单</span>
      </div>
    </div>

    <div
      class="logoItem"
      :class="[`${value === 'qt' ? 'active' : ''}`]"
      v-show="value === '' || value === 'qt' "
      @click="select('qt')"
    >
      <div class="topLogo">
        <strong class="otherLogo">其他</strong>
      </div>
      <div class="bottomName">
        <span>菜鸟面单</span>
      </div>
    </div>

    <em
      class="reset"
      v-show="value !== ''"
      @click="select('')"
    >重选</em>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    select(type) {
      this.$emit("input", type);
      this.$emit("change-type", type);
    }
  }
};
</script>

<style lang="less" scoped>
.logoBox {
  display: flex;

  .logoItem {
    width: 134px;
    box-sizing: border-box;
    margin-right: 20px;
    border-radius: 2px;
    border: 1px solid #dbdbdb;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: all 0.2s;

    &.active {
      border-color: #f64f6f;

      .bottomName {
        background: #ff4d70;
      }
    }

    &:hover {
      border-color: #f64f6f;

      .bottomName {
        background: #ff4d70;
      }
    }

    .topLogo {
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;

      .logoImg {
        max-height: 45px;
      }

      .otherLogo {
        font-size: 16px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.45);
        font-weight: 400;
      }
    }

    .bottomName {
      height: 28px;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      background: rgba(0, 0, 0, 0.15);
      transition: all 0.2s;

      span {
        font-size: 12px;
        line-height: 18px;
        color: #fff;
        font-weight: 400;
      }
    }
  }

  .reset {
    font-size: 14px;
    line-height: 20px;
    color: #ff97ab;
    font-weight: 400;
    letter-spacing: 2px;
    align-self: flex-end;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>

