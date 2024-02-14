import constant from "@/const/common";
import { mapGetters } from "vuex";

export default {
  title: "",
  name: "Modal",
  components: {},
  props: ["select", "brandList"],
  computed: {
    ...mapGetters("stockListIt", [
      "getKeyWord",
      "getDevidendCls",
      "getFundType",
    ]),
    sortSelect() {
      let arrayList = [
        ...this.sortArray(this.select),
        { fund_type_cls: "", fund_type_nm: "すべて" },
      ];
      return arrayList;
    },
    getQueryTextSearch() {
      return this.$route.query.textSearch;
    },
  },
  data() {
    return {
      offModal: true,
      keyword: "",
      devidend_cls: "",
      fund_type: "",
      newData: [],
    };
  },
  methods: {
    sortArray(select) {
      return select.sort(function (a, b) {
        return parseInt(a.fund_type_cls) - parseInt(b.fund_type_cls);
      });
    },
    getBrandListSearch() {
      this.$store
        .dispatch("getBrandsData", {
          apiType: constant.API_TYPE.IT_STOCK,
          keyword: this.keyword,
          devidend_cls: this.devidend_cls,
          fund_type: this.fund_type,
        })
        .then(() => {
          this.$emit("inputSearch", {
            keyword: this.keyword,
            devidend_cls: this.devidend_cls,
            fund_type: this.fund_type,
          });
          this.$emit("showData", {
            newData: this.$store.getters.getDatabrands,
          });
          this.$emit("hiddenModal");
        });
    },
    resetFilter() {
      this.keyword = "";
      this.devidend_cls = "";
      this.fund_type = "";
    },
  },
  mounted() {
    if (this.getQueryTextSearch) {
      this.keyword = this.getQueryTextSearch;
      this.devidend_cls = "";
      this.fund_type = "";
    } else {
      this.keyword = this.getKeyWord;
      this.devidend_cls = this.getDevidendCls;
      this.fund_type = this.getFundType;
    }
  },
};
