import TopInfo from "@/components/common/TopInfo";
import codeJson from "@/utils/codeJson.json";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "InvestStockSellOrder",
  title: "ホーム",
  components: {
    TopInfo,
  },
  data() {
    return {
      basicData: null,
      dataInvestSell: null,
      brandLabels: null,
      tabArr: [
        {
          dividend_cls_nm: "再投資型",
          dividend_cls: "2",
          active: false,
          sell_possible_qty: "420",
          approximate_sellable_amount: "100,000",
        },
        {
          dividend_cls: "1",
          dividend_cls_nm: "分配金受取型",
          active: false,
          sell_possible_qty: "420,960",
          approximate_sellable_amount: "100,000",
        },
      ],
      dataTemp: [
        {
          dividend_cls_nm: "再投資型",
          dividend_cls: "2",
          active: false,
          sell_possible_qty: 0,
          approximate_sellable_amount: 0,
        },
        {
          dividend_cls: "1",
          dividend_cls_nm: "分配金受取型",
          active: false,
          sell_possible_qty: 0,
          approximate_sellable_amount: 0,
        },
      ],
      methodsArr: [
        { id: 1, title: "金額指定", active: false },
        { id: 2, title: "全部売却", active: false },
      ],
      focused: false,
      selectMethod: {},
      selectAccount: {},
      num: 0,
      tradepwd: "",
      canSell: false,
      allSold: false,
      pdfListInfo: null,
      initDefaultModalShow: [false, false, false],
      modelShow: false,
      currentModalShowIndex: null,
      cautionModal: false,
      showOrderDataError: true,
    };
  },
  computed: {
    ...mapGetters(["getReadDocument"]),
  },
  directives: {
    setFocus(el, binding) {
      if (el && binding.value) {
        el.focus();
      }
    },
  },
  watch: {
    tradepwd() {
      if (
        (this.tradepwd.length == 4 &&
          this.num >= this.basicData.min_sell_amount) ||
        (this.tradepwd.length == 4 && this.allSold == true)
      ) {
        this.canSell = true;
      } else {
        this.canSell = false;
      }
    },
    num(newVal, oldVal) {
      if (newVal >= this.selectAccount.approximate_sellable_amount) {
        this.showOrderDataError = false; 
        this.num = this.selectAccount.approximate_sellable_amount;
        newVal = this.selectAccount.approximate_sellable_amount;        
      } else if (newVal < this.selectAccount.approximate_sellable_amount) {
        this.showOrderDataError = true;
      }
    },
  },
  created() {
    // Set Hide handle show error default
    this.$store.commit("showPopup", { isShow: false });

    this.num = this.$route.query.actualNum;
    let idMethodPayment = this.$route.query.amount_cls;

    this.orderId = this.$route.query.inv_trust_assoc_cd || null;
    this.tabArr[0].active = true;
    this.handleGetPdfFile().then((res) => {
      this.pdfListInfo = res;
      this.pdfList = this.pdfListInfo.DATA.doc_info_list;
      if (this.pdfList && this.pdfList.length) {
        this.currentModalShowIndex = 0;
        this.modelShow = true;
        this.initDefaultModalShow[this.currentModalShowIndex] = true;
      }
    });
    this.getStocKSellInfo().then((res) => {
      if (res.STATUS !== "OK") {
        const prospeRes = res.ERROR || {};
        if (prospeRes.CODE === "E-0029" || prospeRes.CODE === "E74009_0020") {
          this.prospeResContent = codeJson[prospeRes.CODE];
          this.handleShowModalByIndex(1);
        } else if (
          prospeRes.CODE === "E-0028" ||
          prospeRes.CODE === "E74009_0016" ||
          prospeRes.CODE === "E74009_0017"
        ) {
          this.handleShowModalByIndex(2);
        } else {
          const message =
            this.codeJson[res.data.ERROR.CODE] || constant.DEFAULT_ERROR;
          this.showAlertTips(message);
        }
      }

      this.basicData = res.DATA;
      let dataRes = res.DATA;
      dataRes.fund_position_quantity &&
        (this.tabArr = dataRes.fund_position_quantity);
      let clsActive = 0;
      if (this.tabArr[0].dividend_cls_nm == "分配金受取型") {
        this.tabArr.reverse();
      }
      if (this.tabArr.length == 1 && this.tabArr[0].dividend_cls == 1) {
        this.tabArr.unshift(this.dataTemp[0]);
      } else if (this.tabArr.length == 1 && this.tabArr[0].dividend_cls == 2) {
        this.tabArr.push(this.dataTemp[1]);
      }
      this.tabArr &&
        this.tabArr.forEach((item) => {
          item.active = false;
        });
      const basicDataFund1 = dataRes.fund_position_quantity
        ? dataRes.fund_position_quantity.find((it) => it.dividend_cls == 1 && it.approximate_sellable_amount > 0)
        : null;
      const basicDataFund2 = dataRes.fund_position_quantity
        ? dataRes.fund_position_quantity.find((it) => it.dividend_cls == 2 && it.approximate_sellable_amount > 0)
        : null;
      this.basicData.fund1 = basicDataFund1 || {};
      this.basicData.fund2 = basicDataFund2 || {};
      const dividendHandlingCls = this.$route.query.dataPopupDividendCls;
      if (dividendHandlingCls == 1) {
        clsActive = 1;
      } else {
        clsActive = 0;
      }
      if ((this.tabArr.length != 0 && idMethodPayment == '1') || !idMethodPayment) {
        this.handelMethods(this.methodsArr[0]);
      } else {
        this.handelMethods(this.methodsArr[1]);
      }
      if (dividendHandlingCls) {
        this.handelTab(clsActive);
      } else if (basicDataFund1) {
        const indexTab = this.tabArr.findIndex(
          (v) => v.dividend_cls == basicDataFund1.dividend_cls
        );
        this.handelTab(indexTab);
      } else if (basicDataFund2) {
        const indexTab = this.tabArr.findIndex(
          (v) => v.dividend_cls == basicDataFund2.dividend_cls
        );
        this.handelTab(indexTab);
      }
    });
  },
  methods: {
    ...mapActions(["getDocumentsRead"]),

    async modalConfirm(type) {
      switch (type) {
        case 1:
          if (this.pdfList.filter((it) => !it.delivery_dt).length) return;
          var pdfInfoList = this.pdfList.map((it) => ({
            inv_trust_assoc_cd: it.inv_trust_assoc_cd,
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
        case 3:
          await this.$router.push({name: 'orderInvest'})
          break;
      }
    },
    handleShowModalByIndex(index) {
      this.currentModalShowIndex = index;
      this.modelShow = true;
      this.initDefaultModalShow[this.currentModalShowIndex] = true;
    },
    modelHide() {
      this.modelShow = false;
    },
    modalCancelClick() {
      this.modelHide();
    },
    async getStocKSellInfo() {
      await this.$store.dispatch("getStocKSellInfo", {
        apiType: 6,
        inv_trust_assoc_cd: this.orderId,
        account_cls: 2,
      });
      this.dataInvestSell = this.$store.getters.getStocKSellInfo;
      return this.dataInvestSell;
    },
    handelTab(index) {
      this.allSold = false;
      this.tabArr.forEach((item) => {
        item.active = false;
      });
      this.tabArr[index].active = true;
      this.tabArr = [...this.tabArr];

      this.selectAccount = this.tabArr[index];

      if (this.selectMethod.id == 2) {
        this.num = this.selectAccount.approximate_sellable_amount;
      } else {
        this.num = this.num || 0;
      }
    },
    handelMethods(item) {
      this.methodsArr = this.methodsArr.map((item) => {
        item.active = false;
        return item;
      });
      item.active = true;
      this.selectMethod = item;
      if (item.id == 2) {
        this.allSold = true;
        this.num = this.selectAccount.approximate_sellable_amount;
      } else {
        if (this.allSold) {
          this.num = this.basicData.min_sell_amount;
        }
        this.allSold = false;
      }
    },
    numChange($event) {
      this.num = parseInt($event.target.value.slice(0, 10)) || 0;
      setTimeout(() => {
        if (this.num == 0) $event.target.value = "";
      });
    },
    inputNumBlur($event) {
      this.focused = false;
      if ($event.target.value.slice(0, 10) < this.basicData.min_sell_amount) {
        this.num = this.basicData.min_sell_amount;
      }
      if (
        $event.target.value.slice(0, 10) >
        this.selectAccount.approximate_sellable_amount
      ) {
        this.num = this.selectAccount.approximate_sellable_amount;
      }
    },
    valueFormatter() {
      if (this.selectMethod.id == "2") {
        return commonJs.cashFormatter(
          this.selectAccount.approximate_sellable_amount
        );
      } else {
        let value = parseInt(this.num || 0);
        this.num = value;
        return commonJs.cashFormatter(this.num);
      }
    },
    getDisabled(direction) {
      if (this.selectMethod.id == 2) return true;
      if (
        direction == 0 &&
        (this.num == 0 || this.num <= this.basicData.min_sell_amount)
      )
        return true;

      if (
        direction == 1 &&
        this.num == this.selectAccount.approximate_sellable_amount
      )
        return true;

      return false;
    },
    handleRduceNum() {
      if (this.getDisabled(0)) return;
      const bugUnitAmt = parseInt(this.basicData.sell_amount_unit);
      if (this.num <= this.basicData.min_sell_amount) {
        this.num = this.basicData.min_sell_amount;
        return;
      }
      if (this.num % bugUnitAmt) {
        this.num = this.num - (this.num % bugUnitAmt);
        return;
      }
      this.num -= parseInt(this.basicData.sell_amount_unit);
    },
    handleAddNum() {
      if (this.getDisabled(1)) return;
      const bugUnitAmt = parseInt(this.basicData.sell_amount_unit);
      if (!this.num || this.num < this.basicData.min_sell_amount) {
        this.num = parseInt(this.basicData.min_sell_amount);
        return;
      }
      if (this.num % bugUnitAmt) {
        this.num = this.num + (bugUnitAmt - (this.num % bugUnitAmt));
        return;
      }
      this.num += parseInt(this.basicData.sell_amount_unit);

      if (this.num >= this.selectAccount.approximate_sellable_amount) {
        this.num = this.selectAccount.approximate_sellable_amount;
      }
    },
    async handleSellOrderConfirmation() {
      if (
        (this.tradepwd.length == 4 &&
          this.num >= this.basicData.min_sell_amount) ||
        (this.tradepwd.length == 4 && this.allSold == true)
      ) {
        const amountCls =
          String(this.selectMethod.id) === "2"
            ? "3"
            : String(this.selectMethod.id);
        const param = {
          inv_trust_assoc_cd: this.orderId,
          dividend_handling_cls: `${this.selectAccount.dividend_cls}`,
          account_cls: this.$route.query.account_cls || "2",
          amount_cls: amountCls,
          order_qty:
            amountCls == "3"
              ? this.selectAccount.sell_possible_qty
              : `${this.num}`,
          password: commonJs.hashPwd(this.tradepwd),
        };
        await this.$store
          .dispatch("handleSellOrderConfirmation", param)
          .then(() => {
            const res = this.$store.getters.handleSellOrderConfirmation;
            if (res.STATUS == "OK") {
              this.$router.push({
                path: "/transaction/investment/sell/confirm",
                query: {
                  inv_trust_assoc_cd: this.orderId,
                  order_qty:
                    amountCls == "3"
                      ? this.selectAccount.sell_possible_qty
                      : this.num,
                  amount_cls: amountCls,
                  account_cls: this.$route.query.account_cls || "2",
                  dividend_handling_cls: this.selectAccount.dividend_cls,
                  password: commonJs.hashPwd(this.tradepwd),
                  actualNum: this.num
                },
              });
            }
          });
      }
    },
    handleBackUsDetail() {
      this.$router.push(this.$router.prevRoute)
    },
    async handleGetPdfFile() {
      await this.$store.dispatch("getPdfFile", {
        // inv_trust_assoc_cd: this.orderId,
        doc_cls: null,
        agree_sts: "0",
        search_ver_cls: "1",
        agreement_cls: "1",
      });
      this.pdfListInfo = this.$store.getters.getPdfFile;
      return this.pdfListInfo;
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
      window.location.reload();
      this.handleGetPdfFile().then((res) => {
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
    handleShowCaution() {
      (this.initDefaultModalShow = [false, false, false]),
        (this.modelShow = true);
      this.cautionModal = true;
    },

    cashFormatter(cash) {
      return commonJs.cashFormatter(cash);
    },
    handNumberInt(number) {
      return commonJs.handNumberInt(number);
    },
  },
};
