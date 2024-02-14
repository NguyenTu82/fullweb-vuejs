import { mapGetters, mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import commonConst from "@/const/common";
import Search from "@/views/settings/components/Search";

export default {
  name: "Bank",
  components: { Search },
  data() {
    return {
      bankData: commonConst.BankData,
      accountData: commonConst.accountData,
      oldBank: [],
      formData: {
        WITHDRAW_FACIL_CD: "",
        WITHDRAW_FACIL_NAME: "",
        WITHDRAW_SUB_CD: "",
        WITHDRAW_SUB_NAME: "",
        WITHDRAW_ACCOUNT_TYPE: null,
        WITHDRAW_ACCOUNT_NUMBER: "",
      },
      // HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05
      HELPACCOUNT: commonConst.HELPACCOUNT,
      showDialog: false,
      searchDialog: false,
      searchTitle: "",
      bankName: "",
      bankSearch: false,
      API: "/user/withdraw_send_verify_code",
      btnFlag: false,
      text: "",
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
      this.oldBank = JSON.parse(this.$route.params.userBank);
    },
    selectBank(id) {
      this.bankName = ""
      this.formData.WITHDRAW_SUB_NAME = ""
      this.bankData.forEach((item) => {
        if (item.id === id) {
          item.ischeck = true;
          if (item.name === "その他") {
            this.bankSearch = true;
          } else {
            this.formData.WITHDRAW_FACIL_NAME = item.name;
            this.formData.WITHDRAW_FACIL_CD = item.id;
            this.bankSearch = false;
          }
        } else {
          item.ischeck = false;
        }
      });
      this.isBtnFlag()
    },
    selectAccount(id) {
      this.accountData.forEach((item) => {
        if (item.id === id) {
          item.ischeck = true;
          this.formData.WITHDRAW_ACCOUNT_TYPE = id;
        } else {
          item.ischeck = false;
        }
      });
      this.isBtnFlag()
    },
    searchBank() {
      this.text = this.bankName
      this.searchTitle = "金融機関名";
      this.searchDialog = true;
    },
    searchBranch() {
      this.text = this.formData.WITHDRAW_SUB_NAME
      this.searchTitle = "支店";
      this.searchDialog = true;
    },
    searchOK(obj, title) {
      if (title == "金融機関名") {
        this.bankName = obj.WITHDRAW_FACIL_NAME;
        this.formData.WITHDRAW_FACIL_NAME = obj.WITHDRAW_FACIL_NAME;
        this.formData.WITHDRAW_FACIL_CD = obj.WITHDRAW_FACIL_CODE;
      } else if (title == "支店") {
        this.formData.WITHDRAW_SUB_CD = obj.WITHDRAW_SUB_CODE;
        this.formData.WITHDRAW_SUB_NAME = obj.WITHDRAW_SUB_NAME;
      }
    },
    searchCancel() {
      this.searchDialog = false;
    },
    isBtnFlag() {
      let flag = false;
      for (let key in this.formData) {
        if (!this.formData[key]) {
          flag = true;
        }
      }
      if (flag) {
        this.btnFlag = false
        return
      }
      if (this.bankSearch && !this.bankName) {
        this.btnFlag = false
        return
      }
      this.btnFlag = true;
    },
    change() {
      if (this.btnFlag) {
        this.showDialog = true;
      }
    },
    cancel() {
      this.showDialog = false;
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
  created() {
    if (this.subTittle === "西日本シティ銀行") {
      this.$router.back();
    }
    this.setPageTittle(pageInfoConst.TITTLE.SETTING);
    this.setPageHeaderType(pageInfoConst.HEADER_TYPE.GUEST);
    this.setPageFooterType(pageInfoConst.FOOTER_TYPE.NORMAL);
    this.routerData();
  },
  watch: {
    formData: {
      handler() {
        this.isBtnFlag()
      },
      deep: true
    }
  },
  beforeUnmount() {
    this.bankData.forEach(item => item.ischeck = false);
    this.accountData.forEach(item => item.ischeck = false);
  }
};
