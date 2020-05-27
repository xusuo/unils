<template>
  <div class="all">
    <div class="all__filter">
      <div class="all__filter__wrap banxin">
        <div class="all__filter__top">
          <strong class="filter__top__head">
            <em>分</em>
            <em>类</em>
            <em>筛</em>
            <em>选：</em>
          </strong>
          <div class="filter__head-check">
            <el-checkbox
              :key="index"
              :label="item.name"
              @change="changeBox(index)"
              v-for="(item, index) in classify"
              v-model="item.choise"
            ></el-checkbox>
          </div>
          <a
            @click="clearAllCheck"
            class="filter__head-empty"
            href="javascript:;"
          >清空</a>
        </div>
        <div class="all__filter__bottom">
          <strong class="filter__top__head">
            <em>排</em>
            <em>序：</em>
          </strong>
          <ul class="all__filter-sort">
            <li
              :class="isActive==='zonghe'?'active':''"
              @click="paixuZongHe('zongHe')"
            >
              <span>综合排序</span>
            </li>
            <li
              :class="isActive==='price'?'active':''"
              @click="paixuPrice('price',1)"
              v-if="priceTaxis"
            >
              <span>价格从高到低</span>
              <i class="el-icon-arrow-down"></i>
            </li>
            <li
              :class="isActive==='price'?'active':''"
              @click="paixuPrice('price',2)"
              v-else
            >
              <span>价格从低到高</span>
              <i class="el-icon-arrow-up"></i>
            </li>
            <li
              :class="isActive==='weight'?'active':''"
              @click="paixuWeight('weight',1)"
              v-if="weightTaxis"
            >
              <span>重量从高到低</span>
              <i class="el-icon-arrow-down"></i>
            </li>
            <li
              :class="isActive==='weight'?'active':''"
              @click="paixuWeight('weight',2)"
              v-else
            >
              <span>重量从低到高</span>
              <i class="el-icon-arrow-up"></i>
            </li>
            <li
              :class="isActive==='sale'?'active':''"
              @click="paixuSale('sale',1)"
              v-if="saleTaxis"
            >
              <span>销量从高到低</span>
              <i class="el-icon-arrow-down"></i>
            </li>
            <li
              :class="isActive==='sale'?'active':''"
              @click="paixuSale('sale',2)"
              v-else
            >
              <span>销量从低到高</span>
              <i class="el-icon-arrow-up"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="banxin">
      <GoodsItem :goodList="goodList" />
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
import GoodsItem from "./all/GoodsItem";
export default {
  components: {
    GoodsItem
  },
  mixins: [giftMixin],
  data() {
    return {
      goodList: [],
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 15,
        total: 0
      },
      categoryList: [],
      checkBox: false,
      zongHeTaxis: false,
      priceTaxis: false,
      weightTaxis: false,
      saleTaxis: false,
      isActive: "zonghe",
      checked: false,
      choiseFlag: false
    };
  },
  methods: {
    // 从哪个分类点进来，高亮那个筛选多选框
    getFilterNum() {
      if (this.$route.query.tagId) {
        this.classify.forEach(item => {
          item.choise = false;
        });
        this.classify[parseInt(this.$route.query.tagId)].choise = true;
      }
    },
    async getFilterData() {
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
    },
    // 获取数据
    async getListData(paixu, paixuNum) {
      try {
        let params = {
          gift_name: this.$route.query.name,
          _size: this.pagination.pageSize,
          _index: this.pagination.pageNum,
          giftType: 0,
          edmType: 0
        };
        if (this.categoryList.length && !this.choiseFlag) {
          params.category_id = this.categoryList.toString();
        } else if (this.$route.query.tagId && !this.choiseFlag) {
          params.category_id = parseInt(this.$route.query.tagId) + 1;
        }
        if (paixu && paixuNum) {
          params.sortType = paixu;
          params.ord = paixuNum;
        } else if (paixu) {
          params.sortType = paixu;
        }
        let res = await this.$http({
          url: this.$loginURL + `/getGiftListPage`,
          method: "post",
          params: params
        });
        const {
          code,
          data: { records, total },
          message = "获取失败"
        } = res;
        if (code === 200) {
          this.goodList = records;
          this.pagination.total = parseInt(total);
        } else {
          this.$message.error(message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 分类筛选选中的数组
    changeBox(index) {
      this.choiseFlag = false;
      let boxIndex = this.categoryList.indexOf(index + 1);
      if (boxIndex === -1) {
        this.categoryList.push(index + 1);
      } else {
        this.categoryList.splice(boxIndex, 1);
      }
      this.getListData();
    },
    // 清空分类筛选
    clearAllCheck() {
      this.classify.forEach(item => {
        item.choise = false;
      });
      this.categoryList = [];
      this.choiseFlag = true;
      this.getListData();
    },
    // 排序
    paixuZongHe(item) {
      this.isActive = "zonghe";
      this.zongHeTaxis = !this.zongHeTaxis;
      this.getListData("create_time");
    },
    paixuPrice(item) {
      this.isActive = "price";
      this.priceTaxis = !this.priceTaxis;
      this.getListData("price", this.priceTaxis ? 1 : 2);
    },
    paixuWeight(item) {
      this.isActive = "weight";
      this.weightTaxis = !this.weightTaxis;
      this.getListData("weight", this.weightTaxis ? 1 : 2);
    },
    paixuSale(item) {
      this.isActive = "sale";
      this.saleTaxis = !this.saleTaxis;
      this.getListData("sales", this.saleTaxis ? 1 : 2);
    },
    handleSizeChange(pageSize) {
      this.pagination.pageNum = 1;
      this.pagination.pageSize = pageSize;
      this.getListData();
    },
    handleCurrentChange(p) {
      this.pagination.pageNum = p;
      this.getListData();
    }
  },
  watch: {
    $route(to, from) {
      this.getListData();
    }
  },
  mounted() {
    this.getFilterData();
    this.getListData();
    this.getFilterNum();
  }
};
</script>
<style lang='less' >
.all {
  .all__filter {
    padding: 20px 0 30px 0;
    background: #fff;
    margin-bottom: 40px;

    .all__filter__wrap {
      padding: 0 10px;
      font-weight: lighter;

      & > div {
        display: flex;
        min-height: 36px;
        align-items: center;
        .filter__top__head {
          width: 70px;
          margin-right: 10px;
          text-align: justify;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: lighter;
        }
        .filter__head-empty {
          margin-left: 30px;
          font-size: 14px;
          line-height: 20px;
          color: #ff4d70;
          text-decoration: underline;
        }
        .all__filter-sort {
          display: flex;
          align-items: center;
          flex: 1;
          li {
            margin-right: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            cursor: pointer;
            transition: all 0.2s;
            color: rgba(0, 0, 0, 0.65);
            span {
              line-height: 18px;
              font-weight: 400;
              margin-right: 6px;
            }
            &.active {
              color: #ff4d70;
            }
            i {
              font-size: 14px;
              line-height: 18px;
              color: #979797;
              font-weight: 400;
            }
            &.active {
              color: #ff4d70;
            }
          }
        }
      }
    }
  }
  // .hotGoods__item {
  //   &:nth-child(6n) {
  //     margin-left: 0 !important;
  //   }
  //   &:first-child {
  //     margin-left: 0 !important;
  //   }
  // }
}
</style>