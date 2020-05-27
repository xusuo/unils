<template>
  <div class="not-found-ctn">
    <div class="t1">404错误</div>
    <div class="t2">请确定链接是否输入正确</div>
    <div class="t3">
      <a
        href="javascript:;"
        @click="$router.push('/')"
      >
        返回首页
        <i class="el-icon-arrow-right"></i>
      </a>
    </div>
  </div>
</template>

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


