<template>
  <div>
    <red-packet-dialog v-model="visible">
      <!-- <div class="red-packet-item"></div> -->
      <el-carousel
        class="red-packet-carousel"
        indicator-position="none"
        height="489px"
        :autoplay="false"
        :arrow="arrowType"
      >
        <el-carousel-item
          class="red-packet-item"
          v-for="(item, i) in tableData"
          :key="i"
        >
          <div class="red-packet-item-title">恭喜您获得</div>
          <div class="red-packet-item-price">
            <strong>{{item.amount}}</strong>
            <span>元</span>
          </div>
          <div class="red-packet-item-time">
            领取截止时间：{{item.deadlineTime | formatYMD}}
          </div>
          <div
            class="red-packet-item-btn"
            :class="[`${item.isUsed == 2 ? 'disabled' : ''}`]"
            @click="onReceive(item)"
          >
            <template v-if="item.isUsed == 1">立即领取</template>
            <template v-if="item.isUsed == 2">已领取</template>
          </div>
        </el-carousel-item>
      </el-carousel>
    </red-packet-dialog>

    <SendSmsTest ref="sendSmsTest" />
  </div>
</template>

<script>
import RedPacketDialog from "@/components/RedPacketDialog";
export default {
  components: { RedPacketDialog },
  data() {
    return {
      visible: false,
      loading: false,
      tableData: [],
      arrowType: "never"
    };
  },
  methods: {
    show(list) {
      this.reset(list);
      this.visible = true;
    },
    reset(list) {
      list.forEach(m => {
        m.isUsed = 1;
      });
      this.tableData = list;
      if (list.length > 1) {
        this.arrowType = "hover";
      }
    },
    async useCouponBySeller(params, item) {
      let res = await this.$http({
        url: "/home/useCouponBySeller",
        method: "post",
        data: params
      });
      const { code, data } = res;
      this.loading = false;
      if (code === 200 && data) {
        // ......待完成
        this.$message.success("领用红包成功");
        // 界面设为已领用
        item.isUsed = 2;
      }
    },
    // 领用红包
    onReceive(item) {
      // 领取过的红包，阻止继续领取
      if (item.isUsed == 2) {
        return false;
      }

      this.$confirm(
        `确定领用该红包吗？领用之后红包面额将会直接增加到您的账户余额。`,
        `操作提示`,
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.useCouponBySeller(
            {
              couponId: item.couponId
            },
            item
          );
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
.red-packet-carousel {
  /deep/.el-carousel__arrow--left {
    left: 10px !important;
  }
  /deep/.el-carousel__arrow--right {
    right: 10px !important;
  }
}
.red-packet-item {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/red-packet.png") no-repeat;
  text-align: center;

  .red-packet-item-title {
    position: relative;
    margin-top: 180px;
    font-size: 23px;
    font-weight: lighter;
    color: #fff;
    line-height: 40px;
    padding: 0 48px;

    &::before {
      content: "";
      position: absolute;
      left: 40px;
      top: 21px;
      width: 77px;
      height: 1px;
      background: url("../../assets/images/red-packet-tl.png") no-repeat;
    }

    &::after {
      content: "";
      position: absolute;
      right: 40px;
      top: 21px;
      width: 77px;
      height: 1px;
      background: url("../../assets/images/red-packet-tr.png") no-repeat;
    }
  }

  .red-packet-item-price {
    padding: 0 48px;

    strong {
      font-size: 75px;
      font-weight: bold;
      color: #fff;
    }

    span {
      font-size: 24px;
      font-weight: lighter;
      color: #fff;
    }
  }

  .red-packet-item-time {
    margin-top: 20px;
    padding: 0 48px;
    font-size: 16px;
    font-weight: lighter;
    color: #fff;
  }

  .red-packet-item-btn {
    margin: 26px 48px 0 48px;
    width: 274px;
    height: 54px;
    line-height: 54px;
    background: rgba(255, 255, 253, 1);
    border: 0px solid rgba(207, 0, 6, 1);
    border-radius: 27px;
    font-size: 20px;
    color: #fd1f3c;
    cursor: pointer;

    &.disabled {
      background: #ddd;
      color: #ccc;
      cursor: default;
    }
  }
}
</style>
