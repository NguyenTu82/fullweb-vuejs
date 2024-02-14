import api from "@/assets/js/common/httpRequest";
import apiInfo from "@/const/apiInfo";

const state = {
  transactionUsBrandDetail: null,
  requestConst: {},
};

const getters = {
  getTransactionUsBrandDetail(state) {
    return state.transactionUsBrandDetail;
  },
};

const actions = {
  async getTransactionUsBrandDetail({ commit }, payload) {
    await api
      .get(`stock/${payload.brandID}/detail/`, {
        parrams: payload,
        apiType: apiInfo.apiType.STOCK_FRONT,
      })
      .then((response) => {
        commit("CHANGE_TRANSACTION_US_BRANF_DETAIL", response.data);
      });
  },
};

const mutations = {
  CHANGE_TRANSACTION_US_BRANF_DETAIL(state, transactionUsBrandDetail) {
    state.transactionUsBrandDetail = transactionUsBrandDetail;
  },
  setRequestConst(state, payload) {
    state.requestConst = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
