<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>仓库</el-breadcrumb-item>
        <el-breadcrumb-item>礼品管理</el-breadcrumb-item>
        <el-breadcrumb-item>创建礼品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="140px"
      style="margin-top: 20px;"
    >

      <div class="gift-citem">
        <el-form-item
          label="选择仓库："
          prop="pointId"
        >
          <el-select
            v-model="form.pointId"
            class="custom-select-160"
          >
            <el-option
              v-for="(item, i) in pointList"
              :label="item.pointName"
              :value="item.id"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="礼品淘宝价格："
          prop="taobaoPrice"
        >
          <el-input
            v-model="form.taobaoPrice"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="10"
          ></el-input>
        </el-form-item>
      </div>

      <div class="gift-citem">
        <el-form-item
          label="选择分类："
          prop="categoryId"
        >
          <el-select
            v-model="form.categoryId"
            class="custom-select-160"
          >
            <el-option
              v-for="(item, i) in cateList"
              :label="item.name"
              :value="item.id"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="礼品价格："
          prop="price"
        >
          <el-input
            v-model="form.price"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="10"
          ></el-input>
        </el-form-item>
      </div>

      <div class="gift-citem">
        <el-form-item
          label="礼品名称："
          prop="giftName"
        >
          <el-input
            v-model="form.giftName"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="礼品重量（kg）："
          prop="weight"
        >
          <el-input
            v-model="form.weight"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="10"
          ></el-input>
        </el-form-item>
      </div>

      <div class="gift-citem">
        <el-form-item
          label="单位："
          prop="unit"
        >
          <el-input
            v-model="form.unit"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="32"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="礼品重量修改："
          prop="isWeight"
        >
           <el-select
            v-model="form.isWeight"
            class="custom-select-260"
          >
            <el-option
              v-for="item in isWeightList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="gift-citem">
        <el-form-item
          label="规格："
          prop="giftSize"
        >
          <el-input
            v-model="form.giftSize"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="32"
          ></el-input>
        </el-form-item>


        <el-form-item
          label="库存："
          prop="stock"
        >
          <el-input
            v-model="form.stock"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="10"
          ></el-input>
        </el-form-item>
        
      </div>

      <div class="gift-citem">
        <el-form-item
          label="商品编码："
          prop="giftCode"
        >
          <el-input
            v-model="form.giftCode"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="成本价："
          prop="costPrice"
        >
          <el-input
            v-model="form.costPrice"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="10"
          ></el-input>
        </el-form-item>
      </div>

      <el-form-item
        label="礼品类型："
        prop="giftType"
      >
        <el-select v-model="form.giftType">
          <el-option
            label="普通礼品"
            :value="0"
          ></el-option>
          <el-option
            label="信封礼品"
            :value="1"
          ></el-option>
        </el-select>
        <span
          class="color-gray"
          style="margin-left: 10px;font-size: 12px;"
        >
          （注：信封礼品下单的时候，不收取礼品钱，设置也不扣。）
        </span>
      </el-form-item>

      <el-form-item
        label="礼品用途："
        prop="edmType"
      >
        <el-select v-model="form.edmType">
          <el-option
            label="正常礼品"
            :value="0"
          ></el-option>
          <el-option
            label="代发礼品"
            :value="1"
          ></el-option>
          <!-- <el-option
            label="代采礼品"
            :value="2"
          ></el-option> -->
        </el-select>
        <span
          class="color-gray"
          style="margin-left: 10px;font-size: 12px;"
        >
          （注：代发礼品给特殊商家使用，在代发申请列表点击选择代发礼品可以关联。）
        </span>
      </el-form-item>

      <el-form-item
        label="上传主图："
        prop="picList"
      >
        <!-- http://prvv0heh5.bkt.clouddn.com/17frm19brlk.jpg -->
        <div class="pic-list">
          <span
            v-for="(item, i) in form.picList"
            :key="i"
          >
            <img
              :src="$baseImageUrl + item + '?imageView2/2/w/100/h/70'"
              alt=""
              style="width: 100px;height: 70px;"
            >
            <i
              class="el-icon-error"
              @click="removePic(i)"
            ></i>
          </span>
          <upload-single-image
            tip="（3M以内）"
            v-show="form.picList.length < picLimit"
            @success="uploadSuccess"
            :size="3072"
          />
        </div>
      </el-form-item>

      <el-form-item
        label="礼品详情："
        prop="detail"
      >
        <div style="width: 1000px;">
          <UE
            v-model="form.detail"
            :height="500"
          />
        </div>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="handleSure"
          :loading="loading"
        >
          保存礼物
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { replaceUEImgUrl } from "@/utils/formatUeContent";
import { priceReg, intReg } from "@/utils/regular";
export default {
  data() {
    let validatePic = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error("请上传礼品主图"));
      } else {
        callback();
      }
    };

    return {
      loading: false,
      isWeightList: [
        {
          label: '否',
          value: 0
        },
        {
          label: '是',
          value: 1
        },
      ],
      form: {
        pointId: "",
        categoryId: "",
        giftName: "",
        unit: "",
        taobaoPrice: "",
        price: "",
        weight: "",
        stock: "",
        picList: [],
        detail: "",
        giftType: 0,
        edmType: 0,
        costPrice: "",
        giftSize: "",
        giftCode: "",
        isWeight: 0,
      },
      rules: {
        pointId: [
          {
            required: true,
            message: "请选择仓库",
            trigger: "change"
          }
        ],
        categoryId: [
          {
            required: true,
            message: "请选择分类",
            trigger: "change"
          }
        ],
        giftName: [
          {
            whitespace: true,
            required: true,
            message: "请输入礼品名称",
            trigger: "change"
          }
        ],
        unit: [
          {
            whitespace: true,
            required: true,
            message: "请输入单位",
            trigger: "change"
          }
        ],
        taobaoPrice: [
          {
            whitespace: true,
            required: true,
            message: "请输入礼品淘宝价格",
            trigger: "change"
          },
          {
            pattern: priceReg,
            required: true,
            message: "礼品淘宝价格必须是数值类型，精确到小数点后两位",
            trigger: "change"
          }
        ],
        price: [
          {
            whitespace: true,
            required: true,
            message: "请输入礼品价格",
            trigger: "change"
          },
          {
            pattern: priceReg,
            required: true,
            message: "礼品价格必须是数值类型，精确到小数点后两位",
            trigger: "change"
          }
        ],
        weight: [
          {
            whitespace: true,
            required: true,
            message: "请输入礼品重量",
            trigger: "change"
          },
          {
            pattern: priceReg,
            required: true,
            message: "礼品重量必须是数值类型，精确到小数点后两位",
            trigger: "change"
          }
        ],
        stock: [
          {
            whitespace: true,
            required: true,
            message: "请输入库存",
            trigger: "change"
          },
          {
            pattern: intReg,
            required: true,
            message: "礼品重量必须是整数数值",
            trigger: "change"
          }
        ],
        costPrice: [
          {
            pattern: priceReg,
            message: "成本价必须是数值类型，精确到小数点后两位",
            trigger: "change"
          }
        ],
        picList: [
          { validator: validatePic, required: true, trigger: "change" }
        ],
        detail: [
          {
            whitespace: true,
            required: true,
            message: "请输入礼品详情",
            trigger: ["change", "blur"]
          }
        ],
        giftCode: [
          {
            whitespace: true,
            required: true,
            message: "请输入商品编码",
            trigger: "change"
          }
        ]
      },
      pointList: [],
      cateList: [],
      // 主图限制最多五张
      picLimit: 5
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));
          // console.log(params);
          params.picList = JSON.stringify(params.picList);
          params.detail = replaceUEImgUrl(params.detail);
          this.insertRequest(params);
        } else {
          console.log("表单验证失败!!");
          return false;
        }
      });
    },
    handleSure() {
      this.submitForm("form");
    },
    async insertRequest(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/point/saveGift",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("添加礼品成功");
          this.$router.push("/gift/list");
        }
      } catch (error) {
        this.loading = false;
      }
    },
    async getPointList() {
      let params = {
        _index: 1,
        _size: 1000
      };

      let res = await this.$http({
        url: "/point/getPointAdminListPage",
        method: "post",
        params
      });
      const { data } = res;
      this.loading = false;
      if (data) {
        this.pointList = data.records;
      } else {
        this.pointList = [];
      }
    },
    async getCateList() {
      let res = await this.$http({
        url: "/point/getGiftCategory",
        method: "post",
        params: {}
      });
      const { data } = res;
      this.loading = false;
      if (data) {
        this.cateList = data;
      } else {
        this.cateList = [];
      }
    },
    uploadSuccess(file) {
      if (this.form.picList.length < this.picLimit) {
        this.form.picList.push(file.saveUrl);
      }
    },
    removePic(i) {
      this.form.picList.splice(i, 1);
    }
  },
  created() {
    this.getPointList();
    this.getCateList();
  }
};
</script>

<style lang="less" scoped>
.gift-citem {
  display: flex;

  > .el-form-item {
    width: 450px;
  }
}

.pic-list {
  display: flex;

  span {
    position: relative;
    margin-right: 10px;

    &:hover {
      i {
        display: block;
      }
    }

    i {
      position: absolute;
      top: 5px;
      right: 5px;
      display: none;
      cursor: pointer;
      color: #fff;
      font-size: 16px;
    }
  }
}
</style>
