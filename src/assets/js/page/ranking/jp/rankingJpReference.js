import TopInfo from "@/components/common/TopInfo";
import TabContent from "@/views/ranking/components/tabContent";

export default {
  name: "RankingJpReference",
  components: { TopInfo, TabContent },
  data() {
    return {};
  },
  computed: {
    urlIframe() {
      return "https://www.cheer-sec.co.jp/other/feature/jkabu.html";
    },
  },
  methods: {
    currentDateTime: function () {
      return this.Moment().format("YYYY/MM/DD HH:mm");
    },
  },
};
