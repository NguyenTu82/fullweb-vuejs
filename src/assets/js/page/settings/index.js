import { mapGetters, mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import httpRequest from "@/assets/js/common/httpRequest";
import commonJs from "@/assets/js/common/common";
import commonConst from "@/const/common";

export default {
  name: "Setting",
  data() {
    return {
      userInfo: {},
      switchFlag: true,
      lastTime: "",
      // HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05
      COMMISSION: commonConst.COMMISSION,
      CONTACT: commonConst.CONTACT,
      HIMITU: commonConst.HIMITU,
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
    getUserInfo() {
        // ユーザー情報
        httpRequest.get("/user/info").then((resp) => {
          console.log("info", resp);
          if (resp.data.STATUS == "OK" && !resp.data.ERROR) {
            this.userInfo = resp.data.DATA.USER;
            commonJs.saveLocalData("userInfo", this.userInfo);
          }
        });
    },
    // 詳細表示
    isDetails() {
      if (this.switchFlag) {
        this.switchFlag = false;
      } else {
        this.switchFlag = true;
      }
    },
    getTime() {      
      const Times = this.$store.state.auth.user.DATA.LAST_LOGIN_AT;
      this.lastTime = Times.substr(0, 16);
      this.lastTime = this.lastTime.replaceAll("-", "/");
    },
    fill(num) {
      if (num < 10) {
        return "0" + num;
      } else {
        return num;
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
    this.getUserInfo();
    this.getTime();
  },
};
