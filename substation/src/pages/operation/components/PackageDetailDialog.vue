<template>
  <div>
    <el-dialog
      title="包裹详情"
      width="500px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
    >
      <div class="title">收件信息</div>
      <div class="content">
        <div>收件人姓名：{{form.receiverName}}</div>
        <div>收件人电话：{{form.receiverPhone}}</div>
        <div>收件人地址：{{form.receiverProvince}}
          {{form.receiverCity}}
          {{form.receiverArea}}
          {{form.receiverTown}}
          {{form.receiverAddress}}
        </div>
        <div>
          快递状态：
          <template v-if="form.packageStatus == 1">待支付</template>
          <template v-if="form.packageStatus == 2">已支付待发货</template>
          <template v-if="form.packageStatus == 3">已发货</template>
          <template v-if="form.packageStatus == 4">已完成</template>
        </div>
      </div>
      <div class="title">商品信息</div>
      <div class="content">
        <table class="table-product">
          <tr>
            <td>
              <img
                :src="$baseImageUrl + form.goodsImgUrl +
                 '?imageView2/2/w/50'"
                alt=""
                style="width: 50px;display: inline;"
              >
            </td>
            <td>
              {{form.goodsName}}
            </td>
            <td>
              *1
            </td>
          </tr>
          <tr>
            <td
              colspan="3"
              style="text-align: right;"
            >
              重量：{{form.goodsWeight}}kg
            </td>
          </tr>
          <tr>
            <td
              colspan="3"
              style="text-align: right;"
            >
              费用计算：{{form.goodsPrice}}元
            </td>
          </tr>
        </table>
      </div>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="visible = false"
        >关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      loading: false,
      form: {
        receiverName: "",
        receiverPhone: "",
        receiverProvince: "",
        receiverCity: "",
        receiverArea: "",
        receiverTown: "",
        receiverAddress: "",
        packageStatus: "",
        goodsName: "",
        goodsImgUrl: "",
        goodsWeight: "",
        goodsPrice: ""
      },
      rules: {
        shopName: [
          {
            whitespace: true,
            required: true,
            message: "请输入店铺名",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    show(items) {
      this.reset(items);
      this.visible = true;
    },
    reset(items) {
      const {
        receiverName,
        receiverPhone,
        receiverProvince,
        receiverCity,
        receiverArea,
        receiverTown,
        receiverAddress,
        packageStatus,
        goodsName,
        goodsWeight,
        goodsPrice
      } = items;

      let goodsImgUrl = JSON.parse(items.goodsImgUrl)[0];

      this.form = {
        receiverName,
        receiverPhone,
        receiverProvince,
        receiverCity,
        receiverArea,
        receiverTown,
        receiverAddress,
        packageStatus,
        goodsName,
        goodsImgUrl,
        goodsWeight,
        goodsPrice
      };
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
}

.content {
}
</style>
