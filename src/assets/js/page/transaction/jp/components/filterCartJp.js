import { mapGetters, mapMutations } from "vuex";

export default {
  name: "FilterCart",
  props: ["handleSearch"],
  data() {
    return {
      textSearch: "",
    };
  },
  computed: {
    ...mapGetters("stockListJp", ["getTextSearch", "getStepEditFavoriteJp"]),
  },
  watch: {
    $route() {
      this.textSearch =
        this.$route.name === "StockListJP" ? this.getTextSearch : "";
    },
  },
  methods: {
    handleReset() {
      this.textSearch = "";
    },
    ...mapMutations("stockListJp", ["SET_GET_TEXT_SEARCH"]),
  },
  mounted() {
    const valSearch = this.$route.query.textSearch;
    if (valSearch) {
      this.textSearch = valSearch;
      this.SET_GET_TEXT_SEARCH(valSearch);
    } else {
      this.textSearch =
        this.getStepEditFavoriteJp === 1 ? "" : this.getTextSearch;
    }
  },
};
