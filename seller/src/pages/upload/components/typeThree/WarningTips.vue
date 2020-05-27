<template>
  <div class="warningBox">
    <strong>格式要求：</strong>
    <span>
      <em>订单编号，姓名，电话，地址</em>
      按顺序填写，中间用逗号分隔
    </span>
    <strong></strong>
    <strong>示例：</strong>
    <span>
      <em>800000000000，李三，13366666666，浙江省 杭州市 余杭区 财富大道108号</em>
    </span>
    <span>订单编号：淘、猫、京、拼等平台订单编号，如无订单编号可随机填写。</span>
    <span>如遇东莞市、三沙、儋州市、嘉峪关市等没有区的城市，区域可设置为“其他区”</span>
  </div>
</template>

<style lang="less" scoped>
.warningBox {
  background: #fafafa;
  padding: 6px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 740px;

  strong {
    font-size: 14px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.65);
    font-weight: 400;
    margin-bottom: 6px;
  }

  span {
    font-size: 14px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 400;
    margin-bottom: 2px;
  }

  em {
    font-size: 14px;
    line-height: 20px;
    color: #f64f6f;
    font-weight: 700;
  }
}
</style>

