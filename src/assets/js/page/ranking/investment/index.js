import TopContentInvestment from "@/views/ranking/components/topContentInvestment.vue";
import TabContent from "@/views/ranking/components/tabContent.vue";
import RankingInvestment from "@/views/ranking/investment/rankingInvestment.vue";

export default {
  name: "Ranking",
  components: {
    TopContentInvestment,
    TabContent,
    RankingInvestment,
  },
  beforeRouteEnter() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
};
