import { searchNaverNews } from "@/api/news.js";

const newsStore = {
  namespaced: true,
  state: {
    isSearch: false,
    news: [],
  },

  mutations: {
    SET_NEWS_LIST: (state, datas) => {
      let newsArray = new Array();
      datas.forEach((data) => {
        let obj = {
          title: data["title"],
          description: data["description"],
          link: data["link"]
        };

        newsArray.push(obj);
      });
      state.news = newsArray;
    },
    CLEAR_NEWS_LIST: (state) => {
      state.news = [];
    },
    SET_IS_SEARCH: (state, isSearch) => {
      state.isSearch = isSearch;
    },
    CLEAR_NEWS_LIST: (state) => {
      state.news = [];
    },
  },

  actions: {
    getNewsList: ({ commit }, keyword) => {
      const param = keyword;
      searchNaverNews(
        param,
        (response) => {
          commit("SET_NEWS_LIST", response.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default newsStore;
