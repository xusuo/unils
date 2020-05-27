<template>
  <div>
    <el-cascader
      :options="options"
      v-model="selectedPCA"
      :placeholder="placeholder"
      :change-on-select="false"
      :disabled="disabled"
      @change="handleChange"
    >
    </el-cascader>
  </div>
</template>

<script>
// 省市区选择组件
import { PCA } from "@/assets/city-picker.data";

export default {
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      }
    },
    placeholder: {
      type: String,
      default() {
        return "请选择";
      }
    }
  },
  watch: {
    value(val) {
      // this.$set(this, "selectedPCA", val);
      this.selectedPCA = val;
      // console.log(val)
    },
    selectedPCA(val) {
      this.$emit("input", val);
    }
  },
  data() {
    return {
      options: PCA,
      selectedPCA: []
    };
  },
  methods: {
    handleChange(value) {
      // console.log(value)
      this.$emit("change");
    }
  },
   created () {
    // console.log(PCA)
    // console.log(this.value)
    // console.log(this.selectedPCA)
    // 初始化设置默认值
    this.selectedPCA = this.value;
  }
};
</script>
