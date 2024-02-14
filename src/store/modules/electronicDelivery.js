import api from "@/assets/js/common/httpRequest";

const state = {
  electronicData: null,
};

const getters = {
  electronic(state) {
    return state.electronicData;
  },
};

const actions = {
  async getListElectronic({ commit }, payload) {
    await api
      .get("electronic_delivery", { params: payload })
      .then((response) => {
        commit("CHANGE_ELECTRONIC", response.data);
      });
  },

  async readElectronic(_, payload) {
    return api.post("electronic_delivery/read", payload).then((response) => {
      return response.data;
    });
  },
};

const mutations = {
  CHANGE_ELECTRONIC(state, data) {
    state.electronicData = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
