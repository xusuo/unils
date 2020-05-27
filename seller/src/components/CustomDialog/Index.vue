<template>
  <transition name="el-fade-in-linear">
    <div
      class="custom-dialog"
      v-show="visible"
    >
      <div
        class="custom-dialog-mask"
        @click="hide"
      ></div>
      <div class="custom-dialog-wrap">
        <div
          class="custom-dialog-close"
          @click="hide"
        >
          <i class="el-icon-close"></i>
        </div>
        <div class="custom-dialog-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      visible: false
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    hide() {
      this.visible = false;
    }
  },
  created() {
    this.visible = this.value;
  },
  mounted() {
    // dom插入到body节点下
    document.body.appendChild(this.$el);
  },
  destroyed() {
    // 删除body下的dom
    this.$el.parentNode.removeChild(this.$el);
  }
};
</script>

<style lang="less" scoped>
.custom-dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 90;
}
.custom-dialog-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 90;
  background: rgba(0, 0, 0, 0.5);
}
.custom-dialog-close {
  position: absolute;
  top: 0;
  right: -78px;
  width: 48px;
  height: 48px;
  text-align: center;
  line-height: 48px;
  border-radius: 50%;
  border: 2px solid #fff;
  cursor: pointer;
  z-index: 90;

  &:hover {
    i {
      transform: rotate(90deg);
    }
  }

  &::before {
    content: "";
    width: 28px;
    height: 3px;
    background: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -28px;
    margin: auto 0;
  }

  > i {
    font-size: 20px;
    line-height: 48px;
    color: #fff;
    transition: 0.2s;
  }
}
.custom-dialog-wrap {
  width: 900px;
  height: 700px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 4px;
  z-index: 91;

  .custom-dialog-body {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 4px;
    // overflow: auto;
    box-sizing: border-box;
    z-index: 15;
  }
}
</style>

