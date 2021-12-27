<template>
  <div>
    <form class="form-inline" id="frm">
      <div class="form-group md mr-3">
        <b-form-select
          v-model="sidoCode"
          :options="sidos"
          @change="gugunList()"
        ></b-form-select>
      </div>
      <div class="form-group md-1 mr-3">
        <b-form-select
          v-model="gugunCode"
          :options="guguns"
          @change="dongList()"
        ></b-form-select>
      </div>
      <div class="form-group md-1 mr-3">
        <b-form-select v-model="dongCode" :options="dongs"></b-form-select>
      </div>
      <div class="form-group md-1 mr-3">
        <button
          type="button"
          class="btn btn-secondary search-btn"
          @click="searchNews()"
        >
          검색
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
const newsLocationStore = "newsLocationStore";
const newsStore = "newsStore";

export default {
  name: "NewsSearchForm",
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      gugunName: null,
      dongCode: null,
    };
  },

  computed: {
    ...mapState(newsLocationStore, ["sidos", "guguns", "dongs"]),
    ...mapState(newsStore, ["news"]),
  },

  created() {
    this.CLEAR_SIDO_LIST();
    this.getSido();
  },

  methods: {
    ...mapActions(newsLocationStore, ["getSido", "getGugun", "getDong"]),
    ...mapActions(newsStore, ["getNewsList"]),
    ...mapMutations(newsLocationStore, [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_DONG_LIST",
    ]),
    ...mapMutations(newsStore, ["SET_IS_SEARCH"]),
    gugunList() {
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
      console.log(this.guguns);
    },
    dongList() {
      this.CLEAR_DONG_LIST();
      this.dongCode = null;
      if (this.gugunCode) this.getDong(this.gugunCode);

      for(let i=0; i<this.guguns.length; i++){
        if(this.guguns[i].value === this.gugunCode) {
          this.gugunName = this.guguns[i].text;
        }
      }
    },

    searchNews() {
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
        if (this.gugunName) {
          this.getNewsList(this.gugunName + "아파트");
        }

        this.SET_IS_SEARCH(true);
      }
    },
    clearData() {
      this.SET_IS_SEARCH(false);
    },
  },
};
</script>

<style></style>
