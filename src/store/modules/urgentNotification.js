import api from "@/assets/js/common/httpRequest";
import apiInfo from "@/const/apiInfo";

const state = {
  // investdetail: null,
  urgent: null,
  urgentDetail: null,
};

const getters = {
  getDataurgent(state) {
    return state.urgent.DATA;
  },
  getDataurgentDetail(state) {
    return state.urgentDetail.DATA;
  },
};

const actions = {
  async getUgrentData({ commit }, payload) {
    await api
      .get("urgent_notice/list", {
        payload,
        apiType: apiInfo.apiType.COMMON_FRONT,
      })
      .then((response) => {
        commit("URGENT_LIST", response.data);
      });
  },
  async getUgrentDetailData({ commit }, payload) {
    await api
      .get("urgent_notice/detail", {
        params: payload,
        apiType: apiInfo.apiType.COMMON_FRONT,
      })
      .then((response) => {
        commit("URGENT_DETAIL", response.data);
      });
  },
};

const mutations = {
  URGENT_LIST(state, urgent) {
    state.urgent = urgent;
  },
  URGENT_DETAIL(state, urgent) {
    state.urgentDetail = urgent;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
