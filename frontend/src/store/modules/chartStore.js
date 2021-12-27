import { sidoList, gugunList, dongList, updateHit } from "@/api/chart.js";

const chartStore = {
  namespaced: true,
  state: {
    sidos: [],
    guguns: [],
    dongs: [],
    sidoTotal: 0,
    gugunTotal: 0,
    dongTotal: 0,
    isSidoClicked: false,
    isGugunClicked: false,
  },

  mutations: {
    SET_SIDO_TOTAL: (state, sidos) => {
      let num = 0;
      sidos.forEach((sido) => {
        num += sido.sidoHit;
      });
      state.sidoTotal = num;
    },
    SET_DONG_TOTAL: (state, dongs) => {
      let num = 0;
      dongs.forEach((dong) => {
        num += dong.dongHit;
      });
      state.dongTotal = num;
    },
    SET_GUGUN_TOTAL: (state, guguns) => {
      let num = 0;
      guguns.forEach((gugun) => {
        num += gugun.gugunHit;
      });
      state.gugunTotal = num;
    },
    SET_SIDO_TOTAL_PLUS: (state) => {
      state.sidoTotal = state.sidoTotal + 1;
    },
    SET_IS_SIDO_CLICKED: (state, isClick) => {
      state.isSidoClicked = isClick;
    },
    SET_IS_GUGUN_CLICKED: (state, isClick) => {
      state.isGugunClicked = isClick;
    },
    SET_SIDO_LIST: (state, sidos) => {
      state.sidoTotal = 0;
      let num = 0;
      sidos.forEach((sido) => {
        state.sidos.push({ sidoCode: sido.sidoCode, label: sido.sidoName, value: sido.sidoHit });
        num += sido.sidoHit;
      });
      state.sidoTotal = num;
    },
    SET_GUGUN_LIST: (state, guguns) => {
      state.gugunTotal = 0;
      let num = 0;
      guguns.forEach((gugun) => {
        state.guguns.push({
          gugunCode: gugun.gugunCode,
          label: gugun.gugunName,
          value: gugun.gugunHit,
        });
        num += gugun.gugunHit;
      });
      state.gugunTotal = num;
    },

    SET_DONG_LIST: (state, dongs) => {
      dongs.forEach((dong) => {
        state.dongs.push({ dongCode: dong.dongCode, label: dong.dongName, value: dong.dongHit });
      });
    },
    CLEAR_SIDO_LIST: (state) => {
      state.sidos = [];
    },
    CLEAR_GUGUN_LIST: (state) => {
      state.guguns = [];
    },
    CLEAR_DONG_LIST: (state) => {
      state.dongs = [];
    },
  },

  actions: {
    getSido: ({ commit }) => {
      sidoList(
        ({ data }) => {
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getGugun: ({ commit }, sidoCode) => {
      const params = {
        sido: sidoCode,
      };
      gugunList(
        params,
        ({ data }) => {
          // console.log(commit, response);
          commit("SET_GUGUN_TOTAL", data);
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    getDong: ({ commit }, gugunCode) => {
      const params = {
        gugun: gugunCode,
      };
      dongList(
        params,
        ({ data }) => {
          // console.log(commit, response);
          commit("SET_DONG_TOTAL", data);
          commit("SET_DONG_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    upHit: ({ commit }, codes) => {
      const params = {
        sidoCode: codes.sidoCode,
        gugunCode: codes.gugunCode,
        dongCode: codes.dongCode,
      };

      updateHit(
        params,
        ({ data }) => {
          console.log(data);
          commit("SET_SIDO_TOTAL_PLUS");
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default chartStore;
