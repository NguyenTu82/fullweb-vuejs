import { mapGetters, mapMutations } from "vuex";
import Modal from "@/views/transaction/investment/common/modal";
import ScrollToTopBtn from "@/components/button/ScrollToTopBtn";
import TopInfo from "@/components/common/TopInfo";
import GirdButton from "@/components/common/navBar/navBarBrand";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";

export default {
  title: "ホーム",
  name: "Home",
  components: {
    Modal,
    ScrollToTopBtn,
    TopInfo,
    GirdButton,
  },
  data() {
    return {
      showModalFilter: false,
      dataSelectBox: [],
      brandList: [],
      dataListBrandIt: [],
      keyword: "",
      devidend_cls: "",
      fund_type: "",
      favouritesList: [],
      isBottom: false,
      tabIndex: 1,
      page: 1,
      navStock: constant.NAV_STOCK_IT,
      perPage: constant.DEFAULT_PER_PAGE,
    };
  },
  computed: {
    ...mapGetters("stockListIt", [
      "getKeyWord",
      "getDevidendCls",
      "getFundType",
    ]),
    renderType() {
      return this.findData(this.dataSelectBox);
    },
    getQueryTextSearch() {
      return this.$route.query.textSearch;
    },
  },
  methods: {
    ...mapMutations("stockListIt", [
      "SET_KEYWORD",
      "SET_DEVIDENCE_CLS",
      "SET_FUND_TYPE",
    ]),
    listBrand(brand) {
      let listBr = brand["fund_type_list"];
      if (brand["fund_attr_cls"] != 1) {
        listBr = [
          {
            fund_type_cls: brand["fund_attr_cls"],
            fund_type_nm: brand["fund_attr_cls_nm"],
          },
          ...listBr,
        ];
      }
      return listBr;
    },
    brandName(brand) {
      if (brand.fund_nicknm != null && brand.fund_nicknm != "") {
        return `${brand["fund_abb_nm"]} (${brand["fund_nicknm"]})`;
      } else {
        return brand["fund_abb_nm"];
      }
    },
    showModal() {
      this.showModalFilter = !this.showModalFilter;
    },
    updateDataInput(data) {
      this.keyword = data.keyword;
      this.devidend_cls = data.devidend_cls;
      this.fund_type = data.fund_type;
      this.removeQuery();
    },
    handleBackUsDetail(inv_trust) {
      this.$router.push({
        path: "/transaction/investment/brand/detail",
        query: {
          inv_trust_assoc_cd: inv_trust,
        },
      });
    },
    updateData(data) {
      this.brandList = data.newData;
    },
    findData(dataSelect) {
      return dataSelect.find(
        (x) => parseInt(x.fund_type_cls) === parseInt(this.fund_type)
      );
    },
    getBrandList() {
      this.$store
        .dispatch("getBrandsData", {
          apiType: constant.API_TYPE.IT_STOCK,
          keyword: this.keyword,
          devidend_cls: this.devidend_cls,
          fund_type: this.fund_type,
        })
        .then(() => {
          this.brandList = this.$store.getters.getDatabrands;
          this.dataSelectBox = this.$store.getters.getDataSelects;
        });
    },
    resetFilter() {
      this.removeQuery();
      this.keyword = "";
      this.devidend_cls = "";
      this.fund_type = "";
      this.getBrandList();
      this.$refs.modalFilter.resetFilter();
    },
    removeQuery() {
      this.$router.replace({
        path: "/transaction/investment/brand",
      });
    },
    handNumber(number) {
      return commonJs.handNumber(number);
    },

    handNumberInt(number) {
      return commonJs.handNumberInt(number);
    },
  },
  watch: {
    isBottom() {
      if (this.isBottom) {
        this.page += 1;
        this.dataListBrandIt = [
          ...this.dataListBrandIt,
          ...commonJs.paginate(this.brandList, this.perPage, this.page),
        ];
      }
    },
    brandList() {
      this.page = 1;
      this.dataListBrandIt = commonJs.paginate(
        this.brandList,
        this.perPage,
        this.page
      );
    },
    keyword() {
      this.SET_KEYWORD(this.keyword);
    },
    devidend_cls() {
      this.SET_DEVIDENCE_CLS(this.devidend_cls);
    },
    fund_type() {
      this.SET_FUND_TYPE(this.fund_type);
    },
    $route(to, from) {
      if (
        from &&
        to.fullPath.indexOf("/transaction/investment/brand/detail") !== -1
      ) {
        this.keyword = "";
        this.devidend_cls = "";
        this.fund_type = "";
      }
      to.fullPath.includes("/ranking/investment") && this.SET_KEYWORD("");
    },
  },
  created() {
    window.addEventListener("scroll", () => {
      this.isBottom = commonJs.scrollBottom();
    });
  },
  mounted() {
    if (this.getQueryTextSearch) {
      this.SET_DEVIDENCE_CLS("");
      this.SET_FUND_TYPE("");
    }
    this.keyword = this.getQueryTextSearch
      ? this.getQueryTextSearch
      : this.getKeyWord;
    this.devidend_cls = this.getDevidendCls;
    this.fund_type = this.getFundType;
    commonJs.moveUp();
    this.getBrandList();
    window.addEventListener("beforeunload", () => {
      this.resetFilter();
    });
  },
};
