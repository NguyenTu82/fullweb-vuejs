import api from "@/assets/js/common/httpRequest";
import apiInfo from "@/const/apiInfo";
import constant from "@/const/common";

const initialState = () => ({
  home: {},
  availableCashInfo: {},
  portfolio: {}
});

const state = initialState();

const getters = {
  getHome: (state) => state.home,
  getAvailableCashInfo: (state) => state.availableCashInfo,
  getPortfolio: (state) => state.portfolio,
};

const actions = {
  async home({ commit }, payload) {
    await api
      .get("/home", { params: payload, apiType: apiInfo.apiType.COMMON_FRONT })
      .then((response) => {
        commit("CHANGE_HOME", response.data);
      });
  },
  async availableCashInfo({ commit }, payload) {
    await api
      .post(
        constant.FRONT_API.API_7_10_12,
        { ...payload },
        { apiType: apiInfo.apiType.JP_STOCK }
      )
      .then((response) => {
        commit("CHANGE_AVAILABLE_CASH_INFO", response.data);
      });
  },
  async portfolio({ commit }, payload) {
    await api
      .get("/portfolio", { params: payload, apiType: apiInfo.apiType.COMMON_FRONT })
      .then((response) => {
        commit("GET_PORTFOLIO", response.data);
      });
  },
};

const mutations = {
  CHANGE_HOME(state, documentList) {
    state.home = documentList;
  },
  CHANGE_AVAILABLE_CASH_INFO(state, data) {
    state.availableCashInfo = data;
  },
  GET_PORTFOLIO(state, data) {
    state.portfolio = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
