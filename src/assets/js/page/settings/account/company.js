import { mapGetters, mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import commonConst from "@/const/common";
import Search from "@/views/settings/components/Search";

export default {
  name: "Company",
  components: { Search },
  data() {
    return {
      insiderTypes: commonConst.INSIDER_TYPES,
      oldCompany: [],
      newCompany: [],
      formData: {
        INSIDER_CHG_FLG: 1,
        INSIDER_FLG: 1,
      },
      // HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05
      HELPACCOUNT: commonConst.HELPACCOUNT,
      showDialog: false,
      searchDialog: false,
      searchTitle: "",
      enterprise: null,
      API: "/user/job",
      btnFlag: false,
      text: "",
      btnFlags: [],
    };
  },
  methods: {
    ...mapMutations("common", [
      "setPageTittle",
      "setPageHeaderType",
      "setPageFooterType",
    ]),
    isBranch(branchDivision) {
      if (this.branchDivision === branchDivision) {
        return true;
      }
      return false;
    },
    routerData() {
      this.oldCompany = JSON.parse(this.$route.params.userCompany);
      if (this.oldCompany[0] !== "該当しない") {
        this.newCompany = JSON.parse(this.$route.params.userCompany);
        this.newCompany.forEach((item) => {
          this.insiderTypes.forEach((ins, index) => {
            if (item.relation == ins) {
              item.insider = index + 1;
            }
          });
        });
      }
    },
    search(index) {
      if (this.btnFlags[index]) {
        this.searchTitle = "上場企業名";
        this.text = this.newCompany[index].name
        this.searchDialog = true;
        this.enterprise = index;
      }
    },
    searchOK(obj, index) {
      this.newCompany.forEach((item, ind) => {
        if (index == ind) {
          item.name = obj.COMPANY_NAME;
          item.INSIDER_BRAND_CD = obj.COMPANY_CD;
        }
      });
    },
    del(index) {
      this.newCompany.forEach((item, ind) => {
        if (index === ind) {
          this.newCompany.splice(index, 1);
        }
      });
    },
    add() {
      this.newCompany.push({
        name: "",
        relation: "",
        insider: 0,
        INSIDER_BRAND_CD: "",
      });
    },
    cancel() {
      this.showDialog = false;
    },
    searchCancel() {
      this.searchDialog = false;
    },
    isBtnFlag() {
      let flag = true;
      if (this.newCompany.length === 0) {
        this.formData.INSIDER_FLG = 0;
      } else {
        this.formData.INSIDER_FLG = 1;
        this.newCompany.forEach((item, index) => {
          if (item.name.trim().length == 0 || item.insider == 0) {
            flag = false;
          }
        });
      }
      this.btnFlag = flag
    },
    change() {
      if (this.btnFlag) {
        this.newCompany.forEach((item, index) => {
          this.formData["INSIDER_BRAND_NAME" + (index + 1)] = item.name;
          this.formData["INSIDER_TYPE" + (index + 1)] = item.insider;
          this.formData["INSIDER_BRAND_CD" + (index + 1)] =
            item.INSIDER_BRAND_CD;
        });
        this.showDialog = true;
      }
    },
  },
  computed: {
    ...mapGetters("common", ["branchDivision"]),
    subTittle() {
      if (this.isBranch(commonConst.BRANCH_DIVISION.CHEER)) {
        return "CHEER証券";
      } else if (this.isBranch(commonConst.BRANCH_DIVISION.NCB)) {
        return "西日本シティ銀行";
      } else {
        return null;
      }
    },
  },
  watch: {
    newCompany: {
      handler(val) {
        val.forEach((item, index) => {
          if (!item.name.trim()) {
            this.btnFlags[index] = false
          } else {
            this.btnFlags[index] = true
          }
        })
        this.isBtnFlag()
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.setPageTittle(pageInfoConst.TITTLE.SETTING);
    this.setPageHeaderType(pageInfoConst.HEADER_TYPE.GUEST);
    this.setPageFooterType(pageInfoConst.FOOTER_TYPE.NORMAL);
    this.routerData();
  },
};
