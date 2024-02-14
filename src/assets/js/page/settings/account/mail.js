import { mapGetters, mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import commonConst from "@/const/common";
import DialogPwd from "@/views/settings/components/DialogPwd.vue";

export default {
  name: "Mail",
  data() {
    return {
      showText: "",
      showDialog: false,
      API: "/user/mail_info_flg",
      formData: {
        MAIL_INFO_FLG: null,
      },
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
      this.showText = JSON.parse(this.$route.params.userAdvertising);
    },
    isYes() {
      this.formData.MAIL_INFO_FLG = 1
      this.isBtnFlag()
    },
    isNo() {
      this.formData.MAIL_INFO_FLG = 0
      this.isBtnFlag()
    },
    cancel() {
      this.showDialog = false;
    },
    isBtnFlag() {
      if (this.formData.MAIL_INFO_FLG === null) {
        this.btnFlag = false
      } else {
        this.btnFlag = true
      }
    },
    change() {
      if (this.btnFlag) {
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
  created() {
    this.setPageTittle(pageInfoConst.TITTLE.SETTING);
    this.setPageHeaderType(pageInfoConst.HEADER_TYPE.GUEST);
    this.setPageFooterType(pageInfoConst.FOOTER_TYPE.NORMAL);
    this.routerData();
  },
  components: {
    DialogPwd,
  },
};
