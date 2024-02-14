import TopInfo from "@/components/common/TopInfo";
import TabContent from "@/views/payment/components/tabContent";
import ModalConfirm from "@/views/payment/history/components/modalConfirm";
import Cancel from "@/views/payment/history/components/cancel";
import commonJs from "@/assets/js/common/common";
import constant from "@/const/common";
import Moment from "moment";

export default {
  title: "歴史",
  name: "WithdrawalHistory",
  components: {
    TabContent,
    TopInfo,
    Cancel,
    ModalConfirm,
  },
  data() {
    return {
      turnOffModal: true,
      listDataHistory: [],
      EXECUTE_FLG: 9,
      fromDate: "",
      toDate: "",
      scheduleSeqNo: 0,
      showCancel: false,
      cancelId: {},
      isShowModalConfirm: false,
      EXECUTE_FLG_AFTER_CF: 9,
      fromDateAfterConfirm: "",
      toDateAfterConfirm: "",
      isLoadMore: true,
      isBottom: false,
    };
  },
  watch: {
    isBottom() {
      if (this.isBottom) {
        this.loadMoreHistory();
      }
    },
  },
  mounted() {
    this.isLoadMore = true;
    commonJs.moveUp();
    this.listHistory();
    window.addEventListener(
      "scroll",
      () => {
        this.isBottom = commonJs.scrollBottom();
      },
      {
        passive: true,
      }
    );
  },
  unmounted() {
    this.isLoadMore = false;
  },
  methods: {
    showModal() {
      this.turnOffModal = !this.turnOffModal;
    },
    listHistory(max = false) {
      this.isLoadMore &&
        this.$store
          .dispatch("getDrawHistory", {
            apiType: constant.API_TYPE.COMMON,
            max: max,
            fromDate: this.fromDateAfterConfirm,
            toDate: this.toDateAfterConfirm,
            EXECUTE_FLG: this.EXECUTE_FLG_AFTER_CF,
            scheduleSeqNo: this.scheduleSeqNo,
          })
          .then((response) => {
            (response.length % 20 !== 0 ||
              this.listDataHistory.length === response.length) &&
              (this.isLoadMore = false);
            this.listDataHistory = response;
            let data = response;
            if (data.length > 0) {
              let ids = data.map((it) => it["SCHEDULE_SEQ_NO"]);
              this.scheduleSeqNo = Math.min(...ids);
            }
          });
    },
    searchListHistory() {
      this.turnOffModal = true;
      if (this.dateCompare(this.fromDate, this.toDate)) {
        this.isShowModalConfirm = true;
      } else {
        this.listDataHistory = [];
        this.isLoadMore = true;
        this.EXECUTE_FLG_AFTER_CF = this.EXECUTE_FLG;
        this.fromDateAfterConfirm = this.fromDate;
        this.toDateAfterConfirm = this.toDate;
        this.listHistory();
      }
    },
    loadMoreHistory() {
      !this.showCancel && this.listHistory(true);
    },
    offModalSelect(event) {
      if (event.path.length <= 9) {
        this.showModal();
      }
    },
    showCancelPayment(valueCancel) {
      this.showCancel = !this.showCancel;
      this.cancelId = valueCancel;
      if (!this.showCancel) {
        this.listDataHistory = [];
        this.isLoadMore = true;
        commonJs.moveUp();
        this.listHistory();
      }
    },

    handleConfirm(data) {
      if (data === "BACK") {
        this.isShowModalConfirm = false;
      }
    },

    cashFormatter(cash) {
      return commonJs.cashFormatter(cash);
    },

    handleFormatDate(data) {
      if (data) {
        return commonJs.dateFormatter(data, "-", "/");
      } else {
        return "";
      }
    },

    dateCompare(startDate, endDate) {
      if (startDate || endDate) {
        const date1 = new Date(startDate);
        const date2 = new Date(endDate);
        if (date1 > date2) {
          return true;
        }
      }
      return false;
    },
  },
  computed: {
    getDayFrom() {
      if (this.fromDate) {
        return Moment(this.fromDate).format("YYYY/MM/DD");
      }
      return this.fromDate;
    },
    getDayTo() {
      if (this.toDate) {
        return Moment(this.toDate).format("YYYY/MM/DD");
      }
      return this.toDate;
    }
  }
};
