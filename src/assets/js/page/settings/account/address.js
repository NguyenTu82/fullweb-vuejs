import { mapGetters, mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import commonConst from "@/const/common";
import httpRequest from "@/assets/js/common/httpRequest";
import Search from "@/views/settings/components/Search";
import commonJs from "@/assets/js/common/common";

export default {
  name: "Address",
  components: { Search },
  data() {
    return {
      addressConfirm: 0,
      oldAddress: {},
      newAddress: {
        newAddress1: "",
        newAddress2: "",
        newAddress3: "",
        newAddress4: "",        
      },
      // HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05
      HELPACCOUNT: commonConst.HELPACCOUNT,
      EXTERNAL: commonConst.EXTERNAL,
      municipalDistrict: "",
      city: -1, // AREA_CD
      addressCity: commonConst.TODOHUKENN, // 都道府县
      postalAddress: [],
      searchDialog: false,
      showDialog: false,
      searchTitle: "",
      postFlag: false,
      formData: {
        ADDRESS_CHG_FLG: 1,
        POSTAL_CD: "",
        ADDRESS1: "",
        ADDRESS2: "",
        ADDRESS3: "",
        ADDRESS3_KANA: "",
        ADDRESS4: "",
        ADDRESS4_KANA: "",
        AREA_CD: "",
        channel: '2'
      },
      flags: [false, false],
      btnFlag: false
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
    addressYes() {
      this.addressConfirm = 0;
      this.city = -1;
      console.log("addressYes>> DATA=", this.$store.state.cashInData.cashInData.cashInUserInfo.DATA);
      console.log("addressYes>> STATE_CD=", this.$store.state.cashInData.cashInData.cashInUserInfo.DATA.USER.AREA_CD);
      this.formData.STATE_CD = this.$store.state.cashInData.cashInData.cashInUserInfo.DATA.USER.AREA_CD;
      this.isBtnFlag()
    },
    addressNo() {
      this.addressConfirm = 1;
      this.isBtnFlag()
    },
    selectAddress() {
      if (this.city != -1) {
        this.formData.STATE_CD = this.city;
      }
      this.isBtnFlag()
    },
    routerData() {
      this.oldAddress = JSON.parse(this.$route.params.userAddress);
      console.log("addressYes>> DATA=", this.$store.state.cashInData.cashInData.cashInUserInfo.DATA);
      console.log("addressYes>> STATE_CD=", this.$store.state.cashInData.cashInData.cashInUserInfo.DATA.USER.AREA_CD);
      this.formData.STATE_CD = this.$store.state.cashInData.cashInData.cashInUserInfo.DATA.USER.AREA_CD;
    },
    searchCode() {
      if (this.formData.POSTAL_CD.length === 7) {
        this.searchTitle = "郵便番号";
        httpRequest
          .get("/search/address", {
            params: { zipcode: this.formData.POSTAL_CD },
          })
          .then((res) => {
            console.log(res);
            if (res.data.STATUS == "OK") {
              if (res.data.DATA.length === 0) {
                this.postFlag = true;
              } else {
                this.postFlag = false;
              }
              this.searchDialog = true;
            }
          });
      }
    },
    searchOK(obj) {
      this.formData.ADDRESS1 = obj.address1;
      this.formData.ADDRESS2 = obj.address2;
      this.formData.ADDRESS3 = obj.address3;
      this.municipalDistrict = obj.address1 + obj.address2 + obj.address3;
      this.addressCity.forEach((item) => {
        if (item.value == obj.address1) {
          this.formData.AREA_CD = obj.area_cd;
        }
      });
    },
    searchCancel() {
      this.searchDialog = false;
    },
    changeNameKana(item, index) {
      if (
        item.match(
          /[^\u30A0-\u30FF\u3000\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A]+/
        )
      ) {
        this.flags[index] = true;
      } else {
        this.flags[index] = false;
      }
      this.isBtnFlag()
    },
    blurKanaHandle(value, kanaIndex) {
      let val = value;
      val = commonJs.removeEmojiNSpace(val);
      val = commonJs.trimAndTransSpace(val);
      switch (kanaIndex) {
        case 0:
          this.newAddress.newAddress1 = commonJs.hankaku2Zenkaku(val);
          break;
        case 1:
          this.newAddress.newAddress2 = commonJs.hankaku2Zenkaku(val);
          this.changeNameKana(this.newAddress.newAddress2, 0);
          break;
        case 2:
          this.newAddress.newAddress3 = commonJs.hankaku2Zenkaku(val);
          break;
        case 3:
          this.newAddress.newAddress4 = commonJs.hankaku2Zenkaku(val);
          this.changeNameKana(this.newAddress.newAddress4, 1);
          break;
      }
    },
    isBtnFlag() {
      if (this.flags[0] || this.flags[1]) {
        this.btnFlag = false
        return
      }
      if (this.addressConfirm === 1 && this.city < 1) {
        this.btnFlag = false
        return
      }
      if (
        this.formData.POSTAL_CD &&
        this.formData.ADDRESS1 &&
        this.formData.ADDRESS2 &&
        this.newAddress.newAddress1.trim() &&
        this.formData.ADDRESS3_KANA
      ) {
        this.btnFlag = true
      } else {
        this.btnFlag = false
      }
    },
    change() {
      if (this.btnFlag) {
        this.formData.ADDRESS3 += this.newAddress.newAddress1.trim();
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
  watch: {
    newAddress: {
      handler(newVal) {
        this.formData.ADDRESS3_KANA = newVal.newAddress2.trim();
        this.formData.ADDRESS4 = newVal.newAddress3.trim() || "";
        this.formData.ADDRESS4_KANA = newVal.newAddress4.trim() || "";
      },
      deep: true,
      immediate: true,
    },
  },
};
