import common from "./commonStore";
import auth from "./modules/auth";
import prompt from "./modules/prompt";
import investment from "./modules/investment";
import transaction from "./modules/transaction";
import transactionUs from "./modules/transactionUs";
import market from "./modules/market";
import brand from "./modules/brand";
import notice from "./modules/notice";
import cashInData from "./modules/cashInData";
import stocklistus from "./modules/stocklistus";
import stockListJp from "./modules/stockListJp";
import cashOutAmount from "./modules/cashOutAmount";
import cashOutAmountNCB from "./modules/cashOutAmountNCB";
import paymentHistory from "./modules/history";
import buyStockJP from "./modules/buyStockJP";
import userSetting from "./modules/userSetting";
import urgen from "./modules/urgentNotification";
import document from "./modules/document";
import stockListIt from "./modules/stockListIt";
import home from "./modules/home";
import detailUS from "./modules/conditionDetail";
import stockDetailJP from "./modules/stockDetailJP";
import deposit from "./modules/deposit";
import electronicDelivery from "./modules/electronicDelivery";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import sellInvestment from "./modules/sellInvestment";
import rankingList from "./modules/rankingList";
import login from "./modules/login";
import ekyc from "./ekyc";

export default new Vuex.Store({
  modules: {
    common,
    prompt,
    auth,
    investment,
    transaction,
    transactionUs,
    market,
    brand,
    notice,
    cashInData,
    stocklistus,
    cashOutAmount,
    cashOutAmountNCB,
    paymentHistory,
    buyStockJP,
    urgen,
    document,
    detailUS,
    stockDetailJP,
    stockListJp,
    userSetting,
    home,
    deposit,
    electronicDelivery,
    stockListIt,
    sellInvestment,
    rankingList,
    login,
    ekyc
  },
  plugins: [createPersistedState()],
});
