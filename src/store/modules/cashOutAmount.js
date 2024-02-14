import api from "@/assets/js/common/httpRequest";
import apiInfo from "@/const/apiInfo";

const state = {
  draw_amount: null,
  draw_confirm: null,
  execute_confirm: null,
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
};

const actions = {
  async getDrawAmount({ commit }, payload) {
    await api
      .get("withdraw", { payload, apiType: apiInfo.apiType.COMMON_FRONT })
      .then((response) => {
        commit("DATA_DRAW", response.data);
      });
  },
  async getConfirmAmount({ commit }, payload) {
    await api
      .post(
        "withdraw/confirm",
        { ...payload },
        { apiType: apiInfo.apiType.COMMON_FRONT }
      )
      .then((response) => {
        commit("DATA_CONFIRM", response.data);
      });
  },
  async executeConfirmAmount({ commit }, payload) {
    await api
      .post(
        "withdraw/execute",
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
