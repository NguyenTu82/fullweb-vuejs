import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";

export default {
  name: "UrgentNotification",
  components: {},
  data() {
    return {
      urgentNoticeList: [],
      lengthNoti: 0,
    };
  },
  mounted() {},
  methods: {
    goDetail(obj) {
      this.$router.push({
        path: "/urgentNotiDetail",
        query: { id_urgent: obj.SEQ_NO },
      });
    },
    async pageInit1() {
      this.$store
        .dispatch("getUgrentData", {
          apiType: constant.API_TYPE.COMMON,
        })
        .then(() => {
          let list = this.$store.getters.getDataurgent.URGENT_NOTICE_LIST;
          this.lengthNoti = list.length;
          this.handleData(list);
        });
    },

    handleData(list) {
      this.urgentNoticeList = list.map((item) => {
        let DT = commonJs.handleDate(item.OPEN_DT, true);
        item.READ_DT_D = DT.date;
        item.READ_DT_T = DT.time;
        return item;
      });
    },
    handleDateTime(datetime) {
      return commonJs.handleDateTime(datetime);
    },
  },
  created() {
    // this.pageInit();
    this.pageInit1();
  },
};
