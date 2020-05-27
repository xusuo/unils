<template>
  <div style="width:100%;margin-right: 12px;">
    <script
      :id="editorId"
      type="text/plain"
    ></script>
  </div>
</template>
<script>
export default {
  name: "UE",
  data() {
    return {
      editor: null,
      editorId: "editor" + this.genNonDuplicateID(4)
    };
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      default: 300
    }
  },
  watch: {
    value(value) {
      // console.log(value)
      if (this.editor) {
        this.setUEContent(value);
        this.editor.focus();
      }
    }
  },
  methods: {
    // 根据时间戳生成不重复的字符串
    genNonDuplicateID(randomLength) {
      return Number(
        Math.random()
          .toString()
          .substr(3, randomLength) + Date.now()
      ).toString(36);
    },
    getUEContent() {
      // 获取内容方法
      return this.editor.getContent();
    },
    setUEContent(value) {
      //加延时，
      // setTimeout(() => {
      //     this.editor.setContent(s)
      // })
      // this.editor.ready(function () {
      //     this.editor.setContent(s)
      // })

      if (this.editor) {
        // 内容相同的时候不用辅助，以免光标错位
        if (value !== this.editor.getContent()) {
          this.editor.setContent(value);
        }
      } else {
        this.$emit("input", s);
      }
    }
  },
  created() {
    // console.log(this.value)
  },
  mounted() {
    const _this = this;
    this.editor = UE.getEditor(this.editorId, {
      initialFrameWidth: "100%",
      initialFrameHeight: this.height
    });

    this.editor.ready(() => {
      // console.log('ready !!!!!, :' + this.editorId)
      // console.log(this.value)
      // 初始化完成即设置默认值
      this.editor.setContent(this.value);
      this.$emit("ready", this.editorId);

      // 必须监听一下两个事件才能确保获取到值，不然容易出现意外

      // 改变了内容
      this.editor.addListener("contentChange", () => {
        // console.log('编辑器内容发生了改变22222-----------------')
        // console.log('contentChange监听的：' + this.editor.getContent())
        this.$emit("input", this.editor.getContent());
      });
      this.editor.addListener("blur", () => {
        // console.log('blur监听的：' + this.editor.getContent())
        this.$emit("input", this.editor.getContent());
      });

      // this.editor.addListener('selectionchange', () => {
      //     // console.log('编辑器内容发生了改变22222-----------------')
      //     console.log('selectionchange监听的：' + this.editor.getContent())
      //     this.$emit('input', this.editor.getContent())
      // })
    });

    // console.log(this.editor)
  },
  destroyed() {
    this.editor.destroy();
  }
};
</script>

<style>
/*.edui-container *{-webkit-box-sizing: content-box;-moz-box-sizing: content-box;box-sizing: content-box;}*/
/*.edui-container *:before,.edui-container *:after {-webkit-box-sizing: content-box;-moz-box-sizing: content-box;box-sizing: content-box;}*/
.edui-default {
  position: relative;
  z-index: 1;
}

.edui-default .edui-toolbar {
  line-height: 20px;
}

/*.edui-default .edui-editor-iframeholder{
              max-height: 400px !important;
              overflow: auto !important;
          }*/
</style>
