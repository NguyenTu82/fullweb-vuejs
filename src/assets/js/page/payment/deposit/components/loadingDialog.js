import cRoundButton from "@/components/button/cRoundButton";
import Model from "@/components/common/dialog/Caution";
import constant from "@/const/common";

export default {
  data() {
    return {
      check: false,
    };
  },
  components: { cRoundButton, Model },
  name: "loadingDialog",
  props: ["stage", "pinError"],
  methods: {
    handleOkDialog() {
      if (this.dataDialog.isDisable) {
        return;
      }
      if (this.pinError.CODE) {
        this.check = true;
      } else {
        this.$emit("handleOkDialog");
      }
    },
    setCheck() {
      this.check = false;
    },
  },
  computed: {
    dataDialog() {
      this.setCheck();
      if (this.pinError.CODE) {
        return {
          isShow: true,
          title: "入金失敗",
          text:
            this.codeJson[this.pinError.CODE] ||
            this.pinError.MESSAGE ||
            constant.DEFAULT_ERROR,
          isDisable: false,
        };
      } else {
        switch (this.stage) {
          case constant.REAL_TIME_CASH_IN_DIALOG_STAGE.SUCCESS:
          case constant.REAL_TIME_CASH_IN_DIALOG_STAGE.SPECIAL_SUCCESS:
            return {
              isShow: true,
              title: "リアルタイム入金受付",
              text: "ご入金指示を受付けました。",
              isDisable: false,
            };
          case constant.REAL_TIME_CASH_IN_DIALOG_STAGE.ERROR:
          case constant.REAL_TIME_CASH_IN_DIALOG_STAGE.ERROR_API:
          case constant.REAL_TIME_CASH_IN_DIALOG_STAGE.SPECIAL_ERROR:
            return {
              isShow: true,
              title: "入金失敗",
              text: "残高が不足しています。",
              isDisable: false,
            };
          case constant.REAL_TIME_CASH_IN_DIALOG_STAGE.LOADING:
            return {
              isShow: true,
              title: "入金処理中",
              text: "",
              isDisable: true,
            };
          default:
            return {
              isShow: false,
              title: "",
              text: "",
              isDisable: true,
            };
        }
      }
    },
  },
};
