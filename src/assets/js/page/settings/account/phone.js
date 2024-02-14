import { mapGetters, mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import commonConst from "@/const/common";

export default {
  name: "Phone",
  data() {
    return {
      oldTEL: "",
      formData: { TEL_NO: "" },
      showDialog: false,
      API: "/user/tel",
      phoneFlag: false,
      btnFlag: false,
      // HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05
      HELPACCOUNT: commonConst.HELPACCOUNT,
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
      this.oldTEL = JSON.parse(this.$route.params.userTEL);
    },
    changePhone(val) {
      if (val.match(/^0[0-9]{10}/)) {
        this.phoneFlag = false;
      } else {
        this.phoneFlag = true;
      }
      this.isBtnFlag()
    },
    isBtnFlag() {
      if (this.phoneFlag) {
        this.btnFlag = false
        return;
      }
      if (this.formData.TEL_NO.length != 11) {
        this.btnFlag = false
        return;
      }
      this.btnFlag = true
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
    this.setPageTittle(pageInfoConst.TITTLE.SETTING);
    this.setPageHeaderType(pageInfoConst.HEADER_TYPE.GUEST);
    this.setPageFooterType(pageInfoConst.FOOTER_TYPE.NORMAL);
    this.routerData();
    this.isBtnFlag()
  },
};
