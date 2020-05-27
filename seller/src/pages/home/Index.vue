<template>
  <div class="home">
    <Search />
    <Carousel />
    <Notice class="banxin" />

    <Classify />
    <HotGoods />
    <NewGoods />
    <AnnouncementDialog ref="announcementDialog" />
    <CouponListDialog ref="couponListDialog" />
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :closeOnPressEscape="ture"
      :closeOnClickModal="ture"
      :showClose="ture"
      :visible.sync="centerDialogVisible"
      style="margin-bottom: 22vh;"
      center
      title="紧急通知"
      width="50%"
      top="15vh"
    >
      <div class="noticeContent" v-html="noticeContent"></div>
      <span class="dialog-footer" slot="footer">
        <el-button
          @click="handleSure" 
          type="primary"
        >查看详情</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from "dayjs";
import Cookies from 'js-cookie'
import Search from "../common/Search"; // 搜索
import Carousel from "./Carousel"; // 轮播图
import Notice from "../common/Notice"; // 通知
import Classify from "./Classify"; //商品分类
import HotGoods from "./HotGoods"; //热销单品
import NewGoods from "./NewGoods"; // 新品上架
import AnnouncementDialog from "@/components/AnnouncementDialog"; // 首页弹窗
import CouponListDialog from "@/components/CouponListDialog"; // 优惠券领用弹窗
export default {
  components: {
    Search,
    Notice,
    Classify,
    Carousel,
    HotGoods,
    NewGoods,
    AnnouncementDialog,
    CouponListDialog
  },
  data() {
    return {
      centerDialogVisible: false,
      noticeContent:"",
      anncTitle:"",
      anncId:""
    };
  },
  computed: {},
  methods: {
    async selectNewAnnouncement(params) {
      let res = await this.$http({
        url: "/admin/selectNewAnnouncement",
        method: "get",
        params
      });
      const { code, data } = res;
      this.loading = false;
      if (code === 200 && data) {
        let createTime =
          data.createTime[0] +
          "/" +
          (data.createTime[1] >= 10
            ? data.createTime[1]
            : "0" + data.createTime[1]) +
          "/" +
          (data.createTime[2] >= 10
            ? data.createTime[2]
            : "0" + data.createTime[2]);

        // console.log(moment().add(1, "days"));
        this.noticeContent = data.anncContent
        this.anncTitle = data.anncTitle
        this.anncId = data.anncId
        // if(data.isPopup && Cookies.get("anncId") !== data.anncId){
        //      Cookies.set("anncId",this.anncId);
        this.centerDialogVisible = data.isPopup
        // }
        let tomorrow = moment().$d * 1;
        let ct = new Date(createTime) * 1;
        let diff = tomorrow - ct;

        if (diff < 0) {
          return false;
        }

        let hour = Math.floor(diff / 1000 / 60 / 60);

        // console.log(createTime, today, ct);
        console.log(hour);

        // 紧急的公告，并且发布时间在24小时以内，在首页弹窗展示
        if (data.anncType == 2 && hour <= 24) {
          this.$refs.announcementDialog.show(data);
        }
      }
    },
    async selectCouponList(params) {
      let res = await this.$http({
        url: "/home/selectCouponList",
        method: "get",
        params
      });
      const { code, data } = res;
      this.loading = false;
      if (code === 200 && data) {
        // 先判断是不是所有红包已经领用过
        // let canReceiveNum = 0;
        // data.forEach(m => {
        //   if (m.isUse == 1) {
        //     canReceiveNum++;
        //   }
        // });

        // console.log(canReceiveNum);

        // 去掉过期的优惠券
        let arr = data.filter(m => {
          let now = new Date() * 1;
          let deadlineTime = new Date(m.deadlineTime.replace(/\-/g, "/")) * 1;
          return now < deadlineTime;
        });

        // 可领用优惠券数大于0.才打开弹窗
        if (arr.length > 0) {
          this.$refs.couponListDialog.show(arr);
        }
      }
    },
    handleSure(){
        this.centerDialogVisible = false;
        if(this.anncId && this.anncId > 0){
          this.$router.push('/userCenter/messageCenter/noticeList/notice?id=' + this.anncId);
        }
    }
  },
  mounted() {
    if (Cookies.get("TOKEN")) {
      // 获取系统公告，紧急的会弹窗显示
      this.selectNewAnnouncement();
      // 获取分站发放的优惠券，没领用过的商家，可以领用
      this.selectCouponList();
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/styles/variables.less");

.noticeContent{
  /deep/img{
    max-width: 100%;
    width: auto;
  }
}
.el-dialog__wrapper{
  /deep/.el-dialog{
    max-width:  960px;
    min-width:  600px;
  }
}
</style>  
