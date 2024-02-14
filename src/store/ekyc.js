export default {
  namespaced: true,
  state: {
    isShow:false,
    qrLink:"",
  },
  getters: {
    getShowFlg(state) {
      return state.isShow;
    },
    getQrLink(state) {
      return state.qrLink;
    },
  },
  mutations: {
    setShowFlg(state,val) {
      state.isShow = val;
    },
    setQrLink(state,val) {
      state.qrLink = val;
    },
  },
  actions: {},
};
