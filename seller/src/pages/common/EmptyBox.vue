<template>
  <div class="empty-box">
    <img
      alt="内容为空"
      src="./images/empty.png"
    >
    <span>无数据</span>
  </div>
</template>

<script>

export default {
    
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang='less'>
.empty-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 60px 0;
  img {
    width: 186px;
    margin-bottom: 8px;
  }
  span {
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.25);
  }
}
</style>