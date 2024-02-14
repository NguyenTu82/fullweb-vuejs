import commonJs from "@/assets/js/common/common";

export default {
  name: "BrandCartIt",
  title: "BrandCartIt",
  props: [
    "brand",
    "fund_type_list",
    "fund_abb_nm",
    "fund_type_nm",
    "price",
    "day_before_rate",
    "day_before_ratio",
    "isSelected",
    "inv_trust_assoc_cd",
    "fund_attr_cls_nm",
    "fund_nicknm",
  ],
  methods: {
    redirectTo(inv_trust_assoc_cd = "") {
      return inv_trust_assoc_cd
        ? {
            name: "InvestBrandDetail",
            query: { inv_trust_assoc_cd: inv_trust_assoc_cd },
          }
        : "";
    },
    number_format(number, decimals, dec_point, thousands_sep) {
      return commonJs.number_format(number, decimals, dec_point, thousands_sep);
    },
    handNumber(number) {
      return commonJs.handNumber(number);
    },
    checkNumber(val, unit = "") {
      if (!val || val == 0) {
        return `- ${unit}`;
      } else {
        return `${val} ${unit}`;
      }
    },
  },
};
