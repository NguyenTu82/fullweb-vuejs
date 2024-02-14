import api from "@/assets/js/common/httpRequest";
import commonJs from "@/assets/js/common/common";
import apiInfo from "@/const/apiInfo";

const state = {
  draw_history: null,
  cancel_cashout: null,
  cashInOutState: {
    goToCashInOutList: 0,
    showExecuteBlock: false,
    fromDate: "",
    toDate: "",
    defaultCondition: { key: 9, value: "すべて" },
    condition: {
      chosen: 9,
      list: [
        { key: 0, value: "手続中" },
        { key: 1, value: "完了" },
        { key: 2, value: "失効" },
        { key: 3, value: "処理中" },
        { key: 4, value: "取消" },
        { key: 9, value: "すべて" },
      ],
    },
    list: [
      // {
      //     "SCHEDULE_SEQ_NO": "100003",
      //     "CASH_IO_TYPE": "2",
      //     "TOTAL_AMOUNT": "10000",
      //     "FEE_WITH_TAX_FOR_DISPLAY": "110",
      //     "REQUEST_DT": "2020-12-01",
      //     "SCHEDULE_DT": "2020-12-02",
      //     "EXECUTE_DT": "2020-12-02",
      //     "EXECUTE_FLG": "1"
      // }
    ],
  },
};

const getters = {
  getDataDrawHistory(state) {
    return state.draw_history;
  },
  getDataListHistory(state) {
    return state.cashInOutState.list;
  },
  getCancelCashout(state) {
    return state.cancel_cashout;
  },
};

const actions = {
  async getDrawHistory({ commit }, payload) {
    let { max } = payload;
    let params = {
      START_D: payload.fromDate
        ? commonJs.dateFormatter(payload.fromDate)
        : undefined,
      END_D: payload.toDate
        ? commonJs.dateFormatter(payload.toDate)
        : undefined,
      MAX_SCHEDULE_SEQ_NO: max ? payload.scheduleSeqNo : undefined,
      EXECUTE_FLG: payload.EXECUTE_FLG,
      apiType: apiInfo.apiType.COMMON_FRONT,
    };
    commit("showCancelExecuteBlock", false);
    return await api.get("payment/activities", { params }).then((res) => {
      if (res && res.data && res.data.ERROR === null) {
        let data = res.data.DATA;
        if (max) {
          state.cashInOutState.list = state.cashInOutState.list.concat(data);
        } else {
          state.cashInOutState.list = data;
        }
      }
      return state.cashInOutState.list;
    });
  },
  async cancelCashOut({ commit }, payload) {
    await api.post("withdraw/cancel", payload).then((response) => {
      commit("CANCEL_CASHOUT", response.data);
    });
  },
};

const mutations = {
  DATA_HISTORY(state, dataHistory) {
    state.draw_history = dataHistory;
  },
  showCancelExecuteBlock(state, payload) {
    state.cashInOutState.showExecuteBlock = payload;
    state.password = "";
  },
  CANCEL_CASHOUT(state, cancel) {
    state.cancel_cashout = cancel;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
