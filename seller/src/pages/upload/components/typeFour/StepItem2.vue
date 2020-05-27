<template>
  <div
    class="stepItem"
    :class="[`${operateStep >= 2 ? 'active' : ''}`,
               `${operateStep === 2 ? 'nowStep' : ''}`, 
               `${operateStep > 2 ? 'passed' : ''}`]"
  >
    <div class="title">
      <div class="cicle">
        <span
          class="nums"
          v-if="operateStep <= 2"
        >2</span>
        <i
          class="el-icon-check checked"
          v-if="operateStep > 2"
        ></i>
      </div>
      <h6 class="stepTitle">选择订单来源店铺</h6>
    </div>

    <div class="cont">
      <div class="line">
        <span class="lineBg"></span>
      </div>

      <div class="slotBox">
        <div class="step2">
          <el-select
            v-model="shopId"
            placeholder="请选择店铺"
            @change="handleChangeShopId"
          >
            <el-option
              v-for="(item, i) in shopList"
              :key="i"
              :label="item.shopName"
              :value="item.shopId"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectPlatform from "../SelectPlatform";
export default {
  props: ["operateStep"],
  components: { SelectPlatform },
  data() {
    return {
      shopList: [],
      shopId: ""
    };
  },
  methods: {
    // 查询商家所有店铺
    async findSellerShopList() {
      let res = await this.$http({
        url: "/seller/findSellerShopList",
        method: "get"
      });

      const { code, data } = res;

      if (code == 200) {
        this.shopList = data;
      }
    },
    handleChangeShopId(value) {
      this.$emit("change-shop-id", value);
    }
  },
  created() {
    this.findSellerShopList();
  }
};
</script>

