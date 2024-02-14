import {createRouter, createWebHistory} from "vue-router";
import store from "@/store/index";
import login from "@/views/login/login";
import InputSecurityAccountNumber from "@/views/login/securityAccountNumber";
import TradePwd from "@/views/login/tradePwd";
import Home from "@/views/home/home";
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
import CashInContract4 from "@/views/payment/deposit/pages/realtime-14";
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
import buyOrderCancel from "@/views/stockJP/components/buyOrderCancel";
import buyReserveCancel from "@/views/stockJP/components/buyReserveCancel";
import sellOrderCancel from "@/views/stockJP/components/sellOrderCancel";
import sellReserveCancel from "@/views/stockJP/components/sellReserveCancel";
import confirmTentou from "@/views/stockJP/components/confirm/confirmTentou";
import confirmItaku from "@/views/stockJP/components/confirm/confirmItaku";
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
import InvestStockSellOrderComplete from "@/views/transaction/investment/sell/complete";
import Maintenance from "@/views/maintenance/index.vue";
import pageNotFound from "@/components/errorPage/PageNotFound";
import eKYC from "@/views/settings/account/eKYC";
import settings from "@/views/settings/index";
import account from "@/views/settings/account/index";
import bank from "@/views/settings/account/Bank";
import address from "@/views/settings/account/Address";
import company from "@/views/settings/account/Company";
import confirm from "@/views/settings/account/Confirm";
import confirm2 from "@/views/settings/account/Confirm2";
import done from "@/views/settings/account/Done";
import done2 from "@/views/settings/account/Done2";
import experience from "@/views/settings/account/Experience";
import income from "@/views/settings/account/Income";
import mail from "@/views/settings/account/Mail";
import name1 from "@/views/settings/account/Name";
import occupation from "@/views/settings/account/Occupation";
import phone from "@/views/settings/account/Phone";
import property from "@/views/settings/account/Property";
import purpose from "@/views/settings/account/Purpose";
import type1 from "@/views/settings/account/Type";
import condition from "@/views/reference/condition/Index";
import conditionJp from "@/views/reference/condition/conditionJp";
import conditionUs from "@/views/reference/condition/conditionUs";
import conditionInvest from "@/views/reference/condition/conditionInvest";
import trend from "@/views/reference/condition/trend";
import trendDetail from "@/views/reference/condition/trendDetail";
import orderJp from "@/views/reference/order/orderJp";
import orderUs from "@/views/reference/order/orderUs";
import orderInvest from "@/views/reference/order/orderInvest";
import contractJp from "@/views/reference/contract/contractJp";
import contractUs from "@/views/reference/contract/contractUs";
import contractInvest from "@/views/reference/contract/contractInvest";
import orderJpDetail from "@/views/reference/order/orderJpDetail";
import orderUsDetail from "@/views/reference/order/orderUsDetail";
import orderInvestDetail from "@/views/reference/order/orderInvestDetail";
import deposit from "@/views/reference/deposit/index";
import contractJpDetail from "@/views/reference/contract/contractJpDetail";
import contractUsDetail from "@/views/reference/contract/contractUsDetail";
import contractInvestDetail from "@/views/reference/contract/contractInvestDetail";
import commonJs from "@/assets/js/common/common";
import EkycOver from "@/views/ekycOver/EkycOver";
import processEnvKey from "@/const/processEnvKey";

