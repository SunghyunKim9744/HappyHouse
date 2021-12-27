<template>
  <div class="md-layout-item" data-aos="fade-up">
    <h2 class="my-chart-title" style="font-family: OTWelcomeBA">동</h2>
    <vc-donut
      background="white"
      foreground="grey"
      :thickness="100"
      has-legend
      legend-placement="bottom"
      :sections="sections"
      :total="total"
      :start-angle="0"
      :auto-adjust-text-size="true"
    >
    </vc-donut>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
const chartStore = "chartStore";
export default {
  name: "DongChart",
  data() {
    return {
      sections: [],
      total: 0,
    };
  },
  computed: {
    ...mapState(chartStore, ["dongTotal", "dongs"]),
  },
  methods: {},
  created() {
    this.sections = this.dongs;
    this.total = this.dongTotal;
  },
  watch: {
    dongs: function() {
      this.sections = this.dongs;
      this.total = this.dongTotal;
    },
  },
};
</script>

<style></style>
