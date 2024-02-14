import { mapGetters, mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import commonConst from "@/const/common";

export default {
  name: "Type",
  data() {
    return {
      oldType: "",
      typesData: [
        {
          id: 1,
          title: "国内株式",
          ischeck: false,
        },
        {
          id: 2,
          title: "外国株式",
          ischeck: false,
        },
        {
          id: 3,
          title: "投資信託",
          ischeck: false,
        },
      ],
      typesArr: [],
      formData: {
        DESIRED_INVESTMENT_TYPE: "",
      },
      showDialog: false,
      API: "/user/desired_investment",
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
      this.oldType = JSON.parse(this.$route.params.userType);
      if (this.subTittle === "西日本シティ銀行") {
        this.typesData.pop();
      }
    },
    checked(id) {
      this.typesData.forEach((item) => {
        if (item.id === id) {
          item.ischeck = !item.ischeck;
        }
      });
    },
    isBtnFlag() {
      this.formData.DESIRED_INVESTMENT_TYPE = this.typesArr.join(",");
      if (this.formData.DESIRED_INVESTMENT_TYPE.length === 0) {
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
  watch: {
    typesData: {
      handler(newVal) {
        let arr = [];
        for (let a = 0; a < newVal.length; a++) {
          if (newVal[a] && newVal[a].ischeck) {
            arr.push(newVal[a].id);
          }
        }
        this.typesArr = arr;
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
