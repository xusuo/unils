<template>
  <div class="letter">
    <div class="letter__filter">
      <div class="letter__filter__wrap banxin">
        <ul>
          <li
            v-for="(item, index) in provinceAndCityDataPlus"
            :key="index"
            @click="onChangeProvince(item.label)"
            :class="{active: item.label === searchForm.provice}"
          >{{item.label}}（{{item.value}}）</li>
        </ul>
      </div>
    </div>

    <div class="banxin">
      <GoodsItem :goodList="tableData" />
      <div class="custom-pagination-wrap">
        <el-pagination
          :current-page="pagination.pageNum"
          :page-size="pagination.pageSize"
          :page-sizes="pagination.sizeList"
          :total="pagination.total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          background
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { giftMixin } from "@/utils/mixin";
import GoodsItem from "./letter/GoodsItem";
export default {
  components: {
    GoodsItem
  },
  mixins: [giftMixin],
  data() {
    return {
      loading: false,
      tableData: [],
      searchForm: {
        provice: "全部"
      },
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      },
      // provinceAndCityDataPlus,
      provinceAndCityDataPlus: [
        { label: "全部", value: 0 },
        { label: "天津", value: 0 },
        { label: "河北", value: 0 },
        { label: "上海", value: 0 },
        { label: "江苏", value: 0 },
        { label: "浙江", value: 0 },
        { label: "福建", value: 0 },
        { label: "山东", value: 0 },
        { label: "河南", value: 0 },
        { label: "湖北", value: 0 },
        { label: "湖南", value: 0 },
        { label: "广东", value: 0 },
        { label: "重庆", value: 0 },
        { label: "四川", value: 0 }
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
            // m.pic_list = JSON.parse(m.picList);
            m.pic_list = m.picList;
            m.category_id = m.categoryId;
            m.gift_name = m.giftName;
            m.goods_id = m.goodsId;
            m.point_id = m.pointId;
            m.taobao_price = m.taobaoPrice;
            // 信封件价格都是0
            m.price = 0;

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
    onChangeProvince(value) {
      this.searchForm.provice = value;
      this.handleSearch();
    },
    select(item) {
      let gift = JSON.parse(JSON.stringify(item));

      this.$emit("select", gift);
    },
    // home/selectPointsNums
    async selectPointsNums() {
      let res = await this.$http({
        url: "/home/selectPointsNums",
        methods: "get",
        params: {}
      });

      const { code, data } = res;

      if (code == 200 && data) {
        let all = 0;

        data.forEach(m => {
          all += parseInt(m.pointNum);

          this.provinceAndCityDataPlus.forEach(p => {
            if (m.provice.indexOf(p.label) > -1) {
              p.value = m.pointNum;
            }
          });
        });

        this.provinceAndCityDataPlus[0].pointNum = parseInt(all);
      }
    }
  },
  watch: {
    $route(to, from) {
      this.handleSearch();
    }
  },
  mounted() {
    this.handleSearch();
    this.selectPointsNums();
  }
};
</script>
<style lang='less' scoped>
.letter {
  .letter__filter {
    padding: 20px 0 30px 0;
    background: #fff;
    margin-bottom: 40px;

    .letter__filter__wrap {
      padding: 0 10px;
      font-weight: lighter;

      ul {
        display: flex;

        li {
          cursor: pointer;
          margin-right: 15px;

          &.active {
            font-weight: bold;
            color: #ff4d70;
          }
        }
      }
    }
  }
}
</style>