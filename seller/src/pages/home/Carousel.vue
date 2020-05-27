<template>
  <el-carousel
    class="el-carousel"
    indicator-position="none"
    trigger="click" arrow="never"
  >
    <el-carousel-item>
      <div
        class="bannerImgWrap"
        :style="{backgroundImage: `url('${$baseImageUrl}/image/%E6%96%B0%E7%9A%84banner-2.png')`,
      backgroundPosition: 'center top', backgroundRepeat: 'no-repeat', cursor: 'pointer'}"
        @click="$router.push('/mall/letter')"
      ></div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang='less' scoped>
.el-carousel {
  height: 300px;
  width: 1260px;
  margin: 0 auto 15px;
  overflow: hidden;

  .bannerImgWrap {
    width: 100%;
    height: 100%;
  }

  .bannerImg {
    width: 100%;
    height: 240px;
  }
}
</style>