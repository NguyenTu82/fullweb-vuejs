import { mapGetters, mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import httpRequest from "@/assets/js/common/httpRequest";
import commonConst from "@/const/common";
import Message from "@/views/settings/components/Message.vue";

export default {
  name: "Confirm2",
  components: { Message },
  data() {
    return {
      bankData: {},
      password: "",
      mail: "",
      ct: ["", "", "", ""],
      text: "",
      messageDialog: false,
      // HDH00005_01-217 リンクがハードコーディングで実装され防止　2022-10-05
      HELPMAIL: commonConst.HELPMAIL,
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
    routeConfirm() {
      const dataBank = JSON.parse(sessionStorage.getItem("dataBank"))
      if (!dataBank) {
        this.$router.back();
      } else {
        this.bankData = dataBank.data
        this.password = dataBank.password;
      }
    },
    again() {
      httpRequest
        .post("/user/withdraw_send_verify_code", {
          ...this.bankData,
          SECRET: this.password,
        })
        .then((res) => {
          if (res.status == 200 && !res.data.ERROR) {
            this.messageDialog = true;
            this.text = "再度送付しました";
          }
        });
    },
    determine() {
      this.messageDialog = false;
    },
    change() {
      let flag = true;
      this.ct.forEach((item) => {
        if (!item) {
          flag = false;
          return;
        }
      });
      const code = this.vcode;
      if (flag) {
        const data = {
          ...this.bankData,
          VERIFY_CODE: code,
        };
        httpRequest.post("/user/withdraw", data).then((res) => {
          if (res.status == 200 && res.data.STATUS == "OK") {
            sessionStorage.setItem("message", "OK")
            this.$router.push("/done2")
          }
        });
      }
    },
    onInput(val, index) {
      this.msg = "";
      // eslink -disable-next-line
      val = val.replace(/\s/g, "");
      if (val.length > 1) {
        let i = index;
        for (i = index; i < this.ctSize && i - index < val.length; i++) {
          this.ct[i] = val[i];
        }
        this.resetCaret();
      }
      this.onFocus();
    },
    resetCaret() {
      this.$nextTick(() => {
        this.$refs.input[this.ctSize - 1].focus();
      });
    },
    onFocus() {
      let index = this.ct.findIndex((item) => item == "");
      index = (index + this.ctSize) % this.ctSize;
      this.$nextTick(() => {
        this.$refs.input[index].focus();
      });

      this.nowFocusIndex = index;
    },
    onKeydown(val, index) {
      if (val == "") {
        if (index > 0) {
          this.ct[index - 1] = "";
          this.$nextTick(() => {
            this.$refs.input[index - 1].focus();
          });
        }
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
    ctSize() {
      return this.ct.length;
    },

    cIndex() {
      let i = this.ct.findIndex((item) => item == "");
      i = (i + this.ctSize) % this.ctSize;
      return i;
    },
    lastCode() {
      return this.ct[this.ctSize - 1];
    },

    vcode() {
      return this.ct[0] + this.ct[1] + this.ct[2] + this.ct[3];
    },
    lock() {
      const { ct } = this;
      let num = 0;
      ct.forEach((item) => {
        if (item) {
          num += 1;
        }
      });
      if (num == 4) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    this.setPageTittle(pageInfoConst.TITTLE.SETTING);
    this.setPageHeaderType(pageInfoConst.HEADER_TYPE.GUEST);
    this.setPageFooterType(pageInfoConst.FOOTER_TYPE.NORMAL);
    this.routeConfirm();
  },
  beforeUnmount() {
    sessionStorage.removeItem("dataBank")
  }
};
