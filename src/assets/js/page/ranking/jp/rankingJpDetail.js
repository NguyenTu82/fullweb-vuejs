import TopInfo from "@/components/common/TopInfo";
import TabContent from "@/views/ranking/components/tabContent.vue";
import { mapGetters, mapActions } from "vuex";
import store from "@/store";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";
import commonConst from "@/const/common";

export default {
  name: "RankingJpDetail",
  components: { TopInfo, TabContent },

  data() {
    return {
      rankingData: [],
      rankingUpdateTime: "",
      priceUpdateTime: "",
      rankingType: "",
      rankingTypeClass: "",
      isShowData: null,
      isBottom: false,
      pageInit: 30,
      page: 1,
      rankingValueHeading: new Map([
        ["01", ""],
        ["02", "値上り率<br/>(%)"],
        ["03", "値下り率<br/>(%)"],
        ["04", "出来高<br/>(千株)"],
        ["05", "出来高<br/>乖離率(%)"],
        ["06", "売買代金<br/>(百万円)"],
        ["07", "売買代金<br/>急増(%)"],
        ["08", "時価総額<br/>(百万円)"],
        ["09", "配当利回り<br/>(%)"],
        ["10", "PER<br/>(%)"],
        ["11", "PER<br/>(%)"],
        ["12", "PBR<br/>(%)"],
        ["13", "PBR<br/>(%)"],
      ]),
    };
  },
  created() {
    this.getRankingJpData();
    window.addEventListener("scroll", () => {
      this.isBottom = commonJs.scrollBottom();
    });
  },
  watch: {
    isBottom() {
      if (this.rankingData !== null) {
        if (this.rankingData.length !== 0) {
          if (this.isBottom) {
            this.page += 1;
          }
        }
      }
    },
  },
  methods: {
    ...mapActions(["getRankingJpList"]),

    getRankingJpType() {
      const rankingCategory = this.$router.currentRoute._value.query.category;
      const ranking = constant.RANKING_JP_MAP;
      const index = ranking.findIndex((element) => {
        return element.category === rankingCategory;
      });
      return ranking[index].id.length === 1
        ? "0" + ranking[index].id
        : ranking[index].id;
    },
    getRankingJpData() {
      this.rankingType = this.getRankingJpType();
      this.getRankingJpList({ ranking_type: this.rankingType }).then(() => {
        if (this.getDataRankingJpList.STATUS === "OK") {
          this.rankingData = this.getDataRankingJpList.DATA.lst_result_info;
          this.rankingUpdateTime = this.getDataRankingJpList.DATA.update_dt;
          this.priceUpdateTime = this.getDataRankingJpList.RESULT_TIME.slice(
            0,
            16
          );
          if (this.rankingData !== null)
            this.isShowData = this.rankingData.length !== 0 ? true : false;
        }
      });
    },
    getRankingDayBeforeRatioColor(dayBefore) {
      if (this.isShowCheer()) {
        return dayBefore > 0
          ? "#eb6a6a"
          : dayBefore < 0
          ? "#45ccff"
          : "#000000";
      } else {
        return dayBefore > 0
          ? "#eb6a6a"
          : dayBefore < 0
          ? "#272c84"
          : "#000000";
      }
    },
    toItemDetail(handling_cls, stock_cd, exchange_cls) {
      const handlingCls = this.checkHandlingCls(handling_cls);
      if (!handlingCls) {
        this.showHandlingClsError();
      } else {
        this.$router.push({
          name: "ConsignmentTransactions",
          query: { stock_cd: stock_cd, exchange_cls: exchange_cls },
        });
      }
    },
    checkHandlingCls(handlingCls) {
      return (handlingCls !== 0) & (handlingCls !== null);
    },
    showHandlingClsError() {
      store.commit("showPopup", {
        isShow: true,
        text: "この銘柄の取扱いはございません。",
        btnName: "OK",
      });
    },
    isShowCheer() {
      return this.branchDivision === commonConst.BRANCH_DIVISION.CHEER;
    },
    numberFormat(number, decimals) {
      let num = commonJs.handNumberFloat(number, decimals);
      if (Number(num) === Number.parseInt(num)) {
        return commonJs.handNumberInt(num);
      }
      return commonJs.number_format(num, decimals);
    },
    numberFormat2(number) {
      let num = commonJs.handNumberFloat(number, 2);
      return commonJs.number_format(num, 2);
    },
  },
  computed: {
    ...mapGetters(["getDataRankingJpList"]),
    ...mapGetters("common", ["branchDivision"]),
    getRankingValueColor() {
      const rankingType = this.getRankingJpType();
      if (this.isShowCheer()) {
        return rankingType === "02"
          ? "#eb6a6a"
          : rankingType === "03"
          ? "#45ccff"
          : "#000000";
      } else {
        return rankingType === "02"
          ? "#eb6a6a"
          : rankingType === "03"
          ? "#272c84"
          : "#000000";
      }
    },
    getRankingDataScroll() {
      if (this.rankingData !== null) {
        return this.rankingData.slice(0, this.page * this.pageInit);
      }
      return [];
    },
  },
};
