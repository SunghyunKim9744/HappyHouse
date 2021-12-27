<template>
  <div>
    <div class="viewport">
      <md-toolbar :md-elevation="1">
        <span
          class="md-title apt-click"
          @click="selectHouse(house[0])"
          data-aos="fade-left"
        >
          {{ house[0] }}
        </span>
      </md-toolbar>
      <house-list-row-items
        v-if="house[0] === currentHouse"
      ></house-list-row-items>
    </div>
  </div>
</template>

<script>
import KakaoMap from "@/api/kakaoMap.js";
import { mapActions, mapMutations, mapState } from "vuex";
import HouseListRowItems from "@/components/house/HouseListRowItems";
const houseStore = "houseStore";

export default {
  name: "HouseListRow",
  components: {
    HouseListRowItems,
  },

  props: {
    house: Array,
  },
  methods: {
    ...mapActions(houseStore, ["getHouseList"]),
    ...mapMutations(houseStore, [
      "CLEAR_CURRENT_HOUSE_LIST",
      "SET_CURRENT_HOUSE_LIST",
      "SET_CURRENT_HOUSE",
    ]),
    selectHouse(aptName) {
      if (this.currentHouse == aptName) {
        KakaoMap.removeMarker(aptName);
        this.SET_CURRENT_HOUSE("");
      } else {
        this.SET_CURRENT_HOUSE(aptName);
        let houses = this.houses;
        let currentHouseList = houses.get(aptName);
        this.CLEAR_CURRENT_HOUSE_LIST;
        this.SET_CURRENT_HOUSE_LIST(currentHouseList);
        KakaoMap.moveMap(aptName);
      }
    },
  },
  computed: {
    ...mapState(houseStore, ["houses", "currentHouse"]),
  },
};
</script>

<style scoped>
.viewport {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-bottom: 0px;
}
.viewport:active {
  border: 5px solid rgba(0, 0, 0, 0.12);
}
.md-toolbar {
  padding: 0px;
}
.md-toolbar:hover {
  cursor: pointer;
}
</style>
