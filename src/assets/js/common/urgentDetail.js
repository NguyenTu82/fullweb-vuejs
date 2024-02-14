import TopInfo from "@/components/common/TopInfo";
import commonJs from "@/assets/js/common/common";

export default {
  name: "urgentNotiDetail",
  components: {
    TopInfo,
  },
  data() {
    return {
      noticeInfo: {},
      source: "vue",
      urgentDate: "",
      urgentTime: "",
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
  watch: {
    $route: {
      handler(value) {
        if (this.$options.name === value.name) {
          this.getInfoUrgent(value.query.id_urgent);
        }
      },
    },
  },
  mounted() {
    let { id_urgent } = this.$route.query;
    this.getInfoUrgent(id_urgent);
  },
  methods: {
    getInfoUrgent(id_urgent) {
      this.$store
        .dispatch("getUgrentDetailData", {
          SEQ_NO: id_urgent,
        })
        .then(() => {
          this.noticeInfo =
            this.$store.getters.getDataurgentDetail.URGENT_NOTICE;
          this.urgentDate = commonJs.handleDateTime(
            this.noticeInfo.OPEN_DT
          ).date;
          this.urgentTime = commonJs.handleDateTime(
            this.noticeInfo.OPEN_DT
          ).time;
        });
    },
    getBack() {
      this.$router.back();
    },
  },
};
