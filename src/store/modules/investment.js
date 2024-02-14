import api from "@/assets/js/common/httpRequest";
import apiInfo from "@/const/apiInfo";

const state = {
  investdetail: null,
  investchartdetail: null,
  investstockbuyorder: null,
  investorderbank: null,
  handleinvestorderbank: null,
  handleBuyStockOrder: null,
  getPdfFile: null,
  handleReadPdfFile: null,
  handleRegistrationBuyStockOrder: null,
};

const getters = {
  getDataInvestDetail(state) {
    return state.investdetail;
  },
  getInvestBrandDetailChart(state) {
    return state.investchartdetail;
  },
  getInvestStockBuyOrder(state) {
    return state.investstockbuyorder;
  },
  getInvestOrderBank(state) {
    return state.investorderbank;
  },
  handleInvestOrderBank(state) {
    return state.handleinvestorderbank;
  },
  handleBuyStockOrder(state) {
    return state.handleBuyStockOrder;
  },
  getPdfFile(state) {
    return state.getPdfFile;
  },
  handleReadPdfFile(state) {
    return state.handleReadPdfFile;
  },
  handleRegistrationBuyStockOrder(state) {
    return state.handleRegistrationBuyStockOrder;
  },
};

const actions = {
  // 7-40-01 銘柄情報取得
  async getInvestBrandDetail({ commit }, payload) {
    await api
      .post(
        "/hhd-it/it/StockInfoService/exec",
        { ...payload },
        { apiType: apiInfo.apiType.IT_STOCK }
      )
      .then((response) => {
        commit("CHANGE_INVEST_DETAIL", response.data);
      });
  },

  // 7-40-17 投資信託グラフデータ取得
  async getInvestBrandDetailChart({ commit }, payload) {
    await api
      .post(
        "/hhd-it/it/InvGraphDataAcquisitionController/exec",
        { ...payload },
        { apiType: apiInfo.apiType.IT_STOCK }
      )
      .then((response) => {
        commit("CHANGE_INVEST_DETAIL_CHART", response.data);
      });
  },

  // 7_40_06 获取交易详细信息
  async getInvestStockBuyOrder({ commit }, payload, config={}) {
    await api
      .post(
        "/hhd-it/it/InvBuyOrderInitialInfoAcquisitionController/exec",
        { ...payload },
        { apiType: apiInfo.apiType.IT_STOCK , ...config }
      )
      .then((response) => {
        commit("CHANGE_INVEST_STOCK_BUY_ORDER", response.data);
      });
  },

  // 50_2_123 注文引落先銀行情報取得
  async getInvestOrderBank({ commit }, payload) {
    await api
      .get(
        "payment/order/banks",
        { ...payload })
      .then((response) => {
        commit("CHANGE_INVEST_BUY_BANK", response.data);
      });
  },

  // 50_2_124 注文リアルタイム入金依頼
  async handleInvestOrderBank({ commit }, payload) {
    await api
      .post(
        "payment/order",
        { ...payload },
        { apiType: apiInfo.apiType.COMMON_FRONT }
      )
      .then((response) => {
        commit("CHANGE_HANDLE_INVEST_BUY_BANK", response.data);
      });
  },

  // 7-40-07 投資信託買注文確認
  async handleBuyStockOrder({ commit }, payload) {
    await api
      .post(
        "/hhd-it/it/InvBuyOrderConfirmationController/exec",
        { ...payload },
        { apiType: apiInfo.apiType.IT_STOCK }
      )
      .then((response) => {
        commit("CHANGE_HANDLE_STOCK_BUY_ORDER", response.data);
      });
  },
  async getPdfFile({ commit }, payload) {
    await api
      .post(
        "/hhd-it/it/DocInfoListAcquisitionController/exec",
        { ...payload },
        { apiType: apiInfo.apiType.IT_STOCK }
      )
      .then((response) => {
        commit("CHANGE_HANDLE_GET_PDF_FILE", response.data);
      });
  },
  async handleReadPdfFile({ commit }, payload) {
    await api
      .post(
        "/hhd-it/it/DocConfirmHistRegistrationController/exec",
        { ...payload },
        { apiType: apiInfo.apiType.IT_STOCK }
      )
      .then((response) => {
        commit("HANDLE_READ_PDF_FILE", response.data);
      });
  },
  // 7-40-08_投信買注文登録
  async handleRegistrationBuyStockOrder({ commit }, payload) {
    await api
      .post(
        "/hhd-it/it/InvBuyOrderRegistrationController/exec",
        { ...payload },
        { apiType: apiInfo.apiType.IT_STOCK }
      )
      .then((response) => {
        commit("HANDLE_REQISTRATION_STOCK_BUY_ORDER", response.data);
      });
  },
  // 7-10-21
  async brandSearchAccess({_}, payload) {
    const response =  await api.post(
      "/hhd-api/JPStock/BrandSearchAccessController/exec",
      payload,
      { apiType: apiInfo.apiType.JP_STOCK }
    )

    return response.data;
  }
};

const mutations = {
  CHANGE_INVEST_DETAIL(state, investdetail) {
    state.investdetail = investdetail;
  },
  CHANGE_INVEST_DETAIL_CHART(state, investchartdetail) {
    state.investchartdetail = investchartdetail;
  },
  CHANGE_INVEST_STOCK_BUY_ORDER(state, investstockbuyorder) {
    state.investstockbuyorder = investstockbuyorder;
  },
  CHANGE_INVEST_BUY_BANK(state, investorderbank) {
    state.investorderbank = investorderbank;
  },
  CHANGE_HANDLE_INVEST_BUY_BANK(state, handleinvestorderbank) {
    state.handleinvestorderbank = handleinvestorderbank;
  },
  CHANGE_HANDLE_STOCK_BUY_ORDER(state, handleBuyStockOrder) {
    state.handleBuyStockOrder = handleBuyStockOrder;
  },
  CHANGE_HANDLE_GET_PDF_FILE(state, getPdfFile) {
    state.getPdfFile = getPdfFile;
  },
  HANDLE_READ_PDF_FILE(state, handleReadPdfFile) {
    state.handleReadPdfFile = handleReadPdfFile;
  },
  HANDLE_REQISTRATION_STOCK_BUY_ORDER(state, handleRegistrationBuyStockOrder) {
    state.handleRegistrationBuyStockOrder = handleRegistrationBuyStockOrder;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
