import api from "@/assets/js/common/httpRequest";
import apiInfo from "@/const/apiInfo";
const state = {
  detailUS: null,
  detailJP: null,
};

const getters = {
  getDetailUs(state) {
    return state.detailUS;
  },
  getDetailJP(state) {
    return state.detailJP;
  },
};

const actions = {
  async getDetailUsData({ commit }, payload) {
    await api
      .get(`market_price/${payload.indexType}/${payload.id}`, {
        apiType: apiInfo.apiType.COMMON_FRONT,
      })
      .then((response) => {
        commit("DETAI_US", response.data);
      });
  },
  async getDetailJPData({ commit }, payload) {
    await api
      .post(
        `hhd-api/JPStock/StockPriceIndexController/exec/`,
        { ind_cd: payload.ind_cd },
        { apiType: apiInfo.apiType.JP_STOCK }
      )
      .then((response) => {
        commit("DETAI_JP", response.data);
      });
  },
};

const mutations = {
  DETAI_US(state, detailUS) {
    state.detailUS = detailUS;
  },
  DETAI_JP(state, detailJP) {
    state.detailJP = detailJP;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
