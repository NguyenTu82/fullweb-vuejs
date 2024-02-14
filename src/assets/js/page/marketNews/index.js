import TopInfo from "@/components/common/TopInfo";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";
import TabContent from "@/views/marketNews/components/tabContent";

export default {
  name: "MarketNews",
  components: { TabContent, TopInfo },
  data() {
    return {
      apiTypeCommon: constant.API_TYPE.COMMON,
      sinceSeqNo: 0,
      currentData: [],
      isBottom: false,
      page: 1,
    };
  },
  mounted() {
    this.getMarketNewsList();
    window.addEventListener("scroll", () => {
      this.isBottom = commonJs.scrollBottom();
    });
  },
  watch: {
    isBottom() {
      if (this.isBottom) {
        this.page += 1;
        this.getMarketNewsList();
      }
    },
  },
  methods: {
    /**
     * Get market news list
     */
    getMarketNewsList() {
      this.$store
        .dispatch("getMarketNews", {
          apiType: this.apiTypeCommon,
          SINCE_SEQ_NO: this.sinceSeqNo,
        })
        .then(() => {
          let news = this.$store.getters.marketNews;
          if (news["STATUS"] === "OK") {
            let data = news["DATA"];

            if (data.length > 0) {
              let ids = data.map((it) => it["NEWS_SEQ_NO"]); //Push NEWS_SEQ_NO to array ids
              this.sinceSeqNo = Math.min(...ids); //Get min NEWS_SEQ_NO of ids

              data.map((item) => {
                let datetime = commonJs.handleDateTime(item["NEWS_DT"]);
                item["NEWS_DT_D"] = datetime["date"];
                item["NEWS_DT_T"] = datetime["time"]; //.replace(':', ' : ');
                this.currentData.push(item);
              });
            }
          }
        });
    },
  },
};
