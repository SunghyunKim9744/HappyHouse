import { apiInstance } from "./index.js";
const api = apiInstance();

function sidoList(success, fail) {
  api
    .get(`/chart/sido`)
    .then(success)
    .catch(fail);
}

function gugunList(params, success, fail) {
  api
    .get(`/chart/gugun`, { params: params })
    .then(success)
    .catch(fail);
}

function dongList(params, success, fail) {
  api
    .get(`/chart/dong`, { params: params })
    .then(success)
    .catch(fail);
}

function updateHit(params, success, fail) {
  api
    .put(`/chart/update`, JSON.stringify(params))
    .then(success)
    .catch(fail);
}

export { sidoList, gugunList, dongList, updateHit };
