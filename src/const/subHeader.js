const HEADER_LINK_LIST = [
  {
    title: "ホーム",
    slug: "home",
    extraData: [],
    children: [],
  },
  {
    title: "国内株式",
    slug: "transaction/jp",
    extraData: [
      {
        title: "取扱銘柄一覧",
        slug: "brand",
      },
      {
        title: "お気に入り銘柄一覧",
        slug: "brand/favorite.html",
      },
    ],
    children: [
      {
        title: "ランキング一覧",
        slug: "ranking",
      },
      {
        title: "委託取引",
        slug: "",
      },
      {
        title: "店頭取引",
        slug: "/shop.html",
      },
    ],
  },
  {
    title: "米国株式",
    slug: "transaction/us",
    extraData: [],
    children: [
      {
        title: "取扱銘柄一覧",
        slug: "brand",
      },
      {
        title: "お気に入り銘柄一覧",
        slug: "favorite.html",
      },
      {
        title: "ランキング一覧",
        slug: "ranking",
      },
    ],
  },
  {
    title: "投資信託",
    slug: "transaction/investment",
    extraData: [],
    children: [
      {
        title: "取扱銘柄一覧",
        slug: "brand",
      },
      {
        title: "お気に入り銘柄一覧",
        slug: "favorite",
      },
      {
        title: "ランキング一覧",
        slug: "ranking",
      },
    ],
  },
  {
    title: "資産・照会",
    slug: "reference",
    extraData: [],
    children: [
      {
        title: "資産状況",
        slug: "condition",
      },
      {
        title: "注文一覧",
        slug: "order/jp",
      },
      {
        title: "約定一覧",
        slug: "contract/jp",
      },
      {
        title: "預り金増減",
        slug: "deposit",
      },
    ],
  },
  {
    title: "入出金",
    slug: "payment",
    extraData: [],
    children: [
      {
        title: "入金(リアルタイム入金ページ)",
        slug: "deposit",
      },
      {
        title: "出金",
        slug: "withdrawal",
      },
      {
        title: "入出金履歴",
        slug: "history",
      },
    ],
  },
  {
    title: "口座・設定",
    slug: "settings",
    children: [],
  },
];

export default {
  HEADER_LINK_LIST,
};
