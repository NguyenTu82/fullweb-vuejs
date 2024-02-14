import pageInfoConst from "@/const/pageInfo";
import processEnvKey from "@/const/processEnvKey";

export default {
  namespaced: true,
  state: {
    isPreserve: false,
    currentPageInfo: {
      tittle: "",
      header: {
        type: pageInfoConst.HEADER_TYPE.NO_HEADER,
      },
      footer: {
        type: pageInfoConst.FOOTER_TYPE.NO_FOOTER,
      },
    },
    systemInfo: {
      processEnvInfo: {
        processEnv: {},
        // 環境変数初期化フラグ
        initFlag: false,
      },
      requestConst: {},
    },
    // WebSocketBadeUrl: '',
    WebSocketUS: "",
    WebSocketJP: "",
  },
  getters: {
    pageTittle(state, getter) {
      let branchDivision = getter.branchDivision;
      let pageTittleOfEnd = pageInfoConst.TITTLE_END[branchDivision];
      let tittle = state.currentPageInfo.tittle;

      if (!tittle) {
        tittle = pageTittleOfEnd;
      } else {
        tittle = `${tittle}｜${pageTittleOfEnd}`;
      }

      return tittle;
    },

    pageHeaderType(state) {
      return state.currentPageInfo.header.type;
    },

    pageFooterType(state) {
      return state.currentPageInfo.footer.type;
    },

    processEnv(state) {
      return state.systemInfo.processEnvInfo.processEnv;
    },

    branchDivision(state) {
      return state.systemInfo.processEnvInfo.processEnv[
        processEnvKey.BRANCH_DIVISION
      ];
    },
    getRequestConst(state) {
      return state.systemInfo.requestConst;
    },
  },
  mutations: {
    setPageTittle(state, val) {
      state.currentPageInfo.tittle = val;
    },
    setPageHeaderType(state, val) {
      state.currentPageInfo.header.type = val;
    },

    setPageFooterType(state, val) {
      state.currentPageInfo.footer.type = val;
    },
    initProcessEnv(state, val) {
      if (state.systemInfo.processEnvInfo.initFlag) {
        return;
      }

      state.systemInfo.processEnvInfo.processEnv = val;
      state.systemInfo.processEnvInfo.initFlag = true;
    },
    setRequestConst(state, payload) {
      state.systemInfo.requestConst = payload;
    },
    setWebSocketUS(state, WebSocketUS) {
      state.WebSocketUS = WebSocketUS;
    },
    setWebSocketJP(state, WebSocketJP) {
      state.WebSocketJP = WebSocketJP;
    },
    setOpenIsPreserve(state, value) {
      state.isPreserve = value;
    },
  },
  actions: {},
  modules: {},
};
