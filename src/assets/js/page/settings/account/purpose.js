import { mapGetters, mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import commonConst from "@/const/common";

export default {
  name: "Purpose",
  data() {
    return {
      oldPurpose: "",
      formData: {
        PURPOSE_TYPE: null,
      },
      showDialog: false,
      API: "/user/purpose",
      newPurpose: commonConst.Policy,
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
      this.oldPurpose = JSON.parse(this.$route.params.userPurpose);
    },
    checked(id) {
      this.formData.PURPOSE_TYPE = id;
      this.newPurpose.forEach((item) => {
        if (item.id === id) {
          item.ischeck = true;
        } else {
          item.ischeck = false;
        }
      });
      this.isBtnFlag()
    },
    isBtnFlag() {
      if (!this.formData.PURPOSE_TYPE) {
        this.btnFlag = false
      } else {
        this.btnFlag = true;
      }
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
  beforeUnmount() {
    this.newPurpose.forEach(item => item.ischeck = false);
  }
};
