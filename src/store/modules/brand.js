import api from "@/assets/js/common/httpRequest";
import apiInfo from "@/const/apiInfo";

const state = {
  // investdetail: null,
  brands: null,
  favorites: null,
};

const getters = {
  getDatabrands(state) {
    return state.brands.DATA.fund_info_list;
  },
  getDataSelects(state) {
    return state.brands.DATA.fund_type_list_all;
  },
  getDataFavorites(state) {
    return state.favorites.DATA;
  },
};

const actions = {
  async getBrandsData({ commit }, payload) {
    await api
      .post(
        "/hhd-it/it/StockInfoService/exec",
        {
          keyword: payload.keyword,
          dividend_cls: payload.devidend_cls,
          fund_type: payload.fund_type,
        },
        { apiType: apiInfo.apiType.IT_STOCK }
      )
      .then((response) => {
        commit("BRAND_LIST", response.data);
      });
  },
  async getListFavorites({ commit }, payload) {
    await api
      .post(
        "/hhd-it/it/GetFavoritesListController/exec",
        {
          keyword: payload.keyword,
          dividend_cls: payload.devidend_cls,
          fund_type: payload.fund_type,
        },
        { apiType: apiInfo.apiType.IT_STOCK }
      )
      .then((response) => {
        commit("FAVORITES_LIST", response.data);
      });
  },
};

const mutations = {
  BRAND_LIST(state, brands) {
    state.brands = brands;
  },
  FAVORITES_LIST(state, favorites) {
    state.favorites = favorites;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
