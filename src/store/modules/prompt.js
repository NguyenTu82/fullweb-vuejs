const state = {
  maintenanceData: { maintenance_url: "", message: "", isNotMaintained: true },
  apiErrorMsgConfig: {
    isShow: false,
    text: "default message",
    type: "prompt",
    title: null,
    cancelBtn: null,
    okBtn: null,
    isDev: null,
    btnName: null,
    callBackRoute: null,
    imgSrc: "/assets/images/logo.svg",
    showImg: true,
  },
  popup: {
    isShow: false,
    text: "",
    btnName: "",
    title: "",
  },
};

const getters = {
  message(state) {
    return {
      text: state.popup.text,
      show: state.popup.isShow,
      btnName: state.popup.btnName,
      title: state.popup.title,
    };
  },
};

const mutations = {
  setMaintenanceData(state, payload) {
    state.maintenanceData = { ...payload };
  },
  editMsg(state, payload) {
    if (!payload.cancelBtn) {
      payload.cancelBtn = null;
    }
    if (!payload.okBtn) {
      payload.okBtn = null;
    }
    state.apiErrorMsgConfig = { ...state.apiErrorMsgConfig, ...payload };
  },

  hidePrompt(state) {
    state.apiErrorMsgConfig = {
      isShow: false,
      text: "default message",
      type: "prompt",
      title: null,
      cancelBtn: null,
      okBtn: null,
      isDev: null,
      btnName: null,
      callBackRoute: null,
      imgSrc: "/assets/images/logo.svg",
      showImg: true,
    };
  },
  showPopup(state, payload) {
    state.popup = {
      isShow: payload.isShow,
      text: payload.text,
      btnName: payload.btnName,
      title: payload.title,
    };
  },
};

export default {
  state,
  getters,
  mutations,
};
