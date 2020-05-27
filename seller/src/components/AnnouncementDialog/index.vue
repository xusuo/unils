<template>
  <div>
    <el-dialog
      title="系统公告"
      width="900px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
    >

      <div class="noticeContent">
        <h1 class="title">{{announcement.anncTitle}}</h1>
        <p class="time">{{announcement.createTime | formatArrDateYMDHMS}}</p>
        <p class="summer">摘要：{{announcement.anncSummary}}</p>
        <div
          class="noticeContentInfo"
          v-html="announcement.anncContent"
        ></div>
      </div>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="small"
          :loading="loading"
          @click="visible = false"
        >已阅</el-button>
      </div>
    </el-dialog>

    <SendSmsTest ref="sendSmsTest" />
  </div>
</template>

<script>
import { recoverUEImgUrl } from "@/utils/formatUeContent";

export default {
  data() {
    return {
      visible: false,
      loading: false,
      announcement: {
        anncTitle: "",
        anncSummary: "",
        createTime: "",
        anncContent: ""
      }
    };
  },
  methods: {
    show(item) {
      this.reset(item);
      this.visible = true;
    },
    reset(item) {
      this.announcement.anncTitle = item.anncTitle;
      this.announcement.anncSummary = item.anncSummary;
      this.announcement.createTime = item.createTime;
      this.announcement.anncContent = recoverUEImgUrl(item.anncContent);
    }
  }
};
</script>

<style lang="less" scoped>
.noticeContent {
  padding: 20px;

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
</style>
