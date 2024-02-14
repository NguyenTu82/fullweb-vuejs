import { mapGetters } from "vuex";
import commonConst from "@/const/common";

export default {
  name: "TabContent",
  data() {
    return {
      classNavTabs: "button__square",
      classNavTabSelected: "button__square--selected",
      components: {
        RANKING_JP: "RankingJp",
        RANKING_JP_DETAIl: "RankingJpDetail",
        RANKING_JP_REFERENCE: "RankingJpReference",
        RANKING_US: "RankingUs",
        RANKING_US_DETAIL: "RankingUsDetail",
        RANKING_US_REFERENCE: "RankingUsReference",
        RANKING_INVESTMENT: "RankingInvestment",
        RANKING_INVESTMENT_DETAIL: "RankingInvestmentDetail",
        RANKING_INVESTMENT_REFERENCE: "RankingInvestmentReference",
      },
      tabIndex: {
        RANKING_JP: "1",
        RANKING_US: "2",
        RANKING_INVESTMENT: "3",
      },
    };
  },
  mounted() {
    const navTabs = document.querySelectorAll(`.${this.classNavTabs}`);
    navTabs.forEach((el, index) => {
      let attrIndex = el.getAttribute("data-index");
      el.classList.remove(this.classNavTabSelected);

      if (
        (this.$router.currentRoute._value.name === this.components.RANKING_JP &&
          attrIndex === this.tabIndex.RANKING_JP) ||
        (this.$router.currentRoute._value.name ===
          this.components.RANKING_JP_DETAIl &&
          attrIndex === this.tabIndex.RANKING_JP) ||
        (this.$router.currentRoute._value.name ===
          this.components.RANKING_JP_REFERENCE &&
          attrIndex === this.tabIndex.RANKING_JP) ||
        (this.$router.currentRoute._value.name === this.components.RANKING_US &&
          attrIndex === this.tabIndex.RANKING_US) ||
        (this.$router.currentRoute._value.name ===
          this.components.RANKING_US_DETAIL &&
          attrIndex === this.tabIndex.RANKING_US) ||
        (this.$router.currentRoute._value.name ===
          this.components.RANKING_US_REFERENCE &&
          attrIndex === this.tabIndex.RANKING_US) ||
        (this.$router.currentRoute._value.name ===
          this.components.RANKING_INVESTMENT &&
          attrIndex === this.tabIndex.RANKING_INVESTMENT) ||
        (this.$router.currentRoute._value.name ===
          this.components.RANKING_INVESTMENT_DETAIL &&
          attrIndex === this.tabIndex.RANKING_INVESTMENT) ||
        (this.$router.currentRoute._value.name ===
          this.components.RANKING_INVESTMENT_REFERENCE &&
          attrIndex === this.tabIndex.RANKING_INVESTMENT)
      ) {
        navTabs[index].classList.add(this.classNavTabSelected);
      }
    });
  },
  methods: {
    isShow(branchDivision) {
      if (this.branchDivision === branchDivision) {
        return true;
      }
      return false;
    },
  },
  computed: {
    ...mapGetters("common", ["branchDivision"]),
    showCheer() {
      return this.isShow(commonConst.BRANCH_DIVISION.CHEER);
    },
  },
};
