import api from "@/assets/js/common/httpRequest";
import apiInfo from "@/const/apiInfo";

const initialState = () => ({
  brandInfoData: {}, //7-10-13
  stockPriceInfoData: {}, //7-33-01
  stockSignData: {}, //7-33-05
  orderData: {}, //7-10-14
  bankData: [], //50-2-123
  pdfData: [], //50-4-29
  executeBuyData: {}, //7-10-15
  depositData: {}, //50-2-124
  detailOrderData: {}, //7-10-05
  stockOwnerListData: {}, //7-10-10
  editOrderData: {}, //7-10-16
  confirmDocumentData: {}, //50-2-36
  confirmEditOrderData: {}, //7-10-17
});

const state = initialState();

const getters = {
  dataBrandInfo(state) {
    return state.brandInfoData;
  },
  dataStockPriceInfo(state) {
    return state.stockPriceInfoData;
  },
  dataStockSign(state) {
    return state.stockSignData;
  },
  dataOrder(state) {
    return state.orderData;
  },
  dataBank(state) {
    return state.bankData;
  },
  dataPDF(state) {
    return state.pdfData;
  },
  dataExecuteBuy(state) {
    return state.executeBuyData;
  },
  dataDeposit(state) {
    return state.depositData;
  },
  dataDetailOrder(state) {
    return state.detailOrderData;
  },
  dataStockOwnerList(state) {
    return state.stockOwnerListData;
  },
  dataEditOrder(state) {
    return state.editOrderData;
  },
  dataConfirmDocument(state) {
    return state.confirmDocumentData;
  },
  dataConfirmEditOrder(state) {
    return state.confirmEditOrderData;
  },
};

const actions = {
  //7-10-13
  async cAPIBrandInfo({ commit }, payload) {
    await api
      .post("hhd-api/JPStock/StockBrandInforController/exec", payload, {
        apiType: apiInfo.apiType.JP_STOCK,
      })
      .then((response) => {
        commit("GET_DATA_BRAND_INFO", response.data.DATA);
      });
  },
  //7-33-01
  async cAPIStockPriceInfo({ commit }, payload) {
    await api
      .post("hhd-api/JPStock/StockPriceInfoController/exec", payload, {
        apiType: apiInfo.apiType.JP_STOCK,
      })
      .then((response) => {
        commit("GET_DATA_STOCK_PRICE_INFO", response.data.DATA);
      });
  },
  //7-33-05
  async cAPIStockSign({ commit }, payload) {
    await api
      .post("hhd-api/JPStock/StockSignController/exec", payload, {
        apiType: apiInfo.apiType.JP_STOCK,
      })
      .then((response) => {
        commit("GET_DATA_STOCK_SIGN", response.data.DATA);
      });
  },
  //7-10-14
  async cAPIOrder({ commit }, payload) {
    await api
      .post("hhd-api/JPStock/StockOrderNewCheckService/exec", payload, {
        apiType: apiInfo.apiType.JP_STOCK,
      })
      .then((response) => {
        commit("GET_DATA_ORDER", response.data.DATA);
      });
  },
  //50-2-123
  async cAPIGetDataBank({ commit }) {
    await api
      .get("payment/order/banks", null, {
        apiType: apiInfo.apiType.COMMON_FRONT,
      })
      .then((response) => {
        commit("GET_DATA_BANK", response.data.DATA);
      });
  },
  //50-4-29
  async cAPIGetPDF({ commit }, payload) {
    await api
      .get("/order/documents", {
        params: payload,
        apiType: apiInfo.apiType.STOCK_FRONT,
      })
      .then((response) => {
        commit("GET_DATA_PDF", response.data.DATA.DOCUMENTS);
      });
  },
  //7-10-15
  async cAPIExecuteBuy({ commit }, payload) {
    await api
      .post("hhd-api/JPStock/StockOrderNewExecService/exec", payload, {
        apiType: apiInfo.apiType.JP_STOCK,
      })
      .then((response) => {
        commit("GET_DATA_EXECUTE_BUY", response.data.STATUS);
      });
  },
  //50-2-124
  async cAPIDeposit({ commit }, payload) {
    await api
      .post("/payment/order", payload, {
        apiType: apiInfo.apiType.COMMON_FRONT,
      })
      .then((response) => {
        commit("GET_DATA_DEPOSIT", response.data.DATA);
      });
  },
  //7-10-05
  async cAPIGetDetailOrder({ commit }, payload) {
    await api
      .post("hhd-api/JPStock/StockOrderDetailController/exec/", payload, {
        apiType: apiInfo.apiType.JP_STOCK,
      })
      .then((response) => {
        commit("GET_DATA_DETAIL_ORDER", response.data.DATA);
      });
  },
  //7-10-10
  async cAPIStockOwnerList({ commit }, payload) {
    await api
      .post("hhd-api/JPStock/StockOwnedListController/exec/", payload, {
        apiType: apiInfo.apiType.JP_STOCK,
      })
      .then((response) => {
        commit("GET_DATA_STOCK_OWNER_LIST", response.data.DATA);
      });
  },
  //7-10-10
  async cAPIEditOrder({ commit }, payload) {
    await api
      .post("hhd-api/JPStock/StockOrderCorrectCheckService/exec/", payload, {
        apiType: apiInfo.apiType.JP_STOCK,
      })
      .then((response) => {
        commit("EDIT_ORDER", response.data.DATA);
      });
  },
  //50-2-36
  async cAPIConfirmDocument({ commit }, payload) {
    await api
      .post("electronic_delivery/bundle/confirm", payload, {
        apiType: apiInfo.apiType.COMMON_FRONT,
      })
      .then((response) => {
        commit("CONFIRM_DOCUMENT", response.data.DATA);
      });
  },
  //7-10-17
  async cAPIConfirmEditOrder({ commit }, payload) {
    await api
      .post("hhd-api/JPStock/StockOrderCorrectExecService/exec/", payload, {
        apiType: apiInfo.apiType.JP_STOCK,
      })
      .then((response) => {
        commit("CONFIRM_EDIT_ORDER", response.data.STATUS);
      });
  },
};

const mutations = {
  GET_DATA_BRAND_INFO(state, data) {
    state.brandInfoData = data;
  },
  GET_DATA_STOCK_PRICE_INFO(state, data) {
    state.stockPriceInfoData = data;
  },
  GET_DATA_STOCK_SIGN(state, data) {
    state.stockSignData = data;
  },
  GET_DATA_ORDER(state, data) {
    state.orderData = data;
  },
  GET_DATA_BANK(state, data) {
    state.bankData = data;
  },
  GET_DATA_PDF(state, data) {
    state.pdfData = data;
  },
  GET_DATA_EXECUTE_BUY(state, data) {
    state.executeBuyData = data;
  },
  GET_DATA_DEPOSIT(state, data) {
    state.depositData = data;
  },
  GET_DATA_DETAIL_ORDER(state, data) {
    state.detailOrderData = data;
  },
  GET_DATA_STOCK_OWNER_LIST(state, data) {
    state.stockOwnerListData = data;
  },
  EDIT_ORDER(state, data) {
    state.editOrderData = data;
  },
  CONFIRM_DOCUMENT(state, data) {
    state.confirmDocumentData = data;
  },
  CONFIRM_EDIT_ORDER(state, data) {
    state.confirmEditOrderData = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
