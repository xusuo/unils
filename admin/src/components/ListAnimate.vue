<template>
  <transition-group
    tag="ul"
    name="fade"
    v-bind:css="false"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <!-- 动画组件，加入了一个缓动的变化 -->
    <slot />
  </transition-group>
</template>

<script>
import Velocity from "velocity-animate";
export default {
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
      // el.style.height = 0
      el.style.left = "-100px";
    },

    enter(el, done) {
      var delay = el.dataset.index * 80;
      setTimeout(function() {
        Velocity(
          el,
          {
            opacity: 1,
            // height: '45px',
            left: 0
          },
          { complete: done }
        );
      }, delay);
    },

    afterEnter() {},

    beforeLeave(el) {
      el.style.opacity = 0;
      el.style.height = 0;
      el.style.left = "-100px";
    },

    leave(el, done) {
      el.style.opacity = 0;
      el.style.height = 0;
      el.style.left = "-100px";
      el.style.display = "none";

      // var delay = el.dataset.index * 150
      // setTimeout(function () {
      //   Velocity(
      //     el,
      //     {
      //       opacity: 0,
      //       height: 0,
      //       left: '-100px'
      //     },
      //     { complete: done }
      //   )
      // }, delay)
    },

    afterLeave() {}
  }
};
</script>

