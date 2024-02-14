import TopInfo from "@/components/common/TopInfo";
import processEnvKey from "@/const/processEnvKey";
import commonJs from "@/assets/js/common/common";
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  title: "ホーム",
  name: "UsBrandDetail",
  components: {
    TopInfo,
  },
  data() {
    return {
      dataUsDetail: null,
      paragraphOpen: false,
      shortHeightObj: {
        height: "auto",
        remove: false,
        times: 0,
        parentHeight: 0,
      },
      longHeightObj: {
        height: "auto",
        remove: false,
        times: 0,
        parentHeight: 0,
      },
      brandId: "",
      requested: true,
      timePriceInfo: "",
      requestConst: null,
    };
  },
  computed: {
    chartUrl() {
      const requestConst = this.requestConst;
      const xCompanyId = commonJs.getProcessEnv(processEnvKey.X_COMPANY_ID);
      let url = process.env.VUE_APP_CHART + "/charts/chart.html";
      if (this.requested) {
        url +=
          "?X-Company-Id=" +
          xCompanyId +
          "&X-DU=" +
          requestConst["X-DU"] +
          "&X-SV=" +
          requestConst["X-SV"] +
          "&X-PF=" +
          requestConst["X-PF"] +
          "&X-OV=" +
          requestConst["X-OV"] +
          "&X-MD=" +
          requestConst["X-MD"] +
          "&Authorization=" +
          localStorage.getItem(commonJs.getAccessTokenKey()) +
          "&APP_TARGET=" +
          requestConst["APP_TARGET"] +
          `&BRAND_ID=${this.brandId}`;
        return url;
      } else {
        return "";
      }
    },
  },
  created() {
    this.requestConst = this.getRequestConst();
    const { brandId } = this.$route.query;
    this.brandId = brandId;
    this.transactionUsBrandDetail().then((res) => {
      let resultInfo = res;
      let priceInfo = resultInfo.PRICE_INFO;
      this.timePriceInfo = moment(priceInfo.PRICE_DT).format(
        "YYYY/MM/DD  HH:mm"
      );
    });
  },
  methods: {
    ...mapGetters("common", ["getRequestConst"]),

    async transactionUsBrandDetail() {
      await this.$store.dispatch("getTransactionUsBrandDetail", {
        brandID: this.brandId,
      });
      this.dataUsDetail = this.$store.getters.getTransactionUsBrandDetail?.DATA;
      return this.dataUsDetail;
    },
    pullDownParagraph() {
      this.paragraphOpen = !this.paragraphOpen;
      this.sendNewHeight(
        this.paragraphOpen
          ? this.longHeightObj.parentHeight
          : this.shortHeightObj.parentHeight
      );
    },
    handNumber(number) {

      return commonJs.handNumber(number);
    },
    handNumber100(number) {
      let num = number;
      if (num) {
        num = num * 100;
      }
      return commonJs.handNumber(num);
    },
    handNumberInt(number) {
      return commonJs.handNumberInt(number);
    },
  },
};
