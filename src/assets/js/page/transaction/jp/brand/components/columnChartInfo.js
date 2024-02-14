import Moment from "moment";
import commonJs from "@/assets/js/common/common";

export default {
  name: "columnChartInfo",
  props: ["listResultInfo"],
  methods: {
    formatDate(date) {
      return Moment(date).format("YYYY/MM");
    },

    handNumberInt(number) {
      return commonJs.handNumberInt(number);
    },
  },
};
