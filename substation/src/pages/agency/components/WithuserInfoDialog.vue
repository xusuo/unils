<template>
  <div>
    <el-dialog
      title="查看详情"
      width="700px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
    >
      
      <table cellspacing="0" cellpadding="0">
        <tr>
          <th>商家账号</th>
          <th>商家快递费</th>
          <th>代理成本价</th>
          <th>佣金</th>
        </tr>
        <tr>
          <td>{{tableData.sellerMobile}}</td>
          <td>{{tableData.expressFee}}</td>
          <td>{{tableData.agentPrice}}</td>
          <td>{{tableData.agentMoney}}</td>
        </tr>
      </table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      tableData: {},
      loading: true,
    };
  },
  methods: {
    show(item) {
      console.log(item);
      this.reset();
      this.getRequest({
        taskId: item.taskId,
      });
      this.visible = true;
    },
    reset() {
      this.tableData = {};
      this.loading = false;
    },
    async getRequest(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/t-agent/getTaskCommissionInfoByTaskId",
          method: "get",
          params
        });
        const { code, data } = res;
        if (data) {
          this.tableData = data;
          this.loading = false;
        } else {
          this.tableData = {};
        }
      } catch (error) {}
    }
  }
};
</script>
<style lang="less" scoped>
table{
  width: 100%;
  width: calc(100% - 40px);
  border: none;
  text-align: center;
  border-spacing: 0;
  border-collapse: 0;
  border-right: 1px solid #ddd;
  margin: 20px;
  th,td{
    border: 1px solid #ddd;
    line-height: 40px;
    border-right: none;
  }
  td{
    border-top: none;
  }
}
</style>