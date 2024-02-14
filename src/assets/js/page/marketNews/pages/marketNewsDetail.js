import TopInfo from "@/components/common/TopInfo";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";

export default {
  name: "MarketNewsDetail",
  components: { TopInfo },
  data() {
    return {
      idNews: this.$route.query.news,
      apiTypeCommon: constant.API_TYPE.COMMON,
      currentData: {},
    };
  },
  watch: {
    $route: {
      handler(val) {
        if (val.path === "/market/news_detail") {
          this.currentData = {};
          if (this.idNews) {
            this.getMarketNewsDetail();
          }
        }
      },
    },
  },
  mounted() {
    if (this.idNews) {
      this.getMarketNewsDetail();
    }
  },
  computed: {
    NEWS_DT() {
      let newsDt = this.currentData["NEWS_DT"];
      let dateTime = {
        date: "",
        time: "",
      };
      if (newsDt) {
        newsDt = newsDt.split(" ");
        let newsDate = newsDt[0].replace(/-/g, "/");
        let newsTime = newsDt[1].split(":");
        dateTime.date = newsDate;
        dateTime.time = `${newsTime[0]}:${newsTime[1]}`;
      }
      return dateTime;
    },
  },
  methods: {
    /**
     * Get news detail
     */
    getMarketNewsDetail() {
      this.$store
        .dispatch("getMarketNewsById", {
          apiType: this.apiTypeCommon,
          id: this.idNews,
        })
        .then(() => {
          let news = this.$store.getters.marketNewsDetail;
          this.currentData = news["STATUS"] === "OK" ? news["DATA"] : {};
        });
    },
  },
};
