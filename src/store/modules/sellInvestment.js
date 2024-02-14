import api from "@/assets/js/common/httpRequest";
import apiInfo from "@/const/apiInfo";

const state = {
  stockSellInfo: null,
  sellOrderConfirmation: null,
  invSellOrderRegistrationController: null,
};

const getters = {
  getStocKSellInfo(state) {
    return state.stockSellInfo;
  },
  handleSellOrderConfirmation(state) {
    return state.sellOrderConfirmation;
  },
  handleInvSellOrderRegistrationController(state) {
    return state.invSellOrderRegistrationController;
  },
};

const actions = {
  // 7-40-09 投資信託売注文初期表示
  async getStocKSellInfo({ commit }, payload) {
    await api
      .post(
        "/hhd-it/it/InvSellOrderInitialInfoAcquisitionController/exec",
        { ...payload },
        { apiType: apiInfo.apiType.IT_STOCK }
      )
      .then((response) => {
        commit("STOCK_BUY_INFO", response.data);
      });
  },
  // 7-40-10 投資信託売注文確認
  async handleSellOrderConfirmation({ commit }, payload) {
    return await api
      .post(
        "/hhd-it/it/InvSellOrderConfirmationController/exec",
        { ...payload },
        { apiType: apiInfo.apiType.IT_STOCK }
      )
      .then((response) => {
        commit("SELL_ORDER_CONFIRMATION", response.data);
        return response.data;
      });
  },
  async handleInvSellOrderRegistrationController({ commit }, payload) {
    return await api
      .post(
        "/hhd-it/it/InvSellOrderRegistrationController/exec",
        { ...payload },
        { apiType: apiInfo.apiType.IT_STOCK }
      )
      .then((response) => {
        commit("SELL_ORDER_REGISTRATION", response.data);
        return response.data;
      });
  },
};

const mutations = {
  STOCK_BUY_INFO(state, stockSellInfo) {
    state.stockSellInfo = stockSellInfo;
  },
  SELL_ORDER_CONFIRMATION(state, sellOrderConfirmation) {
    state.sellOrderConfirmation = sellOrderConfirmation;
  },
  SELL_ORDER_REGISTRATION(state, invSellOrderRegistrationController) {
    state.sellOrderConfirmation = invSellOrderRegistrationController;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
