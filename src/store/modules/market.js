import api from "@/assets/js/common/httpRequest";
import apiInfo from "@/const/apiInfo";

const state = {
  marketNews: null,
  marketNewsDetail: null,
  marketCondition: null,
};

const getters = {
  marketNews(state) {
    return state.marketNews;
  },

  marketNewsDetail(state) {
    return state.marketNewsDetail;
  },

  marketCondition(state) {
    return state.marketCondition;
  },
};

const actions = {
  async getMarketNews({ commit }, payload) {
    await api.get("market_news", { params: payload }).then((response) => {
      commit("CHANGE_MARKET_NEWS", response.data);
    });
  },

  async getMarketNewsById({ commit }, payload) {
    await api
      .get(`market_news/${payload["id"]}`, {
        params: { apiType: payload.apiType },
      })
      .then((response) => {
        commit("CHANGE_MARKET_NEWS_DETAIL", response.data);
      });
  },

  async getMarketCondition({ commit }) {
    await api
      .get("market_price", { apiType: apiInfo.apiType.COMMON_FRONT })
      .then((response) => {
        commit("CHANGE_MARKET_CONDITION", response.data);
      });
  },
};

const mutations = {
  CHANGE_MARKET_NEWS(state, data) {
    state.marketNews = data;
  },

  CHANGE_MARKET_NEWS_DETAIL(state, data) {
    state.marketNewsDetail = data;
  },

  CHANGE_MARKET_CONDITION(state, data) {
    state.marketCondition = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
