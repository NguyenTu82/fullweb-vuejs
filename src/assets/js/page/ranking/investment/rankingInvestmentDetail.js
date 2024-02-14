import TopInfo from "@/components/common/TopInfo";
import TabContent from "@/views/ranking/components/tabContent";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "RankingInvestmentDetail",
  components: { TopInfo, TabContent },

  data() {
    return {
      rankingData: [],
      fundData: [],
      rankingUpdateTime: "",
      priceUpdateTime: "",
      rankingType: "",
      rankingTypeClass: "",
      handlingCls: false,
      isShowData: null,
      isBottom: false,
      pageInit: 30,
      page: 1,
      rankingValueHeading: new Map([
        ["51", ""],
        ["52", ""],
        ["53", ""],
        ["54", "トータルリターン<br/>（％）"],
        ["55", "分配金利回り<br/>(%)"],
        ["56", "値上り率<br/>(%)"],
        ["57", "値下り率<br/>(%)"],
        ["58", "純資産増加<br/>（前月比％）"],
        ["59", "純資産増加<br/>（前年比%）"],
      ]),
    };
  },
  created() {
    this.getRankingInvestmentData();
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
    ...mapActions(["getRankingInvestmentList"]),
    getRankingUsType() {
      const rankingCategory = this.$router.currentRoute._value.query.category;
      const ranking = constant.RANKING_INVESTMENT_MAP;
      const index = ranking.findIndex((element) => {
        return element.category === rankingCategory;
      });
      return ranking[index].id.length === 1
        ? "0" + ranking[index].id
        : ranking[index].id;
    },
    getRankingInvestmentType() {
      const rankingCategory = this.$router.currentRoute._value.query.category;
      const ranking = constant.RANKING_INVESTMENT_MAP;
      const index = ranking.findIndex((element) => {
        return element.category === rankingCategory;
      });
      return ranking[index].id.length === 1
        ? "0" + ranking[index].id
        : ranking[index].id;
    },
    getRankingInvestmentData() {
      this.rankingType = this.getRankingInvestmentType();
      this.getRankingInvestmentList({ ranking_type: this.rankingType }).then(
        () => {
          if (this.getDataRankingInvestmentList.STATUS === "OK") {
            this.rankingData =
              this.getDataRankingInvestmentList.DATA.lst_result_info;
            this.rankingUpdateTime =
              this.getDataRankingInvestmentList.DATA.update_dt;
            this.priceUpdateTime = commonJs.handleDateTime(
              this.getDataRankingInvestmentList.RESULT_TIME
            ).date;
            if (this.rankingData !== null)
              this.rankingData.forEach((brand) => {
                const funds = brand["fund_info_list"];
                funds.forEach((fund) => this.fundData.push(fund));
              });
            this.isShowData = this.rankingData.length !== 0 ? true : false;
          }
        }
      );
    },
    getRankingDayBeforeRatioColor(dayBefore) {
      return dayBefore > 0 ? "#eb6a6a" : dayBefore < 0 ? "#45ccff" : "#000000";
    },
    getFundTypeList(fund) {
      const fundTypeList = [];
      if (
        !(
          fund["fund_attr_cls"] === "1" || fund["fund_attr_cls_nm"] === "一般型"
        )
      ) {
        fundTypeList.push(fund["fund_attr_cls_nm"]);
      }
      fund["fund_type_list"].forEach((element) => {
        fundTypeList.push(element["fund_type_nm"]);
      });
      return fundTypeList;
    },
    handNumberInt(number) {
      return commonJs.handNumberInt(number);
    },
    numberFormat2(number) {
      let num = commonJs.handNumberFloat(number, 2);
      return commonJs.number_format(num, 2);
    },
  },
  computed: {
    ...mapGetters(["getDataRankingInvestmentList"]),
    getRankingValueColor() {
      const rankingType = this.getRankingUsType();
      return rankingType === "56"
        ? "#eb6a6a"
        : rankingType === "57"
        ? "#45ccff"
        : "#000000";
    },
  },
};
