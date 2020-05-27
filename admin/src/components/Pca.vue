<template>
  <div>
    <!-- <el-cascader
      :options="options"
      v-model="selectedPCA"
      :placeholder="placeholder"
      :change-on-select="false"
      :disabled="disabled"
      @change="handleChange"
      :props="props"
    >
    </el-cascader> -->
    <v-distpicker @selected="onSelected" :province="temp.address__province" :city="temp.address__city" :area="temp.address__area"></v-distpicker>
  </div>
</template>

<script>
// 省市区选择组件
import VDistpicker from 'v-distpicker'

export default {
  components: { VDistpicker },

  props: {
    citylist: {
      type: Array,
      default() {
        return [];
      }
    },
  },
  watch: {
    citylist: function(item){
      this.temp = {
        address__province: item[0],
        address__city: item[1],
        address__area: item[2],
      }
    }
  },
  data() {
    return {
      selectedPCA: [],
      temp: {
        address__province: this.citylist[0],
        address__city: this.citylist[1],
        address__area: this.citylist[2],
      },
      props: {
        value: "label"
      }
    };
  },
  methods: {
    onSelected(data) {
      this.temp.address__province = data.province.value
      this.temp.address__city = data.city.value
      this.temp.address__area = data.area.value
      const list = [data.province.value, data.city.value, data.area.value]
      this.$emit("update:citylist", list);
    },
  },
};
</script>
<style lang="less">
.distpicker-address-wrapper select{
  font-size: 14px;
  width: 80px;
  padding: 0px 6px;
  height: 38px;
}
</style>