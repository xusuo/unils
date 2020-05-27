/*
 * @Author: 陈晨 
 * @Date: 2019-05-25 16:52:51 
 * @Last Modified by: 陈晨
 * @Last Modified time: 2019-05-29 17:18:07
 */
<template> 
  <div class="classify banxin">
    <div class="classify__goods">
      <i class="classify__goods__present__icon"></i>
      <span>商品分类</span>
    </div>
    <ul class="classify__list">
      <li
        :key="index"
        class="classify__item"
        v-for="(item, index) in classify"
      >
        <router-link
          class="classify__linkBox"
          :to="'/mall/all?tagId='+index+'&name='"
        >
          <div class="classify__tagNameDetail">
            <strong>{{item.name}}</strong>
            <span>{{cateIntro[index]}}</span>
          </div>
          <div class="classify__goTag">
            <div class="classify__tagGo">
              <span style="color: #F5A623;">GO</span>
              <i
                class="el-icon-arrow-right"
                style="color: #F5A623;"
              ></i>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { giftMixin } from "@/utils/mixin";
export default {
  mixins: [giftMixin],
  data() {
    return {
      listData: [],
      cateIntro: [
        "比你再便宜点儿",
        "精彩生活一点新",
        "合理配重轻松下单",
        "为你找到最合适的",
        "热销单品轻松购物",
        "打造梦想中的生活",
        "今天也要努力工作哦",
        "选你喜欢的生活方式"
      ]
    };
  },
  methods: {
    async getListData() {
      if (this.classify.length) {
        return false;
      }
      try {
        let res = await this.$http({
          url: this.$loginURL + "/getGiftCategory",
          method: "post",
          data: {}
        });
        const { code, data, message = "获取失败" } = res;
        if (code === 200) {
          data.forEach(item => {
            item.choise = false;
          });
          this.setClassify(data.slice(0, 8));
        } else {
          this.$message.error(message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.getListData();
  }
};
</script>
<style lang='less'>
.classify {
  margin-top: 15px !important;
  font-weight: lighter;
  display: flex;

  .classify__goods {
    width: 168px;
    height: 145px;
    background: #f5a623;
    margin-right: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
    font-size: 14px;
    line-height: 22px;

    .classify__goods__present__icon {
      width: 40px;
      height: 40px;
      background: url("./images/present.png");
    }

    i {
      font-size: 30px;
      font-weight: 400;
      margin-bottom: 8px;
    }
  }
  .classify__list {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    & > .classify__item {
      display: flex;
      align-items: center;
      height: 68px;
      min-width: 264px;
      box-sizing: border-box;
      width: 264px;
      margin-right: 10px;
      margin-bottom: 10px;
      padding: 0 12px;
      background: #fff;
      transition: 0.2s;

      &:hover {
        box-shadow: 2px 2px 5px 0px rgba(58, 58, 58, 0.29);
      }
      &:nth-child(4n) {
        margin-right: 0;
      }
      & > .classify__linkBox {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        & > .classify__tagNameDetail {
          display: flex;
          flex-direction: column;
          justify-content: center;
          strong {
            font-size: 14px;
            line-height: 25px;
            color: #000;
            font-weight: bold;
            margin-bottom: 2px;
          }
          span {
            font-size: 14px;
            line-height: 20px;
            color: #999;
          }
        }
        & > .classify__goTag {
          width: 50px;
          height: 22px;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          position: relative;
          color: transparent;
          z-index: 0;

          .classify__tagGo {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            line-height: 100%;
            border-radius: 10px;
            background: #fef1dc;
            z-index: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            i {
              font-size: 10px;
              line-height: 1;
              font-weight: 400;
            }
          }
        }
      }
    }
  }
}
</style>