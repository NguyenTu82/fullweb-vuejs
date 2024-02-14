import api from "@/assets/js/common/httpRequest";
import constant from "@/const/common";
import apiInfo from "@/const/apiInfo";

const state = {
  listStockIt: [],
  stepEditFavoriteIt: 0,
  listStockLikeIt: [],
  selectedAddFavorite: [],
  selectedDeleteFavorite: [],
  listStockNotFavorite: [],
  perPage: constant.DEFAULT_PER_PAGE,
  showModalConfirm: false,
  keyword: "",
  devidend_cls: "",
  fund_type: "",
};

const getters = {
  getListStockIt(state) {
    return state.listStockIt;
  },
  getStepEditFavoriteIt(state) {
    return state.stepEditFavoriteIt;
  },
  getListStockLikeIt(state) {
    return state.listStockLikeIt;
  },
  getShowModalConfirm(state) {
    return state.showModalConfirm;
  },
  getSelectedDeleteFavorite(state) {
    return state.selectedDeleteFavorite;
  },
  getListStockNotFavorite(state) {
    return state.listStockNotFavorite;
  },
  getKeyWord(state) {
    return state.keyword;
  },
  getDevidendCls(state) {
    return state.devidend_cls;
  },
  getFundType(state) {
    return state.fund_type;
  },
};

const actions = {
  listStockFavoriteIt({ commit, dispatch }, payload) {
    api
      .post(
        "/hhd-it/it/GetFavoritesListController/exec",
        {
          favorite_cls: payload.favorite_cls || "1",
        },
        { apiType: apiInfo.apiType.IT_STOCK }
      )
      .then((response) => {
        if (response.data.STATUS === "OK") {
          commit(
            "SET_LIST_STOCK_LIKE_IT",
            response.data.DATA.favorite_list || []
          );
          dispatch("getBrandNotFavoritesJp");
        } else {
          commit("SET_LIST_STOCK_LIKE_IT", []);
          dispatch("getBrandNotFavoritesJp");
        }
      });
  },
  getBrandsData({ commit, dispatch }, payload) {
    api
      .post(
        "/hhd-it/it/StockInfoService/exec",
        {
          keyword: payload.keyword,
          devidend_cls: payload.devidend_cls,
          fund_type: payload.fund_type,
        },
        { apiType: apiInfo.apiType.IT_STOCK }
      )
      .then((response) => {
        if (response.data.STATUS === "OK") {
          commit("SET_LIST_STOCK_IT", response.data.DATA.fund_info_list || []);
          dispatch("getBrandNotFavoritesJp");
        } else {
          commit("SET_LIST_STOCK_IT", []);
          dispatch("getBrandNotFavoritesJp");
        }
        return response.data.DATA.fund_info_list || [];
      })
      .catch(() => {
        return [];
      });
  },
  updateFavoriteIt({ dispatch }, payload) {
    api
      .post(
        "/hhd-it/it/AddFavoriteController/exec",
        {
          favorite_list: payload.favorite_list,
        },
        { apiType: apiInfo.apiType.IT_STOCK }
      )
      .then((res) => {
        res.data.ERROR.CODE && dispatch("listStockFavoriteIt");
      });
  },
  toggleModalConfirm({ state }) {
    state.showModalConfirm = !state.showModalConfirm;
  },
  getBrandNotFavoritesJp({ state, commit }) {
    if (state.listStockIt && state.listStockLikeIt) {
      let arr = state.listStockIt.filter((item) => {
        return !state.listStockLikeIt.find(
          (data) =>
            data.inv_trust_assoc_cd === item.inv_trust_assoc_cd &&
            data.inv_trust_assoc_cd === item.inv_trust_assoc_cd
        );
      });
      commit("SET_LIST_STOCK_NOT_FAVORITE", arr);
    }
  },
};

const mutations = {
  SET_LIST_STOCK_IT(state, data) {
    state.listStockIt = data;
  },
  SET_STEP_FAVORITE_IT(state, data) {
    state.stepEditFavoriteIt = data;
  },
  SET_LIST_STOCK_LIKE_IT(state, data) {
    state.listStockLikeIt = data;
  },
  SET_SELECTED_DELETE_FAVORITE(state, data) {
    state.selectedDeleteFavorite = data;
  },
  SET_LIST_STOCK_NOT_FAVORITE(state, data) {
    state.listStockNotFavorite = data;
  },
  SET_SELECTED_ADD_FAVORITE(state, data) {
    state.selectedAddFavorite = data;
  },
  SET_KEYWORD(state, data) {
    state.keyword = data;
  },
  SET_DEVIDENCE_CLS(state, data) {
    state.devidend_cls = data;
  },
  SET_FUND_TYPE(state, data) {
    state.fund_type = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