const routes = [
  {
    path: "/",
    name: "Login",
    component: login,
    meta: {
      title: "ログイン",
    },
  },
  {
    path: "/security-account-number",
    name: "InputSecurityAccountNumber",
    component: InputSecurityAccountNumber,
    meta: {
      title: "証券口座番号の入力",
    },
  },
  {
    path: "/trade-pwd",
    name: "TradePwd",
    component: TradePwd,
    meta: {
      title: "取引暗証番号の設定",
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "ホーム",
    },
  },
  {
    path: "/unlockaccount",
    name: "UnlockAccount",
    component: UnlockAccount,
    meta: {
      title: "アカウントロック解除申請",
    },
  },
  {
    path: "/unlockaccount/emailcode",
    name: "EmailCode",
    component: EmailCode,
    meta: {
      title: "アカウントロック解除申請",
    },
  },
  {
    path: "/order/buystockjp",
    name: "BuyStockJP",
    component: BuyStockJP,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "[買] 国内株式",
    },
  },
  {
    path: "/order/sellstockjp",
    name: "SellStockJP",
    component: SellStockJP,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "[売] 国内株式",
    },
  },
  {
    path: "/transaction/us/brand",
    name: "StockListUS",
    component: StockListUS,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "取扱銘柄一覧",
    },
  },
  {
    path: "/transaction/us/brand/favorite",
    name: "FavoriteUS",
    component: FavoriteUS,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "お気に入り銘柄一覧",
    },
  },
  {
    path: "/transaction/jp/brand",
    name: "StockListJP",
    component: StockListJP,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "取扱銘柄一覧",
    },
  },
  {
    path: "/transaction/jp/brand/favorite",
    name: "FavoriteJP",
    component: FavoriteJP,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "お気に入り銘柄一覧",
    },
  },
  {
    path: "/transaction/jp/brand/edit",
    name: "EditStockJP",
    component: EditStockJP,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "お気に入り編集",
    },
  },
  {
    path: "/transaction/us/brand/detail",
    name: "UsBrandDetail",
    component: UsBrandDetail,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "銘柄情報",
    },
  },
  {
    path: "/transaction/investment/brand/detail",
    name: "InvestBrandDetail",
    component: InvestBrandDetail,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "銘柄情報",
    },
  },
  {
    path: "/transaction/investment/brand/favorite",
    name: "FavoriteBrandIt",
    component: FavoriteBrandIt,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "お気に入り銘柄一覧",
    },
  },
  {
    path: "/transaction/investment/buy",
    name: "InvestStockBuyOrder",
    component: InvestStockBuyOrder,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "[購入] 投資信託",
    },
  },
  {
    path: "/transaction/investment/buy/confirm",
    name: "InvestStockBuyOrderConfirm",
    component: InvestStockBuyOrderConfirm,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "[購入] 投資信託",
    },
  },
  {
    path: "/transaction/investment/buy/complete",
    name: "InvestStockBuyOrderCompleted",
    component: InvestStockBuyOrderCompleted,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "[購入] 投資信託",
    },
  },
  {
    path: "/transaction/investment/sell",
    name: "InvestStockSellOrder",
    component: InvestStockSellOrder,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "[解約] 投資信託",
    },
  },
  {
    path: "/transaction/investment/brand",
    name: "Brand",
    component: Brand,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "取扱銘柄一覧",
    },
  },
  {
    path: "/notices",
    name: "Notice",
    component: Notice,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "お知らせ・メッセージ",
    },
  },
  {
    path: "/notice/detail",
    name: "NoticeDetail",
    component: NoticeDetail,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "お知らせ・メッセージ",
    },
  },
  {
    path: "/market/news",
    name: "MarketNews",
    component: MarketNews,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "マーケットニュース",
    },
  },
  {
    path: "/market/news_detail",
    name: "MarketNewsDetail",
    component: MarketNewsDetail,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "マーケットニュース",
    },
  },
  {
    path: "/payment/withdrawal",
    name: "PaymentWithdrawal",
    component: PaymentWithdrawal,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "出金",
    },
  },
  {
    path: "/payment/withdrawal/confirm",
    name: "WithdrawalConfirm",
    component: WithdrawalConfirm,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "入出金",
    },
  },
  {
    path: "/transaction/us/buy/confirm",
    name: "UsBuyConfirm",
    component: UsBuyConfirm,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "[買] 米国株式",
    },
  },
  {
    path: "/transaction/us/buy/result",
    name: "UsBuyResult",
    component: UsBuyResult,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "[買] 米国株式",
    },
  },
  {
    path: "/transaction/us/buy",
    name: "UsBuy",
    component: UsBuy,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "[買] 米国株式",
    },
  },
  {
    path: "/transaction/us/sell",
    name: "UsSell",
    component: UsSell,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "[売] 米国株式",
    },
  },
  {
    path: "/transaction/us/sell/confirm",
    name: "UsSellConfirm",
    component: UsSellConfirm,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "[売] 米国株式",
    },
  },
  {
    path: "/transaction/us/sell/result",
    name: "UsSellResult",
    component: UsSellResult,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "[売] 米国株式",
    },
  },
  {
    path: "/payment/deposit/realtime-2",
    name: "BankAccountRegist",
    component: BankAccountRegist,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "ネット口座振替サービス",
    },
  },
  {
    path: "/payment/deposit",
    name: "Deposit",
    component: Deposit,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "リアルタイム入金",
    },
  },
  {
    path: "/payment/transfer/confirm",
    name: "RealTimeCashInPwd",
    component: RealTimeCashInPwd,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "リアルタイム入金",
    },
  },
  {
    path: "/payment/deposit/cashincontract3",
    name: "CashInContract3",
    component: CashInContract3,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "ネット口座振替サービス",
    },
  },
  {
    path: "/payment/deposit/cashincontract4",
    name: "CashInContract4",
    component: CashInContract4,
    meta: {
      layout: "emptyLayout",
      requiresAuth: false,
      title: "ネット口座振替サービス",
    },
  },
  {
    path: "/payment/history",
    name: "WithdrawalHistory",
    component: WithdrawalHistory,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "入出金履歴",
    },
  },
  {
    path: "/payment/history/cancel",
    name: "CancelWithdrawal",
    component: CancelWithdrawal,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "キャンセル",
    },
  },
  {
    path: "/payment/history/done",
    name: "DonelWithdrawal",
    component: DonelWithdrawal,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "終わり",
    },
  },
  {
    path: "/order/confirm/itaku",
    name: "confirmItaku",
    component: confirmItaku,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "国内株式",
    },
  },
  {
    path: "/order/confirm/tentou",
    name: "confirmTentou",
    component: confirmTentou,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "国内株式",
    },
  },
  {
    path: "/order/confirm/success",
    name: "orderSuccess",
    component: orderSuccess,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "国内株式",
    },
  },
  {
    path: "/jp/buy/order/confirm/cancel",
    name: "buyOrderCancel",
    component: buyOrderCancel,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "国内株式",
    },
  },
  {
    path: "/jp/buy/reserve/cancel",
    name: "buyReserveCancel",
    component: buyReserveCancel,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "国内株式",
    },
  },
  {
    path: "/jp/sell/order/confirm/cancel",
    name: "sellOrderCancel",
    component: sellOrderCancel,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "国内株式",
    },
  },
  {
    path: "/jp/sell/reserve/cancel",
    name: "sellReserveCancel",
    component: sellReserveCancel,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "国内株式",
    },
  },
  {
    path: "/order/edit",
    name: "editOrder",
    component: correctionOrder,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "国内株式",
    },
  },
  {
    path: "/settings/user",
    name: "UserSetting",
    component: UserSetting,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "アカウント・設定変更",
    },
  },
  {
    path: "/settings/user/changeloginpwd",
    name: "LoginPassChange",
    component: LoginPassChange,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "ログインパスワードの変更",
    },
  },
  {
    path: "/settings/user/changetradepwd",
    name: "TradePassChange",
    component: TradePassChange,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "取引暗証番号の変更",
    },
  },
  {
    path: "/settings/user/changeloginid",
    name: "LoginIdChange",
    component: LoginIdChange,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "ログインIDの変更",
    },
  },
  {
    path: "/settings/user/changeloginid/changelogincode",
    name: "LoginIdChangeCode",
    component: LoginIdChangeCode,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "ログインIDの変更",
    },
  },
  {
    path: "/settings/user/resettradepwd",
    name: "TradePassReset",
    component: TradePassReset,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "取引暗証番号の再設定",
    },
  },
  {
    path: "/settings/user/resettradepwd/resettradepwdcode",
    name: "TradePassResetCode",
    component: TradePassResetCode,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "取引暗証番号の再設定",
    },
  },
  {
    path: "/settings/user/resettradepwd/resettradepwdnew",
    name: "TradePassResetNew",
    component: TradePassResetNew,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "取引暗証番号の再設定",
    },
  },
  {
    path: "/settings/user/unlocktradepwd",
    name: "TradePassUnlock",
    component: TradePassUnlock,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "取引暗証番号のロック解除申請",
    },
  },
  {
    path: "/settings/user/unlocktradepwd/unlocktradepwdcode",
    name: "TradePassUnlockCode",
    component: TradePassUnlockCode,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "取引暗証番号のロック解除申請",
    },
  },
  {
    path: "/urgentNotiDetail",
    name: "urgentNotiDetail",
    component: urgentNotiDetail,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "お知らせ・メッセージ",
    },
  },
  {
    path: "/settings/documents",
    name: "SettingDocuments",
    component: SettingDocuments,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "取引説明書・約款閲覧",
    },
  },
  {
    path: "/settings/documents/doc",
    name: "SettingDoc",
    component: SettingDoc,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "投資信託関連書面",
    },
  },
  {
    path: "/transaction/jp/brand/consignment_transactions",
    name: "ConsignmentTransactions",
    component: ConsignmentTransactions,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "銘柄情報",
    },
  },
  {
    path: "/transaction/jp/brand/over_counter_transactions",
    name: "OverCounterTransactions",
    component: OverCounterTransactions,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "銘柄情報",
    },
  },
  {
    path: "/settings/user/logout",
    name: "SettingUserLogout",
    component: SettingUserLogout,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
    },
  },
  {
    path: "/settings/digital",
    name: "ElectronicDelivery",
    component: ElectronicDelivery,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "電子交付書面一覧",
    },
  },
  {
    path: "/resetpassword",
    name: "ResetLoginPwd",
    component: ResetLoginPwd,
    meta: {
      layout: "defaultLayout",
      requiresAuth: false,
      title: "パスワード再設定",
    },
  },
  {
    path: "/resetpassword/code",
    name: "ResetLoginPwdCode",
    component: ResetLoginPwdCode,
    meta: {
      layout: "defaultLayout",
      requiresAuth: false,
      title: "パスワード再設定",
    },
  },
  {
    path: "/resetpassword/input",
    name: "ResetLoginPwdInput",
    beforeEnter: (to, from) => {
      if (from.name !== "ResetLoginPwdCode") return "/resetpassword/code";
    },
    component: ResetLoginPwdInput,
    meta: {
      layout: "defaultLayout",
      requiresAuth: false,
      title: "パスワード再設定",
    },
  },
  {
    path: "/resetpassword/complete",
    name: "ResetLoginPwdComplete",
    component: ResetLoginPwdComplete,
    meta: {
      layout: "defaultLayout",
      requiresAuth: false,
      title: "パスワード再設定",
    },
  },
  {
    path: "/ranking/jp",
    name: "RankingJp",
    component: RankingJp,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "カテゴリー一覧",
    },
  },
  {
    path: "/ranking/jp/detail",
    name: "RankingJpDetail",
    component: RankingJpDetail,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "各種ランキング",
    },
  },
  {
    path: "/ranking/jp/reference",
    name: "RankingJpReference",
    component: RankingJpReference,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "ご参考銘柄",
    },
  },
  {
    path: "/ranking/us",
    name: "RankingUs",
    component: RankingUs,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "カテゴリー一覧",
    },
  },
  {
    path: "/ranking/us/detail",
    name: "RankingUsDetail",
    component: RankingUsDetail,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "各種ランキング",
    },
  },
  {
    path: "/ranking/us/reference",
    name: "RankingUsReference",
    component: RankingUsReference,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "ご参考銘柄",
    },
  },
  {
    path: "/ranking/investment",
    name: "RankingInvestment",
    component: RankingInvestment,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "カテゴリー一覧",
    },
  },
  {
    path: "/ranking/investment/detail",
    name: "RankingInvestmentDetail",
    component: RankingInvestmentDetail,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "各種ランキング",
    },
  },
  {
    path: "/ranking/investment/reference",
    name: "RankingInvestmentReference",
    component: RankingInvestmentReference,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "ご参考銘柄",
    },
  },
  {
    path: "/market/condition",
    name: "MarketCondition",
    component: MarketCondition,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "市況一覧",
    },
  },
  {
    path: "/market/condition/detail",
    name: "MarketConditionInfo",
    component: MarketConditionInfo,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "市況情報",
    },
  },

  {
    path: "/transaction/investment/sell/confirm",
    name: "InvestStockSellOrderConfirm",
    component: InvestStockSellOrderConfirm,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "[解約] 投資信託",
    },
  },
  {
    path: "/transaction/investment/sell/complete",
    name: "InvestStockSellOrderComplete",
    component: InvestStockSellOrderComplete,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "[解約] 投資信託",
    },
  },

  {
    path: "/maintenance",
    name: "Maintenance",
    component: Maintenance,
    meta: {
      title: "メンテナンス",
    },
  },
  {
    path: "/eKYC",
    name: "eKYC",
    component: eKYC,
  },
  {
    path: "/settings",
    name: "settings",
    component: settings,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "口座・設定",
    },
  },
  {
    path: "/account",
    name: "account",
    component: account,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "口座情報",
    },
  },
  {
    path: "/bank/:userBank",
    name: "bank",
    component: bank,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "出金先金融機関の変更",
    },
  },
  {
    path: "/address/:userAddress",
    name: "address",
    component: address,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "住所の変更",
    },
  },
  {
    path: "/company/:userCompany",
    name: "company",
    component: company,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "お客様に関係する上場企業の変更",
    },
  },
  {
    path: "/confirm",
    name: "confirm",
    component: confirm,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "口座情報",
    },
  },
  {
    path: "/confirm2",
    name: "confirm2",
    component: confirm2,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "出金先金融機関の変更",
    },
  },
  {
    path: "/done",
    name: "done",
    component: done,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "住所の変更",
    },
  },
  {
    path: "/done2",
    name: "done2",
    component: done2,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "出金先金融機関の変更",
    },
  },
  {
    path: "/experience/:userExperience",
    name: "experience",
    component: experience,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "投資経験の変更",
    },
  },
  {
    path: "/income/:userIncom",
    name: "income",
    component: income,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "主な収入源の変更",
    },
  },
  {
    path: "/mail/:userAdvertising",
    name: "mail",
    component: mail,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "商品等に関する広告メールの変更",
    },
  },
  {
    path: "/name/:userName",
    name: "name",
    component: name1,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "お客様の氏名の変更",
    },
  },
  {
    path: "/occupation/:userOccupation",
    name: "occupation",
    component: occupation,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "職業・勤務先の変更",
    },
  },
  {
    path: "/phone/:userTEL",
    name: "phone",
    component: phone,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "携帯電話番号の変更",
    },
  },
  {
    path: "/property/:userProperty",
    name: "property",
    component: property,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "金融資産の変更",
    },
  },
  {
    path: "/purpose/:userPurpose",
    name: "purpose",
    component: purpose,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "投資目的の変更",
    },
  },
  {
    path: "/type/:userType",
    name: "type",
    component: type1,
    meta: {
      layout: "homeLayout",
      requiresAuth: true,
      title: "ご希望の取引種類の変更",
    },
  },
  {
    path: "/reference/condition",
    name: "condition",
    component: condition,
    meta: {
      layout: "homeLayout",
      title: "資産状況",
      keepAlive: false,
    },
  },
  {
    path: "/reference/condition/jp",
    name: "conditionJp",
    component: conditionJp,
    meta: {
      layout: "homeLayout",
      title: "資産状況（国内株式）",
      keepAlive: false,
    },
  },
  {
    path: "/reference/condition/us",
    name: "conditionUs",
    component: conditionUs,
    meta: {
      layout: "homeLayout",
      title: "資産状況（米国株式）",
      keepAlive: false,
    },
  },
  {
    path: "/reference/condition/invest",
    name: "conditionInvest",
    component: conditionInvest,
    meta: {
      layout: "homeLayout",
      title: "資産状況（投資信託）",
      keepAlive: false,
    },
  },
  {
    path: "/reference/order/jp",
    name: "orderJp",
    component: orderJp,
    meta: {
      layout: "homeLayout",
      title: "注文一覧",
      keepAlive: true,
    },
  },
  {
    path: "/reference/order/us",
    name: "orderUs",
    component: orderUs,
    meta: {
      layout: "homeLayout",
      title: "注文一覧",
      keepAlive: true,
    },
  },
  {
    path: "/reference/order/invest",
    name: "orderInvest",
    component: orderInvest,
    meta: {
      layout: "homeLayout",
      title: "注文一覧",
      keepAlive: true,
    },
  },
  {
    path: "/reference/contract/jp",
    name: "contractJp",
    component: contractJp,
    meta: {
      layout: "homeLayout",
      title: "約定一覧",
      keepAlive: true,
    },
  },
  {
    path: "/reference/contract/us",
    name: "contractUs",
    component: contractUs,
    meta: {
      layout: "homeLayout",
      title: "約定一覧",
      keepAlive: true,
    },
  },
  {
    path: "/reference/contract/invest",
    name: "contractInvest",
    component: contractInvest,
    meta: {
      layout: "homeLayout",
      title: "約定一覧",
      keepAlive: true,
    },
  },
  {
    path: "/reference/order/jp/detail",
    name: "orderJpDetail",
    component: orderJpDetail,
    meta: {
      layout: "homeLayout",
      title: "注文明細",
      keepAlive: false,
    },
  },
  {
    path: "/reference/order/us/detail",
    name: "orderUsDetail",
    component: orderUsDetail,
    meta: {
      layout: "homeLayout",
      title: "注文明細",
      keepAlive: false,
    },
  },
  {
    path: "/reference/order/invest/detail",
    name: "orderInvestDetail",
    component: orderInvestDetail,
    meta: {
      layout: "homeLayout",
      title: "注文明細",
      keepAlive: false,
    },
  },
  {
    path: "/reference/deposit",
    name: "deposit",
    component: deposit,
    meta: {
      layout: "homeLayout",
      title: "預り金増減",
      keepAlive: true,
    },
  },
  {
    path: "/reference/trend",
    name: "trend",
    component: trend,
    meta: {
      layout: "homeLayout",
      title: "余力管理",
      keepAlive: false,
    },
  },
  {
    path: "/reference/trend/detail",
    name: "trendDetail",
    component: trendDetail,
    meta: {
      layout: "homeLayout",
      title: "余力管理",
      keepAlive: false,
    },
  },
  {
    path: "/reference/contract/jp/detail",
    name: "contractJpDetail",
    component: contractJpDetail,
    meta: {
      layout: "homeLayout",
      title: "約定明細",
      keepAlive: false,
    },
  },
  {
    path: "/reference/contract/us/detail",
    name: "contractUsDetail",
    component: contractUsDetail,
    meta: {
      layout: "homeLayout",
      title: "約定明細",
      keepAlive: false,
    },
  },
  {
    path: "/reference/contract/invest/detail",
    name: "contractInvestDetail",
    component: contractInvestDetail,
    meta: {
      layout: "homeLayout",
      title: "約定明細",
      keepAlive: false,
    },
  },
  {
    path: '/EkycOver',
    name: "EkycOver",
    component: EkycOver,
    meta: {
      layout: "emptyLayout",
      title: "認証完了"
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "pageNotFound",
    component: pageNotFound,
    meta: {
      title: "エラー",
    },
  },
];

const excludeRoutes = [
  "RankingInvestment",
  "RankingInvestmentDetail",
  "RankingInvestmentReference",
  "SettingDoc",
];

const router = createRouter({
  history: createWebHistory(), // HTML5 History モード
  base: process.env.BASE_URL,
  routes,
});

const DEFAULT_TITLE = "Some Default Title";

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || DEFAULT_TITLE;
  router['prevRoute'] = from;
  if (
    excludeRoutes.indexOf(to.name) !== -1 &&
    commonJs.getProcessEnv(processEnvKey.BRANCH_DIVISION) === "NCB"
  ) {
    next("/");
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      if (
        (localStorage.getItem("login2Flag") === "false" &&
          localStorage.getItem("login3Flag") === "false") ||
        (localStorage.getItem("login2Flag") === null &&
          localStorage.getItem("login3Flag") === null)
      ) {
        next();
      } else {
        next("/");
      }
    } else {
      next("/");
    }
  } else if (to.matched.some((record) => !record.meta.guest)) {
    next();
  }
});

export default router;
