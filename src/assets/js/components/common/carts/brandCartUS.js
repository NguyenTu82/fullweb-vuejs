import commonJs from "@/assets/js/common/common";

export default {
  name: "BrandCart",
  title: "BrandCart",
  props: [
    "brandName",
    "brandCd",
    "buyPrice",
    "sellPrice",
    "percent",
    "id",
    "isSelected",
  ],
  methods: {
    handleBrandCd() {
      return this.brandCd.join(" | ");
    },
    checkNumber(isVal = null, num, unit = "") {
      if (isVal === null) {
        return `-`;
      } else {
        return `${num} ${unit}`;
      }
    },
    redirectTo(id = "") {
      return id ? { name: "UsBrandDetail", query: { brandId: id } } : "";
    },
    handNumber(number) {
      return commonJs.handNumber(number);
    },
  },
};
