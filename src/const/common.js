// 支店種別
const BRANCH_DIVISION = {
  CHEER: "CHEER",
  NCB: "NCB",
};
const WEBSOCKET = `https://ws.p15.stg.cheer-sec.co.jp:9443`;

const ACCESS_TOKEN_PREFIX = "ACCESS_TOKEN_";
const accountData = [
  { id: 1, name: "普通預金", isChecked: false },
  { id: 4, name: "貯蓄預金", isChecked: false },
  { id: 2, name: "当座預金", isChecked: false },
];

const BankData = [
  { id: "0005", name: "三菱UFJ銀行", ischeck: false },
  { id: "0009", name: "三井住友銀行", ischeck: false },
  { id: "0001", name: "みずほ銀行", ischeck: false },
  { id: "0010", name: "りそな銀行", ischeck: false },
  { id: "9900", name: "ゆうちょ銀行", ischeck: false },
  { id: "0038", name: "住信SBIネット銀行", ischeck: false },
  { id: "0036", name: "楽天銀行", ischeck: false },
  { id: "0033", name: "ジャパンネット銀行", ischeck: false },
  { id: "0040", name: "イオン銀行", ischeck: false },
  { id: "0035", name: "ソニー銀行", ischeck: false },
  { id: "0397", name: "新生銀行", ischeck: false },
  { id: "", name: "その他", ischeck: false },
];

const TODOHUKENN = [
  { value: "北海道" },
  { value: "青森県" },
  { value: "岩手県" },
  { value: "宮城県" },
  { value: "秋田県" },
  { value: "山形県" },
  { value: "福島県" },
  { value: "茨城県" },
  { value: "栃木県" },
  { value: "群馬県" },
  { value: "埼玉県" },
  { value: "千葉県" },
  { value: "東京都" },
  { value: "神奈川県" },
  { value: "新潟県" },
  { value: "富山県" },
  { value: "石川県" },
  { value: "福井県" },
  { value: "山梨県" },
  { value: "長野県" },
  { value: "岐阜県" },
  { value: "静岡県" },
  { value: "愛知県" },
  { value: "三重県" },
  { value: "滋賀県" },
  { value: "京都府" },
  { value: "大阪府" },
  { value: "兵庫県" },
  { value: "奈良県" },
  { value: "和歌山県" },
  { value: "鳥取県" },
  { value: "島根県" },
  { value: "岡山県" },
  { value: "広島県" },
  { value: "山口県" },
  { value: "徳島県" },
  { value: "香川県" },
  { value: "愛媛県" },
  { value: "高知県" },
  { value: "福岡県" },
  { value: "佐賀県" },
  { value: "長崎県" },
  { value: "熊本県" },
  { value: "大分県" },
  { value: "宮崎県" },
  { value: "鹿児島県" },
  { value: "沖縄県" },
];

const BUSINESS_CATEGORY = [
  { value: "農業/林業/漁業" },
  { value: "製造業" },
  { value: "建設業" },
  { value: "情報通信業" },
  { value: "運輸業" },
  { value: "卸売/小売業" },
  { value: "金融業/保険業" },
  { value: "不動産業" },
  { value: "サービス業" },
  { value: "信託会社" },
  { value: "貸金業" },
  { value: "資金移動業" },
  { value: "仮想通貨交換業" },
  { value: "両替業" },
  { value: "ファイナンスリース事業" },
  { value: "クレジットカード事業" },
  { value: "宅地建物取引業" },
  { value: "宝石・貴金属等取扱事業" },
  {
    value: "郵便物受取サービス業・電話受付代行業・電話転送サービス事業",
  },
  {
    value: "弁護士法人・司法書士法人・行政書士法人・監査法人・税理士法人",
  },
  { value: "NPO(非営利団体)" },
  { value: "娯楽業" },
  { value: "その他" },
];
const BUSINESS_CATEGORIES = BUSINESS_CATEGORY;
const GYOUSYU = BUSINESS_CATEGORY;

const INSIDER_TYPES = [
  "会社役員",
  "主要株主（10％以上の株を保持）",
  "大株主（5％以上の株を保持）",
  "会社員・派遣・パート・アルバイト",
  "親会社の役社員・子会社の役社員",
  "会社役員の配偶者・同居者",
  "退任会社役員（1年以内に退職された方）",
];

