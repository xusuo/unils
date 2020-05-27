<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>分站</el-breadcrumb-item>
        <el-breadcrumb-item>分站列表</el-breadcrumb-item>
        <el-breadcrumb-item>成本设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="100px"
      >
        <el-form-item label="渠道名称：">
          <el-input
            v-model="searchForm.channelName"
            class="custom-select-160"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="分站名称：">
          <el-input
            v-model="searchForm.stationName"
            class="custom-select-160"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="快递类型：">
          <el-select
            v-model="searchForm.type"
            class="custom-select-160"
            @change="switchExpress"
          >
            <el-option
              v-for="(item, i) in expressList"
              :label="item.name"
              :value="item.id"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" v-if="show" >
          <el-button type="primary" @click="dialogVisible = true">批量修改</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div
      class="custom-container-wrap"
      style="margin-top: 10px;"
    >
      <el-table
        :data="tableData"
        stripe
        border
        :span-method="objectSpanMethod"
        v-loading="loading"
      >
       <el-table-column
          label="分仓"
          prop="pointName"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.groupId !=7 ? scope.row.pointName :''}}
          </template>
        </el-table-column>
        <el-table-column
          label="快递类型"
          width="120px"
          prop="expressName"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="归属名称"
          prop="roleName"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="首重0.5kg（非偏远）"
          prop="first"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="0.5kg-1kg (非偏远)"
          prop="firstKg"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="1kg以上续重，每0.5kg (非偏远)"
          prop="additional"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="首重0.5kg (偏远)"
          prop="farFirst"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="0.5kg---1kg (偏远)"
          prop="farFirstKg"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="1kg以上续重，每0.5kg (偏远)"
          prop="farAdditional"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="是否按单提成"
          prop="isOnePrice"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.isOnePrice == 0">否</span>
            <span v-if="scope.row.isOnePrice == 1">是</span>
          </template>
        </el-table-column>
        <el-table-column
          label="每单提成"
          prop="onePrice"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          prop="customerName"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="small"
              icon="el-icon-edit"
              v-if="scope.row.roleName == '分站'"
              @click="$refs.setPirceDialog.show(scope.row);"
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <SetPirceDialog
      ref="setPirceDialog"
      :expressId="searchForm.type"
      :pointId="searchForm.point"
      @success="getTableData"
    />
    
  <el-dialog
    title="批量修改"
    :visible.sync="dialogVisible"
    width="500px"
    :before-close="handleClose">
    <el-form
        ref="form" :rules="rules"
        :model="form"
        label-width="150px"
      >

        <el-form-item prop="onePrice"
          label="成本价："
        >
          <el-input
            v-model="form.onePrice"
            class="custom-select-260"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

      </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleget">确 定</el-button>
    </span>
  </el-dialog>
    
  </div>
</template>

<script>
import SetPirceDialog from "./components/SetPriceDilaog";
export default {
  components: { SetPirceDialog },
  data() {
    return {
      loading: false,
      channelTableData: [],
      tableData: [],
      show: true,
      dialogVisible: false,
      form:{},
      searchForm: {
        channelName: "",
        stationName: "",
        type: 1,
      },
      expressList: [],
      rules: {
        onePrice: [
          { required: true, message: '请输入成本价', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    async getExpressList(params) {
      this.loading = true;
      let res = await this.$http({
        url: "/channel/getExpressList",
        method: "post",
        data: params
      });
      const { code, data } = res;
      this.loading = false;
      if (code === 200) {
        this.searchForm.type = data[0].id;
        this.expressList = data;

      }
    },
    async getChannelPriceSetByChannelId() {
      let res = await this.$http({
        url: "/channel/getChannelPriceSetByChannelId",
        method: "post",
        data: {
          channelId: this.$route.query.channelId,
          expressId: this.searchForm.type,
          pointId: this.searchForm.point
        }
      });
      const { data } = res;
      if (data) {
        this.channelTableData = [data];
      } else {
        this.channelTableData = [
          {
            setId: 0,
            first: 0,
            firstKg: 0,
            additional: 0,
            farFirst: 0,
            farFirstKg: 0,
            farAdditional: 0,
            isOnePrice: 0,
            onePrice: ""
          }
        ];
      }
    },

    // 批量修改
    async handleget(str) {
      this.$refs.form.validate(valid => {
        if (valid) {

          const res = this.$http({
            url: "/point/updateBatchStationEnvelopePrice",
            method: "post",
            data: {
              stationId: this.$route.query.id,
              expressId: this.searchForm.type,
              onePrice: this.form.onePrice
            }
          });
          this.$nextTick(() => {
            this.$refs['form'].resetFields()
          })
          this.dialogVisible = false
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          
          location.reload();
        }
      })
    },

    async getTableData() {
      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/station/getStationPriceByPoint",
        method: "get",
        params: {
          expressId: this.searchForm.type,
          stationId: this.$route.query.id,
        }
      });
      const { data } = res;
      this.loading = false;
      if (data) {
        this.tableData = [];
        // this.pagination.total = parseInt(data.total);
        
        data.forEach(element => {
          element.priceSetVoList.forEach(child => {

            this.tableData.push(child)
          })
        });

      } else {
        this.tableData = [
          {
            setId: 0,
            first: 0,
            firstKg: 0,
            additional: 0,
            farFirst: 0,
            farFirstKg: 0,
            farAdditional: 0,
            isOnePrice: 0,
            onePrice: ""
          }
        ];
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    async switchExpress(item) {
      this.getChannelPriceSetByChannelId();
      this.getTableData();
      if(item==1){
        this.show = true
      }else{
        this.show = false
      }
    },
    switchPoint() {
      this.getChannelPriceSetByChannelId();
      this.getTableData();
    }
  },
  async created() {
    this.searchForm.stationName = this.$route.query.name;
    this.searchForm.channelName = this.$route.query.cname;
    await this.getExpressList();
    this.getChannelPriceSetByChannelId();
    this.getTableData();
  }
};
</script>
<style lang="less">
.table-main{
  margin-top: 20px;
  table{
    border-spacing:0;
    margin-bottom: 20px;
  }
  .title{
    margin-bottom: 10px;
  }
  td:last-child,th:last-child{
    border-right: 1px solid #ddd;
  }
  th{
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    padding: 7px 5px;
    border: 1px solid #ddd;
    border-right: 0;
    background: #f5f5f5;
  }
  td{
    padding: 7px 5px;
    text-align: center;
    border-left: 1px solid #ddd;
    border-bottom: 1px solid #ddd;

  }
}
</style>