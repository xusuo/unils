<template>
  <div>
    <div class="custom-container-wrap">
      <el-tabs
        v-model="active"
        type="card"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="奖金日报"
          name="bonus"
          :lazy="true"
        >
          <BonusDaily />
        </el-tab-pane>
        <el-tab-pane
          label="代理日报"
          name="agent"
          :lazy="true"
        >
          <AgentDaily />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import BonusDaily from "./components/BonusDaily";
import AgentDaily from "./components/AgentDaily";

export default {
  components: { BonusDaily, AgentDaily },
  data() {
    return {
      active: this.$route.params.tabname || "bonus"
    };
  },
  watch: {
    $route() {
      this.active = this.$route.params.tabname || "bonus";
    }
  },
  methods: {
    handleClick(tab, event) {
      let name = tab.name;
      this.$router.push(`/market/operateList/${name}`);
    }
  },
  created() {
    // console.log("created");
  }
};
</script>