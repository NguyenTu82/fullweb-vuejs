import Notices from "@/views/notice/components/Notices";
import TopInfo from "@/components/common/TopInfo";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";

export default {
  name: "Notice",
  components: { TopInfo, Notices },
  data() {
    return {
      apiTypeCommon: constant.API_TYPE.COMMON,
      tabIndex: 2,
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
      NoticesList1: [],
      NoticesList2: [],
      noticeType: {
        COMPANY: "company",
        CUSTOMER: "customer",
      },
      isBottom: false,
      page: 1,
      isLoading: false,
    };
  },
  created() {
    if (this.$route.query.tab === this.noticeType.COMPANY) {
      this.tabIndex = 1;
    }
  },
  mounted() {
    this.getNotices(false);
    window.addEventListener("scroll", () => {
      this.isBottom = commonJs.scrollBottom();
    });
  },
  watch: {
    isBottom() {
      if (this.isBottom) {
        this.page += 1;
        this.getNotices(true);
      }
    },
  },
  methods: {
    /**
     * Get notice list
     *
     * @param flag
     */
    getNotices(flag) {
      if (flag && this.isLoading) return;
      let index = this.tabIndex - 1;
      let sendType = 1;
      let params = {};

      if (index !== 1) {
        sendType = 2;
      }

      params.apiType = this.apiTypeCommon;
      params.SEND_TYPE = sendType;
      params.SINCE_OPEN_DT = this.tabs[index].OPEN_DT;
      params.ONLY_COUNT = 0;
      this.isLoading = true;

      this.$store.dispatch("getNotices", params).then(() => {
        let notices = this.$store.getters.notices;
        this.isLoading = false;
        if (notices["STATUS"] === "OK") {
          let data = notices["DATA"];
          let list = data["NOTICE_LIST"];

          this.tabs[0]["isRead"] = data["PUBLIC_NOTICE_UNREAD"] > 0;
          this.tabs[1]["isRead"] = data["INDIVIDUAL_NOTICE_UNREAD"] > 0;

          if (list.length > 0) {
            this.tabs[index]["OPEN_DT"] = list[list.length - 1]["OPEN_DT"]; //找出id数组的最小的id 用于分页
          }

          if (flag) {
            //增加下一页
            if (list.length > 0) {
              this.handleData(index, list);
            }
          } else {
            this.NoticesList2.length = 0;
            this.NoticesList1.length = 0;
            this.handleData(index, list);
          }
        }
      });
    },

    /**
     * Handle data for tabs
     *
     * @param index
     * @param list
     */
    handleData(index, list) {
      list.map((item) => {
        let DT = commonJs.handleDateTime(item.OPEN_DT, true);
        item.READ_DT_D = DT.date;
        item.READ_DT_T = DT.time;

        if (item.SEND_TYPE === 1) {
          this.NoticesList2.push(item);
        } else {
          this.NoticesList1.push(item);
        }
      });
    },

    /**
     * Switch tab notice
     *
     * @param index
     */
    changeTab(index) {
      switch (index) {
        case 1:
          this.tabIndex = 1;
          this.changeQueryParam(this.noticeType.COMPANY);
          this.tabs[this.tabIndex - 1].OPEN_DT = 0;
          this.getNotices(false);
          break;
        case 2:
          this.tabIndex = 2;
          this.changeQueryParam(this.noticeType.CUSTOMER);
          this.tabs[this.tabIndex - 1].OPEN_DT = 0;
          this.getNotices(false);
          break;
      }
    },

    getReadData() {
      this.tabs[0].OPEN_DT = 0;
      this.tabs[1].OPEN_DT = 0;
      this.getNotices(false);
    },

    /**
     * Change query param after switch tab
     * @param param
     */
    changeQueryParam(param) {
      this.$router.replace({ query: { tab: param } }).catch(() => {});
    },
  },
};
