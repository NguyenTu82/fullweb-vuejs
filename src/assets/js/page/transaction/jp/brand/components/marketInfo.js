import commonJs from "@/assets/js/common/common";

export default {
  name: "MarketInfo",
  props: ["marketInfo"],
  data() {
    return {
      styleBrandDate:
        "background-color: transparent; align-items: flex-start; color: #777777;",
    };
  },
  methods: {
    mathFloor(value) {
      return Math.floor(value);
    },

    isZero(number) {
      if (number == 0) {
        return "-";
      }
      return number;
    },

    handNumberInt(number) {
      return commonJs.handNumberInt(number);
    },

    number_format(number, decimals) {
      return commonJs.number_format(number, decimals);
    }
  },
};
