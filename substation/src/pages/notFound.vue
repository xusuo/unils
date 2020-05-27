<template>
  <div class="not-found-ctn">
    <div class="t1">404错误</div>
    <div class="t2">请确定链接是否输入正确</div>
    <div class="t3">
      <a
        href="javascript:;"
        @click="goIndex"
      >
        返回首页
        <i class="el-icon-arrow-right"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    goIndex() {
      let stationType = this.userInfo.stationType;
      // console.log(stationType)
      if (stationType === 2) {
        this.$router.push("/channe/index");
      } else if (stationType === 3) {
        this.$router.push("/substation/index");
      } else if (stationType === 4) {
        this.$router.push("/agency/index");
      } else if (stationType === 5) {
        this.$router.push("/operation/index");
      } else if (stationType === 6) {
        this.$router.push("/market/index");
      }
    }
  }
};
</script>


<style lang="less">
.not-found-ctn {
  padding-top: 300px;
  text-align: center;
  > .t1 {
    font-size: 28px;
    font-weight: bold;
  }
  > .t2 {
    margin-top: 20px;
  }
  > .t3 {
    margin-top: 20px;
  }
}
</style>


