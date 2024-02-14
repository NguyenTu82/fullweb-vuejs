import { mapMutations } from "vuex";
import pageInfoConst from "@/const/pageInfo";
import httpRequest from "@/assets/js/common/httpRequest";
import commonJs from "@/assets/js/common/common";
import apiInfo from "@/const/apiInfo";
import Moment from "moment";

export default {
  name: "Trend",
  data() {
    return {
      common: commonJs,
      resultTime: "",
      dataSource: [],
    };
  },
  methods: {
    ...mapMutations("common", [
      "setPageTittle",
      "setPageHeaderType",
      "setPageFooterType",
    ]),
    details(record, index) {
      record.workday = this.getDateDiff(index);
      sessionStorage.setItem("RestPowerDetails", JSON.stringify(record));
      this.$router.push({ path: "/reference/trend/detail" });
    },
    getDateDiff(index) {
      if (this.dataSource.length == 0) return;
      let firstDay = this.dataSource[0].base_d;
      let timer = new Date(firstDay).getTime();

      let today = new Date(Moment().format("YYYY-MM-DD")).getTime();

      let diffDay = parseInt((today - timer) / 24 / 60 / 60 / 1000);

      if (Math.abs(diffDay) < 1) {
        if (index == 0) {
          return "本日";
        } else {
          return index + "営業日後";
        }
      } else {
        return index + 1 + "営業日後";
      }
    },
    getList() {
      httpRequest
        .post(
          "/hhd-api/JPStock/AvailableCashInfoListController/exec",
          {},
          { apiType: apiInfo.apiType.JP_STOCK }
        )
        .then((res) => {
          this.dataSource = res.data.DATA.lst_cash_bal || [];
          this.dataSource = this.dataSource.sort(function (a, b) {
            return new Date(a.base_d) - new Date(b.base_d);
          });
          this.resultTime = res.data.RESULT_TIME;
        })
        .then(() => {
          this.getLength();
        });
    },
    getLength() {
      this.dataSource.map((val) => {
        if (
          val.cash_balance.toString().length >= 10 ||
          val.buy_available_capacity.toString().length >= 10 ||
          val.buy_available_capacity.toString().length >= 10
        ) {
          this.fontSize = 11;
        }
      });
    },
  },
  created() {
    this.setPageTittle(pageInfoConst.TITTLE.LOGIN);
    this.setPageHeaderType(pageInfoConst.HEADER_TYPE.GUEST);
    this.setPageFooterType(pageInfoConst.FOOTER_TYPE.NORMAL);
    this.getList();
  },
};
