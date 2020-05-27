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
        <div>
          收件人姓名:
          <el-input
            placeholder=""
            size="small"
            class="custom-select-260"
            :readonly="inputStatus"
            v-model="form.receiverName">
          </el-input>
        </div>
        <div>
          收件人手机:
          <el-input
            placeholder=""
            size="small"
            class="custom-select-260"
            maxlength = "11"
            :readonly="inputStatus"
            v-model="form.receiverPhone">
          </el-input>
          </div>
        <div>收件人地址： 
          <PCA
          class="custom-select-260 inline-input"
          v-model="form.tempPca"  :citylist.sync="form.tempPca"
        />
        </div>
        <div>
          详情地址：  
          <el-input
          class="custom-select-260 inline-input"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="form.receiverAddress">
        </el-input>

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
         <el-button
          size="small"
          type="primary"
          v-if="!inputStatus"
          @click="handleSure"
        >确认</el-button>
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
      inputStatus: false,
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
        goodsPrice: "",
        taskId:"",
        tempPca: []
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
        goodsPrice,
        taskId,
      } = items;

      let goodsImgUrl = JSON.parse(items.goodsImgUrl)[0];
      console.log(items)
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
        goodsPrice,
        taskId
      };
      this.form.tempPca = [
        items.receiverProvince,
        items.receiverCity,
        items.receiverArea
      ]
    console.log(this.form.tempPca)
    },

    async updateTaskUserInfo(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/t-station/updateTaskUserInfo",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("修改成功");
          this.visible = false;
          // 调用钩子，刷新主界面的数据
          this.$emit("success");
        }
      } catch (error) {
        this.loading = false;
      }
    },
    handleSure(){
      if(!this.inputStatus){
       let params = {};
       params.taskId = this.form.taskId;
       if(this.form.receiverPhone != null){
            params.receiverPhone = this.form.receiverPhone;
       }
        if(this.form.receiverName != null){
            params.receiverName = this.form.receiverName;
       }
      if(this.form.receiverAddress != null){
            params.receiverAddress = this.form.receiverAddress;
       }
       
        if(this.form.tempPca != []){
           
          params.receiverState = this.form.tempPca[0]
          params.receiverCity = this.form.tempPca[1]
          params.receiverDistrict = this.form.tempPca[2]
       }

      this.updateTaskUserInfo(params);
      }else{
            this.visible = false;
      }
      
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

.inline-input {
  display: inline-block;
  margin-top: 10px;
  vertical-align: top;
}
</style>
