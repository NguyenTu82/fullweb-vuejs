import api from "@/assets/js/common/httpRequest";
import apiInfo from "@/const/apiInfo";

const state = {
  draw_amount: null,
  draw_confirm: null,
  execute_confirm: null,
  isWithdrawPage: null,
};

const getters = {
  getDataDrawAmount(state) {
    return state.draw_amount;
  },
  getDrawConfirm(state) {
    return state.draw_confirm;
  },
  getExecConfirm(state) {
    return state.execute_confirm;
  },
  getIsWithdrawPage(state) {
    return state.isWithdrawPage;
  },
};

const actions = {
  // 7-81-01_リアルタイム出金依頼取得
  async getDrawAmount({ commit }, payload) {
    await api
      .get("payment/realtime/withdrawInfo", {
        payload,
        apiType: apiInfo.apiType.COMMON_FRONT,
      })
      .then((response) => {
        commit("DATA_DRAW", response.data);
      });
  },
  // 7-81-02_リアルタイム出金依頼確認
  async getConfirmAmount({ commit }, payload) {
    await api
      .post(
        "payment/realtime/withdrawConfirm",
        { ...payload },
        { apiType: apiInfo.apiType.COMMON_FRONT }
      )
      .then((response) => {
        commit("DATA_CONFIRM", response.data);
      });
  },
  // 7-81-03_リアルタイム出金依頼実行
  async executeConfirmAmount({ commit }, payload) {
    await api
      .post(
        "payment/realtime/withdrawAccepted",
        { ...payload },
        { apiType: apiInfo.apiType.COMMON_FRONT }
      )
      .then((response) => {
        commit("EXEC_CONFIRM", response.data);
      });
  },
};

const mutations = {
  DATA_DRAW(state, dataDraw) {
    state.draw_amount = dataDraw;
  },
  DATA_CONFIRM(state, dataConfirm) {
    state.draw_confirm = dataConfirm;
  },
  EXEC_CONFIRM(state, dataExec) {
    state.execute_confirm = dataExec;
  },
  SET_IS_WITHDRAW_PAGE(state, data) {
    state.isWithdrawPage = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
