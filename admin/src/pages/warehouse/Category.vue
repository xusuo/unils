<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>仓库</el-breadcrumb-item>
        <el-breadcrumb-item>礼品分类管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div style="text-align: right;margin-bottom: 15px;">
      <el-button
        size="small"
        icon="el-icon-plus"
        @click="$refs.createCateDialog.show();"
      >添加分类</el-button>
    </div>

    <div class="cate-main">
      <ul class="title-main">
        <li>分类名称</li>
        <li>编码</li>
        <li>操作</li>
      </ul>

      <div
        class="table-item-one"
        v-for="(item, i) in tableData"
        :key="i"
      >
        <ul class="title-box">
          <li>
            <span class="text">{{item.name}}</span>

            <template v-if="item.children.length > 0">
              <i
                v-if="item.isShow"
                @click="switchMainTree(item);"
                class="el-icon-arrow-down"
              ></i>
              <i
                v-else
                @click="switchMainTree(item);"
                class="el-icon-arrow-right"
              ></i>
            </template>
          </li>
          <li>
            {{item.categoryCode}}
          </li>
          <li>
            <a
              href="javascript:;"
              @click="$refs.editCateDialog.show(item)"
            >编辑</a>
            <!-- <a href="javascript:;">删除</a> -->
            <a
              href="javascript:;"
              @click="$refs.createCateDialog.show(item);"
            >添加子分类</a>
          </li>
        </ul>

        <div
          v-show="item.isShow"
          class="table-item-two"
          v-for="(sub, j) in item.children"
          :key="j"
        >
          <ul class="title-box">
            <li>
              <span class="text">{{sub.name}}</span>
            </li>
            <li>{{sub.categoryCode}}</li>
            <li>
              <a
                href="javascript:;"
                @click="$refs.editCateDialog.show(sub)"
              >编辑</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <CreateCateDialog
      ref="createCateDialog"
      @success="getTableData"
    />
    <EditCateDialog
      ref="editCateDialog"
      @success="getTableData"
    />
  </div>
</template>

<script>
import CreateCateDialog from "./components/CreateCateDialog";
import EditCateDialog from "./components/EditCateDialog";
export default {
  components: { CreateCateDialog, EditCateDialog },
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    async getTableData(params) {
      let res = await this.$http({
        url: "/point/getGiftCategory",
        method: "post",
        params
      });
      const { data } = res;
      this.loading = false;
      if (data) {
        this.tableData = this.sortTreeData(data);
      } else {
        this.tableData = [];
      }
    },
    // 获取分类两级树机构
    sortTreeData(data) {
      let arr = [];

      // 一级菜单
      data.forEach(m => {
        if (m.parentId === 0) {
          arr.push({
            ...m,
            isShow: true,
            children: []
          });
        }
      });

      // 二级菜单
      arr.forEach((m, i) => {
        data.forEach(a => {
          if (m.id == a.parentId) {
            arr[i].children.push(a);
          }
        });
      });

      console.log(arr);

      return arr;
    },
    //
    switchMainTree(item) {
      item.isShow = !item.isShow;
    }
  },
  created() {
    this.getTableData();
  }
};
</script>

<style lang="less" scoped>
.cate-main {
  position: relative;
  border: 1px solid #ebeef5;
}
.title-main {
  color: #333;
  margin-top: -1px;
  margin-bottom: -1px;
  background: #f2f2f2;
  border-top: 1px solid #ebeef5;
  color: #909399;
  font-weight: 500;
  display: flex;

  > li {
    flex: 1;
    font-size: 14px;
    line-height: 38px;
    padding-left: 20px;
  }
}

.title-box {
  color: #333;
  line-height: 30px;
  font-size: 0;
  border-top: 1px dashed #e5e5e5;
  margin-top: -1px;
  margin-bottom: -1px;
  display: flex;

  > li {
    flex: 1;
    font-size: 14px;
    line-height: 38px;
    padding-left: 20px;

    > a {
      margin-right: 10px;
    }

    i {
      cursor: pointer;
    }
  }
}

.table-item-two {
  margin-top: -1px;

  .text {
    padding-left: 40px;
    font-size: 12px;
    color: #666;
  }
}
</style>
