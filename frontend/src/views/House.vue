<template>
  <section id="house" class="house">
    <div class="container-fluid justify-content-center" data-aos="fade-up">
      <div class="section-title ">
        <h2>House</h2>
        <location-search-form />
      </div>
    </div>

    <div class="container justify-content-center md-layout">
      <house-list v-if="isSearch" />
      <kakao-map />
    </div>
  </section>
  <!-- End About Section -->
</template>

<script>
import { mapState } from "vuex";
import LocationSearchForm from "@/components/house/LocationSearchForm.vue";
import HouseList from "@/components/house/HouseList.vue";
import KakaoMap from "@/components/house/KakaoMap.vue";

const houseStore = "houseStore";

export default {
  name: "House",
  components: { LocationSearchForm, HouseList, KakaoMap },
  computed: {
    ...mapState(houseStore, ["isSearch"]),
  },
};
</script>

<style scoped>
.section-title h2::after {
  background: black;
}
#house {
  box-shadow: 0 4px 18px 0px rgb(0 0 0 / 12%);
  --background-image: url("../assets/img/cool-background.png");
}
</style>
