<template>
  <section id="chart" class="chart">
    <div class="container-fluid justify-content-center" data-aos="fade-up">
      <div class="section-title ">
        <h2>Chart</h2>
      </div>
    </div>

    <div class="container justify-content-center md-layout" style="margin-bottom: 50px;">
      <sido-chart></sido-chart>
      <gugun-chart v-if="isSidoClicked" />
      <dong-chart v-if="isGugunClicked" />
    </div>
  </section>
</template>

<script>
import SidoChart from "@/components/chart/SidoChart.vue";
import GugunChart from "@/components/chart/GugunChart.vue";
import DongChart from "@/components/chart/DongChart.vue";
import { mapState, mapActions, mapMutations } from "vuex";

const chartStore = "chartStore";
export default {
  name: "Chart",
  components: {
    SidoChart,
    GugunChart,
    DongChart,
  },
  computed: {
    ...mapState(chartStore, ["sidoTotal", "isSidoClicked", "isGugunClicked"]),
  },
  methods: {
    ...mapActions(chartStore, ["getSido"]),
    ...mapMutations(chartStore, ["CLEAR_SIDO_LIST"]),
  },
  created() {
    this.CLEAR_SIDO_LIST();
    this.getSido();
  },
  watch: {
    sidoTotal: function() {
      console.log(this.sidoTotal);
      this.CLEAR_SIDO_LIST();
      this.getSido();
    },
  },
};
</script>

<style scoped>
.section-title h2::after {
}
#chart {
  --background-image: url("../assets/img/cool-background.png");
}
</style>
