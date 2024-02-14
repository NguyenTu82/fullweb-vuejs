import api from "@/assets/js/common/httpRequest";
import apiInfo from "@/const/apiInfo";

const state = {
  cashInData: {
    FIXED_FEE_WITH_TAX: "",
    PERFECT_ACNT_NUM: "",
    PERFECT_ACNT_TYPE: "",
    PERFECT_FACIL_CD: "",
    PERFECT_FACIL_NM: "",
    PERFECT_SUB_CD: "",
    PERFECT_SUB_NM: "",
    realTimeBindState: 0, //Real-time deposit binding status：0 - never bound，1 - bound，-1 - Unbound
    realTimeCashInState: 0, //Real-time deposit status：0 - Unbound without deposit，1 - During deposit，-1 - Unbonded without deposit
    regularBindState: 0, //Monthly regular deposit binding status：0 - unbound，1 - bound
    regularCashInState: 0, //Monthly regular deposit status：0 - Not payment，1 - payment completed，2 - deposit editing，3 - deposit confirmation，4 - deposit list
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
    regularCashInsettings: [], //[{ money: '', day: '-', start: '', stage: 0 }]
    showRegularSetFinishPopup: {
      type: "",
      status: false,
    },
    originData: [],
    cashInUserInfo: {},
  },
  cashInUserInfo: {},
};

const getters = {
  cashInUserInfo(state) {
    return state.cashInData.cashInUserInfo["DATA"]["USER"]["KANA_NAME"];
  },
  getPurposeType(state) {
    return state.cashInData.cashInUserInfo["DATA"]["USER"]["PURPOSE_TYPE"];
  },
  getExInvType(state) {
    return state.cashInData.cashInUserInfo["DATA"]["USER"][
      "EXPERIENCE_INVESTMENT_TYPE"
    ];
  },
};

const actions = {
  async getUser({ commit }, payload) {
    await api
      .get("user/info", payload, { apiType: apiInfo.apiType.COMMON_FRONT })
      .then((response) => {
        commit("SET_CASH_IN_OUT_USER", response.data);
      });
  },

  async executeRealtimeContract(_, payload) {
    return await api
      .post("payment/realtime/contract", payload, {
        apiType: apiInfo.apiType.COMMON_FRONT,
      })
      .then((response) => {
        return response.data;
      });
  },

  async getRealtimeContractStatus(_) {
    return await api
      .get("payment/realtime/account", null, {
        apiType: apiInfo.apiType.COMMON_FRONT,
      })
      .then((response) => {
        return response.data;
      });
  },
};

const mutations = {
  SET_CASH_IN_OUT_USER(state, data) {
    state.cashInData.cashInUserInfo = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
