import commonConst from "@/const/common";

// 画面ヘッダの種類
const HEADER_TYPE = {
  NO_HEADER: "NO_HEADER",
  MEMBER: "MEMBER",
  GUEST: "GUEST",
  OPEN_HEADER: "OPEN_HEADER",
};

// 画面フッターの種類
const FOOTER_TYPE = {
  NO_FOOTER: "NO_FOOTER",
  NORMAL: "NORMAL",
};

// 画面のタイトル
const TITTLE = {};

// 画面のタイトルの固定文字
const TITTLE_END = {};
TITTLE_END[commonConst.BRANCH_DIVISION.CHEER] = "CHEER証券";
TITTLE_END[commonConst.BRANCH_DIVISION.NCB] = "西日本シティ銀行";

export default {
  HEADER_TYPE,
  FOOTER_TYPE,
  TITTLE,
  TITTLE_END,
};
