<template>
  <div class="md-layout-item" data-aos="fade-up">
    <div class="house-list-container">
      <h4 class="title text-center">Recent</h4>
      <house-list-row
        v-for="(house, index) in houses"
        :key="index"
        :house="house"
      />
    </div>
  </div>
</template>

<script>
import HouseListRow from "@/components/house/HouseListRow.vue";
import { mapState } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseList",
  components: {
    HouseListRow,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(houseStore, ["houses"]),
  },
};
</script>

<style scope>
.house-list-container {
  width: 100%;
}
.title {
  margin-top: 0px;
}
</style>
