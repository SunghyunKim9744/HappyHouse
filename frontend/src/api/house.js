import { houseInstance } from "./index.js";
import { apiInstance } from "./index.js";

const api = apiInstance();
const house = houseInstance();

function houseList(params, success, fail) {
  house
    .get(``, { params: params })
    .then(success)
    .catch(fail);
}

function searchNaverImg(param, success, fail) {
  api
    .get(`api/search/img/${param}`)
    .then(success)
    .catch(fail);
}
export { houseList, searchNaverImg };
