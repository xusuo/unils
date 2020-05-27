<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>站点管理</el-breadcrumb-item>
        <el-breadcrumb-item>代理人管理</el-breadcrumb-item>
        <el-breadcrumb-item>代理人详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <ul class="info">
      <li>
        <em>{{agentInfo.agentAccount}}</em>
        <br />
        <span>{{agentInfo.agentMobile}}</span>
        <b
          class="text-btn"
          @click="$refs.editAgentDialog.show(agentInfo)"
        >修改</b>
        <el-tooltip
          content="点击复制"
          placement="top"
          effect="light"
          :enterable="false"
        >
          <b
            class="text-btn"
            ref="copySellerUrl"
            @click="handlecopy"
            :data-clipboard-text="inviteUrl"
          >复制邀请链接</b>
        </el-tooltip>
      </li>
      <li>
        <strong>￥{{agentInfo.balance ? agentInfo.balance : 0}}</strong>
        <br />
        <span>账户余额</span>
      </li>
      <li>
        <strong>￥{{agentInfo.totalReward ? agentInfo.totalReward : 0}}</strong>
        <br />
        <span>累计奖金</span>
      </li>
    </ul>

    <el-tabs
      v-model="activeName"
      type="card"
      style="margin-top: 20px;"
    >
      <el-tab-pane
        label="商家清单"
        name="seller"
      >
        <SellerOrder :sellerList="sellerList" />
      </el-tab-pane>
      <el-tab-pane
        label="价格设置"
        name="set"
        :lazy="true"
      >
        <SetAgentPrice
          @success="updateSuccess"
        />
      </el-tab-pane>
    </el-tabs>

    <EditAgentDialog
      ref="editAgentDialog"
      @success="queryAgentDetailInfo"
    />
  </div>
</template>

<script>
import Clipboard from "clipboard";
import SellerOrder from "./components/SellerOrder";
import SetAgentPrice from "./components/SetAgentPrice";
import EditAgentDialog from "./components/EditAgentDialog";
export default {
  components: { SellerOrder, SetAgentPrice, EditAgentDialog },
  data() {
    return {
      // seller/set
      activeName: "seller",
      agentInfo: {},
      sellerList: [],
      agentCost: {},
      sellerCost: {},
      inviteUrl: "",
      isSetPrice:"",
      expressName:""
    };
  },
  methods: {
    async queryAgentDetailInfo() {
      let res = await this.$http({
        url: "/t-station/queryAgentDetailInfo",
        method: "get",
        params: {
          agentId: this.$route.query.id,
          // 使用圆通快递的获取方法
          expressId: 4
        }
      });
      const { data } = res;
      if (data) {
        this.agentInfo = data.agentInfo;
        this.sellerList = data.sellerList;
        this.agentCost = data.agentCost;
        this.sellerCost = data.sellerCost;
        // this.inviteUrl =
        //   location.origin + "/#/reg?code=" + data.agentInfo.myInvitationCode;
        this.inviteUrl = data.agentInfo.myInvitationCode;
        this.isSetPrice = data.agentInfo.isSetPrice;
        this.expressName = data.agentInfo.expressName;
          console.log(this.inviteUrl)
      }
    },
     handlecopy(){
      if(this.isSetPrice){
      this.copySellerEvt = new Clipboard(this.$refs.copySellerUrl.$el);
      this.copySellerEvt.on("success", e => {
        this.$message.success("复制成功");
      });
      this.copySellerEvt.on("error", e => {
        this.$message.error("该浏览器不支持自动复制");
      });
    }else{
        this.$confirm('该代理还未设置'+this.expressName+'代理价格,请先设置!', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
        }).catch(() => {        
        });
      }
    },
     updateSuccess(){
      this.queryAgentDetailInfo();
    }
  },
    // async queryAgentInvitationCode() {
    //   let res = await this.$http({
    //     url: "/t-station/queryAgentInvitationCode",
    //     method: "get",
    //     params: {
    //       agentUserId: this.$route.query.id
    //     }
    //   });
    //   const { data } = res;
    //   if (data) {
    //     this.inviteUrl = location.origin + "/#/reg?code=" + data;
    //   }
    // },
  
  created() {
    this.queryAgentDetailInfo();
    // this.queryAgentInvitationCode();
  },
  mounted() {
    
  }
};
</script>

<style lang="less" scoped>
.info {
  display: flex;
  align-items: center;
  margin-top: 20px;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  box-shadow: 0 1px 2px #dcdfe6;
  border: 1px solid #f8f8f8;
  border-radius: 4px;
  padding: 20px 30px;

  li {
    flex: 1;
    text-align: center;

    em {
      font-size: 20px;
      line-height: 60px;
      color: #40b6ff;
    }

    span {
      font-size: 14px;
    }

    b {
      margin: 0 10px;
    }

    strong {
      font-size: 36px;
      line-height: 60px;
      color: #ff3341;
    }
  }
}
</style>
