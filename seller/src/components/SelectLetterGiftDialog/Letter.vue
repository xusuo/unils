<template>
  <div>
    <div style="margin-bottom: 15px;">
      <span>按省份：</span>
      <el-select
        v-model="searchForm.provice"
        @change="handleSearch"
      >
        <el-option
          v-for="(item, index) in provinceAndCityDataPlus"
          :label="item.label"
          :value="item.label"
          :key="index"
        ></el-option>
      </el-select>
    </div>

    <ul class="gift-list">
      <li
        v-for="(item, i) in tableData"
        :key="i"
      >
        <div class="sel-gift-pic">
          <img
            :src="$baseImageUrl + item.pic_list[0] + '?imageView2/2/w/74/h/74'"
            alt=""
          >
        </div>
        <div class="sel-gift-detail">
          <div class="sel-gift-name">{{item.gift_name}}</div>
          <!-- <div class="sel-gift-tls">
            <span class="sel-gift-price">￥{{item.price}}</span>
          </div> -->
          <div class="sel-gift-stock">
            <div>{{item.weight}} kg /{{item.unit}}</div>
            <div>余 {{item.stock}} 件</div>
          </div>
          <div class="sel-gift-point">
            所在仓库： {{item.pointName}}
          </div>
          <div class="sel-gift-pac">
            地址：
            {{item.provice}}-{{item.city}}
          </div>
        </div>

        <div
          class="sel-gift-select"
          @click="select(item)"
        >点击选择该礼品</div>
      </li>
    </ul>

    <div
      v-if="tableData.length <= 0"
      style="padding: 20px;text-align: center;"
    >
      暂无礼品
    </div>

    <div style="text-align: right;">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.pageNum"
        :page-sizes="pagination.sizeList"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
// 省市区选择组件
// import { provinceAndCityDataPlus } from "element-china-area-data";

export default {
  data() {
    return {
      loading: false,
      tableData: [],
      searchForm: {
        provice: ""
      },
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      },
      // provinceAndCityDataPlus,
      provinceAndCityDataPlus: [
        { label: "全部" },
        { label: "天津" },
        { label: "河北" },
        { label: "上海" },
        { label: "江苏" },
        { label: "浙江" },
        { label: "福建" },
        { label: "山东" },
        { label: "河南" },
        { label: "湖北" },
        { label: "湖南" },
        { label: "广东" },
        { label: "重庆" },
        { label: "四川" }
      ]
    };
  },
  methods: {
    async getTableData(params) {
      if (this.searchForm.provice && this.searchForm.provice !== "") {
        params.provice = this.searchForm.provice
          .replace("省", "")
          .replace("市", "")
          .replace("自治区", "")
          .replace("特别行政区", "");

        if (params.provice === "全部") {
          delete params.provice;
        }
      }

      try {
        let res = await this.$http({
          url: "/home/findEnvelopeGifts",
          method: "get",
          params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          let arr = [];
          data.records.forEach(m => {
            // 转换一下，之前的是下划线的，现在前端用的都是下划线，不转换会导致选礼品的时候出错。
            // 暂时只有这么多，以后有了再加
            m.pic_list = JSON.parse(m.picList);
            m.category_id = m.categoryId;
            m.gift_name = m.giftName;
            m.goods_id = m.goodsId;
            m.point_id = m.pointId;
            m.taobao_price = m.taobaoPrice;

            arr.push(m);
          });

          // console.log(arr);

          this.tableData = arr;
          this.pagination.total = parseInt(data.total);
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleSizeChange(pageSize) {
      this.pagination.pageNum = 1;
      this.pagination.pageSize = pageSize;
      this.getTableData({
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      });
    },
    handleCurrentChange(p) {
      this.pagination.pageNum = p;
      this.getTableData({
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      });
    },
    handleSelectionChange(val) {
      this.selectedItems = val;
    },
    handleSearch() {
      this.pagination.pageNum = 1;
      this.getTableData({
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      });
    },
    handleReset() {
      this.searchForm = {};
      this.handleSearch();
    },
    select(item) {
      let gift = JSON.parse(JSON.stringify(item));

      this.$emit("select", gift);
    }
  },
  created() {
    this.handleSearch();
  }
};
</script>

<style lang="less" scoped>
.gift-list {
  display: flex;
  flex-wrap: wrap;

  img {
    border: 0;
    outline-width: 0;
    vertical-align: top;
  }

  li {
    position: relative;
    width: 255px;
    height: 102px;
    margin-right: 15px;
    margin-bottom: 15px;
    padding: 5px;
    display: flex;
    box-sizing: border-box;
    border: 1px solid #ddd;
    cursor: pointer;
    overflow: hidden;

    &:hover {
      border-color: #f00;

      .sel-gift-select {
        display: block;
      }
    }

    &:last-child {
      margin-right: 0;
    }

    .sel-gift-pic {
      img {
        width: 74px;
        height: 74px;
      }
    }

    .sel-gift-detail {
      flex: 1;
      margin-left: 5px;

      .sel-gift-name {
        font-size: 12px;
        color: #999;
      }

      .sel-gift-tls {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .sel-gift-price {
          font-size: 14px;
          line-height: 20px;
          color: #eb000c;
          font-weight: 400;
        }

        .sel-gift-weight {
          font-size: 12px;
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-weight: 400;
        }
      }

      .sel-gift-stock {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        line-height: 18px;
        color: rgba(0, 0, 0, 0.25);
        font-weight: 400;
        text-align: right;
      }

      .sel-gift-point {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.55);
        font-weight: 400;
      }

      .sel-gift-pac {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.55);
        font-weight: 400;
      }
    }

    .sel-gift-select {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(255, 235, 235, 0.7);
      line-height: 110px;
      text-align: center;
      font-weight: bold;
      display: none;
    }
  }
}
</style>