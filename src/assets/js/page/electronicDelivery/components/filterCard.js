export default {
  name: "filterCard",
  props: ["isReset"],
  data() {
    return {
      formType: [
        { id: null, name: "すべて", is_check: true },
        { id: "1", name: "取引報告書", is_check: false },
        { id: "2", name: "取引残高報告書", is_check: false },
        { id: "9", name: "その他", is_check: false },
      ],
      browsingStatus: [
        { id: null, name: "すべて", is_check: true },
        { id: "1", name: "既読", is_check: false },
        { id: "2", name: "未読", is_check: false },
      ],
      params: {
        from_date: null,
        to_date: null,
        written: null,
        status: null,
      },
    };
  },
  watch: {
    isReset() {
      if (this.isReset) {
        this.params.from_date = null;
        this.params.to_date = null;
        this.params.written = null;
        this.params.status = null;
      }
    },
  },
  methods: {
    closeFilter() {
      this.$emit("closeFilter");
    },

    search() {
      let written = {};
      let status = {};

      this.formType.forEach((item) => {
        if (this.params.written == item.id) {
          written.id = item.id;
          written.name = item.name;
          written.is_check = true;
        }
      });

      this.browsingStatus.forEach((item) => {
        if (this.params.status == item.id) {
          status.id = item.id;
          status.name = item.name;
          status.is_check = true;
        }
      });

      this.$emit("search", {
        written,
        status,
        from_date: this.params.from_date,
        to_date: this.params.to_date,
        is_reset: false,
      });
      this.closeFilter();
    },
  },
};
