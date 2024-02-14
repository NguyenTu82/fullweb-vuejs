import api from "@/assets/js/common/httpRequest";
import apiInfo from "@/const/apiInfo";

const state = {
  stockPrice: null,
  stockBrand: null,
  stockSign: null,
  resultInfo: null,
  stockOwned: null,
};

const getters = {
  stockPrice(state) {
    return state.stockPrice;
  },

  stockBrand(state) {
    return state.stockBrand;
  },

  stockSign(state) {
    return state.stockSign;
  },

  resultInfo(state) {
    return state.resultInfo;
  },

  stockOwned(state) {
    return state.stockOwned;
  },
};

const actions = {
  /**
   * 7-33-01
   *
   * @param commit
   * @param payload
   * @returns {Promise<void>}
   */
  async getStockDetailJp({ commit }, payload) {
    await api
      .post("hhd-api/JPStock/StockPriceInfoController/exec/", payload, {
        apiType: apiInfo.apiType.JP_STOCK,
      })
      .then((response) => {
        commit("CHANGE_STOCK_PRICE_DETAIL", response.data);
      });
  },

  /**
   * 7-10-13
   *
   * @param commit
   * @param payload
   * @returns {Promise<void>}
   */
  async getStockBrandJp({ commit }, payload) {
    await api
      .post("hhd-api/JPStock/StockBrandInforController/exec/", payload, {
        apiType: apiInfo.apiType.JP_STOCK,
      })
      .then((response) => {
        commit("CHANGE_STOCK_BRAND_DETAIL", response.data);
      });
  },

  /**
   * 7-33-05
   *
   * @param commit
   * @param payload
   * @returns {Promise<void>}
   */
  async getStockSignJp({ commit }, payload) {
    await api
      .post("hhd-api/JPStock/StockSignController/exec/", payload, {
        apiType: apiInfo.apiType.JP_STOCK,
      })
      .then((response) => {
        commit("CHANGE_STOCK_SIGN_DETAIL", response.data);
      });
  },

  /**
   * 7-10-11
   *
   * @param commit
   * @param payload
   * @returns {Promise<void>}
   */
  async getResultInfo({ commit }, payload) {
    await api
      .post("hhd-api/JPStock/ResultInfoController/exec/", payload, {
        apiType: apiInfo.apiType.JP_STOCK,
      })
      .then((response) => {
        commit("CHANGE_RESULT_INFO", response.data);
      });
  },

  async getStockOwnedList({ commit }, payload) {
    await api
      .post("hhd-api/JPStock/StockOwnedListController/exec/", payload, {
        apiType: apiInfo.apiType.JP_STOCK,
      })
      .then((response) => {
        commit("CHANGE_STOCK_OWNED", response.data);
      });
  },
};

const mutations = {
  CHANGE_STOCK_PRICE_DETAIL(state, data) {
    state.stockPrice = data;
  },

  CHANGE_STOCK_BRAND_DETAIL(state, data) {
    state.stockBrand = data;
  },

  CHANGE_STOCK_SIGN_DETAIL(state, data) {
    state.stockSign = data;
  },

  CHANGE_RESULT_INFO(state, data) {
    state.resultInfo = data;
  },

  CHANGE_STOCK_OWNED(state, data) {
    state.stockOwned = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
