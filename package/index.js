import api from "@/assets/js/common/httpRequest";
import commonJs from "@/assets/js/common/common";
import commonIndex from "@/assets/js/common/index";
import constant from "@/const/common";
import store from "@/store";
import router from "@/router";
import pageInfo from "@/const/pageInfo";
import apiInfo from "@/const/apiInfo";
import processEnvKey from "@/const/processEnvKey";

import realtime13 from "@/assets/js/page/payment/deposit/pages/realtime-13";
import refConditionIndex from "@/assets/js/page/reference/condition/index";

import pageLayout from "@/components/layout/pageLayout";
import CheerHeaderOfMember from "@/components/header/CheerHeaderOfMember.vue";
import DialogPwd from "@/views/settings/components/DialogPwd.vue";
import appLayout from "@/components/layout/appLayout";
import homeLayout from "@/components/layout/homeLayout";
import defaultLayout from "@/components/layout/defaultLayout";
import ExceptionError from "@/components/common/dialog/ExceptionError";
import ListInCard from "@/views/payment/deposit/components/listInCard";
import TopInfoItem from "@/views/payment/deposit/components/topInfoItem";

import TopInfo from "@/components/common/TopInfo";

import pageNotFound from "@/components/errorPage/PageNotFound";
import login from "@/views/login/login";
// import Home from "@/views/home/home";
import UnlockAccount from "@/views/unlockAccount";
import EmailCode from "@/views/unlockAccount/emailCode";
import BuyStockJP from "@/views/stockJP/buy";
import SellStockJP from "@/views/stockJP/sell";
import InvestBrandDetail from "@/views/transaction/investment/brand/detail";
import UsBrandDetail from "@/views/transaction/us/brand/detail";
import InvestStockBuyOrder from "@/views/transaction/investment/buy";
import InvestStockBuyOrderConfirm from "@/views/transaction/investment/buy/confirm";
import InvestStockBuyOrderCompleted from "@/views/transaction/investment/buy/complete";
import InvestStockSellOrder from "@/views/transaction/investment/sell";
import FavoriteBrandIt from "@/views/transaction/investment/brand/favoriteIt";
import MarketNews from "@/views/marketNews";
import Deposit from "@/views/payment/deposit/index";
import CashInContract3 from "@/views/payment/deposit/pages/realtime-13";
import RealTimeCashInPwd from "@/views/payment/deposit/pages/realTimeCashInPwd";
import Brand from "@/views/transaction/investment/brand/index";
import StockListUS from "@/views/transaction/us/brand/index";
import StockListJP from "@/views/transaction/jp/brand/index";
import FavoriteUS from "@/views/transaction/us/brand/favoriteUs";
import FavoriteJP from "@/views/transaction/jp/brand/favoriteJp";
import EditStockJP from "@/views/transaction/jp/brand/editJp";
import UsBuy from "@/views/transaction/us/buy/index";
import UsBuyConfirm from "@/views/transaction/us/buy/confirm";
import UsBuyResult from "@/views/transaction/us/buy/result";
import UsSell from "@/views/transaction/us/sell/index";
import UsSellConfirm from "@/views/transaction/us/sell/confirm";
import UsSellResult from "@/views/transaction/us/sell/result";
import BankAccountRegist from "@/views/payment/deposit/pages/realtime-2";
import MarketNewsDetail from "@/views/marketNews/pages/marketNewsDetail";
import orderSuccess from "@/views/stockJP/components/orderSuccess";
import confirmOrderTentou from "@/views/stockJP/components/confirm/confirmTentou";
import confirmOrderItaku from "@/views/stockJP/components/confirm/confirmItaku";
import Notice from "@/views/notice/index";
import NoticeDetail from "@/views/notice/pages/NoticeDetail";
import correctionOrder from "@/views/stockJP/correction/correctionOrder";
import PaymentWithdrawal from "@/views/payment/withdrawal/index";
import WithdrawalConfirm from "@/views/payment/withdrawal/components/confirm";
import WithdrawalHistory from "@/views/payment/history/index";
import CancelWithdrawal from "@/views/payment/history/components/cancel";
import DonelWithdrawal from "@/views/payment/history/components/done";
import UserSetting from "@/views/settings/user";
import LoginPassChange from "@/views/settings/user/changeLoginPwd";
import TradePassChange from "@/views/settings/user/changeTradePwd";
import LoginIdChange from "@/views/settings/user/changeLoginId";
import LoginIdChangeCode from "@/views/settings/user/changeLoginId/changeLoginCode";
import TradePassReset from "@/views/settings/user/resetTradePwd";
import TradePassResetCode from "@/views/settings/user/resetTradePwd/resetTradePwdCode";
import TradePassResetNew from "@/views/settings/user/resetTradePwd/resetTradePwdNew";
import TradePassUnlock from "@/views/settings/user/unlockTradePwd";
import TradePassUnlockCode from "@/views/settings/user/unlockTradePwd/unlockTradePwdCode";
import urgentNotiDetail from "@/components/common/urgentDetail";
import SettingDocuments from "@/views/settings/documents/index";
import SettingDoc from "@/views/settings/documents/doc";
import ConsignmentTransactions from "@/views/transaction/jp/brand/pages/consignmentTransactions";
import OverCounterTransactions from "@/views/transaction/jp/brand/pages/overTheCounterTransactions";
import SettingUserLogout from "@/views/settings/user/logout/index";
import ResetLoginPwd from "@/views/resetLoginPassword/index";
import ResetLoginPwdCode from "@/views/resetLoginPassword/emailCode";
import ResetLoginPwdInput from "@/views/resetLoginPassword/setPwd";
import ResetLoginPwdComplete from "@/views/resetLoginPassword/setPwdSuccess";
import ElectronicDelivery from "@/views/electronicDelivery";
import RankingJp from "@/views/ranking/jp/index";
import RankingUs from "@/views/ranking/us/index";
import RankingInvestment from "@/views/ranking/investment/index";
import RankingJpDetail from "@/views/ranking/jp/rankingJpDetail";
import RankingUsDetail from "@/views/ranking/us/rankingUsDetail";
import RankingInvestmentDetail from "@/views/ranking/investment/rankingInvestmentDetail";
import RankingJpReference from "@/views/ranking/jp/rankingJpReference";
import RankingUsReference from "@/views/ranking/us/rankingUsReference";
import RankingInvestmentReference from "@/views/ranking/investment/rankingInvestmentReference";
import MarketCondition from "@/views/marketNews/pages/marketCondition";
import MarketConditionInfo from "@/views/marketNews/pages/marketConditionInfo";
import InvestStockSellOrderConfirm from "@/views/transaction/investment/sell/confirm";
import Maintenance from "@/views/maintenance/index.vue";
import buyOrderCancel from "@/views/stockJP/components/buyOrderCancel";
import buyReserveCancel from "@/views/stockJP/components/buyReserveCancel";
import sellOrderCancel from "@/views/stockJP/components/sellOrderCancel";
import sellReserveCancel from "@/views/stockJP/components/sellReserveCancel";


