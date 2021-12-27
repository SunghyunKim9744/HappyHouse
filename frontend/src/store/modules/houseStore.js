import { houseList, searchNaverImg } from "@/api/house.js";

const houseStore = {
  namespaced: true,
  state: {
    isSearch: false,
    houses: [],
    currentHouse: "",
    currentHouseList: [],
    houseImgs: [],
  },

  mutations: {
    SET_HOUSE_IMGS: (state, imgs) => {
      let idx = state.houseImgs.length;
      state.houseImgs.push([]);
      imgs.forEach((img) => {
        let imgSrc = img.link;
        state.houseImgs[idx].push(imgSrc);
      });
    },
    CLEAR_HOUSE_IMGS: (state) => {
      state.houseImgs = [];
    },
    SET_IS_SEARCH: (state, isSearch) => {
      state.isSearch = isSearch;
    },

    SET_CURRENT_HOUSE: (state, currentHouse) => {
      state.currentHouse = currentHouse;
    },

    SET_HOUSE_LIST: (state, houses) => {
      let map = new Map();
      houses.forEach((house) => {
        let name = house["아파트"];
        if (!map.has(name)) {
          map.set(name, []);
        }
        map.get(name).push(house);
      });

      state.houses = map;

      console.log("-");
      console.log(state.houses);
      console.log("-");
      // console.log("여기가 houses");
      // console.log(houses);
      // state.houses = houses;
    },
    CLEAR_HOUSE_LIST: (state) => {
      state.houses = [];
    },

    SET_CURRENT_HOUSE_LIST: (state, current) => {
      state.currentHouseList = current;
    },
    CLEAR_CURRENT_HOUSE_LIST: (state) => {
      state.currentHouseList = [];
    },
  },

  actions: {
    getHouseList: ({ commit }, gugunCode) => {
      // vue cli enviroment variables 검색
      //.env.local file 생성.
      // 반드시 VUE_APP으로 시작해야 한다.
      const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;

      const params = {
        LAWD_CD: gugunCode,
        DEAL_YMD: "202110",
        serviceKey: decodeURIComponent(SERVICE_KEY),
      };
      houseList(
        params,
        (response) => {
          console.log("---");
          console.log(response.data.response.body.items.item);

          commit("SET_HOUSE_LIST", response.data.response.body.items.item);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    getHouseImgs: ({ commit }, aptName) => {
      const param = aptName;
      searchNaverImg(
        param,
        (response) => {
          commit("SET_HOUSE_IMGS", response.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default houseStore;
