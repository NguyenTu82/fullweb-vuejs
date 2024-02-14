import TopInfo from "@/components/common/TopInfo";
import TabContent from "@/views/ranking/components/tabContent.vue";
import { mapGetters, mapActions } from "vuex";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";
import commonConst from "@/const/common";

export default {
  name: "RankingUsDetail",
  components: { TopInfo, TabContent },

  data() {
    return {
      rankingData: [],
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
        ["31", ""],
        ["32", "値上り率<br/>(%)"],
        ["33", "値下り率<br/>(%)"],
        ["34", "出来高<br/>(千株)"],
        ["35", "配当利回り<br/>(%)"],
        ["36", "PER<br/>(%)"],
        ["37", "PER<br/>(%)"],
      ]),
    };
  },
  created() {
    this.getRankingUsData();
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
    ...mapActions(["getRankingUsList"]),
    handNumber(num) {
      return commonJs.handNumber(num);
    },
    getRankingUsType() {
      const rankingCategory = this.$router.currentRoute._value.query.category;
      const ranking = constant.RANKING_US_MAP;
      const index = ranking.findIndex((element) => {
        return element.category === rankingCategory;
      });
      return ranking[index].id.length === 1
        ? "0" + ranking[index].id
        : ranking[index].id;
    },
    getRankingUsData() {
      this.rankingType = this.getRankingUsType();
      this.getRankingUsList({ ranking_type: this.rankingType }).then(() => {
        if (this.getDataRankingUsList.STATUS === "OK") {
          this.rankingData = this.getDataRankingUsList.DATA.lst_result_info;
          this.rankingUpdateTime = this.getDataRankingUsList.DATA.update_dt;
          this.priceUpdateTime = this.getDataRankingUsList.RESULT_TIME.slice(
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
    isShowCheer() {
      return this.branchDivision === commonConst.BRANCH_DIVISION.CHEER;
    },
  },
  computed: {
    ...mapGetters(["getDataRankingUsList"]),
    ...mapGetters("common", ["branchDivision"]),
    getRankingValueColor() {
      const rankingType = this.getRankingUsType();
      if (this.isShowCheer()) {
        return rankingType === "32"
          ? "#eb6a6a"
          : rankingType === "33"
          ? "#45ccff"
          : "#000000";
      } else {
        return rankingType === "32"
          ? "#eb6a6a"
          : rankingType === "33"
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
