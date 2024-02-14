import TopInfo from "@/components/common/TopInfo";
import TabContent from "@/views/ranking/components/tabContent.vue";

export default {
  name: "RankingUsReference",
  components: { TopInfo, TabContent },
  data() {
    return {
      timestamp: "",
    };
  },
  computed: {
    urlIframe() {
      return "https://www.cheer-sec.co.jp/other/feature/fkabu.html";
    },
  },
  methods: {
    currentDateTime: function () {
      return this.Moment().format("YYYY/MM/DD HH:mm");
    },
  },
};
