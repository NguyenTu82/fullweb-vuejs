import { mapGetters, mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import commonJs from "@/assets/js/common/common";
import commonConst from "@/const/common";
import httpRequest from "@/assets/js/common/httpRequest";

export default {
  name: "Account",
  data() {
    return {
      // testData: {},
      infoData: {},
      // お客様名称
      userName: {
        userName: "",
        userNameKana: "",
      },
      userAddress: {
        userAddress1: "",
        userAddress2: "",
        userAddress3: "",
      }, // アドレス
      userTEL: "", // 電話番号
      infoBank: [], // 銀行
      professional: [], // 職業
      infoInvest: ["なし", "なし", "なし"], // 投資経験
      inforDesired: "", // ご希望の取引種類
      sourceIncome: "", // 主な収入源
      financialAssets: "", // 金融資産
      motivationTrading: "", // 交易动机
      investmentPurposes: "", // 投資目的
      advertising: "", // 商品等に関する広告メール
      relatedEnterprises: [], // お客様に関係する上場企業
      USER_OCCUPATIONS: commonConst.OCCUPATION_TYPES, //職業
      BUSINESS_CATEGORIES: commonConst.BUSINESS_CATEGORIES, //業種
      // HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05
      CONTACT: commonConst.CONTACT,
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
    userInfo() {
      // ユーザー情報
      httpRequest.get("/user/info").then((resp) => {
        console.log("info", resp);
        if (resp.data.STATUS == "OK" && !resp.data.ERROR) {
          this.userInfo = resp.data.DATA.USER;
          commonJs.saveLocalData("userInfo", this.userInfo);
          this.getUserInfo()
        }
      });
    },
    // ユーザー情報を取得する
    getUserInfo() {
      this.infoData = JSON.parse(localStorage.getItem("userInfo"));
      this.userName.userName = this.infoData.NAME;
      this.userName.userNameKana = this.infoData.KANA_NAME;
      this.getAddress(); // アドレス
      this.userTEL = this.infoData.TEL_NO_02; // 電話番号
      this.getInfoBank(); // 銀行
      this.infoProfession(); // 職業
      this.getInfoInvest(); // 投資経験
      this.getInforDesired(); // ご希望の取引種類
      //お客さまに関係する上場企業との関係
      this.relatedEnterprises = this.inforInsider();
      // 主な収入源
      this.sourceIncome = this.dataformat(
        commonConst.Income,
        this.infoData.REVENUE_TYPE
      )[0];
      // 金融資産
      this.financialAssets = this.dataformat(
        commonConst.Financial,
        this.infoData.FINANCIAL_ASSET_TYPE
      )[0];
      // お取引の動機
      this.motivationTrading = this.dataformat(
        commonConst.TradeMotive,
        this.infoData.MOTIVE_TYPE
      )[0];
      // 投資目的
      this.investmentPurposes = this.dataformat(
        commonConst.Policy,
        this.infoData.PURPOSE_TYPE
      )[0];
      // 商品等に関する広告メール
      this.advertising = this.dataformat(
        commonConst.campaignDatas,
        this.infoData.MAIL_INFO_FLG
      )[0];
    },
    getAddress() {
      this.userAddress.userAddress1 = `${(this.infoData.POSTAL_CD || "").slice(
        0,
        3
      )}-${(this.infoData.POSTAL_CD || "").slice(3)}`;
      this.userAddress.userAddress2 =
        this.infoData.ADDRESS1 +
        this.infoData.ADDRESS2 +
        this.infoData.ADDRESS3;
      this.userAddress.userAddress3 = this.infoData.ADDRESS4;
    },
    // 職業
    infoProfession() {
      if (this.infoData.OCCUPATION_TYPE == 11) {
        this.professional = [{ title: "職業", text: this.OCCUPATION }]; //学生
      } else if (this.infoData.OCCUPATION_TYPE == 6) {
        var employment1 = this.infoData.EMPLOYMENT
          ? this.infoData.EMPLOYMENT
          : "";
        this.professional = [
          { title: "職業", text: this.OCCUPATION },
          { title: "勤務先", text: employment1 },
          { title: "部署", text: this.infoData.DEPARTMENT || "部署なし" },
          { title: "役職", text: this.infoData.POSITION || "役職なし" },
          { title: "勤務先電話番号", text: this.infoData.EMPLOYMENT_TEL_NO },
        ];
      } else {
        var employment = this.infoData.EMPLOYMENT
          ? this.infoData.EMPLOYMENT
          : "";
        var business = this.infoData.BUSINESS_CATEGORY
          ? this.BUSINESS_CATEGORIES[this.infoData.BUSINESS_CATEGORY - 1].value
          : "";
        this.professional = [
          { title: "職業", text: this.OCCUPATION },
          { title: "勤務先", text: employment },
          { title: "業種", text: business },
          { title: "部署", text: this.infoData.DEPARTMENT || "部署なし" },
          { title: "役職", text: this.infoData.POSITION || "役職なし" },
          { title: "勤務先電話番号", text: this.infoData.EMPLOYMENT_TEL_NO },
        ];
      }
    },
    // 銀行
    getInfoBank() {
      var result = commonConst.accountData.filter((item) => {
        return this.infoData.WITHDRAW_ACCOUNT_TYPE == item.id;
      });

      result = result.length != 0 ? result[0].name : "";
      //HDH00005_01-346 NCBは銀行がなしのでNULL判断を追加する。2022-10-04
      let bankname = this.infoData?.WITHDRAW_FACIL_NAME;
      if (bankname && this.isBranch(commonConst.BRANCH_DIVISION.CHEER)) {
        var isSpecialBank = commonJs.SearchSpecialBank(bankname);
        // 西安7
        let account = this.accountID(this.infoData.WITHDRAW_ACCOUNT_NUMBER)

        if (
          bankname.substr(bankname.length - 2, 2) != "銀行" &&
          isSpecialBank.length == 0
        ) {
          bankname = bankname + "銀行";
        }

        this.infoBank = [
          bankname,
          this.infoData.WITHDRAW_SUB_NAME + "支店",
          result,
          // 口座
          account,
        ];
      }
    },
    // 投資経験
    getInfoInvest() {
      if (this.infoData.EXPERIENCE_INVESTMENT_TYPE !== null) {
        if (this.infoData.EXPERIENCE_INVESTMENT_TYPE.length > 1) {
          var investData = this.infoData.EXPERIENCE_INVESTMENT_TYPE.split(",");
          investData.forEach((item) => {
            if (item == "1") {
              this.infoInvest[0] = "あり";
            } else if (item == "2") {
              this.infoInvest[1] = "あり";
            } else if (item == "3") {
              this.infoInvest[2] = "あり";
            }
          });
        } else if (this.infoData.EXPERIENCE_INVESTMENT_TYPE.length === 1) {
          this.infoInvest[
            Number(this.infoData.EXPERIENCE_INVESTMENT_TYPE) - 1
          ] = "あり";
        }
      }
    },
    // ご希望の取引種類
    getInforDesired() {
      if (this.infoData.DESIRED_INVESTMENT_TYPE !== null) {
        this.inforDesired = this.infoData.DESIRED_INVESTMENT_TYPE.replace(
          /,/g,
          " "
        )
          .replace(/1/, "国内株式")
          .replace(/2/, "外国株式")
          .replace(/3/, "投資信託");
      }
    },
    //お客さまに関係する上場企業との関係
    inforInsider() {
      let arr = [];
      let newValue = this.infoData;
      for (let p in newValue) {
        if (p.includes("INSIDER_TYPE") && typeof newValue[p] === "number") {
          let num = p.replace("INSIDER_TYPE", "");
          let obj = {};
          obj = commonConst.INSIDER_TYPES[newValue["INSIDER_TYPE" + num] - 1];

          var name = "INSIDER_BRAND_NAME" + p.match(/\d+/g)[0];
          arr.push({
            name: this.infoData[name],
            relation: obj,
          });
        }
      }
      arr = arr.length == 0 ? ["該当しない"] : arr;
      return arr;
    },
    // 主な収入源,金融資産
    dataformat(seletdatas, selected) {
      if (selected == null) return;
      var result = seletdatas.filter((item) => {
        return selected == item.id;
      });
      return result.map((item) => {
        return item.title;
      });
    },
    // 変更画面へ遷移する
    routerTo(url, params) {
      const str = JSON.stringify(params).replace(/\//g, "%2F");
      this.$router.push({
        path: `/${url}/${str}`,
      });
    },
    // 口座暗号化
    accountID(num) {
      return (num + "")
        .split("")
        .map((v, i) => (i < (num + "").length - 4 ? "*" : v))
        .join("");
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
    //@ 年齢フォーマット
    getAge() {
      if (!this.infoData.BIRTH_D) {
        return "";
      }
      return commonJs.ComputeAge(this.infoData.BIRTH_D) + "歲";
    },
    // 性别
    getSex() {
      if (!this.infoData.SEX) {
        return "";
      }
      return this.infoData.SEX == 1 ? "男性" : "女性";
    },
    // 職業・勤務先
    OCCUPATION() {
      if (this.infoData.OCCUPATION_TYPE == "") return "";

      let USER_OCCUPATION_TYPE = this.infoData.OCCUPATION_TYPE;
      let USER_OCCUPATIONS = this.USER_OCCUPATIONS;

      for (let i = 0, len = USER_OCCUPATIONS.length; i < len; ++i) {
        if (USER_OCCUPATIONS[i].id == USER_OCCUPATION_TYPE) {
          return USER_OCCUPATIONS[i].value;
        } else if (USER_OCCUPATIONS[i].children) {
          let children = USER_OCCUPATIONS[i].children;
          for (let j = 0, len1 = children.length; j < len1; ++j) {
            if (children[j].id == USER_OCCUPATION_TYPE)
              return children[j].value + USER_OCCUPATIONS[i].value;
          }
        }
      }
      return "";
    },
  },
  created() {
    this.setPageTittle(pageInfoConst.TITTLE.SETTING);
    this.setPageHeaderType(pageInfoConst.HEADER_TYPE.GUEST);
    this.setPageFooterType(pageInfoConst.FOOTER_TYPE.NORMAL);
    this.userInfo();
  },
};
