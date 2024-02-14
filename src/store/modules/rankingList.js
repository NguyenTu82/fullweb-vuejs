import api from "@/assets/js/common/httpRequest";
import apiInfo from "@/const/apiInfo";

const getters = {
  getDataRankingJpList(state) {
    return state.rankingJpList || [];
  },
  getDataRankingUsList(state) {
    return state.rankingUsList || [];
  },
  getDataRankingInvestmentList(state) {
    return state.rankingInvestmentList || [];
  },
};

const actions = {
  /**
   * 7-10-22 日本株ランキング一覧取得
   */
  async getRankingJpList({ commit }, payload) {
    await api
      .post("hhd-api/JPStock/RankingInfoController/exec", payload, {
        apiType: apiInfo.apiType.JP_STOCK,
      })
      .then((response) => {
        commit("SAVE_RANKING_JP_LIST", response.data);
      });
  },

  /**
   * 6-03-03 米国株ランキング一覧取得
   */
  async getRankingUsList({ commit }, payload) {
    await api
      .post(
        "hhd-api/JPStock/RankingInfoUsController/exec",
        { ...payload },
        { apiType: apiInfo.apiType.JP_STOCK }
      )
      .then((response) => {
        commit("SAVE_RANKING_US_LIST", response.data);
      });
  },

  /**
   * 7-40-16 投資信託ランキング一覧取得
   */
  async getRankingInvestmentList({ commit }, payload) {
    await api
      .post(
        "hhd-it/it/InvestmentTrustRankingInfoController/exec",
        { ...payload },
        { apiType: apiInfo.apiType.IT_STOCK }
      )
      .then((response) => {
        commit("SAVE_RANKING_INVESTMENT_LIST", response.data);
      });
  },
};

const mutations = {
  SAVE_RANKING_JP_LIST(state, data) {
    state.rankingJpList = data;
  },
  SAVE_RANKING_US_LIST(state, data) {
    state.rankingUsList = data;
  },
  SAVE_RANKING_INVESTMENT_LIST(state, data) {
    state.rankingInvestmentList = data;
  },
};

export default {
  getters,
  actions,
  mutations,
};
