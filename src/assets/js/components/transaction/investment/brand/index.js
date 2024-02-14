import TopInfo from "@/components/common/TopInfo";
import Modal from "@/components/transaction/investment/common/modal";

export default {
  title: "ブランド",
  name: "Brand",
  components: {
    Modal,
    TopInfo,
  },

  data() {
    return {
      showModalFilter: false,
      dataSelectBox: [],
      brandList: [],
      keyword: "",
      devidend_cls: "",
      fund_type: "",
      favouritesList: [],
      tabIndex: 2,
    };
  },
  mounted() {
    // this.getMarketNewsList();
    this.getBrandList();
  },
  computed: {
    renderType() {
      return this.findData(this.dataSelectBox);
    },
  },
  methods: {
    showModal() {
      this.showModalFilter = !this.showModalFilter;
    },
    updateDataInput(data) {
      this.keyword = data.keyword;
      this.devidend_cls = data.devidend_cls;
      this.fund_type = data.fund_type;
    },
    handleBackUsDetail(inv_trust) {
      this.$router.push({
        path: "/transaction/investment/brand/detail",
        query: {
          inv_trust_assoc_cd: inv_trust,
        },
      });
    },
    listOfFavoriteBrands() {
      this.$router.push({
        path: "/brand",
        //A230-2 Not implement - Not have ULR
        query: {},
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
      this.tabIndex = 2;
      this.$store
        .dispatch("getBrandsData", {
          // apiType: this.constant.API_TYPE.IT_STOCK,
          keyword: this.keyword,
          devidend_cls: this.devidend_cls,
          fund_type: this.fund_type,
        })
        .then(() => {
          this.brandList = this.$store.getters.getDatabrands;
          this.dataSelectBox = this.$store.getters.getDataSelects;
        });
    },

    getBrandListFavorites() {
      this.tabIndex = 1;
      this.$store
        .dispatch("getListFavorites", {
          // apiType: this.constant.API_TYPE.IT_STOCK,
          keyword: this.keyword,
          devidend_cls: this.devidend_cls,
          fund_type: this.fund_type,
        })
        .then(() => {
          if (this.$store.getters.getDataFavorites == null) {
            this.brandList = [];
            this.favouritesList = [];
          } else {
            this.brandList = this.$store.getters.getDataFavorites;
            this.favouritesList = this.$store.getters.getDataFavorites;
          }
        });
    },
  },
};
