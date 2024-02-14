import { mapGetters, mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import commonConst from "@/const/common";
import commonJs from "@/assets/js/common/common";

export default {
  name: "Name",
  data() {
    return {
      oldNameData: {},
      newNameData: {
        newName1: "",
        newName2: "",
        newNameKana1: "",
        newNameKana2: "",
      },
      formData: {
        NAME_CHG_FLG: 1,
        NAME: "",
        KANA_NAME: "",
        channel:'2'
      },
      showDialog: false,
      newName1Err: false,
      newName2Err: false,
      newNameKana1Err: false,
      newNameKana2Err: false,
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
    cancel() {
      this.showDialog = false;
    },
    routerData() {
      this.oldNameData = JSON.parse(this.$route.params.userName);
    },
    hiraganaToKatagana(src) {
      let newStr = '';
      for (let i = 0; i < src.length; ++i) {
        if (src[i].match(/[\u3041-\u3096]/)) {
          newStr += String.fromCharCode(src.charCodeAt(i) + 0x60);
        } else {
          newStr += src[i];
        }
      }

      return newStr;
    },
    blurHandle(index, value) {
      value = this.commonJs.removeEmojiNSpace(value);
      value = this.commonJs.trimAndTransSpace(value);

      if (!index.includes('Kana')) {
        let cValue = '';
        if (!value.match(/[^\u3040-\u30FF\u3000]+/)) {
          cValue = this.hiraganaToKatagana(value);
        }
        this.newNameData[index.substr(0,7) + 'Kana' + index.substr(-1)] = cValue;

        //convert half-width to full-width
        value = this.commonJs.hankaku2Zenkaku(value);
      }

      this.newNameData[index] = value;
    },
    handleVerify(index) {
      let value = this.newNameData[index];
      //verify if the current item's value matches requirement
      if (index.includes('Kana')) {
        this[index + 'Err'] = !!value.match(/[^\u30A0-\u30FF\u3000]+/);
      } else {
        this[index + 'Err'] = !this.commonJs.isAllFullwidthStr(value);
      }
    },
    change() {
      if (this.isAllFinished) {
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
    isAllFinished() {
      this.handleVerify('newName1');
      this.handleVerify('newName2');
      this.handleVerify('newNameKana1');
      this.handleVerify('newNameKana2');

      if (
        this.newNameData.newName1 == '' ||
        this.newNameData.newName2 == '' ||
        this.newNameData.newNameKana1 == '' ||
        this.newNameData.newNameKana2 == '' ||
        this.newName1Err ||
        this.newNameKana1Err ||
        this.newName2Err ||
        this.newNameKana2Err
      ) {
        return false;
      }

      return true;
    }
  },
  watch: {
    newNameData: {
      handler(newVal) {
        this.formData.NAME =
          newVal.newName1.trim() + "　" + newVal.newName2.trim();
        this.formData.KANA_NAME =
          newVal.newNameKana1.trim() + "　" + newVal.newNameKana2.trim();
      },
      deep: true,
    },
  },
  created() {
    this.setPageTittle(pageInfoConst.TITTLE.SETTING);
    this.setPageHeaderType(pageInfoConst.HEADER_TYPE.GUEST);
    this.setPageFooterType(pageInfoConst.FOOTER_TYPE.NORMAL);
    this.routerData();
  },
};
