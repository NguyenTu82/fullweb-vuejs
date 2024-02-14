import httpRequest from "@/assets/js/common/httpRequest";

export default {
  name: "AccountSearch",
  props: [
    "searchTitle",
    "enterprise",
    "withdrawCD",
    "searchResolve",
    "postFlag",
  ],
  data() {
    return {
      searchVal: "",
      enterpriseData: [],
      company: {},
      timer: null,
      isColor: null,
      btnFlag: false,
    };
  },
  methods: {
    search() {
      this.btnFlag = false
      clearTimeout(this.timer);
      const str = this.searchVal.trim();
      // this.timer = setTimeout(() => {
        if (str.length !== 0) {
          if (this.searchTitle == "上場企業名") {
            this.getSearch("/search/company_name", { company_name: str });
          } else if (this.searchTitle == "金融機関名") {
            this.getSearch("/search/withdraw_facil_name", {
              withdraw_facil_name: str,
            });
          } else if (this.searchTitle == "支店") {
            this.getSearch("/search/withdraw_sub_name", {
              withdraw_facil_cd: this.withdrawCD,
              withdraw_sub_name: str,
            });
          } else if (this.searchTitle == "郵便番号") {
            this.getSearch("/search/address", { zipcode: str });
          }
        }
      // }, 100);
    },
    getSearch(api, data) {
      httpRequest
        .get(api, { params: data })
        .then((res) => {
          // HDH00005_01-377 検索結果リストの一行目が入力内容と同じなデータが表示する様に修正　2022-10-04
          const {DATA , STATUS} = res.data;
          if(STATUS == "OK" && DATA.length){
            this.enterpriseData = DATA;
          }else{
            this.enterpriseData = [];
          }
          if (this.searchTitle == "上場企業名") {
            if(this.enterpriseData.length && this.enterpriseData[0].COMPANY_CD == '-'){
              this.enterpriseData.splice(0,1);
            }
            if(DATA.length && DATA[0].COMPANY_NAME == data.company_name){
            }else{
              let installList = {COMPANY_NAME: data.company_name, COMPANY_CD: '-'};
              this.enterpriseData.unshift(installList);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchCancel() {
      this.$emit("searchCancel");
    },
    selected(obj, index) {
      this.isColor = index;
      this.company = obj;
      this.btnFlag = true
    },
    btnOK() {
      if (Object.keys(this.company).length !== 0) {
        if (this.searchTitle == "上場企業名") {
          this.$emit("searchOK", this.company, this.enterprise);
          this.$emit("searchCancel");
        } else if (this.searchTitle == "郵便番号") {
          this.$emit("searchOK", this.company);
          this.$emit("searchCancel");
        } else {
          this.$emit("searchOK", this.company, this.searchTitle);
          this.$emit("searchCancel");
        }
      }
    },
  },
  mounted() {
    const { searchResolve } = this;
    this.searchVal = searchResolve ? searchResolve : "";
    this.search();
  },
  watch: {
    searchVal: {
      handler(val) {
        this.isColor = -1
        this.company = {}
        if (val.length === 0) {
          this.enterpriseData = []
        }
      },
      deep: true,
      immediate: true,
    }
  }
};
