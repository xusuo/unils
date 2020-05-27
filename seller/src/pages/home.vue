<template>
  <div class="layout">
    <Heador />
    <div class="layout-main">
      <router-view />
    </div>
    <Sidebar />
    <Footer /> 

  </div>
</template>

<script>
import Heador from "./common/Header";
import Sidebar from "./common/Sidebar";
import Footer from "./common/Footer";
export default {
  components: {
    Heador,
    Sidebar,
    Footer
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="less" scoped>
@import url("../assets/styles/variables.less");
.layout-main {
  margin-top: 40px;
  padding-bottom: 20px;
}
</style>
