import commonJs from "@/assets/js/common/common";

export default {
  name: "marketInfoOverCounterTrans",
  props: ["marketInfo"],
  methods: {
    mathFloor(value) {
      return Math.floor(value);
    },

    handNumberInt(number) {
      return commonJs.handNumberInt(number);
    },
  },
};
