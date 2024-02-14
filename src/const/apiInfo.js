import processEnvKey from "@/const/processEnvKey";

// 日本株API一覧
const jpStockUrlList = [
  "hhd-api/JPStock/StockOrderDetailController/exec",
  "hhd-api/JPStock/StockOrderCancelService/exec",
  "hhd-api/JPStock/StockTradeDetailInfoController/exec",
  "hhd-api/JPStock/AvailableCashInfoListController/exec",
  "hhd-api/JPStock/StockOrderListController/exec",
  "hhd-api/JPStock/StockPriceIndexController/exec",
  "hhd-api/JPStock/StockTradeInfoController/exec",
  "hhd-api/JPStock/OrderHistoryInfoController/exec",
  "hhd-api/JPStock/StockBrandInforController/exec", //7-10-13
  "hhd-api/JPStock/StockPriceInfoController/exec", //7-33-01
  "hhd-api/JPStock/StockSignController/exec", //7-33-05
  "hhd-api/JPStock/StockOrderNewCheckService/exec", //7-10-14
  "hhd-api/JPStock/StockOrderNewExecService/exec", //7-10-15
  "hhd-api/JPStock/StockOwnedListController/exec", //7-10-10
  "hhd-api/JPStock/StockOrderDetailController/exec", //7-10-05
  "hhd-api/JPStock/StockOrderCorrectCheckService/exec", //7-10-16
  "hhd-api/JPStock/ResultInfoController/exec",
  "hhd-api/JPStock/SearchStockInfoController/exec",
  "hhd-api/JPStock/ClientStockInfoController/exec",
  "hhd-api/JPStock/ClientStockRegisterController/exec",
  "hhd-api/JPStock/RankingInfoController/exec", //7-10-22
  "hhd-api/JPStock/StockOrderCorrectExecService/exec", //7-10-17,
  "hhd-api/JPStock/BrandSearchAccessController/exec" //7-10-21
];

// 投信日本株API一覧
const fundStockUrlList = [
  "/hhd-it/it/StockInfoService/exec",
  "/hhd-it/it/DocInfoListAcquisitionController/exec",
  "/hhd-it/it/InvBuyOrderInitialInfoAcquisitionController/exec",
  "/hhd-it/it/InvSellOrderConfirmationController/exec",
  "/hhd-it/it/InvSellOrderInitialInfoAcquisitionController/exec",
  "/fund_document/list",
  "/document/list",
  "/hhd-it/it/InvOrderInfoListAcquisitionController/exec",
  "/hhd-it/it/InvTradeInfoListAcquisitionController/exec",
  "/hhd-it/it/InvOrderCancelListRegistrationController/exec",
  "/hhd-it/it/InvBuyOrderRegistrationController/exec",
  "/hhd-it/it/InvSellOrderRegistrationController/exec",
  "/hhd-it/it/GetFavoritesListController/exec",
  "/hhd-it/it/AddFavoriteController/exec",
  "/hhd-it/it/DocConfirmHistRegistrationController/exec",
  "/hhd-it/it/InvBuyOrderConfirmationController/exec",
  "/hhd-it/it/InvGraphDataAcquisitionController/exec",
];
const itStockUrlList = [
  "/hhd-it/it/StockInfoService/exec",
  "/hhd-it/it/GetFavoritesListController/exec",
  "/hhd-it/it/InvGraphDataAcquisitionController/exec",
  "/hhd-it/it/InvBuyOrderInitialInfoAcquisitionController/exec",
  "/hhd-it/it/DocInfoListAcquisitionController/exec",
  "/hhd-it/it/InvBuyOrderConfirmationController/exec",
  "/hhd-it/it/InvBuyOrderRegistrationController/exec",
  "/hhd-it/it/InvSellOrderInitialInfoAcquisitionController/exec",
  "/hhd-it/it/InvSellOrderConfirmationController/exec",
  "/hhd-it/it/DocConfirmHistRegistrationController/exec",
  "/hhd-it/it/InvSellOrderRegistrationController/exec",
];

const stockFrontUrlList = [
  "/history/order",
  "/history/trade",
  "/order/documents",
  "/order/input",
  "/order/buy/accepted",
  "/order/buy/confirm",
  "/order/sell/accepted",
  "/order/sell/confirm",
  "/stocks/search_usa",
  "/stocks/likes",
  "/stocks/likes/edit",
];

const passportUrlList = ["/user/login"];

const commonFrontUrlList = ["payment/order/banks", "payment/order"];

const apiType = {
  FUND_STOCK: "FUND_STOCK",
  JP_STOCK: "JP_STOCK",
  STOCK_FRONT: "STOCK_FRONT",
  PASSPORT: "PASSPORT",
  COMMON_FRONT: "COMMON_FRONT",
  IT_STOCK: "IT_STOCK",
};

const apiUrl = {};
apiUrl[apiType.FUND_STOCK] = {
  urlList: fundStockUrlList,
  baseUrlKey: processEnvKey.FUND_STOCK_TRANSACTION_API,
};
apiUrl[apiType.JP_STOCK] = {
  urlList: jpStockUrlList,
  baseUrlKey: processEnvKey.JP_STOCK_TRANSACTION_API,
};
apiUrl[apiType.STOCK_FRONT] = {
  urlList: stockFrontUrlList,
  baseUrlKey: processEnvKey.STOCK_FRONT_API,
};
apiUrl[apiType.PASSPORT] = {
  urlList: passportUrlList,
  baseUrlKey: processEnvKey.PASSPORT_API,
};
apiUrl[apiType.COMMON_FRONT] = {
  urlList: commonFrontUrlList,
  baseUrlKey: processEnvKey.COMMON_FRONT_API,
};
apiUrl[apiType.IT_STOCK] = {
  urlList: itStockUrlList,
  baseUrlKey: processEnvKey.IT_FRONT_API,
};

export default {
  apiUrl,
  apiType,
};
