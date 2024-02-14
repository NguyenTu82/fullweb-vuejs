import api from "@/assets/js/common/httpRequest";
import commonJs from "@/assets/js/common/common";
import router from "@/router";
import apiInfo from "@/const/apiInfo";

const state = {
  user: null,
  access_token: null,
  VUE_APP_xDu: null,
  maintenance: {},
};

const getters = {
  isAuthenticated: (state) => !!state.access_token,
  currentUser: (state) => state.user,
  persistData: (state) => {
    let data = {};
    if (state.access_token) {
      data["Authorization"] = "Bearer " + state.access_token;
    }

    if (state.VUE_APP_xDu) {
      data["X-DU"] = state.VUE_APP_xDu;
    }

    return data;
  },
  WebSocketBadeUrl() {
    return (
      process.env.VUE_APP_SOCKET_US ||
      "http://dev-ws-netsec30.crudist.tech:9001/"
    );
  },
  MaintenanceData(state) {
    return state.maintenance;
  },
};

const actions = {
  async LogIn({ commit }, requestBody) {
    await api
      .post("/user/login", requestBody, { apiType: apiInfo.apiType.PASSPORT })
      .then((response) => {
        commit("setUser", response.data);
      });
  },
  async LogOut({ commit }) {
    commit("logout");
    router.push({ name: "Login" });
  },
  async Maintenance({ commit }, payload) {
    commit("logout");
    commit("maintenance", payload);
    window.location.href = "/maintenance";
  },
};

const mutations = {
  //set user information
  setUser(state, user) {
    state.user = user;
    if (user.STATUS == "OK") {
      let accessTokenKey = commonJs.getAccessTokenKey();
      state.access_token = user.DATA.ACCESS_TOKEN;

      localStorage.setItem(accessTokenKey, user.DATA.ACCESS_TOKEN);
      state.VUE_APP_xDu = user.DATA.FORCE_UPDATE_DEVICE_UUID;
      localStorage.setItem("VUE_APP_xDu", user.DATA.FORCE_UPDATE_DEVICE_UUID);
      localStorage.setItem("USER_RANK", user.DATA.USER.RANK);
    }
  },

  //clean user information
  logout(state) {
    state.user = null;
    state.access_token = null;
    state.VUE_APP_xDu = null;

    // 自動ログイン情報を退避する
    let autoLoginInfoKeys = ["auto_login", "user_id", "user_pwd", "save_login_pass", "save_login_id"];
    let autoLoginInfo = {};
    autoLoginInfoKeys.forEach((key) => {
      autoLoginInfo[key] = commonJs.getDataBySecureLS(key);
    });

    commonJs.removeAllLocalData();
    commonJs.removeAllDataBySecureLS();

    // 自動ログイン情報を戻す
    Object.keys(autoLoginInfo).forEach((key) => {
      let value = autoLoginInfo[key];
      if (value) {
        commonJs.saveDataBySecureLS(key, value);
      }
    });
  },

  maintenance(state, payload) {
    state.maintenance = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
