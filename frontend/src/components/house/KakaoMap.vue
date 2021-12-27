<template>
  <div class="md-layout-item" data-aos="fade-up">
    <h4 class="title text-center">MAP</h4>
    <div class="map-container"></div>
  </div>
</template>

<script>
import KakaoMap from "@/api/kakaoMap.js";
import { mapState, mapActions } from "vuex";

const houseStore = "houseStore";
export default {
  name: "KakaoMap",
  computed: {
    ...mapState(houseStore, ["houses", "houseImgs"]),
  },
  mounted() {
    KakaoMap.load();
  },
  methods: {
    ...mapActions(houseStore, ["getHouseImgs"]),
  },
  watch: {
    houses: function() {
      let itr = this.houses.keys();
      let key = "";
      while ((key = itr.next().value)) {
        // 아파트
        let apt = key;
        this.getHouseImgs(apt);
      }
    },
    houseImgs: function() {
      if (this.houses.size != 0) {
        if (this.houseImgs.length === this.houses.size) {
          KakaoMap.makeMap(this.houses, this.houseImgs);
        }
      }
    },
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 35rem;
}
</style>
