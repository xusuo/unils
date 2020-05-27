<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    :css="false"
  >
    <div
      class="add-cart-animate"
      :style="{ top: top + 'px', left: left + 'px' }"
      v-if="value"
    >
      <img
        :src="src"
        alt="商品主图"
      >
    </div>
  </transition>
</template>

<script>
import Velocity from "velocity-animate";

export default {
  props: ["value", "top", "left", "src"],
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
    beforeEnter(el, done) {
      // 设置初始位置
      el.style.top = this.top + "px";
      el.style.left = this.left + "px";
      el.style.opacity = 1;
      el.style.display = "block";

      // 设置初始放大效果
      Velocity(
        el,
        {
          width: "100px",
          height: "100px"
        },
        {
          duration: 300,
          complete: done
        }
      );
    },
    enter(el, done) {
      // 设置商品变化终点位置以及大小
      Velocity(
        el,
        {
          top: 290  + window.scrollY + "px",
          left: window.innerWidth - 50 + "px",
          opacity: 1,
          width: "20px",
          height: "20px"
        },
        {
          duration: 1000,
          complete: done
        }
      );
    },
    afterEnter(el) {
      // 动画结束，隐藏节点
      this.visible = false;
    }
    // leave(el, done) {
    //   console.log("leave");
    //   this.visible = false;
    // }
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
.add-cart-animate {
  position: absolute;
  width: 50px;
  height: 50px;

  > img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
}
</style>

