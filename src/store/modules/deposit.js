import api from "@/assets/js/common/httpRequest";
import apiInfo from "@/const/apiInfo";
import commonJs from "@/assets/js/common/common";
const state = {
  tab: 1,
  isCashInSumFinal: 0,
  showResult: false,
  cashInData: {
    FIXED_FEE_WITH_TAX: "",
    PERFECT_ACNT_NUM: "",
    PERFECT_ACNT_TYPE: "",
    PERFECT_FACIL_CD: "",
    PERFECT_FACIL_NM: "",
    PERFECT_SUB_CD: "",
    PERFECT_SUB_NM: "",
    realTimeBindState: 0, //实时入金绑定状态：0 - 从未绑定，1 - 已绑定，-1 - 已解绑
    realTimeCashInState: 0, //实时入金状态：0 - 未入金不可解绑，1 - 入金中，-1 - 未入金可解绑
    regularBindState: 0, //每月定期入金绑定状态：0 - 未绑定，1 - 已绑定
    regularCashInState: 0, //每月定期入金状态：0 - 未入金，1 - 入金完了，2 - 入金编辑中，3 - 入金确认中，4 - 入金一览
    regularCashInMetaInfo: [
      { title: "金融機関名", value: "三菱UFJ銀行" },
      { title: "本支店名", value: "支店" },
      { title: "預金種目", value: "普通" },
      { title: "口座番号", value: "1234567" },
    ],
    accountInfo: {
      MAX_AUTO_DEPOSIT_COUNT: 3,
      STATUS: 1,
    },
    regularCashInsettings: [], //[{ money: '', day: '-', start: '', stage: 0 }] //每月定期入金数据
    showRegularSetFinishPopup: {
      type: "",
      status: false,
    },
    originData: [], // 每月定期入金数据 备份，编辑时 使用此数据展示
    cashInUserInfo: {}, // 用户未契约时所需信息
  },
  paymentData: {},
  paymentRealtimeConfirm: {},
  paymentRealtimeAccepted: {},
  paymentRealtimeProcess: {},
  backPage: "",
};

const getters = {
  depositCurrentTab: (state) => state.tab || 1,
  getCashInData(state) {
    let data = state.cashInData;
    return [
      { title: "金融機関名", value: data.PERFECT_FACIL_NM },
      { title: "金融機関コード", value: data.PERFECT_FACIL_CD },
      { title: "本支店名", value: data.PERFECT_SUB_NM },
      { title: "支店コード", value: data.PERFECT_SUB_CD },
      { title: "預金種目", value: data.PERFECT_ACNT_TYPE },
      { title: "口座番号", value: data.PERFECT_ACNT_NUM },
      { title: "口座名義人", value: data.KANA_NAME },
    ];
  },
  bindState: (state) => state.cashInData.realTimeBindState,
  cashInState: (state) => state.cashInData.realTimeCashInState,
  isCashInSumFinal: (state) => state.isCashInSumFinal,
  cashInData: (state) => state.cashInData,
  paymentAccountData: (state) => state.paymentData,
  getPaymentConfirm: (state) => state.paymentRealtimeConfirm,
  getPaymentAccepted: (state) => state.paymentRealtimeAccepted,
  getpaymentProcess: (state) => state.paymentRealtimeProcess,
  showResult: (state) => state.showResult,
  getBackPage: (state) => state.backPage,
};

