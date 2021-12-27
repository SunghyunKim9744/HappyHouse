<template>
  <md-list class="md-double-line">
    <house-list-row-item
      v-for="(deal, index) in currentHouseList"
      :key="index"
      :deal="deal"
    ></house-list-row-item>

    <!-- <div v-for="(deal, index) in currentHouseList" :key="index">
      {{ deal["아파트"] }}
      {{ deal["거래금액"] }}
    </div> -->
  </md-list>
</template>

<script>
import HouseListRowItem from "@/components/house/HouseListRowItem.vue";
import { mapState } from "vuex";
const houseStore = "houseStore";
export default {
  components: {
    HouseListRowItem,
  },
  computed: {
    ...mapState(houseStore, ["currentHouseList"]),
  },
};
</script>

<style scoped></style>
