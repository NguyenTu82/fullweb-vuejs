import TopInfo from "@/components/common/TopInfo";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";

export default {
  name: "NoticeDetail",
  components: { TopInfo },
  data() {
    return {
      apiTypeCommon: constant.API_TYPE.COMMON,
      noticeInfo: {},
      noticeType: {
        COMPANY: "company",
        CUSTOMER: "customer",
      },
      idNotice: this.$route.query.notice,
      noticeTab: this.$route.query.tab,
      tabs: [
        {
          id: 1,
          name: "当社からのお知らせ",
          isCheck: true,
          isRead: false,
          OPEN_DT: 0,
        },
        {
          id: 2,
          name: "お客さまへのご連絡",
          isCheck: false,
          isRead: false,
          OPEN_DT: 0,
        },
      ],
    };
  },
  filters: {
    datetimeFilter(value) {
      if (!value) return;
      value = value.replace(/-/g, "/");
      let arr = value.split(":");
      return arr[0] + ":" + arr[1].split(":")[0];
    },
  },
  created() {
    this.validateNoticeId();
  },
  mounted() {
    if (this.idNotice) {
      this.getInfo();
      this.handleUrgentNoticeTab();
    }
  },
  computed: {
    BREAD_CRUMB() {
      if (this.$route.query.tab === "company") {
        return "当社からのお知らせ ";
      } else if (this.$route.query.tab === "customer") {
        return "お客さまへのご連絡 ";
      }
      return "";
    },
  },
  methods: {
    /**
     * Get notice list
     *
     */
    handleUrgentNoticeTab() {
      let sendType = 1;
      let params = {
        apiType: this.apiTypeCommon,
        SEND_TYPE: "",
        SINCE_OPEN_DT: "",
        ONLY_COUNT: 0,
      };

      this.$route.query.tab !== "company" && (sendType = 2);
      this.$route.query.tab !== "customer" && (sendType = 1);

      params.SEND_TYPE = sendType;

      this.$store.dispatch("getNotices", params).then(() => {
        let notices = this.$store.getters.notices;
        let data = notices["DATA"];
        this.tabs[0]["isRead"] = data["PUBLIC_NOTICE_UNREAD"] > 0;
        this.tabs[1]["isRead"] = data["INDIVIDUAL_NOTICE_UNREAD"] > 0;
      });
    },

    /**
     * Get notice detail by id
     */
    getInfo() {
      this.$store
        .dispatch("noticeById", {
          apiType: this.apiTypeCommon,
          id: this.idNotice,
        })
        .then(() => {
          let notice = this.$store.getters.noticeDetail;
          if (notice["STATUS"] === "OK") {
            notice["DATA"]["CONTENT"] = notice["DATA"]["CONTENT"].replace(
              /\n/g,
              "<br/>"
            );
            this.noticeInfo = notice["DATA"];
            let DT = commonJs.handleDateTime(this.noticeInfo.OPEN_DT, true);
            this.noticeInfo.OPEN_D = DT.date;
            this.noticeInfo.OPEN_T = DT.time;

            this.$store.dispatch("readNotice", {
              apiType: this.apiTypeCommon,
              SEND_ID: this.noticeInfo["SEQ_NO"],
            });
          }
        });
    },

    /**
     * Go back to A310
     */
    goBackNotices() {
      this.$router.push({
        name: "Notice",
        query: { tab: this.noticeTab },
      });
    },

    /**
     * Validate notice id
     */
    validateNoticeId() {
      let isNumber = new RegExp("^[0-9]*$");
      if (!isNumber.test(this.idNotice)) {
        this.$router.push({ name: "notice", query: { tab: this.noticeTab } });
      }
    },
  },
};
