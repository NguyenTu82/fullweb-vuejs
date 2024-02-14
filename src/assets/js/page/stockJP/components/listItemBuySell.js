import { mapGetters } from "vuex";
import commonJs from "@/assets/js/common/common";

export default {
  props: {
    s_text: { type: Boolean, default: true }
  },
  computed: {
    ...mapGetters(["dataStockSign"])
  },
  watch: {
    dataStockSign(newVa, oldVa) {
      if(newVa != oldVa) this.setData(newVa);
    }
  },
  data() {
    return {
      flag: true,
      best_bid_vol_1: 0,
      best_bid_vol_2: 0,
      best_bid_vol_3: 0,
      best_bid_vol_4: 0,
      best_bid_vol_5: 0,
      best_bid_vol_6: 0,
      best_bid_vol_7: 0,
      best_bid_vol_8: 0,
      best_bid_vol_9: 0,
      best_bid_vol_10: 0,
      /* -------------------------- */
      best_bid_1: 0,
      best_bid_2: 0,
      best_bid_3: 0,
      best_bid_4: 0,
      best_bid_5: 0,
      best_bid_6: 0,
      best_bid_7: 0,
      best_bid_8: 0,
      best_bid_9: 0,
      best_bid_10: 0,
      /* -------------------------- */
      best_ask_vol_1: 0,
      best_ask_vol_2: 0,
      best_ask_vol_3: 0,
      best_ask_vol_4: 0,
      best_ask_vol_5: 0,
      best_ask_vol_6: 0,
      best_ask_vol_7: 0,
      best_ask_vol_8: 0,
      best_ask_vol_9: 0,
      best_ask_vol_10: 0,
      /* -------------------------- */
      best_ask_1: 0,
      best_ask_2: 0,
      best_ask_3: 0,
      best_ask_4: 0,
      best_ask_5: 0,
      best_ask_6: 0,
      best_ask_7: 0,
      best_ask_8: 0,
      best_ask_9: 0,
      best_ask_10: 0,
      offsetStrSell: "",
      offsetStrBuy: "",
      conb_ask_vol: 0,
      conb_bid_vol: 0,
      /* -------------------------- */
      strMaxPriceWidth: "",
      strMinPriceWidth: "",
    };
  },
  methods: {
    setValueMoney(value) {
      if (value != "-") {
        this.$emit("setValueMoney", value);
      }
    },
    setData(dataS) {
      this.offsetStrSell = commonJs.getStockBoardOffsetStr(dataS.best_ask_kind_1) ?? "-";
      this.offsetStrBuy = commonJs.getStockBoardOffsetStr(dataS.best_bid_kind_1) ?? "-";
      this.conb_ask_vol = dataS.conb_ask_vol;
      this.conb_bid_vol = dataS.conb_bid_vol;
      for (let i = 1; i < 11; i++) {
        this[`best_ask_vol_${i}`] = dataS[`best_ask_vol_${i}`];
        this[`best_ask_${i}`] = dataS[`best_ask_${i}`];
        this[`best_bid_vol_${i}`] = dataS[`best_bid_vol_${i}`];
        this[`best_bid_${i}`] = dataS[`best_bid_${i}`];
      }
    },
    clickExpand() {
      const accordionTable = document.querySelectorAll(".accordion");
      this.flag = !this.flag;
      const expandHide = this.$refs.clickExpandHide;
      accordionTable.forEach((item) => {
        item.classList.toggle("order__forms--hidden");
      });
      expandHide.textContent = this.flag ? "開く" : "閉じる";
    },

    handNumberInt(number) {
      return commonJs.handNumberInt(number);
    },      
    handNumFloat(number) {
      if (!number && number != 0) {
        return number;
      }

      let strNumber = number.toString();
      // number 小数の場合
      if ( strNumber.indexOf('.') != -1 ) {
        return commonJs.handNumFloat(number, 1);
      } else {
        // number  小数じゃないの場合
        return commonJs.handNumFloat(number, 0);
      }
    },
    number_format(number) {
      return commonJs.number_format(number, 1);
    },
  }
};
