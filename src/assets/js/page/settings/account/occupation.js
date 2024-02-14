import { mapGetters, mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import commonConst from "@/const/common";

export default {
  name: "Occupation",
  data() {
    return {
      professionals: commonConst.OCCUPATION_TYPES,
      industrys: commonConst.BUSINESS_CATEGORY,
      btnFlag: false,
      oldJob: [],
      formData: {
        JOB_CHG_FLG: 1,
        OCCUPATION_TYPE: null,
        BUSINESS_CATEGORY: null,
        EMPLOYMENT: "", // 勤務先
        DEPARTMENT: "", // 部署
        POSITION: "", // 役職
        EMPLOYMENT_TEL_NO: "", // 勤務先電話番号
      },
      userProfessional: " ", // 職業選択
      isListed: null, // 上場企業かどうか
      megabite: " ", //業種
      deployment: "", // 部署
      service: "", // 役職
      noDeployment: false, // 部署なし
      noService: false, // 役職なし
      showDialog: false,
      phoneFlag: false,
      API: "/user/job",
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
      this.oldJob = JSON.parse(
        this.$route.params.userOccupation.replace(/%2F/g, "/")
      );
    },
    information() {
      if (this.oldJob[0].text == '上場企業会社役員') {
        this.userProfessional = '会社役員'
        this.isListed = 0
      } else if (this.oldJob[0].text == '非上場企業会社役員') {
        this.userProfessional = '会社役員'
        this.isListed = 1
      } else if (this.oldJob[0].text == '上場企業会社員/契約/派遣/パート/アルバイト') {
        this.userProfessional = '会社員/契約/派遣/パート/アルバイト'
        this.isListed = 0
      } else if (this.oldJob[0].text == '非上場企業会社員/契約/派遣/パート/アルバイト') {
        this.userProfessional = '会社員/契約/派遣/パート/アルバイト'
        this.isListed = 1
      } else {
        this.userProfessional = this.oldJob[0].text
      }
      this.selectedPro()
      if (this.oldJob[0].text != '無職 / 主婦 / 学生等') {
        this.formData.EMPLOYMENT = this.oldJob[1].text
        if (this.oldJob[0].text != '医師') {
          this.megabite = this.oldJob[2].text
          this.formData.EMPLOYMENT_TEL_NO = this.oldJob[5].text ? this.oldJob[5].text : ""
          if (this.oldJob[3].text != '部署なし') {
            this.deployment = this.oldJob[3].text
          } else {
            this.noDeployment = true
          }
          if (this.oldJob[4].text != '役職なし') {
            this.service = this.oldJob[4].text
          } else {
            this.noService = true
          }
        } else {
          this.megabite = " "
          this.formData.EMPLOYMENT_TEL_NO = this.oldJob[4].text ? this.oldJob[4].text : ""
          if (this.oldJob[2].text != '部署なし') {
            this.deployment = this.oldJob[2].text
          } else {
            this.noDeployment = true
          }
          if (this.oldJob[3].text != '役職なし') {
            this.service = this.oldJob[3].text
          } else {
            this.noService = true
          }
        }
      }
    },
    isBtnFlag() {
      if (this.service.trim().length === 0 && this.noService === false) {
        this.btnFlag = false
        return
      }
      if (this.deployment.trim().length === 0 && this.noDeployment === false) {
        this.btnFlag = false
        return
      }
      if (this.phoneFlag && this.formData.OCCUPATION_TYPE !== 11) {
        this.btnFlag = false
        return
      }
      this.industrys.forEach((item, index) => {
        if (item.value == this.megabite) {
          this.formData.BUSINESS_CATEGORY = index + 1;
        }
      });
      if (this.deployment.length == 0) {
        this.formData.DEPARTMENT = "";
      } else {
        this.formData.DEPARTMENT = this.deployment;
      }
      if (this.service.length == 0) {
        this.formData.POSITION = "";
      } else {
        this.formData.POSITION = this.service;
      }
      if (!this.formData.OCCUPATION_TYPE) {
        this.btnFlag = false
        return;
      } else if (
        this.formData.OCCUPATION_TYPE !== 6 &&
        this.formData.OCCUPATION_TYPE !== 11 &&
        !this.formData.BUSINESS_CATEGORY
      ) {
        this.btnFlag = false
        return;
      } else if (
        (!this.formData.EMPLOYMENT.length ||
          !this.formData.EMPLOYMENT_TEL_NO.length) &&
        this.formData.OCCUPATION_TYPE !== 11
      ) {
        this.btnFlag = false
        return;
      }
      this.btnFlag = true
    },
    selectedPro() {
      this.professionals.forEach((item) => {
        if (item.value === this.userProfessional && !item.id) {
          if (this.isListed === 0) {
            this.listedYes();
          } else {
            this.listedNo();
          }
        } else if (item.value === this.userProfessional) {
          this.formData.OCCUPATION_TYPE = item.id;
          this.isListed = null;
        }
      });
      if (this.formData.OCCUPATION_TYPE == 11) {
        this.formData = {
          JOB_CHG_FLG: 1,
          OCCUPATION_TYPE: 11,
          BUSINESS_CATEGORY: null,
          EMPLOYMENT: "",
          DEPARTMENT: "",
          POSITION: "",
          EMPLOYMENT_TEL_NO: "",
        };
        this.deployment = "";
        this.service = "";
        this.noDeployment = false;
        this.noService = false;
      }
    // 西安 HDH00005_01-388 ①   10/4
    this.isListed = null
    this.formData.OCCUPATION_TYPE = null
      this.isBtnFlag()
    },
    listedYes() {
      this.isListed = 0;
      if (this.userProfessional === "会社役員") {
        this.formData.OCCUPATION_TYPE = 1;
      } else {
        this.formData.OCCUPATION_TYPE = 3;
      }
      this.isBtnFlag()
    },
    listedNo() {
      this.isListed = 1;
      if (this.userProfessional === "会社役員") {
        this.formData.OCCUPATION_TYPE = 2;
      } else {
        this.formData.OCCUPATION_TYPE = 4;
      }
      this.isBtnFlag()
    },
    changePhone(val) {
      if (val.match(/^0[0-9]{10}/) || val.match(/^0[0-9]{9}/)) {
        this.phoneFlag = false;
      } else {
        this.phoneFlag = true;
      }
      this.isBtnFlag()
    },
    submitForm() {
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
    flag1() {
      if (
        this.userProfessional == "会社役員" ||
        this.userProfessional == "会社員/契約/派遣/パート/アルバイト" ||
        !this.userProfessional
      ) {
        return false;
      } else {
        return true;
      }
    },
    flag2() {
      if (
        this.formData.OCCUPATION_TYPE == 11 ||
        !this.formData.OCCUPATION_TYPE
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    formData: {
      handler(newVal) {
        if (newVal.OCCUPATION_TYPE == 6) {
          this.formData.BUSINESS_CATEGORY = null;
          this.megabite = " ";
        }
        this.isBtnFlag()
      },
      immediate: true,
      deep: true,
    },
    deployment: {
      handler(newVal) {
        if (newVal.length != 0 || this.formData.OCCUPATION_TYPE == 11) {
          this.noDeployment = false;
        } else {
          this.noDeployment = true;
        }
        this.isBtnFlag()
      },
      deep: true,
    },
    service: {
      handler(newVal) {
        if (newVal.length != 0 || this.formData.OCCUPATION_TYPE == 11) {
          this.noService = false;
        } else {
          this.noService = true;
        }
        this.isBtnFlag()
      },
      deep: true,
    },
    noDeployment: {
      handler(newVal) {
        if (newVal == true) {
          this.deployment = "";
        }
        this.isBtnFlag()
      },
    },
    noService: {
      handler(newVal) {
        if (newVal == true) {
          this.service = "";
        }
        this.isBtnFlag()
      },
    },
  },
  created() {
    this.setPageTittle(pageInfoConst.TITTLE.SETTING);
    this.setPageHeaderType(pageInfoConst.HEADER_TYPE.GUEST);
    this.setPageFooterType(pageInfoConst.FOOTER_TYPE.NORMAL);
    this.routerData();
    this.information()
    this.isBtnFlag()
    // 西安 HDH00005_01-388 ①   10/4
    this.isListed = null
    this.formData.OCCUPATION_TYPE = null
  },
};
