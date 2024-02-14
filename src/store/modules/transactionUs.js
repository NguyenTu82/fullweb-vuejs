import api from "@/assets/js/common/httpRequest";
import apiInfo from "@/const/apiInfo";

const initialState = () => ({
  documentList: {},
  riskShow: false,
  agreementShow: false,
  orderInput: {},
  paymentOrderBank: {},
  paymentOrder: {},
  orderBuyConfirm: {},
  orderBuyAccepted: {},
  orderBuyData: {},
  orderSellConfirm: {},
  orderSellAccepted: {},
  orderSellData: {},
  sellExchangeRate: 0,
  buyExchangeRate: 0,
  orderData : {}
});

const state = initialState();

const getters = {
  getOrderDocuments: (state) =>
    state.documentList.DOCUMENTS.filter((e) => e.CONFIRM_FLG === 0),
  showRiskModal: (state) => state.riskShow,
  showAgreementModal: (state) => state.agreementShow,
  getOrderInput: (state) => state.orderInput,
  getPaymentOrderBank: (state) => state.paymentOrderBank,
  getPaymentOrder: (state) => state.paymentOrder,
  getOrderBuyConfirm: (state) => state.orderBuyConfirm,
  getOrderBuyAccepted: (state) => state.orderBuyAccepted,
  getOrderBuyData: (state) => state.orderBuyData,
  getOrderSellConfirm: (state) => state.orderSellConfirm,
  getOrderSellAccepted: (state) => state.orderSellAccepted,
  getOrderSellData: (state) => state.orderSellData,
  sellExchangeRate: (state) => state.sellExchangeRate,
  buyExchangeRate: (state) => state.buyExchangeRate,
  getOrderData: (state) => state.orderData,
};

const actions = {
  async orderDocuments({ commit }, payload) {
    await api
      .get("/order/documents", {
        params: payload,
        apiType: apiInfo.apiType.STOCK_FRONT,
      })
      .then((response) => {
        console.log(response.data.DATA)
        commit("CHANGE_DOCUMENT", response.data.DATA);
      });
  },
  async orderInput({ commit }, payload) {
    await api
      .get("/order/input", {
        params: payload,
        apiType: apiInfo.apiType.STOCK_FRONT,
      })
      .then((response) => {
        commit("CHANGE_ORDER_INPUT", response.data);
      });
  },
  async paymentOrderBank({ commit }, payload) {
    await api
      .get("/payment/order/banks", {
        params: payload,
        apiType: apiInfo.apiType.COMMON_FRONT,
      })
      .then((response) => {
        console.log("store transactionUs.js paymentOrderBank 11 >> response=", response);
        commit("CHANGE_PAYMENT_ORDER_BANK", response.data);
      });
  },
  async paymentOrder({ commit }, payload) {
    await api
      .post(
        "/payment/order",
        { ...payload },
        { apiType: apiInfo.apiType.COMMON_FRONT }
      )
      .then((response) => {
        commit("CHANGE_PAYMENT_ORDER", response.data);
      });
  },
  async orderBuyAccepted({ commit }, payload) {
    await api
      .post(
        "/order/buy/accepted",
        { ...payload },
        { apiType: apiInfo.apiType.STOCK_FRONT }
      )
      .then((response) => {
        commit("CHANGE_ORDER_BUY_ACCEPTED", response.data);
      });
  },
  async orderBuyConfirm({ commit }, payload) {
    await api
      .post(
        "/order/buy/confirm",
        { ...payload },
        { apiType: apiInfo.apiType.STOCK_FRONT }
      )
      .then((response) => {
        commit("CHANGE_ORDER_BUY_CONFIRM", response.data);
      });
  },
  async orderSellAccepted({ commit }, payload) {
    await api
      .post(
        "/order/sell/accepted",
        { ...payload },
        { apiType: apiInfo.apiType.STOCK_FRONT }
      )
      .then((response) => {
        commit("CHANGE_ORDER_SELL_ACCEPTED", response.data);
      });
  },
  async orderSellConfirm({ commit }, payload) {
    await api
      .post(
        "/order/sell/confirm",
        { ...payload },
        { apiType: apiInfo.apiType.STOCK_FRONT }
      )
      .then((response) => {
        commit("CHANGE_ORDER_SELL_CONFIRM", response.data);
      });
  },
  saveOrderData({ commit }, data) {
    commit("SAVE_ORDER_DATA", data);
  },
};

const mutations = {
  CHANGE_DOCUMENT(state, documentList) {
    state.documentList = documentList;
  },
  SAVE_ORDER_DATA(state, data) {
    state.orderData = data;
  },
  TOGGLE_RISK_MODAL(state, data) {
    state.riskShow = data;
  },
  TOGGLE_AGREEMENT_MODAL(state, data) {
    state.agreementShow = data;
  },
  CHANGE_ORDER_INPUT(state, data) {
    state.orderInput = data;
  },
  CHANGE_PAYMENT_ORDER_BANK(state, data) {
    state.paymentOrderBank = data;
  },
  CHANGE_PAYMENT_ORDER(state, data) {
    state.paymentOrder = data;
  },
  CHANGE_ORDER_BUY_CONFIRM(state, data) {
    state.orderBuyConfirm = data;
  },
  CHANGE_ORDER_BUY_ACCEPTED(state, data) {
    state.orderBuyAccepted = data;
  },
  CHANGE_ORDER_BUY_DATA(state, data) {
    state.orderBuyData = data;
  },
  CHANGE_ORDER_SELL_CONFIRM(state, data) {
    state.orderSellConfirm = data;
  },
  CHANGE_ORDER_SELL_ACCEPTED(state, data) {
    state.orderSellAccepted = data;
  },
  CHANGE_ORDER_SELL_DATA(state, data) {
    state.orderSellData = data;
  },
  UPDATE_SELL_EXCHANGE_RATE(state, data) {
    state.sellExchangeRate = data;
  },
  UPDATE_BUY_EXCHANGE_RATE(state, data) {
    state.buyExchangeRate = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
