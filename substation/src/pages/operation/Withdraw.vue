<template>
  <div>
    <div class="custom-container-wrap">
      <el-tabs
        v-model="active"
        type="card"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="提现"
          name="apply"
          :lazy="true"
        >
          <Apply />
        </el-tab-pane>
        <el-tab-pane
          label="入账流水"
          name="list"
          :lazy="true"
        >
          <List />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Apply from "./components/Apply";
import List from "./components/List";

export default {
  components: { Apply, List },
  data() {
    return {
      active: this.$route.params.tabname || "apply"
    };
  },
  watch: {
    $route() {
      this.active = this.$route.params.tabname || "apply";
    }
  },
  methods: {
    handleClick(tab, event) {
      let name = tab.name;
      this.$router.push(`/operation/withdraw/${name}`);
    }
  },
  created() {
    // console.log("created");
  }
};
</script>