<template>
  <div class="productDetail">
    <Search />

    <div class="detail banxin">
      <div class="detailBox">
        <div class="topDetail">
          <div class="imgScrollBox">
            <img
              :alt="giftDetail.gift_name"
              :src="$baseImageUrl + activePic"
              class="mainPicBig"
              v-if="pic_list"
            >
            <div class="smallImgBox">
              <img
                :key="item"
                :src="$baseImageUrl + item"
                class="smallImg"
                v-for="(item, i) in pic_list"
                :class="[`${activeIndex === i ? 'active' : ''}`]"
                @mouseenter="changeActviePic(item, i)"
              >
            </div>
          </div>
          <product-detail-handle :giftDetail="giftDetail" />
        </div>
        <!-- <div class="detailList">
          <div class="title">
            <span>商品详情</span>
          </div>
          <ul class="listBox">
            <li class="detailItem">
              <span>包装规格：</span>
              <strong>3层/抽，100抽/包</strong>
            </li>
            <li class="detailItem">
              <span>纸张规格：</span>
              <strong>120*175CM</strong>
            </li>
          </ul>
        </div>-->
        <div class="detailHtml">
          <!-- <p style="text-align: center;">更优图片待上传中，请等待</p> -->
          <div v-html="recoverUEImgUrl(giftDetail.detail)"></div>
        </div>
      </div>
      <new-hot-wrap />
    </div>
  </div>
</template>

<script>
import Search from "../../../common/Search"; // 搜索
import NewHotWrap from "./NewHotWrap";
import ProductDetailHandle from "./ProductDetailHandle";
import { giftMixin } from "@/utils/mixin";
import { recoverUEImgUrl } from "@/utils/formatUeContent";
export default {
  mixins: [giftMixin],
  components: {
    Search,
    NewHotWrap,
    ProductDetailHandle
  },

  data() {
    return {
      giftDetail: {},
      pic_list: [],
      activeIndex: 0,
      activePic: ""
    };
  },
  methods: {
    async getListData() {
      try {
        let res = await this.$http({
          url: this.$loginURL + "/getGiftInfo",
          method: "post",
          params: {
            goods_id: this.$route.params.id
          }
        });
        const { code, data, message = "获取失败" } = res;
        if (code === 200) {
          this.giftDetail = data;
          this.pic_list = JSON.parse(data.pic_list);
          this.activePic = this.pic_list[0];
        } else {
          this.$message.error(message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    recoverUEImgUrl(val) {
      if (val) {
        return recoverUEImgUrl(val);
      }

      return "";
    },
    changeActviePic(item, i) {
      this.activePic = item;
      this.activeIndex = i;
    }
  },
  watch: {
    $route(to, from) {
      this.getListData();
    }
  },
  mounted() {
    this.scrollToTop();
    this.getListData();
  }
};
</script>
<style lang="less" scoped>
.productDetail {
  background: #fff;
}
.detail {
  padding: 50px 0 20px 0;
  display: flex;

  .detailBox {
    flex: 1;
    max-width: 969px;
    padding-right: 10px;
    margin-right: 41px;

    .topDetail {
      padding-bottom: 35px;
      margin-bottom: 30px;
      display: flex;
      border-bottom: 1px solid #ddd;

      .imgScrollBox {
        margin-right: 37px;
        display: flex;
        flex-direction: column;

        .mainPicBig {
          width: 358px;
          height: 358px;
          padding: 20px;
          opacity: 1;
          transition: all 0.2s;
          border: 1px solid #ddd;
        }
      }

      .smallImgBox {
        margin-left: 14px;
        margin-top: 10px;
        display: flex;

        .smallImg {
          position: relative;
          width: 67px;
          height: 67px;
          margin-right: 10px;

          &.active {
            border: 1px solid #333;
            width: 65px;
            height: 65px;
          }
        }
      }
    }
    .detailList {
      border: 1px solid rgba(0, 0, 0, 0.1);
      margin-bottom: 10px;
      font-size: 14px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.45);
      font-weight: 400;
      .title {
        height: 30px;
        padding: 0 10px;
        background: #fafafa;
        display: flex;
        align-items: center;
      }
      .listBox {
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
        .detailItem {
          height: 28px;
          margin-right: 36px;
          width: 255px;
          display: flex;
          align-items: center;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }

    /deep/.detailHtml {
      p {
        text-align: center;
      }
      img {
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