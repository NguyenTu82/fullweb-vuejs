export default {
  name: "RankingInvestment",
  data() {
    return {
      searchText: "",
      reference: "ご参考銘柄",
      categories: [
        "アクセス数",
        "販売金額（月間）",
        "販売件数（月間）",
        "トータルリターン（１年）",
        "分配金利回り",
        "値上り率",
        "値下り率",
        "純資産増加（前月比）",
        "純資産増加（前年比）",
      ],
      stockList: "取扱銘柄一覧",
    };
  },
  created() {
    setInterval(this.getNow, 1000);
  },
  methods: {
    currentDateTime: function () {
      return this.Moment().format("YYYY/MM/DD HH:mm");
    },
    search: function () {
      if (this.searchText) {
        this.$router.push({
          path: "/transaction/investment/brand",
          query: {
            textSearch: this.searchText,
          },
        });
      }
    },
  },
  unmounted() {
    this.searchText = "";
  },
};
