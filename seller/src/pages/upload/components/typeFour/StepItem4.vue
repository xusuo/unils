<template>
  <div
    class="stepItem"
    :class="[`${operateStep >= 4 ? 'active' : ''}`,
               `${operateStep === 4 ? 'nowStep' : ''}`, 
               `${operateStep > 4 ? 'passed' : ''}`]"
  >
    <div class="title">
      <div class="cicle">
        <span
          class="nums"
          v-if="operateStep <= 4"
        >4</span>
        <i
          class="el-icon-check checked"
          v-if="operateStep > 4"
        ></i>
      </div>
      <h6 class="stepTitle">提交订单处理任务</h6>
    </div>

    <div class="cont">
      <div class="line">
      </div>

      <div class="slotBox">
        <div class="step4">
          <button
            class="sureSubmit"
            :disabled="cantSubmit"
            @click="sureToSubmit"
            :loading="loading"
          >确认提交</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 查询数组重复
let isRepeat = arr => {
  let hash = {};
  for (let i in arr) {
    if (hash[arr[i]]) {
      return true;
    }
    hash[arr[i]] = true;
  }
  return false;
};

export default {
  props: ["operateStep", "gift", "type", "orderList", "shopId"],
  data() {
    return {
      loading: false
    };
  },
  computed: {
    cantSubmit() {
      return (
        this.shopId === "" || this.type === "" || this.orderList.length === 0
      );
    }
  },
  methods: {
    async sureToSubmit() {
      // console.log(this.gift);
      // console.log(this.type);
      // console.log(this.orderList);
      // console.log(this.shopId);

      // return false;

      if (this.orderList.length > 100) {
        this.$message.error("单次导入不能超过100个订单");
        return false;
      }

      if (isRepeat(this.orderList)) {
        this.$message.error("导入存在重复订单，请检查");
        return false;
      }

      this.$message.success("导入时间比较长,请耐心等待...");
      this.loading = true;

      let res = await this.$http({
        // url: "/admin/addTask",
        url: "/seller/importTaskByOrderNo",
        method: "post",
        data: {
          shopId: this.shopId,
          orderNos: this.orderList.join(",")
        }
      });

      const { code, data } = res;

      // console.log(res);
      if (code == 200) {
        // 导入订单，并且关联礼品包成功，到下一页
        this.$message.success("导入订单成功，请继续选择礼品");
        this.$router.push("/upload/typeFourGift?id=" + data);
        // this.$router.push("/order/taskList");
      }

      this.loading = false;
    }
  }
};
</script>

