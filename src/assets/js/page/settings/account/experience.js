import { mapGetters, mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import commonConst from "@/const/common";

export default {
  name: "Experience",
  data() {
    return {
      oldExperience: [
        {
          title: "国内株式の取引経験",
          text: "",
          ischeck: null,
        },
        {
          title: "外国株式の取引経験",
          text: "",
          ischeck: null,
        },
        {
          title: "投資信託の取引経験",
          text: "",
          ischeck: null,
        },
      ],
      formData: {
        EXPERIENCE_INVESTMENT_TYPE: "",
      },
      showDialog: false,
      API: "/user/experience_investment",
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
      if (this.subTittle === "西日本シティ銀行") {
        this.oldExperience.pop();
      }
      const arr = JSON.parse(this.$route.params.userExperience);
      this.oldExperience.forEach((item, index) => {
        item.text = arr[index];
        if (item.text === "あり") {
          this.isYes(index)
        } else if (item.text === "なし") {
          this.isNo(index)
        }
      });
    },
    isYes(index) {
      this.oldExperience[index].ischeck = 0
      this.isBtnFlag()
    },
    isNo(index) {
      this.oldExperience[index].ischeck = 1
      this.isBtnFlag()
    },
    isBtnFlag() {
      let flag = false;
      this.oldExperience.forEach((item) => {
        if (item.ischeck === null) {
          flag = true;
        }
      });
      this.btnFlag = !flag
    },
    change() {
      if (this.btnFlag) {
        let arr = [];
        this.oldExperience.forEach((item, index) => {
          if (item.ischeck === 0) {
            arr.push(index + 1);
          }
        });
        this.formData.EXPERIENCE_INVESTMENT_TYPE = arr.join(",");
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
  },
};
