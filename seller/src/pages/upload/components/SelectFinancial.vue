<template>
  <div>
    <el-select
      placeholder="财务备注"
      v-model="remark"
      @change="changeRemark"
    >
      <el-option
        v-if="financialRemarkList.length < 10"
        label="新增备注"
        :value="9990"
      ></el-option>
      <el-option
        v-for="(item, i) in financialRemarkList"
        :label="item.note"
        :value="item.note"
        :key="i"
      ></el-option>
    </el-select>

    <AddFinancialRemarkDialog
      ref="addFinancialRemarkDialog"
      @success="handleSearch"
    />
  </div>
</template>

<script>
import AddFinancialRemarkDialog from "@/components/AddFinancialRemarkDialog";
export default {
  components: { AddFinancialRemarkDialog },
  data() {
    return {
      remark: "",
      financialRemarkList: []
    };
  },
  methods: {
    async selectFinanceNoteList(type, note) {
      let res = await this.$http({
        url: "/admin/selectFinanceNoteList",
        method: "get",
        params: {}
      });
      const { code, data } = res;
      if (code == 200 && data) {
        this.financialRemarkList = data;
        if (type && type === "add") {
          this.remark = note;
          this.$emit("select", note);
        }
      }
    },
    changeRemark(value) {
      // console.log(value);
      // 数值类型的，永远不可能选到，
      if (value === 9990) {
        this.remark = "";
        this.$refs.addFinancialRemarkDialog.show();
      } else {
        this.$emit("select", value);
      }
    },
    handleSearch(note) {
      this.selectFinanceNoteList("add", note);
    }
  },
  created() {
    this.selectFinanceNoteList();
  }
};
</script>
