<template>
  <div>
    <el-dialog
      title="选择信封礼品"
      width="1100px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
    >

      <div>
        <el-tabs
          v-model="activeName"
          type="card"
        >
          <el-tab-pane
            label="信封礼品"
            name="letter"
          >
            <Letter @select="select" />
          </el-tab-pane>
        </el-tabs>

      </div>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="visible = false"
        >关闭</el-button>
        <!-- <el-button
          type="primary"
          size="small"
          :loading="loading"
          @click="handleSure"
        >确定</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Letter from "./Letter";
export default {
  components: { Letter },
  data() {
    return {
      visible: false,
      activeName: "letter"
    };
  },
  methods: {
    show() {
      this.reset();
      // this.getTableData();
      this.visible = true;
    },
    reset() {
      // this.form = {
      //   mobile: ""
      // };
    },
    handleSure() {
      this.submitForm("form");
    },
    select(gift) {
      this.visible = false;
      this.$emit("select", gift);
    }
  }
};
</script>