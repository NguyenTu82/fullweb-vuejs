import api from "@/assets/js/common/httpRequest";
import apiInfo from "@/const/apiInfo";

const state = {
  notices: null,
  noticeRead: null,
  noticeDetail: null,
};

const getters = {
  notices(state) {
    return state.notices;
  },

  noticeDetail(state) {
    return state.noticeDetail;
  },
};

const actions = {
  async getNotices({ commit }, payload) {
    await api
      .get("notices", {
        params: payload,
        apiType: apiInfo.apiType.COMMON_FRONT,
      })
      .then((response) => {
        commit("CHANGE_NOTICES", response.data);
      });
  },

  async readNotice({ commit }, payload) {
    await api
      .post("notice/read", payload, { apiType: apiInfo.apiType.COMMON_FRONT })
      .then((response) => {
        commit("CHANGE_NOTICE_READ", response.data);
      });
  },

  async noticeById({ commit }, payload) {
    await api
      .get(`notice/${payload["id"]}`, {
        params: payload,
        apiType: apiInfo.apiType.COMMON_FRONT,
      })
      .then((response) => {
        commit("CHANGE_NOTICE_DETAIL", response.data);
      });
  },
};

const mutations = {
  CHANGE_NOTICES(state, data) {
    state.notices = data;
  },

  CHANGE_NOTICE_READ(state, data) {
    state.noticeRead = data;
  },

  CHANGE_NOTICE_DETAIL(state, data) {
    state.noticeDetail = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
