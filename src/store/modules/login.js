import api from "@/assets/js/common/httpRequest";
import apiInfo from "@/const/apiInfo";

const initialState = () => ({
  securityAccountNumberData: {},
  tradePwdData: {},
});

const state = initialState();

const getters = {
  dataSecurityAccountNumber(state) {
    return state.securityAccountNumberData;
  },
  dataTradePwd(state) {
    return state.tradePwdData;
  },
};

const actions = {
  async verifySecurityAccountNumberApi({ commit }, payload) {
    await api
      .post("verify/security_account_number", payload, {
        apiType: apiInfo.apiType.AUTH,
      })
      .then((response) => {
        commit("VERIFY_SECURITY_CODE_INFO", response.data);
      });
  },
  async inputTradePwdApi({ commit }, payload) {
    await api
      .post("user/secret", payload, { apiType: apiInfo.apiType.AUTH })
      .then((response) => {
        commit("INPUT_TRADE_PWD_INFO", response.data);
      });
  },
};

const mutations = {
  VERIFY_SECURITY_CODE_INFO(state, data) {
    state.securityAccountNumberData = data;
  },
  INPUT_TRADE_PWD_INFO(state, data) {
    state.tradePwdData = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
