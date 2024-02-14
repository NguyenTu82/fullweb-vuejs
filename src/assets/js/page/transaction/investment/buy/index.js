import PopupShowMessage from "@/views/transaction/investment/common/PopupShowMessage.vue";
import TopInfo from "@/components/common/TopInfo";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";
import codeJson from "@/utils/codeJson.json";
import router from "@/router";
import {mapActions, mapGetters} from "vuex";

export default {
  title: "ホーム",
  name: "HomeLayout",
  components: {
    PopupShowMessage,
    TopInfo,
  },
  data() {
    return {
      inv_trust_assoc_cd: null,
      dataInvestBuy: null,
      tabArr: [
        { id: "2", title: "再投資型", active: false },
        { id: "1", title: "分配金受取型", active: false },
      ],
      bankInfo: null,
      bankArr: [
        {
          PAYMENT_ID: 1,
          BANK_NAME: "預り金",
          active: false,
        },
      ],
      methodsArr: [
        { id: 1, title: "金額指定", active: true },
        { id: 2, title: "預り金全部買付", active: false },
      ],
      tradepwd: null,
      focused: false,
      selectedMethods: 1,
      selectedBankMethods: null,
      currentSelectedBankName: null,
      inSuccess: false,
      canInBuy: false,
      canChargeMoney: false,
      num: null,
      contractStatus: null,
      paymentListBank: [],
      dataPopup: null,
      new_dividend_handling_cls: null,
      showModalBankResult: false,
      showOrderDataError: true,
      pdfListInfo: null,
      pdfList: null,
      modelShow: false,
      initDefaultModalShow: [false, false, false, false, false, false],
      currentModalShowIndex: null,
      cautionModal: false,
      showBuyUnitAmt: true,
      dividendHandlingCls: "",
      prospeResContent: "",
    };
  },
  directives: {
    setFocus(el, binding) {
      if (el && binding.value) {
        el.focus();
      }
    },
  },
  computed: {
    ...mapGetters(["getUserInfo", "getReadDocument"]),

    showReduceBtn() {
      return (
        this.num > this.dataInvestBuy.min_buy_amt &&
        this.selectedMethods == 1 &&
        !this.inSuccess &&
        this.selectedBankMethods != null
      );
    },
    showAddBtn() {
      const currentPayID = this.selectedBankMethods;
      if (currentPayID && currentPayID == "1") {
        return (
          this.num < this.dataInvestBuy.buying_power &&
          this.selectedMethods == 1 &&
          !this.inSuccess
        );
      } else {
        return true;
      }
    },
  },
  watch: {
    tradepwd() {
      if (
        this.tradepwd.length == 4 &&
        parseInt(this.num) >= parseInt(this.dataInvestBuy.min_buy_amt) &&
        this.selectedBankMethods &&
        this.selectedBankMethods !== "3"
      ) {
        if (this.selectedBankMethods == 1) {
          this.canInBuy = true;
        } else {
          this.canChargeMoney = true;
        }
      } else {
        this.canInBuy = false;
        this.canChargeMoney = false;
      }
    },
    num(newVal, oldVal) {
      if ((newVal >= this.dataInvestBuy.buying_power) && this.selectedBankMethods == "1") {
        this.num = this.dataInvestBuy.buying_power;
        newVal = this.dataInvestBuy.buying_power;        
      } else if (newVal < this.dataInvestBuy.buying_power) {
        this.showOrderDataError = true;
      }
    },
  },
  created() {
    // Set Hide handle show error default
    this.$store.commit("showPopup", { isShow: false });

    const { inv_trust_assoc_cd, dataPopupDividendCls, order_amt } = this.$route.query;
    this.inv_trust_assoc_cd = inv_trust_assoc_cd;
    this.new_dividend_handling_cls = dataPopupDividendCls;
    this.putTabArr(dataPopupDividendCls);
    this.getDataInvestStockBuyOrder({
      isSkipErrorhand: true
    }).then((res) => {
      if (res.STATUS === "OK") {
        this.dividendHandlingCls = res.DATA.dividend_handling_cls;
        this.handleGetPdfFile().then((res) => {
          this.pdfListInfo = res;
          this.pdfList = this.pdfListInfo.DATA.doc_info_list;
          if (this.pdfList && this.pdfList.length) {
            this.currentModalShowIndex = 0;
            this.modelShow = true;
            this.initDefaultModalShow[this.currentModalShowIndex] = true;
          }
        });
      } else {
        if (res.ERROR) this.handleError(res.ERROR);
      }
    });
    this.getInvestOrderBank().then((res) => {
      if (res.length) {
        this.bankArr = [...this.bankArr, ...res];
        this.contractStatus = res[0].CONTRACT_STATUS;
        this.paymentListBank = res[0].PAYMENT_FEE_LIST;
      }
    });
    // Check data back C611
    if(order_amt){
      this.num = order_amt
    }

    this.selectedMethods = this.$route.query.amt_qty_designated_cls ?? 1;
    if(this.selectedMethods == 2){
      this.methodsArr[1].active = true;
      this.methodsArr[0].active = false;
    }
  },
  methods: {
    ...mapActions(["getUserInfoApi", "getDocumentsRead"]),

    resetData() {
      this.num = null;
      this.tradepwd = "";
    },
    async getDataInvestStockBuyOrder(config={}) {
      await this.$store.dispatch("getInvestStockBuyOrder", {
        inv_trust_assoc_cd: this.inv_trust_assoc_cd,
      }, config);
      this.dataInvestBuy = this.$store.getters.getInvestStockBuyOrder?.DATA;
      return this.$store.getters.getInvestStockBuyOrder;
    },
    async getInvestOrderBank() {
      await this.$store.dispatch("getInvestOrderBank", {
      });
      this.bankInfo = this.$store.getters.getInvestOrderBank.DATA;
      return this.bankInfo;
    },

    handelClickTab(item) {
      this.tabArr = this.tabArr.map((item) => {
        item.active = false;
        return item;
      });
      item.active = true;
      this.new_dividend_handling_cls = item.id;
    },
    handelMethods(item) {
      if (!this.selectedBankMethods || (this.selectedBankMethods == 2 && item.id == 2)) {
        return;
      }
      this.methodsArr = this.methodsArr.map((item) => {
        item.active = false;
        return item;
      });
      item.active = true;
      this.selectedMethods = item.id;
      if (item.id == 2) {
        this.num = this.dataInvestBuy.buying_power;
        this.showBuyUnitAmt = false;
        this.showOrderDataError = false;
      } else {
        this.num = this.dataInvestBuy.min_buy_amt;
        this.showBuyUnitAmt = true;
        this.showOrderDataError = true;
      }
    },
    valueFormatter() {
      let value = parseInt(this.num || 0);
      this.num = value;
      return commonJs.cashFormatter(value);
    },
    putTabArr(id) {
      this.tabArr = this.tabArr.map((item) => {
        item.active = item.id == id;
        return item;
      });
    },
    handelSelectBank(event) {
      this.resetData();
      this.selectedBankMethods = event.target.value;
      const selectTarget = event.target;
      this.currentSelectedBankName =
        event.target.options[selectTarget.selectedIndex].text;
      if (this.selectedBankMethods && this.selectedBankMethods != 1) {
        let isAllBuy = this.methodsArr[1].active;
        this.methodsArr = this.methodsArr.map((item) => {
          item.active = false;
          return item;
        });
        this.methodsArr[0].active = true;
        this.selectedMethods = this.methodsArr[0].id;
        this.dataInvestBuy.min_buy_amt = this.bankArr[1].MIN_AMOUNT;
        this.dataInvestBuy.buy_unit_amt = this.bankArr[1].UNIT_AMOUNT;
        this.showBuyUnitAmt = true;
        if(isAllBuy) {
          this.$store.commit("showPopup", {
            isShow: true,
            text: "引落先に銀行口座を選択されている場合は、預り金全部買付を選択できません。",
            btnName: "OK",
            title: null,
          });
        }
      } else {
        this.getDataInvestStockBuyOrder();
      }
    },
    handleBackUsDetail() {
      this.$router.push(this.$router.prevRoute)
    },
    handdelReduce() {
      this.tradepwd = "";
      if (this.inSuccess) return;
      if (!this.num || this.num == this.dataInvestBuy.min_buy_amt) return;
      const bugUnitAmt = parseInt(this.dataInvestBuy.buy_unit_amt);
      if (this.num <= this.dataInvestBuy.min_buy_amt) {
        this.num = this.dataInvestBuy.min_buy_amt;
        return;
      }
      if (this.num % bugUnitAmt) {
        this.num = this.num - (this.num % bugUnitAmt);
        return;
      }
      if (this.showReduceBtn) {
        this.num = +this.num - this.dataInvestBuy.buy_unit_amt; //金额单位
      }
    },
    // 加金额
    handdelAdd: function () {
      this.tradepwd = "";
      if (this.inSuccess) return;
      const bugUnitAmt = parseInt(this.dataInvestBuy.buy_unit_amt);

      if (!this.num || this.num < this.dataInvestBuy.min_buy_amt) {
        this.num = parseInt(this.dataInvestBuy.min_buy_amt);
        return;
      }
      if (this.num % bugUnitAmt) {
        this.num = this.num + (bugUnitAmt - (this.num % bugUnitAmt));
        return;
      }
      if (this.showAddBtn) {
        this.num = +this.num + bugUnitAmt;
      }
    },
    handelInputNum($event) {
      this.tradepwd = "";
      if (this.selectedBankMethods == "1") {
        this.num = parseInt($event.target.value.slice(0, 10)) || 0;
      } else {
        this.num = parseInt($event.target.value.slice(0, 20)) || 0;
      }
      setTimeout(() => {
        if (this.num == 0) $event.target.value = "";
      });
    },
    inputNumBlur() {
      this.tradepwd = "";
      if (this.selectedBankMethods == "1") {
        if (this.num < this.dataInvestBuy.min_buy_amt) {
          this.num = this.dataInvestBuy.min_buy_amt;
        }
        if (this.num > this.dataInvestBuy.buying_power) {
          this.num = this.dataInvestBuy.buying_power;
        }
        this.focused = false;
      } else {
        this.focused = false;
        return this.num;
      }
    },
    async handleChargeMoneyFromBank() {
      if (this.selectedBankMethods == 1) return;
      if (!this.canChargeMoney) return;
      if (this.contractStatus != 0) {
        let FEE_WITH_TAX = this.paymentListBank.find(
          (it) =>
            it.LOWER_AMOUNT_LIMIT <= this.num &&
            this.num <= it.UPPER_AMOUNT_LIMIT
        );
        await this.$store
          .dispatch("handleInvestOrderBank", {
            PAYMENT_ID: 2,
            AMOUNT: this.num,
            FEE_WITH_TAX: FEE_WITH_TAX.FIXED_FEE_WITH_TAX,
            SECRET: commonJs.hashPwd(this.tradepwd),
          })
          .then(() => {
            const res = this.$store.getters.handleInvestOrderBank;
            if (res.STATUS == "OK") {
              this.dataPopup = res.DATA;
              this.openPopup();
              this.getDataInvestStockBuyOrder();
              this.canInBuy = true;
              this.canChargeMoney = false;
            }
          });
      } else {
        this.$router.push({name: "BankAccountRegist"});
      }
    },
    openPopup() {
      this.showModalBankResult = true;
    },
    hidePopup() {
      this.showModalBankResult = false;
    },
    setDefaultBank() {
      this.bankArr = this.bankArr.map((item) => {
        item.active = false;
        return item;
      });
      this.bankArr[0].active = true;
      this.selectedBankMethods = this.bankArr[0].PAYMENT_ID;
    },
    async handleBuyStockOrder() {
      await this.$store
        .dispatch("handleBuyStockOrder", {
          inv_trust_assoc_cd: this.inv_trust_assoc_cd,
          dividend_handling_cls: this.new_dividend_handling_cls,
          account_cls: "2",
          amt_qty_designated_cls: this.selectedMethods + "",
          order_amt: `${this.num}`,
          password: commonJs.hashPwd(this.tradepwd),
        })
        .then(() => {
          const res = this.$store.getters.handleBuyStockOrder;
          if (res.STATUS == "OK") {
            this.routerToStockBuyInfo();
          }
        });
    },
    async handleGetPdfFile() {
      await this.$store.dispatch("getPdfFile", {
        inv_trust_assoc_cd: this.inv_trust_assoc_cd,
        doc_cls: null,
        agree_sts: "0",
        search_ver_cls: "1",
        agreement_cls: "1",
      });
      this.pdfListInfo = this.$store.getters.getPdfFile;
      return this.pdfListInfo;
    },
    routerToStockBuyInfo() {
      this.$router.push({
        path: "/transaction/investment/buy/confirm",
        query: {
          PAYMENT_ID: this.selectedBankMethods,
          PAYMENT_NAME: this.currentSelectedBankName,
          inv_trust_assoc_cd: this.inv_trust_assoc_cd,
          dividend_handling_cls: this.new_dividend_handling_cls,
          account_cls: "",
          amt_qty_designated_cls: this.selectedMethods + "",
          order_amt: `${this.num}`,
          password: commonJs.hashPwd(this.tradepwd),
        },
      });
    },
    modelHide() {
      this.modelShow = false;
      this.$store.commit("showPopup", { isShow: false });
    },
    modalCancelClick(index) {
      this.modelHide();
      if (index === 2) {
        this.$router.go(-1);
      }
    },
    accountConfirmClick() {
      this.modelHide();
      //go to screen F110-口座登録情報
      this.getUserInfoApi().then(() => {
        if (this.getUserInfo.STATUS === "OK" && !this.getUserInfo.ERROR) {
          commonJs.saveLocalData("userInfo", this.getUserInfo.DATA.USER);
          router.push({name:'account'})
        }
      });
    },
    goOrderInvestClick() {
      this.modelHide();
      router.push({path:'/reference/order/invest'})
    },
    handleError(error) {
      if (
        error.CODE === "E74006_0012" ||
        error.CODE === "E74006_0013" ||
        error.CODE === "E74006_0011" ||
        error.CODE === "E_0028"
      ) {
        // ■【C610-5】同銘柄注文
        this.handleShowModalByIndex(5);
      } else if (error.CODE === "E74006_0019") {
        // C610-4 - 購入画面（投資目的）
        // API「7-40-06_投資信託買注文初期表示」からE74006_0019が返ってきた場合
        this.handleShowModalByIndex(4);
      } else if (error.CODE === "E74006_0018") {
        // C610-4 - 購入画面（投資目的）
        // API「7-40-06_投資信託買注文初期表示」からE74006_0018が返ってきた場合
        this.handleShowModalByIndex(2);
      } else {
        if (
          error.CODE === "E_0029" ||
          error.CODE === "E74006_0014" ||
          error.CODE === "E74006_0015"
        ) {
          // ■【C610-3】目論見書改版
          this.handleShowModalByIndex(1);
          this.prospeResContent = codeJson[error.CODE] || constant.DEFAULT_ERROR
        } else {
          const message = codeJson[error.CODE] || constant.DEFAULT_ERROR;
          this.showAlertTips(message, true);
        }
      }
    },
    handleShowModalByIndex(index) {
      this.currentModalShowIndex = index;
      this.modelShow = true;
      this.initDefaultModalShow[this.currentModalShowIndex] = true;
    },
    handleShowCaution() {
      (this.initDefaultModalShow = [false, false, false, false, false, false]),
        (this.modelShow = true);
      this.cautionModal = true;
    },
    async modalConfirm(type) {
      switch (type) {
        case 1:
          if (this.pdfList.filter((it) => !it.delivery_dt).length) return;
          // 处理pdf数组
          var pdfInfoList = this.pdfList.map((it) => ({
            inv_trust_assoc_cd: this.inv_trust_assoc_cd,
            doc_cls: it.doc_cls,
            doc_revision_no: it.doc_revision_no,
            delivery_agree_cls: 2,
          }));
          //7_40_05
          await this.$store
            .dispatch("handleReadPdfFile", {
              doc_info_list: pdfInfoList,
            })
            .then(() => {
              const res = this.$store.getters.handleReadPdfFile;
              if (res.STATUS == "OK") {
                this.modelShow = false;
              }
            });
          break;
        case 2:
          this.modalCancelClick(2);
          break;
        // case 3:
        // 	this.modalCancelClick(2);
        // 	break;
        // case 4:
        // 	this.modalCancelClick(2);
        // 	break;
        // case 5:
        // 	this.modalCancelClick(2);
        // 	break;
      }
    },
    async goRead(item, index) {
      await this.registDocConfirmHist(item, () => {
        // readSuccess
        if (!item.delivery_dt) {
          this.pdfList[index].delivery_dt = commonJs.getNowDateTime();
        }
      });
    },

    readSuccess() {
      this.handleGetPdfFile().then((res) => {
        window.location.reload();
        this.pdfListInfo = res;
        this.pdfList = this.pdfListInfo.DATA.doc_info_list;
        if (this.pdfList && this.pdfList.length) {
          this.currentModalShowIndex = 0;
          this.modelShow = true;
          this.initDefaultModalShow[this.currentModalShowIndex] = true;
        }
      });
    },

    async registDocConfirmHist(item) {
      if (item["seq_no"] == null) {
        let pdfInfo = {
          inv_trust_assoc_cd: item.inv_trust_assoc_cd ?? 0,
          doc_cls: item.doc_cls,
          doc_revision_no: item.doc_revision_no,
          delivery_agree_cls: 1,
        };
        let pdfInfoList = [pdfInfo];
        await this.$store.dispatch("handleReadPdfFile", {
          doc_info_list: pdfInfoList,
        });
        let res = this.$store.getters.handleReadPdfFile;
        if (res.STATUS == "OK") {
          this.readSuccess();
        }
      } else {
        await this.getDocumentsRead({
          SEQ_NO: item["seq_no"],
          READ_FLG: 1 // is read
        });
        if (this.getReadDocument["STATUS"] == "OK") {
          this.readSuccess();
        }
      }
    },

    handNumberInt(number) {
      return commonJs.handNumberInt(number);
    },

    showAlertTips(text, noBack) {
      const _this = this;
      this.$store.commit("editMsg", {
        showImg: false,
        isShow: true,
        text: text,
        type: "prompt",
        btnName: "OK",
        okBtn() {
          if (noBack) return;
          if (window.history) {
            window.history.go(-1);
          } else {
            _this.$router.back();
          }
        }
      });
    },
  },
};