const Income = [
  { title: "事業収入", id: 1, ischeck: false },
  { title: "不動産収入", id: 2, ischeck: false },
  { title: "給与収入", id: 3, ischeck: false },
  { title: "利子・配当収入", id: 4, ischeck: false },
  { title: "年金", id: 5, ischeck: false },
  { title: "世帯主の収入", id: 6, ischeck: false },
  { title: "なし", id: 7, ischeck: false },
  { title: "その他", id: 8, ischeck: false },
];

const Financial = [
  { title: "100万円未満", id: 1, ischeck: false },
  { title: "100万円~500万円未満", id: 2, ischeck: false },
  { title: "500万円~1,000万円未満", id: 3, ischeck: false },
  { title: "1,000万円~5,000万円未満", id: 4, ischeck: false },
  { title: "5,000万円~", id: 5, ischeck: false },
];

const Policy = [
  {
    title: "安定重視",
    id: 1,
    ischeck: false,
    src: "/assets/images/Illust1.svg",
  },
  {
    title: "値上がり益重視",
    id: 2,
    ischeck: false,
    src: "/assets/images/Illust2.svg",
  },
  {
    title: "積極的値上がり益重視",
    id: 3,
    ischeck: false,
    src: "/assets/images/Illust3.svg",
  },
];

const TradeMotive = [
  { title: "おかねのコンパス", id: 1, ischeck: false },
  { title: "インターネット広告", id: 2, ischeck: false },
  { title: "知人・友人の紹介", id: 3, ischeck: false },
  { title: "SNS", id: 4, ischeck: false },
  { title: "セミナー・イベント", id: 5, ischeck: false },
  { title: "ホームページ", id: 6, ischeck: false },
  { title: "新聞・雑誌", id: 7, ischeck: false },
  { title: "その他", id: 8, ischeck: false },
];

const campaignDatas = [
  { id: 1, ischeck: false, title: "受け取る" },
  { id: 0, ischeck: false, title: "受け取らない" },
];

const OCCUPATION_TYPES = [
  {
    value: "会社役員",
    children: [
      { id: 1, value: "上場企業" },
      { id: 2, value: "非上場企業" },
    ],
    show: false,
  },
  {
    value: "会社員/契約/派遣/パート/アルバイト",
    children: [
      { id: 3, value: "上場企業" },
      { id: 4, value: "非上場企業" },
    ],
    show: false,
  },
  { id: 5, value: "団体役職員" },
  { id: 6, value: "医師" },
  { id: 7, value: "弁護士 / 会計士 / 税理士" },
  { id: 8, value: "公務員" },
  { id: 9, value: "自営業" },
  { id: 10, value: "自由業" },
  { id: 11, value: "無職 / 主婦 / 学生等" },
];

const base64DecodeChars = new Array(
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  62,
  -1,
  -1,
  -1,
  63,
  52,
  53,
  54,
  55,
  56,
  57,
  58,
  59,
  60,
  61,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  -1,
  -1,
  -1,
  -1,
  -1
);

const base64EncodeChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

//不需要银行两个字的
const specialBank = [
  "農協",
  "信金",
  "信組",
  "信連",
  "信漁連",
  "労金",
  "信託",
  "漁協",
  "金庫",
];

