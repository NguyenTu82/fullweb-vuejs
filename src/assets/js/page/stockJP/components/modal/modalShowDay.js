export default {
  props: {
    isShow: { type: Boolean, default: false },
    dataArr: { type: Array, default: () => [] },
    newValue: { type: String, default: "" },
  },
  data() {
    return {
      selectedDay: "",
    };
  },
  watch: {
    dataArr(newVal, oldVal) {
      if (newVal != oldVal) {
        this.selectedDay = newVal[0].business_day;
      }
    },
    newValue(newVal, oldVal) {
      if (newVal != oldVal) {
        this.selectedDay = newVal;
      }
    },
  },

  methods: {
    cancelSelect() {
      this.$emit("hideModal", { name: "showModalGetDay", value: false });
    },
    onChange(e) {
      this.selectedDay = e.target.value;
    },
    onSelectDay() {
      this.$emit("selectValue", this.selectedDay);
      this.cancelSelect();
    },
  },
};
