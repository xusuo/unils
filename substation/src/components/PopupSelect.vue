<template>
  <div>
    <transition name="el-fade-in">
      <div
        v-show="visible"
        @click="hide"
        class="g-mask"
      ></div>
    </transition>
    <transition name="el-zoom-in-center">
      <div
        v-show="visible"
        @click="hide"
        class="cus-popup-close"
      >×</div>
    </transition>
    <transition name="cus-slide-left">
      <div
        class="cus-popup"
        :style="`width: ${width};`"
        v-show="visible"
      >
        <div class="cus-popup-header">
          {{title}}
        </div>
        <div class="cus-popup-page">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default() {
        return false;
      }
    },
    width: {
      type: String,
      default() {
        return "500px";
      }
    },
    title: {
      type: String,
      default() {
        return "设置";
      }
    }
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit("input", val);
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    hide() {
      this.visible = false;
    }
  }
};
</script>

<style lang="less">
@popup-width: 1000px;
.g-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 7000;
}
.cus-popup-close {
  position: fixed;
  top: 0;
  right: 30px;
  font-size: 50px;
  z-index: 7002;
  color: #fff;
  cursor: pointer;
}
.cus-popup {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 7001;
  width: @popup-width;
  background: #fff;

  > .cus-popup-header {
    line-height: 40px;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
    background: #f2f2f2;
    font-weight: bold;
  }

  > .cus-popup-page {
    padding: 20px;
    height: calc(100vh - 81px);
    overflow: auto;
  }
}

.cus-slide-left-enter-active {
  transition: 0.2s;
  transform: translateX(0);
}
.cus-slide-left-enter {
  transition: 0.2s;
  transform: translateX(-400px);
}
.cus-slide-left-leave-active {
  transition: 0.5s;
  transform: translateX(-@popup-width);
}
.cus-slide-left-leave {
  transition: 0.5s;
  transform: translateX(0);
}
</style>
