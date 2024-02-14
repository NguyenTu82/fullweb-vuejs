import { mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import commonJs from "@/assets/js/common/common";
import Moment from "moment";
export default {
  name: "TrendDetail",
  data() {
    return {
      detailData: {},
      common: commonJs,
      week: "",
      weekData: ["���j��", "���j��", "�Ηj��", "���j��", "�ؗj��", "���j��", "�y�j��"],
      days: "",
    };
  },
  methods: {
    ...mapMutations("common", [
      "setPageTittle",
      "setPageHeaderType",
      "setPageFooterType",
    ]),
    getWeek() {
      const a = new Date(this.detailData.base_d).getDay()
      this.week = this.weekData[a]
      const date1 = Date.parse(this.detailData.base_d);
      const date2 = Date.parse(Moment().format("YYYY/MM/DD"));
      const ms = Math.abs(date1 - date2);
      const day = Math.floor(ms / (24 * 3600 * 1000));
      if (date1 > date2) {
        this.days = `${day}�c�Ɠ���`
      } else if (date1 < date2 && day === 1) {
        this.days = "�O�c�Ɠ�"
      } else if (day === 0) {
        this.days = "�����c�Ɠ�"
      } else {
        this.days = ""
      }
    }
  },
  created() {
    this.setPageTittle(pageInfoConst.TITTLE.LOGIN);
    this.setPageHeaderType(pageInfoConst.HEADER_TYPE.GUEST);
    this.setPageFooterType(pageInfoConst.FOOTER_TYPE.NORMAL);
    const detailData = JSON.parse(sessionStorage.getItem("RestPowerDetails"));
    if (!detailData) {
      return false;
    }
    this.detailData = detailData;
    this.getWeek()
  },
};
