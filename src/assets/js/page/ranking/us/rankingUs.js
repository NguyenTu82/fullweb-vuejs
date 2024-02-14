export default {
  name: "RankingJp",
  data() {
    return {
      searchText: "",
      reference: "ご参考銘柄",
      categories: [
        "アクセス数",
        "値上り率",
        "値下り率",
        "出来高",
        "配当利回り",
        "高PER",
        "低PER",
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
          path: "/transaction/us/brand",
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
