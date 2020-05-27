<template>
  <div>
    <el-dialog
      title="查看详细"
      width="900px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
    >

      <div
        class="gift-detail"
        v-html="form.detail"
      ></div>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="visible = false"
        >关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { recoverUEImgUrl } from "@/utils/formatUeContent";
export default {
  data() {
    return {
      visible: false,
      loading: false,
      form: {
        detail: ""
      },
      rules: {
        // stock: [
        //   {
        //     required: true,
        //     message: "请输入库存",
        //     trigger: "change"
        //   }
        // ]
      }
    };
  },
  methods: {
    show(item) {
      this.reset(item);
      this.visible = true;
    },
    reset(item) {
      this.form = {
        detail: recoverUEImgUrl(item.detail)
      };
    }
  }
};
</script>

<style lang="less" scoped>
.gift-detail {
  /deep/img {
    width: 100% !important;
  }
}
</style>
