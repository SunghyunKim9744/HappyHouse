<template>
  <div>
    <form class="form-inline" id="frm">
      <div class="form-group md mr-3">
        <b-form-select v-model="sidoCode" :options="sidos" @change="gugunList()"></b-form-select>
      </div>
      <div class="form-group md-1 mr-3">
        <b-form-select v-model="gugunCode" :options="guguns" @change="dongList()"></b-form-select>
      </div>
      <div class="form-group md-1 mr-3">
        <b-form-select v-model="dongCode" :options="dongs"></b-form-select>
      </div>
      <div class="form-group md-1 mr-3">
        <button type="button" class="btn btn-secondary search-btn" @click="searchApt()">
          검색
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
const locationStore = "locationStore";
const houseStore = "houseStore";
const chartStore = "chartStore";
export default {
  name: "LocationSerarchForm",
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      dongCode: null,
    };
  },

  computed: {
    ...mapState(locationStore, ["sidos", "guguns", "dongs"]),
    ...mapState(houseStore, ["houses", "houseImgs"]),
  },

  created() {
    this.CLEAR_SIDO_LIST();
    this.getSido();
  },

  methods: {
    ...mapActions(locationStore, ["getSido", "getGugun", "getDong"]),
    ...mapActions(houseStore, ["getHouseList", "getHouseImgs"]),
    ...mapActions(chartStore, ["upHit"]),

    ...mapMutations(locationStore, ["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST", "CLEAR_DONG_LIST"]),
    ...mapMutations(houseStore, [
      "SET_IS_SEARCH",
      "SET_HOUSE_LIST",
      "CLEAR_HOUSE_LIST",
      "CLEAR_HOUSE_IMGS",
      "SET_HOUSE_IMGS",
    ]),
    gugunList() {
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    dongList() {
      this.CLEAR_DONG_LIST();
      this.dongCode = null;
      if (this.gugunCode) this.getDong(this.gugunCode);
    },

    searchApt() {
      if (!this.sidoCode) {
        alert("시/도를 선택하세요.");
      } else if (!this.gugunCode) {
        alert("구/군을 선택하세요.");
      }
      // else if (!this.dongCode) {
      //   alert("동/읍/리를 선택하세요.");
      // }
      else {
        this.clearData();
        this.getHouseList(this.gugunCode);
        let codes = {
          sidoCode: this.sidoCode,
          gugunCode: this.gugunCode,
          dongCode: this.dongCode,
        };
        this.upHit(codes);

        this.SET_IS_SEARCH(true);
      }
    },
    clearData() {
      this.SET_IS_SEARCH(false);
      this.CLEAR_HOUSE_IMGS();
      this.CLEAR_HOUSE_LIST();
    },
  },
};
</script>

<style></style>
