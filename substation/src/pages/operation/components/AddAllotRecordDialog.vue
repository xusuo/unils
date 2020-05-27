<template>
  <div>
    <el-dialog
      title="用户沟通记录"
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
        label-width="130px"
      >

        <el-form-item
          label="用户类型："
          prop="sellerType"
        >
          <el-select
            class="custom-select-220"
            v-model="form.sellerType"
            placeholder="请选择"
          >
            <el-option
              label="0类 未联系上"
              :value="0"
            ></el-option>
            <el-option
              label="1类 已联系"
              :value="1"
            ></el-option>
            <el-option
              label="2类 初步沟通"
              :value="2"
            ></el-option>
            <el-option
              label="3类 深入沟通有意向"
              :value="3"
            ></el-option>
            <el-option
              label="4类 确定合作"
              :value="4"
            ></el-option>
            <el-option
              label="5类 已合作"
              :value="5"
            ></el-option>
            <el-option
              label="6类 悔单"
              :value="6"
            ></el-option>
            <el-option
              label="7类 无意向、放弃"
              :value="7"
            ></el-option>
            <el-option
              label="8类 信息错误"
              :value="8"
            ></el-option>
            <el-option
              label="9类 未联系"
              :value="9"
            ></el-option>
            <el-option
              label="10类 坚决不要"
              :value="10"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="沟通记录："
          prop="noteContent"
        >
          <el-input
            v-model="form.noteContent"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="32"
            type="textarea"
            :rows="4"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="沟通时间："
          prop="createTime"
        >
          <el-date-picker
            v-model="form.createTime"
            class="custom-select-220"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="下次联系时间："
          prop="nextTime"
        >
          <el-date-picker
            v-model="form.nextTime"
            class="custom-select-220"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="选择日期"
          >
          </el-date-picker>
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
import monent from "dayjs";
export default {
  data() {
    return {
      visible: false,
      loading: false,
      form: {
        createTime: "",
        nextTime: "",
        noteContent: "",
        sellerId: 0,
        sellerType: ""
      },
      rules: {
        sellerWechat: [
          {
            whitespace: true,
            required: true,
            message: "请输入微信",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    show(item) {
      this.reset(item);
      this.visible = true;
    },
    reset(item) {
      this.form = {
        createTime: "",
        nextTime: "",
        noteContent: "",
        // operateId: this.userInfo.id,
        sellerId: item.sellerId,
        sellerType: ""
      };
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));
          console.log(params);
          params.createTime = moment(params.createTime)._d.toISOString();
          params.nextTime = moment(params.nextTime)._d.toISOString();
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
          url: "/t-operate/insertOperateNote",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("添加沟通记录成功");
          this.visible = false;
          // 调用钩子，刷新主界面的数据
          this.$emit("success", {
            type: 3
          });
        }
      } catch (error) {
        this.loading = false;
      }
    }
  }
};
</script>