const actions = {
  async setCashInUserInfo({ commit }, payload) {
    await api
      .get("/user/info", {
        params: payload,
        apiType: apiInfo.apiType.COMMON_FRONT,
      })
      .then((response) => {
        commit("CHANGE_CASH_IN_USER_INFO", response.data);
      });
  },
  async updateCashInData({ commit, dispatch }, payload) {
    await api
      .get("/payment/payin_bank_account", {
        params: payload,
        apiType: apiInfo.apiType.COMMON_FRONT,
      })
      .then((response) => {
        commit("UPDATE_CASH_IN_USER_INFO", response.data);
      })
      .catch(() => {
        commonJs.registerProcess(() => {
          //call again
          dispatch("updateCashInData", payload);
        });
      });
  },
  async setPaymentRealtimeAccount({ commit }, payload) {
    await api
      .get("/payment/realtime/account", {
        params: payload,
        apiType: apiInfo.apiType.COMMON_FRONT,
      })
      .then((response) => {
        commit("CHANGE_PAYMENT_REALTIME_ACCOUNT", response.data);
      });
  },
  async paymentRealtimeConfirm({ commit }, payload) {
    await api
      .post(
        "/payment/realtime/confirm",
        { ...payload },
        { apiType: apiInfo.apiType.COMMON_FRONT }
      )
      .then((response) => {
        commit("PAYMENT_REALTIME_CONFIRM", response.data);
      });
  },
  async paymentRealtimeAccepted({ commit }, payload) {
    await api
      .post(
        "/payment/realtime/accepted",
        { ...payload },
        { apiType: apiInfo.apiType.COMMON_FRONT }
      )
      .then((response) => {
        commit("PAYMENT_REALTIME_ACCEPTED", response.data);
      });
  },
  async paymentRealtimeProcess({ commit }, payload) {
    await api
      .post(
        "/payment/realtime/contract/process",
        { ...payload },
        { apiType: apiInfo.apiType.COMMON_FRONT }
      )
      .then((response) => {
        commit("PAYMENT_REALTIME_PROCESS", response.data);
      });
  },
};

const mutations = {
  DEPOSIT_CHANGE_TAB(state, tab) {
    state.tab = tab;
  },
  CHANGE_CASH_IN_USER_INFO(state, payload) {
    state.cashInData.cashInUserInfo = payload.DATA;
  },
  UPDATE_CASH_IN_USER_INFO(state, payload) {
    for (let p in payload.DATA) {
      state.cashInData[p] = payload.DATA[p];
    }
  },
  UPDATE_CASH_IN_STATE(state, payload) {
    let { stateName, stateValue } = payload;
    state.cashInData[stateName] = stateValue;
  },
  UPDATE_CASH_IN_FINISH(state, payload) {
    state.isCashInSumFinal = payload;
  },
  CHANGE_PAYMENT_REALTIME_ACCOUNT(state, payload) {
    state.paymentData = payload.DATA;
  },
  UPDATE_REGULAR_CASHIN_SETTINGS(state, payload) {
    state.regularCashInsettings = payload;
  },
  INIT_REGULAR_CASHIN_SETTINGS(state) {
    let settings = state.cashInData.regularCashInsettings;
    if (settings.length == 0) {
      state.cashInData.regularCashInsettings.push({
        money: "",
        day: "-",
        start: "",
        stage: 0,
        SEQ_NO: 0,
      });
    }
  },
  // 每条显示状态每月定期入金数据
  OPERATE_REGULAR_CASHIN_SETTINGS(state, payload) {
    let { index, fieldName, fieldValue } = payload;
    state.cashInData.regularCashInsettings[index][fieldName] = fieldValue;
  },
  // 每月定期入金数据 备份，编辑时使用此数据展示
  UPDATE_ORIGIN_DATA(state, payload) {
    state.cashInData.originData = payload;
  },
  // 每月定期入金数据 备份，编辑时使用此数据展示
  INIT_ORIGIN_DATA(state) {
    let settings = state.cashInData.originData;
    if (settings.length == 0) {
      state.cashInData.originData.push({
        money: "",
        day: "-",
        start: "",
        stage: 0,
        SEQ_NO: 0,
      });
    }
  },
  PAYMENT_REALTIME_CONFIRM(state, payload) {
    state.paymentRealtimeConfirm = payload;
  },
  PAYMENT_REALTIME_ACCEPTED(state, payload) {
    state.paymentRealtimeAccepted = payload;
  },
  PAYMENT_REALTIME_PROCESS(state, payload) {
    state.paymentRealtimeProcess = payload;
  },
  UPDATE_SHOW_RESULT(state, payload) {
    state.showResult = payload;
  },
  UPDATE_BACK_PAGE(state, payload) {
    state.backPage = payload;
  },
  SET_CASH_IN_STATE(state, payload) {
    let { stateName, stateValue } = payload;
    state.cashInData[stateName] = stateValue;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