const birthreg = /^(19|20)[\d]/;
const pwdreg =
  /^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)])+$)([!#%'(),./:;<=>?@[\]^_{}~|]|[a-zA-Z]|[0-9]){8,16}$/i;

const NONE_DISPLAY_JAPANESE_INDEX_STOCK = [
  "日経ジャスダック平均",
  "マザーズ総合",
];

const API_TYPE = {
  AUTH: 1,
  COMMON: 2,
  STOCK: 3,
  JP_STOCK: 4,
  FUND: 5,
  IT_STOCK: 6,
};

const VARIFY_CODE_REQUEST_TYPE = {
  RESET_PWD: 1,
  RESET_TRADE: 4,
};

const AMOUNT_TYPE = {
  PROFIT: 1,
};

// 口座/account type
const ACCOUNT_TYPE = [
  { value: 1, label: "一般口座" },
  { value: 2, label: "特定口座" },
  { value: 3, label: "NISA口座" },
];

//入出金ステータス
const PAYMENT_STATUS = [
  { value: 0, label: "手続中" },
  { value: 1, label: "完了" },
  { value: 2, label: "失効" },
  { value: 3, label: "処理中" },
  { value: 4, label: "取消" },
  { value: 9, label: "すべて" },
];

// 注文状況 /order status
const ORDER_STATUS = [
  { value: 0, label: "受付済" },
  { value: 1, label: "注文中" },
  { value: 2, label: "取消中" },
  { value: 3, label: "取消済" },
  { value: 4, label: "約定" },
  { value: 5, label: "不成立" },
  { value: 11, label: "一部約定(注文中)" },
  { value: 12, label: "一部約定(取消中)" },
  { value: 13, label: "一部約定(取消済)" },
  { value: 14, label: "一部約定(失効)" },
];

const RANKING_JP_MAP = [
  { category: "アクセス数ランキング", id: "1" },
  { category: "値上り率ランキング", id: "2" },
  { category: "値下り率ランキング", id: "3" },
  { category: "出来高ランキング", id: "4" },
  { category: "出来高乖離率ランキング", id: "5" },
  { category: "売買代金ランキング", id: "6" },
  { category: "売買代金急増ランキング", id: "7" },
  { category: "時価総額ランキング", id: "8" },
  { category: "配当利回りランキング", id: "9" },
  { category: "高PERランキング", id: "10" },
  { category: "低PERランキング", id: "11" },
  { category: "高PBRランキング", id: "12" },
  { category: "低PBRランキング", id: "13" },
];

const RANKING_US_MAP = [
  { category: "アクセス数ランキング", id: "31" },
  { category: "値上り率ランキング", id: "32" },
  { category: "値下り率ランキング", id: "33" },
  { category: "出来高ランキング", id: "34" },
  { category: "配当利回りランキング", id: "35" },
  { category: "高PERランキング", id: "36" },
  { category: "低PERランキング", id: "37" },
];

const RANKING_INVESTMENT_MAP = [
  { category: "アクセス数ランキング", id: "51" },
  { category: "販売金額（月間）ランキング", id: "52" },
  { category: "販売件数（月間）ランキング", id: "53" },
  { category: "トータルリターン（１年）ランキング", id: "54" },
  { category: "分配金利回りランキング", id: "55" },
  { category: "値上り率ランキング", id: "56" },
  { category: "値下り率ランキング", id: "57" },
  { category: "純資産増加（前月比）ランキング", id: "58" },
  { category: "純資産増加（前年比）ランキング", id: "59" },
];

const FRONT_API = {
  API_7_10_12: "hhd-api/JPStock/AvailableCashInfoListController/exec",
};
const NAV_STOCK_US = [
  {
    key: 1,
    name: "お気に入り銘柄一覧",
    path: "/transaction/us/brand/favorite",
  },
  { key: 2, name: "取扱銘柄一覧", path: "/transaction/us/brand" },
];

const NAV_STOCK_JP = [
  {
    key: 1,
    name: "お気に入り銘柄一覧",
    path: "/transaction/jp/brand/favorite",
  },
  { key: 2, name: "取扱銘柄一覧", path: "/transaction/jp/brand" },
];

const NAV_STOCK_IT = [
  {
    key: 1,
    name: "お気に入り銘柄一覧",
    path: "/Transaction/investment/brand/favorite",
  },
  { key: 2, name: "取扱銘柄一覧", path: "/Transaction/investment/brand" },
];

const TYPE_STOCK_US = [
  { key: 3, value: "0", label: "普通株" },
  { key: 2, value: "1", label: "ETF" },
  { key: 1, value: "", label: "すべて" },
];

const LIST_MARKET_US = [
  { key: 2, value: "1", label: "NYSE" },
  { key: 3, value: "2", label: "NASDAQ" },
  { key: 1, value: "", label: "すべて" },
];

const API_TIMEOUT = 3000; /* api request timout in 30sec */
const reg = {
  lowerCase: /[a-z]/,
  upperCase: /[A-Z]/,
  pwdregApp:
    /^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)])+$)([!#%\'\(\),\./:;<=>\?@\[\]\^_\{\}~\|]|[a-zA-Z]|[0-9]){8,16}$/i,
  pwdreg:
    /^(?![0-9]+$)(?![a-zA-Z]+$)(?![!#%\'\(\),\./:;<=>\?@\[\]\^_\{\}~\|]+$)(?!.*\s)[0-9a-zA-Z!#%\'\(\),\./:;<=>\?@\[\]\^_\{\}~\|]{8,16}$/i,
  digits: /\d/,
  numberCase: /^[0-9]+$/,
};
const DEFAULT_ERROR =
  "システムエラーが発生しました。同様のエラーが続く場合はカスタマーセンターまでお問い合わせください。";
//不需要银行两个字的
const DEFAULT_BANK = "default";
const EXCHANGE_CLS = "009";

const DEFAULT_PER_PAGE = 30;
const DEFAULT_PAGE_NO = 0;
const RISK_2 =
  "この銘柄は、価格変動リスクが高く、投資目的が「値上がり益重視」又は「積極的値上がり益重視」のお客様向けとしております。次の説明をよくお読みいただき、お客様ご自身のリスク許容度及び投資目的をご確認ください。";
const RISK_3 =
  "この銘柄は、価格変動リスクが非常に高く、投資目的が「積極的値上がり益重視」のお客様向けとしております。次の説明をよくお読みいただき、お客様ご自身のリスク許容度及び投資目的をご確認ください。";

const REAL_TIME_CASH_IN_DIALOG_STAGE = {
  CLOSE: 0,
  LOADING: 1,
  SUCCESS: 2,
  SPECIAL_SUCCESS: 20,
  ERROR: 3,
  ERROR_API: 30,
  SPECIAL_ERROR: 31,
};

const getSelectDataJp = () => {
  let data = [
    {
      title: "売買",
      abbr: "buy_sell_cls",
      items: [
        { id: "3", name: "買付", ischeck: false },
        { id: "1", name: "売付", ischeck: false },
        { id: "", name: "すべて", ischeck: true },
      ],
      isStretch: false,
    },
    {
      title: "状況",
      abbr: "order_status",
      items: [
        { id: "", name: "すべて", ischeck: true },
        { id: "1", name: "受付済", ischeck: false },
        { id: "2", name: "執行中", ischeck: false },
        { id: "3", name: "執行済", ischeck: false },
        { id: "4", name: "訂正中", ischeck: false },
        { id: "5", name: "訂正済", ischeck: false },
        { id: "6", name: "取消中", ischeck: false },
        { id: "7", name: "取消済", ischeck: false },
        { id: "8", name: "約定済", ischeck: false },
        { id: "9", name: "失効", ischeck: false },
      ],
      isStretch: false,
    },
    {
      title: "取引方法",
      abbr: "otc_consign_cls",
      items: [
        { id: "2", name: "委託取引", ischeck: false },
        { id: "1", name: "店頭取引", ischeck: false },
        { id: "", name: "すべて", ischeck: true },
      ],
      isStretch: false,
    },
  ];
  return data;
};

const getSelectDataIt = () => {
  let data = [
    {
      title: "売買",
      abbr: "buy_sell_cls",
      items: [
        { id: "3", name: "購入", ischeck: false },
        { id: "1", name: "解約", ischeck: false },
        { id: "", name: "すべて", ischeck: true },
      ],
      isStretch: false,
    },
    {
      title: "分配金受取種類",
      abbr: "dividend_handling_cls",
      items: [
        { id: "1", name: "分配金受取型", ischeck: false },
        { id: "2", name: "再投資型", ischeck: false },
        { id: "", name: "すべて", ischeck: true },
      ],
      isStretch: false,
    },
    {
      title: "ファンドタイプ",
      abbr: "fund_type",
      items: [
        { id: "01", name: "国内株式", ischeck: false },
        { id: "02", name: "海外株式", ischeck: false },
        { id: "03", name: "内外株式", ischeck: false },
        { id: "04", name: "国内債券", ischeck: false },
        { id: "05", name: "海外債券", ischeck: false },
        { id: "06", name: "内外債券", ischeck: false },
        { id: "07", name: "国内バランス", ischeck: false },
        { id: "08", name: "海外バランス", ischeck: false },
        { id: "09", name: "内外バランス", ischeck: false },
        { id: "10", name: "国内REIT", ischeck: false },
        { id: "11", name: "海外REIT", ischeck: false },
        { id: "12", name: "内外REIT", ischeck: false },
        { id: "13", name: "コモディティ", ischeck: false },
        { id: "14", name: "ヘッジファンド", ischeck: false },
        { id: "15", name: "ブル・ベア", ischeck: false },
        { id: "16", name: "特殊運用型", ischeck: false },
        { id: "17", name: "その他資産", ischeck: false },
        { id: "18", name: "条件付運用型", ischeck: false },
        { id: "19", name: "ヘッジあり", ischeck: false },
        { id: "20", name: "ヘッジなし", ischeck: false },
        { id: "21", name: "その他", ischeck: false },
        { id: "22", name: "指定なし", ischeck: false },
        { id: "", name: "すべて", ischeck: true },
      ],
      isStretch: false,
    },
  ];
  return data;
};

const getSelectDataUs = () => {
  let data = [
    {
      title: "売買",
      abbr: "TRADE_TYPE",
      items: [
        { id: "1", name: "買付", ischeck: false },
        { id: "2", name: "売付", ischeck: false },
        { id: "", name: "すべて", ischeck: true },
      ],
      isStretch: false,
    },
    {
      title: "上場市場",
      abbr: "MARKET_ID",
      items: [
        { id: "1", name: "NYSE", ischeck: false },
        { id: "2", name: "NASDAQ", ischeck: false },
        { id: "", name: "すべて", ischeck: true },
      ],
      isStretch: false,
    },
  ];
  return data;
};

const getDate = () => {
  const nowDate = new Date();
  const date = {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
    date: nowDate.getDate(),
  };
  // HDH00005_01-408 画面起動時の初期検索で日付フォーマットエラー 2022-10-03 
  const newMonth = date.month >= 10 ? date.month : "0" + date.month;
  const day = date.date >= 10 ? date.date : "0" + date.date;
  return date.year + "-" + newMonth + "-" + day;
};
const getSelectDataOrderUS = (kind) => {
  let needs = [];
  switch (kind) {
    case "jp":
      needs = ["trade", "method", "status"];
      break;
    case "us":
      needs = ["trade", "market", "status"];
      break;
    case "it":
      needs = ["trade", "status", "profit", "found"];
      break;
    default:
      needs = [];
      break;
  }
  let data = [
    {
      title: "売買",
      abbr: "trade",
      items: [
        { id: 1, name: "買付", ischeck: false },
        { id: 2, name: "売付", ischeck: false },
        { id: "", name: "すべて", ischeck: true },
      ],
      isStretch: false,
    },
    {
      title: "状況",
      abbr: "status",
      items: [
        { id: 101, name: "約定", ischeck: false },
        { id: 102, name: "不成立", ischeck: false },
        { id: "", name: "すべて", ischeck: true },
      ],
      isStretch: false,
    },
    {
      title: "上場市場",
      abbr: "market",
      items: [
        { id: 1, name: "NYSE", ischeck: false },
        { id: 2, name: "NASDAQ", ischeck: false },
        { id: "", name: "すべて", ischeck: true },
      ],
      isStretch: false,
    },
    {
      title: "取引方式",
      abbr: "method",
      items: [
        { id: 1, name: "店頭", ischeck: false },
        { id: 2, name: "委託", ischeck: false },
        { id: "", name: "すべて", ischeck: true },
      ],
      isStretch: false,
    },
    {
      title: "分配金受取種類",
      abbr: "profit",
      items: [
        { id: 1, name: "分配金受取型", ischeck: false },
        { id: 2, name: "再投資型", ischeck: false },
        { id: "", name: "すべて", ischeck: true },
      ],
      isStretch: false,
    },
    {
      title: "ファンドタイプ",
      abbr: "found",
      items: [
        { id: 1, name: "通貨選択型", ischeck: false },
        { id: 2, name: "レバレッジ型", ischeck: false },
        // { id: 3, name: 'インデックス', ischeck: false },
        // { id: 4, name: 'アクティブ型', ischeck: false },
        // { id: 5, name: 'バランス型', ischeck: false },
        // { id: 6, name: '国内株式型', ischeck: false },
        // { id: 7, name: '海外株式型', ischeck: false },
        // { id: 8, name: '国内REIT型', ischeck: false },
        // { id: 9, name: '海外REIT型', ischeck: false },
        // { id: 10, name: 'コモディティ型', ischeck: false },
        // { id: 10, name: 'ヘッジファンド型', ischeck: false },
        { id: "", name: "すべて", ischeck: true },
      ],
      isStretch: false,
    },
  ];

  try {
    if (needs.length > 0) {
      return data.filter((item) => {
        return needs.includes(item.abbr);
      });
    }
  } catch (e) {
    return data;
  }

  return data;
};

const getSelectDataOrderIt = () => {
  let data = [
    {
      title: "売買",
      abbr: "trade",
      items: [
        { id: 3, name: "購入", ischeck: false },
        { id: 1, name: "解約", ischeck: false },
        { id: "", name: "すべて", ischeck: true },
      ],
      isStretch: false,
    },
    {
      title: "状況",
      abbr: "status",
      items: [
        { id: "", name: "すべて", ischeck: true },
        { id: 1, name: "受付済", ischeck: false },
        { id: 2, name: "執行中", ischeck: false },
        { id: 7, name: "取消済み", ischeck: false },
        { id: 8, name: "約定", ischeck: false },
        { id: 9, name: "失効", ischeck: false },
      ],
      isStretch: false,
    },
    // {
    //   title: '上場市場',
    //   abbr: 'market',
    //   items: [
    //     { id: 1, name: 'NYSE', ischeck: false },
    //     { id: 2, name: 'NASDAQ', ischeck: false },
    //     { id: '', name: 'すべて', ischeck: true }
    //   ],
    //   isStretch: false
    // },
    // {
    //   title: '取引方式',
    //   abbr: 'method',
    //   items: [
    //     { id: 1, name: '店頭', ischeck: false },
    //     { id: 2, name: '委託', ischeck: false },
    //     { id: '', name: 'すべて', ischeck: true }
    //   ],
    //   isStretch: false
    // },
    {
      title: "分配金受取種類",
      abbr: "profit",
      items: [
        { id: 1, name: "分配金受取型", ischeck: false },
        { id: 2, name: "再投資型", ischeck: false },
        { id: "", name: "すべて", ischeck: true },
      ],
      isStretch: false,
    },
    {
      title: "ファンドタイプ",
      abbr: "found",
      items: [
        { id: "01", name: "国内株式", ischeck: false },
        { id: "02", name: "海外株式", ischeck: false },
        { id: "03", name: "内外株式", ischeck: false },
        { id: "04", name: "国内債券", ischeck: false },
        { id: "05", name: "海外債券", ischeck: false },
        { id: "06", name: "内外債券", ischeck: false },
        { id: "07", name: "国内バランス", ischeck: false },
        { id: "08", name: "海外バランス", ischeck: false },
        { id: "09", name: "内外バランス", ischeck: false },
        { id: "10", name: "国内REIT", ischeck: false },
        { id: "11", name: "海外REIT", ischeck: false },
        { id: "12", name: "内外REIT", ischeck: false },
        { id: "13", name: "コモディティ", ischeck: false },
        { id: "14", name: "ヘッジファンド", ischeck: false },
        { id: "15", name: "ブル・ベア", ischeck: false },
        { id: "16", name: "特殊運用型", ischeck: false },
        { id: "17", name: "その他資産", ischeck: false },
        { id: "18", name: "条件付運用型", ischeck: false },
        { id: "19", name: "ヘッジあり", ischeck: false },
        { id: "20", name: "ヘッジなし", ischeck: false },
        { id: "21", name: "その他", ischeck: false },
        { id: "22", name: "指定なし", ischeck: false },
        { id: "", name: "すべて", ischeck: true },
      ],
      isStretch: false,
    },
  ];
  return data;
};

const DEVICELIST = 'https://liquidinc.asia/liquid-ekyc/ekyc-device-list/';

export default {
  BRANCH_DIVISION,
  ACCESS_TOKEN_PREFIX,
  NONE_DISPLAY_JAPANESE_INDEX_STOCK,
  accountData,
  BankData,
  TODOHUKENN,
  OCCUPATION_TYPES,
  BUSINESS_CATEGORY,
  GYOUSYU,
  BUSINESS_CATEGORIES,
  INSIDER_TYPES,
  Income,
  Financial,
  Policy,
  TradeMotive,
  campaignDatas,
  pwdreg,
  birthreg,
  specialBank,
  base64DecodeChars,
  base64EncodeChars,
  AMOUNT_TYPE,
  API_TYPE,
  VARIFY_CODE_REQUEST_TYPE,
  DEFAULT_PER_PAGE,
  DEFAULT_PAGE_NO,
  reg,
  ORDER_STATUS,
  ACCOUNT_TYPE,
  PAYMENT_STATUS,
  API_TIMEOUT,
  DEFAULT_ERROR,
  DEFAULT_BANK,
  RISK_2,
  RISK_3,
  FRONT_API,
  NAV_STOCK_US,
  NAV_STOCK_JP,
  TYPE_STOCK_US,
  LIST_MARKET_US,
  NAV_STOCK_IT,
  REAL_TIME_CASH_IN_DIALOG_STAGE,
  WEBSOCKET,
  RANKING_JP_MAP,
  RANKING_US_MAP,
  RANKING_INVESTMENT_MAP,
  getSelectDataJp,
  getSelectDataUs,
  getSelectDataIt,
  getSelectDataOrderUS,
  getSelectDataOrderIt,
  getDate,
  EXCHANGE_CLS,
  DEVICELIST
};
