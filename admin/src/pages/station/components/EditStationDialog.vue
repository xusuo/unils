<template>
  <div>
    <el-dialog
      title="修改分站"
      width="500px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
    >

      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item
          label="分站编号："
          prop="stationId"
        >
          <el-input
            v-model="form.stationId"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="20"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          label="渠道名称："
          prop="channelName"
        >
          <!-- 渠道不能换 -->
          <el-input
            v-model="form.channelName"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="20"
            disabled
          ></el-input>
        </el-form-item>

        <el-form-item
          label="分站名称："
          prop="name"
        >
          <el-input
            v-model="form.name"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="分站域名："
          prop="domain"
        >
          <el-input
            v-model="form.domain"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="100"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="分站LOGO："
          prop="logo"
        >
          <span
            class="f-ib"
            v-if="form.logoUrl != ''"
            style="vertical-align: top;"
          >
            <img
              :src="$baseImageUrl + form.logoUrl + '?imageView2/2/w/100/h/70'"
              alt=""
              style="width: 100px;height: 70px;"
            >
          </span>
          <upload-single-image
            tip="（3M以内）"
            @success="uploadSuccess"
            :size="3072"
          />
        </el-form-item>

        <el-form-item
          label="负责人："
          prop="nickName"
        >
          <el-input
            v-model="form.nickName"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="负责人手机："
          prop="loginAccount"
        >
          <el-input
            v-model="form.loginAccount"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="11"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="所在地区："
          prop="tempPca"
        >
          <PCA
            class="custom-select-260"
            v-model="form.tempPca" :citylist.sync="form.tempPca"
          />
        </el-form-item>

        <el-form-item
          label="状态："
          prop="status"
        >
          <el-select
            class="custom-select-260"
            v-model="form.status"
          >
            <el-option
              label="待审核"
              :value="0"
            ></el-option>
            <el-option
              label="正常"
              :value="1"
            ></el-option>
            <el-option
              label="禁用"
              :value="2"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="visible = false"
        >取消</el-button>
        <el-button
          type="primary"
          size="small"
          :loading="loading"
          @click="handleSure"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mobileReg } from "@/utils/regular";
export default {
  data() {
    let validatePca = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error("请选择所在地区"));
      } else {
        callback();
      }
    };

    return {
      visible: false,
      loading: false,
      form: {
        stationId: "",
        name: "",
        domain: "",
        logoUrl: "",
        nickName: "",
        loginAccount: "",
        tempPca: [],
        provice: "",
        city: "",
        status: 0
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入分站名称",
            trigger: "change"
          }
        ],
        domain: [
          {
            required: true,
            message: "请输入分站域名",
            trigger: "change"
          }
        ],
        nickName: [
          {
            required: true,
            message: "请输入负责人",
            trigger: "change"
          }
        ],
        // loginAccount: [
        //   {
        //     pattern: mobileReg,
        //     required: true,
        //     message: "负责人手机格式错误，必须是手机号码",
        //     trigger: "change"
        //   }
        // ],
        tempPca: [{ validator: validatePca, required: true, trigger: "change" }]
      }
    };
  },
  watch: {
    "form.tempPca"(value) {
      this.form.provice = value[0];
      this.form.city = value[1];
      this.form.area = value[2];
    }
  },
  methods: {
    show(item) {
      this.reset(item);
      this.visible = true;
    },
    reset(item) {
      this.getInfo({
        stationId: item.stationId,
        channelName: item.name
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));
          console.log(params);
          delete params.channelName;
          delete params.tempPca;
          this.editRequest(params);
        } else {
          console.log("表单验证失败!!");
          return false;
        }
      });
    },
    handleSure() {
      this.submitForm("form");
    },
    async getInfo(params) {
      this.loading = true;
      let res = await this.$http({
        url: "/station/getStationByStationId",
        method: "post",
        data: params
      });
      const { code, data } = res;
      this.loading = false;
      if (code === 200) {
        this.form = {
          channelName: params.channelName,
          stationId: params.stationId,
          name: data.name,
          domain: data.domain,
          logoUrl: data.logoUrl,
          nickName: data.nickName,
          loginAccount: data.loginAccount,
          tempPca: [data.provice, data.city],
          provice: data.provice,
          city: data.city,
          status: data.status
        };
      }
    },
    async editRequest(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/station/updateStation",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("修改分站成功");
          this.visible = false;
          // 调用钩子，刷新主界面的数据
          this.$emit("success");
        }
      } catch (error) {
        this.loading = false;
      }
    },
    uploadSuccess(file) {
      this.form.logoUrl = file.saveUrl;
    }
  }
};
</script>