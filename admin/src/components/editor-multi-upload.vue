<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="isShow"
      width="30%"
    >

      <div style="text-align: center;">
        <UploadImage
          class="editor-upload-sin"
          @success="uploadSuccess"
          style="text-align: center;"
        ></UploadImage>
      </div>

      <div>
        <img
          :src="src"
          v-if="src !== ''"
          alt=""
          style="width: 100%;margin-top: 10px;"
        >
      </div>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          class="custom-btn-cancel"
          size="medium"
          @click="isShow = false"
        >取 消</el-button>
        <el-button
          class="custom-btn-confirm"
          size="medium"
          type="primary"
          @click="ok"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import UploadImage from "@/components/UploadSingleImage";
import { baseImageUrl } from "@/utils/config";

export default {
  name: "UE",
  components: { UploadImage },
  data() {
    return {
      isShow: false,
      src: ""
    };
  },
  props: {
    config: {
      type: Object
    }
  },
  mounted() {},
  methods: {
    show() {
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
    },
    ok() {
      this.hide();
      this.$emit("ok", this.src);
    },
    uploadSuccess(file) {
      this.src = baseImageUrl + file.saveUrl;
    }
  },
  destroyed() {}
};
</script>

<style lang="less" scoped>
.editor-upload-sin {
  /deep/.uploader-pic-icon {
    margin-top: 20px;
  }
}
</style>
