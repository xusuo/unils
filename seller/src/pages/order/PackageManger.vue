<template>
  <div class="packageManger">
    <div class="custom-bread-wrap">
      底单申请
    </div>

    <div class="cusForm">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="170px"
      >
        <!-- <el-form-item>
          <span>快递单号</span>
        </el-form-item> -->
        <el-form-item
          label="第三方订单号："
          prop="orders"
        >
          <el-input
            v-model="form.orders"
            class="custom-select-400"
            maxlength="1000"
            placeholder="第三方订单号（每行一个第三方订单号）
第三方订单号（每行一个第三方订单号）
第三方订单号（每行一个第三方订单号）"
            type="textarea"
            :rows="4"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱："
          prop="email"
        >
          <el-input
            v-model="form.email"
            class="custom-select-400"
            maxlength="16"
            placeholder="接收底单照片邮箱（必填）"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="handleSure"
          >确认并提交申请</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div style="margin-top: 40px;">
      <el-select
        v-model="searchForm.status"
        @change="handleSearch"
      >
        <el-option
          label="全部"
          :value="''"
        ></el-option>
        <el-option
          label="未处理"
          :value="0"
        ></el-option>
        <el-option
          label="已处理"
          :value="1"
        ></el-option>
      </el-select>
    </div>

    <div class="tables">
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%;"
      >
        <el-table-column
          align="center"
          header-align="center"
          label="序号"
          prop="date"
          width="60"
        >
          <template slot-scope="scope">{{scope.$index+(pagination.pageNum - 1) * pagination.pageSize + 1}}</template>
        </el-table-column>
        <el-table-column
          label="申请时间"
          prop="createTime"
          width="120"
        >
        </el-table-column>
        <el-table-column
          label="申请状态"
          prop="status"
          width="90"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0">未处理</span>
            <span
              class="color-success"
              v-if="scope.row.status === 1"
            >已处理</span>
          </template>
        </el-table-column>
        <el-table-column
          label="接收邮箱"
          prop="email"
          width="120"
        ></el-table-column>
        <el-table-column
          label="订单号"
          prop="orders"
        ></el-table-column>
      </el-table>
    </div>

    <div class="pages">
      <el-pagination
        :current-page="pagination.pageNum"
        :page-size="pagination.pageSize"
        :page-sizes="pagination.sizeList"
        :total="pagination.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        background
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        orders: "",
        email: ""
      },
      rules: {
        orders: [
          {
            required: true,
            message: "请输入第三方订单号",
            trigger: "change"
          }
        ],
        email: [
          {
            whitespace: true,
            required: true,
            message: "请输入邮箱",
            trigger: "change"
          }
        ]
      },
      searchForm: {
        status: ""
      },
      tableData: [],
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 20, 30, 50, 100],
        pageSize: 20,
        total: 0
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));
          params.orders = params.orders.split(/[(\r\n)\r\n]+/).join(",");
          console.log(params);
          this.insertRequest(params);
        } else {
          console.log("表单验证失败!!");
          return false;
        }
      });
    },
    handleSure() {
      this.submitForm("form");
    },
    async insertRequest(params) {
      let res = await this.$http({
        url: "/home/applyPrintKdForSeller",
        method: "post",
        data: params
      });

      const { code, data } = res;
      if (code == 200 && data) {
        this.$message.success(
          "提交成功，已经提交给相关业务人员了，请耐心等待。"
        );

        this.handleSearch();

        this.form = {
          orders: "",
          email: ""
        };
      }
    },
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

      if (this.searchForm.status !== "") {
        params.status = this.searchForm.status;
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/home/findTApplyPrintKdList",
        method: "get",
        params
      });
      const { data } = res;
      this.loading = false;
      if (data) {
        this.tableData = data.records;
        this.pagination.total = parseInt(data.total);
      } else {
        this.tableData = [];
        this.pagination.total = 0;
      }
    },
    handleSizeChange(pageSize) {
      this.pagination.pageNum = 1;
      this.pagination.pageSize = pageSize;
      this.getTableData();
    },
    handleCurrentChange(p) {
      this.pagination.pageNum = p;
      this.getTableData();
    },
    handleSelectionChange(val) {
      this.selectedItems = val;
    },
    handleSearch() {
      this.pagination.pageNum = 1;
      this.getTableData();
    },
    handleReset() {
      this.searchForm = {};
      this.getTableData();
    }
  },
  created() {
    this.handleSearch();
  }
};
</script>
<style lang="less" scoped>
.packageManger {
  padding: 20px;

  .cusForm {
    margin-left: 100px;
  }

  .tables {
    margin-top: 10px;
  }

  .pages {
    margin-top: 20px;
    text-align: right;
  }
}
</style>