<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>系统</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="custom-operate-wrap">
      <el-button
        icon="el-icon-plus"
        @click="callToAddRole"
      >新增角色</el-button>
    </div>
    <div class="custom-container-wrap">
      <el-table
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          prop="index"
          label="序号"
          width="50"
        >
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="上级菜单"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="类型"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="排序"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="菜单名称"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="菜单路由URL"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="图标"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="状态"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="callToEditMenu(1)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleStop(1)"
            >停用</el-button>
            <el-button
              size="small"
              type="success"
              @click="handleUse(1)"
            >启用</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleRemove(1)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="custom-pagination-wrap">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.pageNum"
        :page-sizes="pagination.sizeList"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎2",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎3",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎4",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 5,
        total: 102
      }
    };
  },
  methods: {
    async getTableData() {
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };
      console.log(params);
      // let res = await this.$http({
      //   url: 'http://www.test.com/api/v1',
      //   method: 'get',
      //   params: {
      //     courseId: '8209161676128256',
      //     courseOrigin: 'aopo-course'
      //   }
      // })
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
    callToAddRole() {},
    handleRemove(id) {
      this.$confirm("是否删除", "删除题目", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(id);
        })
        .catch(() => {});
    }
  }
};
</script>
