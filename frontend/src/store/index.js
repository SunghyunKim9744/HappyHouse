import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import memberStore from "@/store/modules/memberStore.js";
import houseStore from "@/store/modules/houseStore.js";
import locationStore from "@/store/modules/locationStore.js";

import boardStore from "@/store/modules/boardStore";
import chartStore from "@/store/modules/chartStore";

import newsStore from "@/store/modules/newsStore";
import newsLocationStore from "@/store/modules/newsLocationStore";

const store = new Vuex.Store({
  modules: {
    memberStore,
    houseStore,
    locationStore,
    boardStore,

    chartStore,

    newsStore,
    newsLocationStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});

export default store;
