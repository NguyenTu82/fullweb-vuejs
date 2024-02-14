import api from "@/assets/js/common/httpRequest";
import constant from "@/const/common";
import apiInfo from "@/const/apiInfo";

const initialState = () => ({
  showModal: false,
  isReset: false,
  stepEditFavorite: 0,
  listStockUs: [],
  listStockLikeUs: [],
  listStockNotLikeUs: [],
  selectedAddFavorite: [],
  selectedDeleteFavorite: [],
  listIdsLike: [],
  apiType: apiInfo.apiType.IT_STOCK,
  keyWord: "",
  keyWordAdd: "",
  countryId: "",
  marketType: "",
  etfFlag: "",
  perPage: constant.DEFAULT_PER_PAGE,
  showModalConfirm: false,
  isConfirmFilter: false,
});

const state = initialState();

const getters = {
  getShowModel(state) {
    return state.showModal;
  },
  getListStockUs(state) {
    return state.listStockUs;
  },
  getKeyword(state) {
    return state.keyWord;
  },
  getKeywordAdd(state) {
    return state.keyWordAdd;
  },
  getMarketType(state) {
    return state.marketType;
  },
  getEtfFlag(state) {
    return state.etfFlag;
  },
  getStepEditFavorite(state) {
    return state.stepEditFavorite;
  },
  getSelectedDeleteFavorite(state) {
    return state.selectedDeleteFavorite;
  },
  getListIdsLike(state) {
    return state.listIdsLike;
  },
  getShowModalConfirm(state) {
    return state.showModalConfirm;
  },
  getStockLikeUs(state) {
    return state.listStockLikeUs;
  },
  getListStockNotFavorite(state) {
    return state.listStockNotFavorite;
  },
  getSelectedAddFavorite(state) {
    return state.selectedAddFavorite;
  },
  getIsConfirmFilter(state) {
    return state.isConfirmFilter;
  },
};

const actions = {
  reset({ commit }) {
    commit("RESET");
  },
  toggleModalFillter({ state }) {
    state.showModal = !state.showModal;
  },
  toggleModalConfirm({ state }) {
    state.showModalConfirm = !state.showModalConfirm;
  },
  async stockListUs({ state, commit }, payload) {
    let data;
    if (payload.typePage !== "ADD") {
      data = {
        KEYWORD: state.keyWord,
        MARKET_TYPE: state.marketType,
        ETF_FLG: state.etfFlag,
      };
    } else {
      data = {
        KEYWORD: state.keyWordAdd,
      };
    }
    try {
      const res = await api.get("/stocks/search_usa", {
        params: {
          ...data,
          COUNTRY_ID: state.countryId,
          NOT_EXISTS_LIKES: payload.notExistsLikes || "0",
          PAGE: payload.page,
          PERPAGE: state.perPage,
        },
        apiType: apiInfo.apiType.STOCK_FRONT,
      });
      if (res.status === 200 && res.data.DATA) {
        const data = res.data.DATA || [];
        payload.type
          ? commit("APPEND_LISTS_US", data)
          : commit("SET_LISTS_US", data);
      }
      return res.data || [];
    } catch (e) {
      return [];
    }
  },
  async stockLikeUs({ state, commit }, payload) {
    try {
      const res = await api.get("/stocks/likes", {
        params: {
          COUNTRY_ID: "",
          PAGE: payload.page,
          PERPAGE: state.perPage,
        },
        apiType: apiInfo.apiType.STOCK_FRONT,
      });
      if (res.status === 200 && res.data.DATA) {
        const data = res.data.DATA;
        res.data.DATA[0] && commit("SET_IDS_LIKE", data);
        commit("SET_STOCK_LIKE_US", data);
      }
      return res.data;
    } catch (e) {
      return [];
    }
  },
  async stockLikeEdit({ state }, payload) {
    try {
      return await api.post(
        "/stocks/likes/edit",
        {
          BRAND_IDS: payload.ids || state.listIdsLike.join(","),
        },
        {
          apiType: apiInfo.apiType.STOCK_FRONT,
        }
      );
    } catch (e) {
      return [];
    }
  },
};

const mutations = {
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
  SET_LISTS_US(state, data) {
    state.listStockUs = data;
  },
  APPEND_LISTS_US(state, data) {
    state.listStockUs = [...state.listStockUs, ...data];
  },
  SET_TEXT_SEARCH(state, data) {
    state.keyWord = data;
  },
  SET_KEYWORDS_ADD(state, data) {
    state.keyWordAdd = data;
  },
  SET_MARKET_TYPE(state, data) {
    state.marketType = data;
  },
  SET_ETF_FLAG(state, data) {
    state.etfFlag = data;
  },
  SET_SHOW_MODAL(state, data) {
    state.showModal = data;
  },
  SET_STEP_EDIT_FAVORITE(state, data) {
    state.stepEditFavorite = data;
  },
  SET_SELECTED_ADD_FAVORITE(state, data) {
    state.selectedAddFavorite = data;
  },
  SET_SELECTED_DELETE_FAVORITE(state, data) {
    state.selectedDeleteFavorite = data;
  },
  SET_IDS_LIKE(state, data) {
    const ids = data.map((item) => item.BRAND_ID);
    state.listIdsLike = ids;
  },
  SET_STOCK_LIKE_US(state, data) {
    state.listStockLikeUs = data;
  },
  SET_IS_CONFIRM_FILTER(state, data) {
    state.isConfirmFilter = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
