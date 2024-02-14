import api from "@/assets/js/common/httpRequest";
// import constant from "@/const/common";
import apiInfo from "@/const/apiInfo";

const state = {
  brandjplist: [],
  brandFavoritesJpList: [],
  brandNotFavoritesJp: [],
  typeTransaction: 2,
  stepEditFavoriteJp: 0, // 0: screen edit favorites , 1: add to favorites, 2: remove from favorites
  textSearch: "",
};

const getters = {
  getDataBrandJPList(state) {
    return state.brandjplist || [];
  },
  getBrandFavoritesJpList(state) {
    return state.brandFavoritesJpList;
  },
  getTypeTransaction(state) {
    return state.typeTransaction;
  },
  getStepEditFavoriteJp(state) {
    return state.stepEditFavoriteJp;
  },
  getBrandNotFavoritesJp(state) {
    return state.brandNotFavoritesJp;
  },
  getTextSearch(state) {
    return state.textSearch;
  },
};

const actions = {
  //7-10-03
  async getStockListBrandJP({ commit, dispatch }, payload) {
    const res = await api.post(
      "hhd-api/JPStock/SearchStockInfoController/exec",
      {
        ...payload,
      },
      {
        apiType: apiInfo.apiType.JP_STOCK,
      }
    );
    if (res.data.DATA) {
      commit("CHANGE_BRAND_JP_LIST", res.data.DATA || []);
      dispatch("getBrandNotFavoritesJp");
    }
    return res.data.DATA?.lst_search_stock_info || [];
  },
  // 7-10-01
  getStockListFavoriteJP({ commit, dispatch }, payload) {
    api
      .post(
        "hhd-api/JPStock/ClientStockInfoController/exec",
        {
          ...payload,
          stock_group_cd: "1",
        },
        {
          apiType: apiInfo.apiType.JP_STOCK,
        }
      )
      .then((res) => {
        if (res.data.DATA) {
          commit(
            "SET_BRAND_FAVORITE_JP_LIST",
            res.data.DATA.lst_client_stock_info || []
          );
          dispatch("getBrandNotFavoritesJp");
        }
      });
  },
  // 7-10-02
  async getStockEditFavoriteJP({ state }, payload) {
    try {
      const res = await api.post(
        "hhd-api/JPStock/ClientStockRegisterController/exec",
        {
          ...payload,
          otc_consign_cls: state.typeTransaction,
          stock_group_cd: "1",
        },
        {
          apiType: apiInfo.apiType.JP_STOCK,
        }
      );
      return res.data;
    } catch (e) {
      return [];
    }
  },
  getBrandNotFavoritesJp({ state, commit }) {
    if (state.brandjplist && state.brandFavoritesJpList) {
      let arr = state.brandjplist.filter((item) => {
        return !state.brandFavoritesJpList.find(
          (data) =>
            data.stock_cd == item.stock_cd && data.stock_nm == item.stock_nm
        );
      });
      commit("SET_BRAND_NOT_FAVORITE_JP", arr);
    }
  },
};

const mutations = {
  CHANGE_BRAND_JP_LIST(state, data) {
    state.brandjplist = data.lst_search_stock_info;
  },
  SET_BRAND_FAVORITE_JP_LIST(state, data) {
    state.brandFavoritesJpList = data;
  },
  SET_TYPE_TRANSACTION(state, data) {
    state.typeTransaction = data;
  },
  SET_STEP_EDIT_FAVORITE_JP(state, data) {
    state.stepEditFavoriteJp = data;
  },
  SET_BRAND_NOT_FAVORITE_JP(state, data) {
    state.brandNotFavoritesJp = data;
  },
  SET_GET_TEXT_SEARCH(state, data) {
    state.textSearch = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