const components = [
  pageLayout,
  homeLayout,
  appLayout,
  defaultLayout,
  // Common Components
  TopInfo,
  ExceptionError,
  // Components
  pageNotFound,
  MarketConditionInfo,
  Maintenance,
  TradePassResetCode,
  TradePassResetNew,
  TradePassUnlockCode,
  MarketCondition,
  login,
  // Home ,
  UnlockAccount,
  EmailCode,
  BuyStockJP,
  SellStockJP,
  InvestBrandDetail,
  UsBrandDetail,
  InvestStockBuyOrder,
  InvestStockBuyOrderConfirm,
  InvestStockBuyOrderCompleted,
  InvestStockSellOrder,
  FavoriteBrandIt,
  MarketNews,
  Deposit,
  CashInContract3,
  RealTimeCashInPwd,
  Brand,
  StockListUS,
  StockListJP,
  FavoriteUS,
  FavoriteJP,
  EditStockJP,
  UsBuy,
  UsBuyConfirm,
  UsBuyResult,
  UsSell,
  UsSellConfirm,
  UsSellResult,
  BankAccountRegist,
  MarketNewsDetail,
  orderSuccess,
  confirmOrderTentou,
  confirmOrderItaku,
  Notice,
  NoticeDetail,
  correctionOrder,
  PaymentWithdrawal,
  WithdrawalConfirm,
  WithdrawalHistory,
  CancelWithdrawal,
  DonelWithdrawal,
  UserSetting,
  LoginPassChange,
  TradePassChange,
  LoginIdChange,
  LoginIdChangeCode,
  TradePassReset,
  TradePassUnlock,
  urgentNotiDetail,
  SettingDocuments,
  SettingDoc,
  ConsignmentTransactions,
  OverCounterTransactions,
  SettingUserLogout,
  ResetLoginPwd,
  ResetLoginPwdCode,
  ResetLoginPwdInput,
  ResetLoginPwdComplete,
  ElectronicDelivery,
  RankingJp,
  RankingUs,
  RankingInvestment,
  RankingJpDetail,
  RankingUsDetail,
  RankingInvestmentDetail,
  RankingJpReference,
  RankingUsReference,
  RankingInvestmentReference,
  InvestStockSellOrderConfirm,
  CheerHeaderOfMember,
  DialogPwd,
  buyOrderCancel,
  buyReserveCancel,
  sellOrderCancel,
  sellReserveCancel,
  ListInCard,
  TopInfoItem,
];

const install = function (Vue) {
  if (install.installed) return;

  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  // login,
  // homeIndex,
  store,
  router,
  api,
  commonJs,
  commonIndex,
  constant,
  pageInfo,
  apiInfo,
  processEnvKey,
  realtime13,
  refConditionIndex,
};
