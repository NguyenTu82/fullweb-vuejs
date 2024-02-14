import { mapMutations } from "vuex";

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
        "出来高乖離率",
        "売買代金",
        "売買代金急増",
        "時価総額",
        "配当利回り",
        "高PER",
        "低PER",
        "高PBR",
        "低PBR",
      ],
      stockList: "取扱銘柄一覧",
    };
  },
  created() {
    setInterval(this.getNow, 1000);
  },
  methods: {
    ...mapMutations("stockListJp", ["SET_TYPE_TRANSACTION"]),
    currentDateTime: function () {
      return this.Moment().format("YYYY/MM/DD HH:mm");
    },
    search: function () {
      if (this.searchText) {
        this.SET_TYPE_TRANSACTION(2);
        this.$router.push({
          path: "/transaction/jp/brand",
          query: {
            typeTransaction: 2,
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
