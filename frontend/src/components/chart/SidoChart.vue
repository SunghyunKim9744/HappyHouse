<template>
  <div class="md-layout-item" data-aos="fade-up">
    <h2 class="my-chart-title" style="font-family: OTWelcomeBA">시/도</h2>
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
      @section-click="handleSectionClick"
    >
    </vc-donut>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
const chartStore = "chartStore";
export default {
  name: "SidoChart",
  data() {
    return {
      sections: [],
      total: 0,
      clickedName: "",
      curSido: "",
    };
  },
  computed: {
    ...mapState(chartStore, ["sidoTotal", "sidos", "isSidoClicked"]),
  },
  methods: {
    ...mapActions(chartStore, ["getGugun"]),
    ...mapMutations(chartStore, [
      "CLEAR_GUGUN_LIST",
      "CLEAR_DONG_LIST",

      "SET_IS_SIDO_CLICKED",
      "SET_IS_GUGUN_CLICKED",
    ]),
    handleSectionClick(section, event) {
      if (this.clickedName === section.label) {
        this.SET_IS_SIDO_CLICKED(false);
        this.SET_IS_GUGUN_CLICKED(false);
        this.clickedName = "";
      } else {
        this.curSido = section.sidoCode;
        this.SET_IS_SIDO_CLICKED(true);
        this.clickedName = section.label;
        this.CLEAR_GUGUN_LIST();
        this.CLEAR_DONG_LIST();
        this.getGugun(section.sidoCode);
      }
    },
  },
  created() {
    this.sections = this.sidos;
    this.total = this.sidoTotal;
    console.log(this.total);
  },
  watch: {
    sidos: function() {
      this.sections = this.sidos;
      this.total = this.sidoTotal;
      if (this.isSidoClicked) {
        console.log(this.curSido);
        this.getGugun(this.curSido);
      }
    },
  },
};
</script>

<style>
@font-face {
  font-family: "OTWelcomeBA";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/OTWelcomeBA.woff2")
    format("woff2");
  font-weight: normal;
  font-style: normal;
}
.my-chart-title {
  padding-bottom: 20px;
  padding-top: 30px;
  text-align: center;
}
</style>
