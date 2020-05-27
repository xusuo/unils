<template>
  <div
    class="hotGoods__list"
    v-if="goodList.length>0"
  >
    <div
      v-for="(item, index) in goodList"
      :key="index"
      class="hotGoods__item"
    >
      <img
        :alt="item.gift_name"
        :src="$baseImageUrl+JSON.parse(item.pic_list)[0]"
      >
      <div class="item__price">
        <template v-if="item.price == 0">
          <strong class="numFont price">免费</strong>
        </template>
        <template v-else>
          <em>¥</em>
          <strong class="numFont price">{{item.price}}</strong>
        </template>
      </div>
      <p class="name">{{item.gift_name}}</p>
      <p class="point">所在仓库： {{item.pointName}}</p>
      <p class="address">
        地址：
        {{item.provice}}-{{item.city}}
      </p>
      <div class="item__socketNums">
        <span>库存</span>
        <strong>{{item.stock}}</strong>
        <em>件</em>
      </div>
      <div class="item__kg">
        <strong>{{item.weight}}</strong>
        <em>kg/{{item.unit}}</em>
      </div>

      <div class="item__bg">
        <!-- @click="$router.push('/upload/typeThree?id=' + item.goodsId)" -->
        <el-button
          type="primary"
          @click="$router.push('/upload')"
        >去下单</el-button>
      </div>
    </div>
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

      .item__bg {
        opacity: 1;
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
        font-size: 20px;
        line-height: 1;
        color: #eb000c;
        font-weight: 400;
        font-family: Helvetica Neue;
      }
    }
    p.name {
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
    p.point {
    }
    p.address {
      margin-bottom: 5px;
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

    .item__bg {
      position: absolute;
      transform: 0.2s;
      top: 1px;
      right: 1px;
      bottom: 1px;
      left: 1px;
      background: rgba(0, 0, 0, 0.5);
      opacity: 0;
      line-height: 345px;
      text-align: center;
      z-index: 1;
    }
  }
}
</style>