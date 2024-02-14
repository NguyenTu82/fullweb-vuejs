import urgentNotification from "@/components/common/urgentNotification";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";

export default {
  name: "TopInfo",
  components: {
    urgentNotification,
  },
  data() {
    return {
      urgentNoticeList: [],
      lengthUrgent: 0,
    };
  },
  mounted() {},
  methods: {
    goDetail(obj) {
      this.$router.push({
        path: "/FirmNoticeDetail",
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
      let getTopInfo = this.$el.querySelector("div.topinfo__container");
      this.lengthUrgent = list.length;
      if (list.length === 2) {
        getTopInfo.style.height = "auto";
        getTopInfo.style["align-items"] = "revert";
      } else if (list.length > 2) {
        getTopInfo.style["align-items"] = "revert";
        getTopInfo.style.height = "150px";
      }
    },
  },
  created() {
    this.pageInit1();
  },
};
