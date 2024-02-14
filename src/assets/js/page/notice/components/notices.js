import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";

export default {
  name: "Notices",
  props: ["list", "type", "tabIndex", "noticeType"],
  data() {
    return {
      currentList: this.list,
      apiTypeCommon: constant.API_TYPE.COMMON,
    };
  },
  methods: {
    /**
     * Go to A311
     *
     * @param obj
     */
    goDetail(obj) {
      if (!obj["READ_FLAG"]) {
        this.$store
          .dispatch("readNotice", {
            apiType: this.apiTypeCommon,
            SEND_ID: obj["SEQ_NO"],
          })
          .then(() => this.$emit("getdata"));
      }

      this.$router.push({
        name: "NoticeDetail",
        query: {
          notice: obj["SEQ_NO"],
          tab:
            this.tabIndex === 1
              ? this.noticeType.COMPANY
              : this.noticeType.CUSTOMER,
        },
      });
    },
  },
};
