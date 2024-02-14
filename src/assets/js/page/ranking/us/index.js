import TopContentUs from "@/views/ranking/components/topContentUs.vue";
import TabContent from "@/views/ranking/components/tabContent";
import RankingUs from "@/views/ranking/us/rankingUs";

export default {
  name: "Ranking",
  components: {
    TopContentUs,
    TabContent,
    RankingUs,
  },
  beforeRouteEnter() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
};
