// import { newsInstance } from "./index.js";
import { apiInstance } from "./index.js";

// const news = newsInstance();
const api = apiInstance();

// function newsList(params, success, fail) {
//   news
//     .get(``, { params: params })
//     .then(success)
//     .catch(fail);
// }

function searchNaverNews(param, success, fail) {
  api
    .get(`api/search/news/${param}`)
    .then(success)
    .catch(fail);
}
export { searchNaverNews };
