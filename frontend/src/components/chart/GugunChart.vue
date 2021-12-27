<template>
  <div class="md-layout-item" data-aos="fade-up">
    <h2 class="my-chart-title" style="font-family: OTWelcomeBA">구/군</h2>
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
  name: "GugunChart",
  data() {
    return {
      sections: [],
      total: 0,
      clickedName: "",
      curGugun: "",
    };
  },
  computed: {
    ...mapState(chartStore, ["gugunTotal", "guguns", "isGugunClicked"]),
  },
  methods: {
    ...mapActions(chartStore, ["getDong"]),
    ...mapMutations(chartStore, ["CLEAR_DONG_LIST", "SET_IS_GUGUN_CLICKED"]),
    handleSectionClick(section, event) {
      if (this.clickedName === section.label) {
        this.SET_IS_GUGUN_CLICKED(false);
        this.clickedName = "";
      } else {
        this.curGugun = section.gugunCode;
        this.SET_IS_GUGUN_CLICKED(true);
        this.clickedName = section.label;
        this.CLEAR_DONG_LIST();
        this.getDong(section.gugunCode);
      }
    },
  },
  created() {
    this.sections = this.guguns;
    this.total = this.gugunTotal;
  },
  watch: {
    guguns: function() {
      this.sections = this.guguns;
      this.total = this.gugunTotal;
      if (this.isGugunClicked) {
        this.getDong(this.curGugun);
      }
    },
  },
};
</script>

<style></style>
