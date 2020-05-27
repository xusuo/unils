<template>
  <div class="myService">
    <div class="custom-bread-wrap">
      我的客服
    </div>
    <!-- 一张运营那边的图片 -->
    <img
      :src="$baseImageUrl + url"
      alt=""
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: ""
    };
  },
  methods: {
    // /admin/getCustomerServiceImg
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
<style lang="less">
.myService {
  padding: 20px;
  text-align: center;

  > img {
    margin-top: 40px;
    display: inline;
    width: 400px;
  }
}
</style>