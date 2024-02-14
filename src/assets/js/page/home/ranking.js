import rankingItem from "@/views/home/rankingItem";
const RANKING_JP = [
  {
    name: "RankingJpReference",
    query: "ご参考銘柄",
    title: "ご参考銘柄",
  },
  {
    name: "RankingJpDetail",
    query: "アクセス数ランキング",
    title: "アクセス数<br />ランキング",
  },
  {
    name: "RankingJpDetail",
    query: "値上り率ランキング",
    title: "値上り率<br />ランキング",
  },
  {
    name: "RankingJpDetail",
    query: "値下り率ランキング",
    title: "値下り率<br />ランキング",
  },
  {
    name: "RankingJpDetail",
    query: "出来高ランキング",
    title: "出来高<br />ランキング",
  },
  {
    name: "RankingJpDetail",
    query: "出来高乖離率ランキング",
    title: "出来高乖離率<br />ランキング",
  },
  {
    name: "RankingJpDetail",
    query: "売買代金ランキング",
    title: "売買代金<br />ランキング",
  },
  {
    name: "RankingJpDetail",
    query: "売買代金急増ランキング",
    title: "売買代金急増<br />ランキング",
  },
  {
    name: "RankingJpDetail",
    query: "時価総額ランキング",
    title: "時価総額<br />ランキング",
  },
  {
    name: "RankingJpDetail",
    query: "配当利回りランキング",
    title: "配当利回り<br />ランキング",
  },
  {
    name: "RankingJpDetail",
    query: "高PERランキング",
    title: "高PER<br />ランキング",
  },
  {
    name: "RankingJpDetail",
    query: "低PERランキング",
    title: "低PER<br />ランキング",
  },
  {
    name: "RankingJpDetail",
    query: "高PBRランキング",
    title: "高PBR<br />ランキング",
  },
  {
    name: "RankingJpDetail",
    query: "低PBRランキング",
    title: "低PBR<br />ランキング",
  },
  {
    name: "StockListJP",
    query: "2",
    title: "取扱銘柄一覧",
  },
];
const RANKING_US = [
  {
    name: "RankingUsReference",
    query: "ご参考銘柄",
    title: "ご参考銘柄",
  },
  {
    name: "RankingUsDetail",
    query: "アクセス数ランキング",
    title: "アクセス数<br />ランキング",
  },
  {
    name: "RankingUsDetail",
    query: "値上り率ランキング",
    title: "値上り率<br />ランキング",
  },
  {
    name: "RankingUsDetail",
    query: "値下り率ランキング",
    title: "値下り率<br />ランキング",
  },
  {
    name: "RankingUsDetail",
    query: "出来高ランキング",
    title: "出来高<br />ランキング",
  },
  {
    name: "RankingUsDetail",
    query: "配当利回りランキング",
    title: "配当利回り<br />ランキング",
  },
  {
    name: "RankingUsDetail",
    query: "高PERランキング",
    title: "高PER<br />ランキング",
  },
  {
    name: "RankingUsDetail",
    query: "低PERランキング",
    title: "低PER<br />ランキング",
  },
  {
    name: "StockListUS",
    query: "",
    title: "取扱銘柄一覧",
  },
];
const RANKING_FUND = [
  {
    name: "RankingInvestmentReference",
    query: "ご参考銘柄",
    title: "ご参考銘柄",
  },
  {
    name: "RankingInvestmentDetail",
    query: "アクセス数ランキング",
    title: "アクセス数<br />ランキング",
  },
  {
    name: "RankingInvestmentDetail",
    query: "販売金額（月間）ランキング",
    title: "販売金額（月間）<br />ランキング",
  },
  {
    name: "RankingInvestmentDetail",
    query: "販売件数（月間）ランキング",
    title: "販売件数（月間）<br />ランキング",
  },
  {
    name: "RankingInvestmentDetail",
    query: "トータルリターン（１年）ランキング",
    title: "トータルリターン（１年）<br />ランキング",
  },
  {
    name: "RankingInvestmentDetail",
    query: "分配金利回りランキング",
    title: "分配金利回り<br />ランキング",
  },
  {
    name: "RankingInvestmentDetail",
    query: "値上り率ランキング",
    title: "値上り率<br />ランキング",
  },
  {
    name: "RankingInvestmentDetail",
    query: "値下り率ランキング",
    title: "値下り率<br />ランキング",
  },
  {
    name: "RankingInvestmentDetail",
    query: "純資産増加（前月比）ランキング",
    title: "純資産増加（前月比）<br />ランキング",
  },
  {
    name: "RankingInvestmentDetail",
    query: "純資産増加（前年比）ランキング",
    title: "純資産増加（前年比）<br />ランキング",
  },
  {
    name: "Brand",
    query: "",
    title: "取扱銘柄一覧",
  },
];
export default {
  components: {
    rankingItem,
  },
  data() {
    return {
      listRanking: [],
      rankingJp: [],
      rankingUs: [],
      rankingFund: [],
      activeTab: 1,
      rankingUrl: "/ranking/jp/",
    };
  },
  methods: {
    changeTab(tab) {
      switch (tab) {
        case 1:
          this.rankingUrl = "/ranking/jp/";
          break;
        case 2:
          this.rankingUrl = "/ranking/us/";
          break;
        case 3:
          this.rankingUrl = "/ranking/investment/";
          break;
      }
      this.activeTab = tab;
    },
  },
  created() {
    this.listRanking = RANKING_JP;
    this.rankingJp = RANKING_JP;
    this.rankingUs = RANKING_US;
    this.rankingFund = RANKING_FUND;
  },
};
