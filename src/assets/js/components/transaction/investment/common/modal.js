import commonJs from "@/assets/js/common/common";

export default {
  title: "",
  name: "Modal",
  components: {},
  props: ["select", "brandList"],
  mounted() {},
  computed: {
    sortSelect() {
      return this.sortArray(this.select);
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
          // apiType: this.constant.API_TYPE.IT_STOCK,
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
  },
};
