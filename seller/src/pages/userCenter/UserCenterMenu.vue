<template>
  <el-menu
    class="el-menu-vertical-demo leftBar"
    :default-active="activePath"
    :default-openeds="defaultOpeneds"
    router
  >
    <el-submenu index="1">
      <template slot="title">
        <span>消息中心</span>
      </template>
      <el-menu-item-group>
        <!-- <el-menu-item index="/userCenter/messageCenter/sysMessage">行业资讯</el-menu-item> -->
        <!-- <el-menu-item index="/userCenter/messageCenter/messageCenter">系统消息</el-menu-item> -->
        <el-menu-item index="/userCenter/messageCenter/noticeList">公告</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <!-- <i class="el-icon-user"></i> -->
        <span>个人信息</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/userCenter/myInfo/myProfile">个人资料</el-menu-item>
        <el-menu-item index="/userCenter/myInfo/myPrice">价格成本</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <!-- <i class="el-icon-notebook-1"></i> -->
        <span>商品库存管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/userCenter/socketManger/mySocket">我的库存</el-menu-item>
        <el-menu-item index="/userCenter/socketManger/inSocketManger">代发申请</el-menu-item>
        <el-menu-item index="/userCenter/socketManger/purchaseAgent">代采申请</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <!-- <i class="el-icon-coin"></i> -->
        <span>资金管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/userCenter/moneyManger/payRecharge">充值</el-menu-item>
        <!-- <el-menu-item index="/userCenter/moneyManger/Recharge">自动充值（维护中）</el-menu-item>       -->
        <el-menu-item index="/userCenter/moneyManger/foundFlow">流水/对账</el-menu-item>
        <el-menu-item index="/userCenter/moneyManger/financialRemarks">财务备注管理</el-menu-item>
        </el-menu-item-group>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <!-- <i class="el-icon-service"></i> -->
        <span>帮助客服</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/userCenter/helpCenter/myService">我的客服</el-menu-item>
        <el-menu-item index="/userCenter/helpCenter/commonQuestion">常见问题</el-menu-item>
        <el-menu-item index="/userCenter/helpCenter/myWorkOrder">我的工单</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="6">
      <template slot="title">
        <!-- <i class="el-icon-coin"></i> -->
        <span>商家</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/userCenter/shop/ShopList">店铺管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="7">
      <template slot="title">
        <!-- <i class="el-icon-warning-outline"></i> -->
        <span>关于我们</span>
      </template>
      <el-menu-item-group>
        <!-- <el-menu-item index="/userCenter/aboutUs/aboutUsDetail">关于我们</el-menu-item> -->
        <el-menu-item index="/userCenter/aboutUs/joinUs">供货商加盟</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activePath: "/userCenter/myInfo/myProfile",
      defaultOpeneds: ["1", "2", "3", "4", "5", "6", "7"]
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
.leftBar {
  width: 190px;
  min-height: 600px;
  margin-right: 10px;
  background: #fff;
}
</style>