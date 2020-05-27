<template>
  <div class="notiveDetail">
    <div class="custom-bread-wrap">
      公告详情
    </div>

    <div class="noticeContent">
      <h1 class="title">{{announcement.anncTitle}}</h1>
      <div class="time">{{announcement.createTime | formatArrDateYMDHMS}}</div>
      <p class="summer">摘要: {{announcement.anncSummary}}</p>
      <div
        class="noticeContentInfo"
        v-html="announcement.anncContent"
      ></div>
    </div>
  </div>
</template>

<script>
import { recoverUEImgUrl } from "@/utils/formatUeContent";
export default {
  data() {
    return {
      announcement: {
        anncTitle: "",
        anncSummary: "",
        createTime: "",
        anncContent: ""
      }
    };
  },
  methods: {
    async selectAnnouncement(params) {
      let res = await this.$http({
        url: "/admin/selectAnnouncement",
        method: "get",
        params
      });
      const { code, data } = res;
      this.loading = false;
      if (code === 200 && data) {
        this.announcement.anncTitle = data.anncTitle;
        this.announcement.anncSummary = data.anncSummary;
        this.announcement.createTime = data.createTime;
        this.announcement.anncContent = recoverUEImgUrl(data.anncContent);
      }
    }
  },
  created() {
    this.selectAnnouncement({
      anncId: this.$route.query.id
    });
  }
};
</script>

<style lang="less" scoped>
.notiveDetail {
  padding: 20px;

  .noticeContent {
    margin: 20px 0;

    .title {
      font-size: 18px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 700;
      text-align: center;
    }

    .time {
      font-size: 12px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.45);
      font-weight: 400;
      text-align: center;
      display: block;
    }

    .summer {
      margin-top: 10px;
      font-size: 14px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.45);
      font-weight: 400;
    }

    .noticeContentInfo {
      /deep/img {
        display: inline;
        max-width: 100% !important;
        border: 0;
        outline-width: 0;
        vertical-align: top;
      }
    }
  }
}
</style>
