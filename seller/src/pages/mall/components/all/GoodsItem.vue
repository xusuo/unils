/*
 * @Author: 陈晨 
 * @Date: 2019-05-24 17:28:13 
 * @Last Modified by: 陈晨
 * @Last Modified time: 2019-05-28 20:25:20
 * 首页、商城用到
 */
<template>
  <div
    class="hotGoods__list"
    v-if="goodList.length>0"
  >
    <router-link
      :key="index"
      :to="'/mall/detail/'+item.goods_id"
      class="hotGoods__item"
      v-for="(item, index) in goodList"
    >
      <img
        :alt="item.gift_name"
        :src="$baseImageUrl+JSON.parse(item.pic_list)[0]"
      >
      <div class="item__price">
        <em>¥</em>
        <strong class="numFont price">{{item.price}}</strong>
      </div>
      <p>{{item.gift_name}}</p>
      <div class="item__socketNums">
        <span>库存</span>
        <strong>{{item.stock}}</strong>
        <em>件</em>
      </div>
      <div class="item__kg">
        <strong>{{item.weight}}</strong>
        <em>kg/{{item.unit}}</em>
      </div>
    </router-link>
  </div>
  <empty-box v-else />
</template>

<script>
import EmptyBox from "../../../common/EmptyBox";
export default {
  components: {
    EmptyBox
  },
  props: {
    goodList: {
      type: Object,
      default: []
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang='less' scoped>
.hotGoods__list {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  font-weight: lighter;
  margin-right: -15px;

  .hotGoods__item {
    display: flex;
    flex-direction: column;
    width: 240px;
    height: 345px;
    margin: 0 15px 15px 0;
    padding: 5px;
    box-sizing: border-box;
    transition: all 0.2s;
    background: #fff;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transition: 0.2s;
    }

    &:hover {
      &::after {
        border: 1px solid #f64f6f;
      }
    }

    img {
      width: 230px;
      height: 230px;
      margin-bottom: 10px;
    }
    .item__price {
      font-size: 16px;

      em {
        font-size: 12px;
        line-height: 1;
        color: #eb000c;
        font-weight: 400;
        margin-bottom: 5px;
      }
      strong {
        font-size: 28px;
        line-height: 1;
        color: #eb000c;
        font-weight: 400;
        font-family: Helvetica Neue;
      }
    }
    p {
      font-size: 14px;
      line-height: 16px;
      color: rgba(0, 0, 0, 0.65);
      font-weight: 400;
      height: 32px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      margin-bottom: 5px;
      box-sizing: border-box;
      letter-spacing: 0.7px;
      -webkit-box-orient: vertical;
    }
    .item__socketNums {
      line-height: 20px;
      padding: 7px 0 2px;
      font-size: 12px;
      color: #b0b0b0;
      border-top: 1px solid rgba(0, 0, 0, 0.1);

      span {
        font-size: 14px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.35);
        font-weight: 400;
        letter-spacing: 3px;
        margin-right: 5px;
      }
      strong {
        font-size: 12px;
        line-height: 1;
        color: #9c0321;
        font-weight: 700;
        font-family: 苹方;
        margin-right: 3px;
      }
      em {
        font-size: 14px;
        line-height: 20px;
        color: #9c0321;
        font-weight: 700;
        font-family: 苹方;
      }
    }
    .item__kg {
      position: absolute;
      bottom: 80px;
      right: 0px;
      font-size: 12px;
      line-height: 17px;
      color: rgba(0, 0, 0, 0.65);
      font-weight: 400;
      height: 22px;
      line-height: 21px;
      padding: 0 11px;
      margin-right: 9px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 11px;
    }
  }
}
</style>