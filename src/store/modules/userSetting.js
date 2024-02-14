import api from "@/assets/js/common/httpRequest";
import apiInfo from "@/const/apiInfo";

const initialState = () => ({
  changeLoginPwdData: {},
  changeTradePwdData: {},
  changeLoginIdData: {},
  changeLoginIdCodeData: {},
  unlockAccountData: {},
  unlockAccountCodeData: {},
  resetTradePwdData: {},
  resetTradePwdCodeData: {},
  resetTradePwdNewData: {},
  unlockTradePwdData: {},
  unlockTradePwdCodeData: {},
  responseData: {},
  userInfo: {},
});

const state = initialState();

const getters = {
  dataChangeLoginPwd(state) {
    return state.changeLoginPwdData;
  },
  dataChangeTradePwd(state) {
    return state.changeTradePwdData;
  },
  dataChangeLoginId(state) {
    return state.changeLoginIdData;
  },
  dataChangeLoginIdCode(state) {
    return state.changeLoginIdCodeData;
  },
  dataUnlockAccount(state) {
    return state.unlockAccountData;
  },
  dataUnlockAccountCode(state) {
    return state.unlockAccountCodeData;
  },
  dataResetTradePwd(state) {
    return state.resetTradePwdData;
  },
  dataResetTradePwdCode(state) {
    return state.resetTradePwdCodeData;
  },
  dataResetTradePwdNew(state) {
    return state.resetTradePwdNewData;
  },
  dataUnlockTradePwd(state) {
    return state.unlockTradePwdData;
  },
  dataUnlockTradePwdCode(state) {
    return state.unlockTradePwdCodeData;
  },
  getResetLoginPassData(state) {
    return state.resetLoginPassData;
  },
  getResetLoginPassCodeData(state) {
    return state.resetLoginPassCodeData;
  },
  getResetLoginPassSubmitData(state) {
    return state.resetLoginPassSubmitData;
  },
  getUserInfo(state) {
    return state.userInfo;
  },
};

