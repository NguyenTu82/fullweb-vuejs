import { mapGetters } from "vuex";
import commonJs from "@/assets/js/common/common";
import FilterCard from "@/views/electronicDelivery/components/filterCard";
import TopInfo from "@/components/common/TopInfo";

export default {
  name: "ElectronicDelivery",
  components: { TopInfo, FilterCard },
  data() {
    return {
      title: "電子交付書面一覧",
      filterCard: false,
      key: 0,
      searchBar: [
        {
          title: "期間",
          value: "すべて",
        },
        {
          title: "書画種類",
          value: "すべて",
        },
        {
          title: "閲覧状況",
          value: "すべて",
        },
      ],
      params: {
        FROM_DATE: "",
        TO_DATE: "",
        DOCUMENT_TYPE: null,
        READ_FLG: null,
        SINCE_SEQ_NO: "0",
      },
      electronicData: [],
      // 搜素之后信息
      searchParam: {
        status: {
          name: "",
          id: "",
        },
        written: {
          name: "",
          id: "",
        },
        from_date: "",
        to_date: "",
      },
      isBottom: false,
      page: 1,
      isReset: false,
      formatDate: ["YYYY-MM-DD", "DD/MM/YYYY", "YYYY/MM/DD"],
    };
  },
  mounted() {
    this.getList(false);
    window.addEventListener("scroll", () => {
      this.isBottom = commonJs.scrollBottom();
    });
  },
  watch: {
    isBottom() {
      if (this.isBottom) {
        this.page += 1;
        this.getList(true);
      }
    },
  },
  methods: {
    ...mapGetters(["electronic"]),

    handleFilter() {
      this.isReset = false;
      this.filterCard = !this.filterCard;
    },

    resetSearch() {
      this.isReset = true;
      this.resetParams();
      this.getList(false);
    },

    dealData(data, flag) {
      const DOCUMENT_TYPE = data.written.id || null;
      let FROM_DATE = null;
      let TO_DATE = null;
      let READ_FLG = null;
      let CONFIRM_FLG = null;
      let SINCE_SEQ_NO = null;

      if (data.from_date !== "" && data.from_date !== "-") {
        FROM_DATE = data.from_date;
      }

      if (data.to_date !== "" && data.to_date !== "-") {
        TO_DATE = data.to_date;
      }

      if (data.status.id == 2) READ_FLG = 0;
      if (data.status.id == 1) READ_FLG = 1;

      if (data.status.id == 3) CONFIRM_FLG = 0;
      if (data.status.id == 4) CONFIRM_FLG = 1;

      if (flag && this.electronicData.length !== 0) {
        SINCE_SEQ_NO =
          this.electronicData[this.electronicData.length - 1].SEQ_NO;
      }

      return {
        FROM_DATE,
        TO_DATE,
        DOCUMENT_TYPE,
        READ_FLG,
        CONFIRM_FLG,
        SINCE_SEQ_NO,
      };
    },

    getList(flag) {
      this.$store
        .dispatch("getListElectronic", this.dealData(this.searchParam, flag))
        .then(() => {
          let data = this.electronic()["DATA"];
          this.electronicData = flag ? this.electronicData.concat(data) : data;
          this.electronicData = this.electronicData.map((item) => {
            item.BASE_D = commonJs.handleDateStr(item.BASE_D);
            return item;
          });
          this.electronicData = [...this.electronicData];
        });
    },

    triggerSearch({ from_date, status, to_date, written, is_reset }) {
      let fromDate = from_date ?? "";
      let toDate = to_date ?? "";
      this.isReset = is_reset;

      if (from_date && toDate && from_date > toDate) {
        this.$store.commit("showPopup", {
          isShow: true,
          text: "期間の開始・終了の時系列は逆転させないでください。",
          btnName: "OK",
        });
        return;
      }

      this.searchBar.map((item) => {
        if (item.title === "期間" && (fromDate || toDate)) {
          item.value = `${
            fromDate && this.Moment(fromDate).format(this.formatDate[2])
          } ~ ${toDate && this.Moment(toDate).format(this.formatDate[2])}`;
          if (
            fromDate &&
            toDate &&
            this.Moment(fromDate).year() === this.Moment(toDate).year()
          ) {
            item.value = `${
              fromDate && this.Moment(fromDate).format(this.formatDate[2])
            } ~ ${toDate && this.Moment(toDate).format("MM/DD")}`;
          } else {
            item.value = `${
              fromDate && this.Moment(fromDate).format(this.formatDate[2])
            } ~ ${toDate && this.Moment(toDate).format(this.formatDate[2])}`;
          }
        }
        item.title === "書画種類" && (item.value = written.name);
        item.title === "閲覧状況" && (item.value = status.name);
      });
      this.searchParam = {
        status: {
          name: status.name,
          id: status.id,
        },
        written: {
          name: written.name,
          id: written.id,
        },
        from_date: fromDate,
        to_date: toDate,
      };
      this.getList(false);
    },

    handleReadDoc(item) {
      if (item["READ_FLG"] == 0) {
        this.$store.dispatch("readElectronic", item).then((response) => {
          if (response["STATUS"] === "OK") {
            this.getList(false);
          }
        });
      }
    },

    resetParams() {
      this.searchParam = {
        status: {
          name: "",
          id: "",
          is_check: false,
        },
        written: {
          name: "",
          id: "",
          is_check: false,
        },
        from_date: "",
        to_date: "",
      };
      this.searchBar.map((item) => {
        item.value = "すべて";
      });
    },
  },
};
