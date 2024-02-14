import TopContent from "@/views/ranking/components/topContentJp";
import TabContent from "@/views/ranking/components/tabContent";
import RankingJp from "@/views/ranking/jp/rankingJp";

export default {
  name: "Ranking",
  components: {
    TopContent,
    TabContent,
    RankingJp,
  },
  beforeRouteEnter() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
};
