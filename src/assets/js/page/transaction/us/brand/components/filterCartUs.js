import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "FilterCart",
  props: ["valSearch", "type"],
  data() {
    return {
      textSearch: "",
      textSearchAdd: "",
      typeStock: "",
      etfFlag: "",
    };
  },
  computed: {
    ...mapGetters("stocklistus", [
      "getKeyword",
      "getMarketType",
      "getEtfFlag",
      "getKeywordAdd",
    ]),
    getQueryTextSearch() {
      return this.$route.query.textSearch;
    },
  },
  methods: {
    ...mapActions("stocklistus", ["stockListUs", "reset"]),
    ...mapMutations("stocklistus", [
      "SET_TEXT_SEARCH",
      "SET_KEYWORDS_ADD",
      "SET_MARKET_TYPE",
      "SET_ETF_FLAG",
    ]),
    handleReset() {
      if (!this.getKeyword && !this.getMarketType && !this.getEtfFlag) {
        if (this.type !== 1) {
          this.textSearch = "";
          this.typeStock = "";
          this.etfFlag = "";
        } else {
          this.textSearchAdd = "";
          this.SET_TEXT_SEARCH("");
        }
      }
    },
  },
  mounted() {
    this.textSearch = this.getQueryTextSearch
      ? this.getQueryTextSearch
      : this.getKeyword;
    if (this.getQueryTextSearch) {
      this.SET_MARKET_TYPE("");
      this.SET_ETF_FLAG("");
    }
    this.textSearchAdd = this.getKeywordAdd;
    this.typeStock = this.getMarketType;
    this.etfFlag = this.getEtfFlag;
  },
};