const actions = {
  async changeLoginPwdApi({ commit }, payload) {
    await api
      .post("user/password", payload, { apiType: apiInfo.apiType.COMMON })
      .then((response) => {
        commit("CHANGE_LOGIN_PWD_INFO", response.data);
      });
  },
  async changeTradePwdApi({ commit }, payload) {
    await api
      .post("user/secret", payload, { apiType: apiInfo.apiType.COMMON })
      .then((response) => {
        commit("CHANGE_TRADE_PWD_INFO", response.data);
      });
  },
  async changeLoginIdApi({ commit }, payload) {
    await api
      .post("user/mail/send_verify_code", payload, {
        apiType: apiInfo.apiType.COMMON,
      })
      .then((response) => {
        commit("CHANGE_LOGIN_ID_INFO", response.data);
      });
  },
  async changeLoginIdCodeApi({ commit }, payload) {
    await api
      .post("user/mail", payload, { apiType: apiInfo.apiType.COMMON })
      .then((response) => {
        commit("CHANGE_LOGIN_ID_CODE_INFO", response.data);
      });
  },
  async unlockAccountApi({ commit }, payload) {
    await api
      .post("user/password/send_unlock_verify_code", payload, {
        apiType: apiInfo.apiType.COMMON,
      })
      .then((response) => {
        commit("UNLOCK_ACCOUNT_INFO", response.data);
      });
  },
  async unlockAccountCodeApi({ commit }, payload) {
    await api
      .post("user/password/unlock", payload, {
        apiType: apiInfo.apiType.COMMON,
      })
      .then((response) => {
        commit("UNLOCK_ACCOUNT_CODE_INFO", response.data);
      });
  },
  async resetLoginPwdApi({ commit }, payload) {
    await api
      .post("user/password/send_reset_verify_code", payload, {
        apiType: apiInfo.apiType.COMMON,
      })
      .then((response) => {
        commit("RESET_LOGIN_PWD_INFO", response.data);
      });
  },
  async resetLoginPwdCodeApi({ commit }, payload) {
    await api
      .post("user/password/validate_code", payload, {
        apiType: apiInfo.apiType.COMMON,
      })
      .then((response) => {
        console.log(response);
        commit("RESET_LOGIN_PWD_CODE_INFO", response.data);
      });
  },
  async resetLoginPwdSubmitApi({ commit }, payload) {
    await api
      .post("user/password/reset", payload, { apiType: apiInfo.apiType.COMMON })
      .then((response) => {
        commit("RESET_LOGIN_PWD_SUBMIT_INFO", response.data);
      });
  },
  async resetTradePwdApi({ commit }, payload) {
    await api
      .post("user/secret/send_reset_verify_code", payload, {
        apiType: apiInfo.apiType.COMMON,
      })
      .then((response) => {
        commit("RESET_TRADE_PWD_INFO", response.data);
      });
  },
  async resetTradePwdCodeApi({ commit }, payload) {
    await api
      .post("user/password/validate_code", payload, {
        apiType: apiInfo.apiType.COMMON,
      })
      .then((response) => {
        commit("RESET_TRADE_PWD_CODE_INFO", response.data);
      });
  },
  async resetTradePwdNewApi({ commit }, payload) {
    await api
      .post("user/secret/reset", payload, { apiType: apiInfo.apiType.COMMON })
      .then((response) => {
        commit("RESET_TRADE_PWD_NEW_INFO", response.data);
      });
  },
  async unlockTradePwdApi({ commit }, payload) {
    await api
      .post("user/secret/send_unlock_verify_code", payload, {
        apiType: apiInfo.apiType.COMMON,
      })
      .then((response) => {
        commit("UNLOCK_TRADE_PWD_INFO", response.data);
      });
  },
  async unlockTradePwdCodeApi({ commit }, payload) {
    await api
      .post("user/secret/unlock", payload, { apiType: apiInfo.apiType.COMMON })
      .then((response) => {
        commit("UNLOCK_TRADE_PWD_CODE_INFO", response.data);
      });
  },
  async getUserInfoApi({ commit }) {
    await api
      .get("/user/info")
      .then((response) => {
        commit("SAVE_USER_INFO", response.data);
      });
  },
};

const mutations = {
  CHANGE_LOGIN_PWD_INFO(state, data) {
    state.changeLoginPwdData = data;
  },
  CHANGE_TRADE_PWD_INFO(state, data) {
    state.changeTradePwdData = data;
  },
  CHANGE_LOGIN_ID_INFO(state, data) {
    state.changeLoginIdData = data;
  },
  CHANGE_LOGIN_ID_CODE_INFO(state, data) {
    state.changeLoginIdCodeData = data;
  },
  UNLOCK_ACCOUNT_INFO(state, data) {
    state.unlockAccountData = data;
  },
  UNLOCK_ACCOUNT_CODE_INFO(state, data) {
    state.unlockAccountCodeData = data;
  },
  RESET_LOGIN_PWD_INFO(state, data) {
    state.resetLoginPassData = data;
  },
  RESET_LOGIN_PWD_CODE_INFO(state, data) {
    state.resetLoginPassCodeData = data;
  },
  RESET_LOGIN_PWD_SUBMIT_INFO(state, data) {
    state.resetLoginPassSubmitData = data;
  },
  RESET_TRADE_PWD_INFO(state, data) {
    state.resetTradePwdData = data;
  },
  RESET_TRADE_PWD_CODE_INFO(state, data) {
    state.resetTradePwdCodeData = data;
  },
  RESET_TRADE_PWD_NEW_INFO(state, data) {
    state.resetTradePwdNewData = data;
  },
  UNLOCK_TRADE_PWD_INFO(state, data) {
    state.unlockTradePwdData = data;
  },
  UNLOCK_TRADE_PWD_CODE_INFO(state, data) {
    state.unlockTradePwdCodeData = data;
  },
  SAVE_USER_INFO(state, data) {
    state.userInfo = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
