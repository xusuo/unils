<template>
  <div class="order ">
    <Search />
    <div class="orderManger indexChild banxin">
      <div class="orderMangerBox">
        <el-aside
          class="leftBars"
          width="200px"
        >
          <el-menu
            :default-active="activePath"
            router
          >
            <el-menu-item index="/order/orderManger">
              <!-- <i class="el-icon-tickets"></i>  -->
              订单管理
            </el-menu-item>
            <el-menu-item index="/order/sheetOrder">
              <!-- <i class="el-icon-box"></i>  -->
              包裹管理
            </el-menu-item>
            <!-- <el-menu-item index="/order/taskList">
              智能任务列表
            </el-menu-item> -->
            <!-- <el-menu-item index="/order/purchaseOrder">
              <i class="el-icon-document"></i> 售后订单
            </el-menu-item> -->
            <!-- <el-menu-item index="/order/saledOrder">
              <i class="el-icon-notebook-2"></i> 商品采购订单
            </el-menu-item> -->
            <el-menu-item index="/order/packageManger">
              <!-- <i class="el-icon-document-copy"></i> -->
              底单申请
            </el-menu-item>
          </el-menu>
        </el-aside>
        <div class="rightContent">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../common/Search"; // 搜索
export default {
  components: {
    Search
  },
  data() {
    return {
      activePath: "/order/orderManger"
    };
  },
  watch: {
    $route() {
      // console.log(this.$route);
      this.activePath = this.$route.path;
    }
  },
  methods: {},
  mounted() {
    this.activePath = this.$route.path;
  }
};
</script>
<style lang='less'>
.orderManger {
  padding: 37px 0 0 0;
  min-height: 600px;

  .orderMangerBox {
    min-height: 600px;
    display: flex;

    .leftBars {
      overflow: hidden;
    }

    .el-menu {
      height: 100%;
      border-right: none;
      padding-top: 30px;
      padding-left: 20px;
      margin-right: 10px;
    }

    .el-menu-item,
    .el-submenu__title {
      height: 40px;
      line-height: 40px;
    }

    .el-menu-item:focus,
    .el-menu-item:hover {
      background: none;
      // text-decoration: underline;
    }

    .el-menu-item.is-active {
      // border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      // padding: 0 10px;
      box-sizing: border-box;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      color: #ff4d70;
      // background: linear-gradient(308deg, #ff4573, #ff6767);
    }

    .rightContent {
      flex: 1;
      background: #fff;
    }
  }
}
</style>