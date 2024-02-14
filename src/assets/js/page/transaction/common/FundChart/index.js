import { Decimal } from "decimal.js";
import { createChart } from "lightweight-charts";
import Moment from "moment";
import commonJs from "@/assets/js/common/common";

export default {
  props: ["dataFundChart", "fund_chart_period"],
  data() {
    return {
      chartObj: {
        times: 0,
        chart: null,
        captial: null,
        basePrice: null,
        basePriceD: null,
        options: {
          captial: [],
          basePrice: [],
          basePriceD: [],
        },
        initPriceLabel: false,
      },
    };
  },
  created() {
    this.refreshGraph();
  },
  directives: {
    initEchart(el, binding) {
      let chartObj = binding.value;
      if (el && chartObj && chartObj.times) {
        if (chartObj.chart === null) {
          const getzf = (num) => {
            if (parseInt(num) < 10) {
              num = "0" + num;
            }
            return num;
          };

          el.innerHTML = `<div class="floating-tooltip-2"></div>
          <div class="price-label">
            <span class="price-label-text"></span>
          </div>
          <div class="price-label-right">
            <span class="price-label-text-right"></span>
          </div>`;

          chartObj.chart = createChart(el, {
            borderVisible: false,
            layout: {
              backgroundColor: "rgba(245,245,245,1)",
              textColor: "rgba(180,180,180,1)",
            },
            grid: {
              vertLines: {
                color: "#ffffff",
              },
              horzLines: {
                color: "#ffffff",
              },
            },
            rightPriceScale: {
              visible: true,
              borderColor: "#000000",
              entireTextOnly: true,
            },
            leftPriceScale: {
              visible: true,
              borderColor: "#000000",
              entireTextOnly: true,
            },
            timeScale: {
              rightOffset: 0,
              barSpacing: 10,
              fixLeftEdge: true,
              fixRightEdge: true,
              lockVisibleTimeRangeOnResize: true,
              rightBarStaysOnScroll: true,
              borderVisible: false,
              borderColor: "#ffffff",
              visible: true,
              timeVisible: true,
              secondsVisible: true,
            },
            pinch: false,
            localization: {
              timeFormatter: (businessDayOrTimestamp) => {
                let date = new Date(businessDayOrTimestamp * 1000);
                return (
                  date.getUTCFullYear() +
                  "/" +
                  getzf(date.getUTCMonth() + 1) +
                  "/" +
                  getzf(date.getUTCDate())
                );
              },
            },
            handleScroll: {
              vertTouchDrag: false,
            },
            handleScale: {
              axisPressedMouseMove: {
                price: false,
              },
            },
            crosshair: {
              vertLine: {
                visible: false,
                labelVisible: false,
              },
              horzLine: {
                visible: false,
                labelVisible: false,
              },
            },
          });

          chartObj.captial = chartObj.chart.addAreaSeries({
            topColor: "rgba(220, 248, 240, 0.5)",
            bottomColor: "rgba(220, 248, 240, 0.5)",
            lineColor: "#dcf8f0",
            lineWidth: 2,
            priceScaleId: "right",
            lastValueVisible: false,
            priceLineVisible: false,
            priceFormat: {
              type: "price",
            },
          });
          chartObj.basePriceD = chartObj.chart.addLineSeries({
            lineWidth: 2,
            color: "#1b9975",
            priceScaleId: "left",
            lastValueVisible: false,
            priceLineVisible: false,
            priceFormat: {
              type: "custom",
              formatter: (price) => commonJs.handNumberInt(price),
            },
          });
          chartObj.basePrice = chartObj.chart.addLineSeries({
            lineWidth: 3,
            color: "#43deb1",
            priceScaleId: "left",
            lastValueVisible: false,
            priceLineVisible: false,
            priceFormat: {
              type: "custom",
              formatter: (price) => commonJs.handNumberInt(price),
            },
          });
          const toolTip = el.getElementsByClassName("floating-tooltip-2")[0];
          const toolTipWidth = 200;
          const toolTipHeight = 120;
          const toolTipMargin = 15;

          const getFormatTooltip = (params, unit) => `
            <div style="display: flex; width: 100%">
              <div style="margin-right: 10px">
                ${params.seriesName}
              </div>
              <div style="margin-left: auto";>
                ${params.data || "-"} ${(params.data && unit) || ""}
              </div>
            </div>
          `;

          const businessDayToString = (businessDayOrTimestamp) => {
            let date = new Date(businessDayOrTimestamp * 1000);
            return (
              date.getUTCFullYear() +
              "/" +
              getzf(date.getUTCMonth() + 1) +
              "/" +
              getzf(date.getUTCDate())
            );
          };

          const tooltipSubscribe = (param) => {
            if (
              param.point === undefined ||
              !param.time ||
              param.point.x < 0 ||
              param.point.x > el.clientWidth ||
              param.point.y < 0 ||
              param.point.y > el.c2lientHeight
            ) {
              toolTip.style.display = "none";
            } else {
              toolTip.style.display = "block";
              const objTool = param.seriesPrices.values()
              const captial = objTool.next().value;
              const basePrice = objTool.next().value;
              const basePriceD = objTool.next().value;
              toolTip.innerHTML = `
                ${businessDayToString(param.time)} <br />
                ${getFormatTooltip(
                  {
                    data: commonJs.handNumberInt(basePrice),
                    seriesName: "基準価額",
                  },
                  "円"
                )}
                ${getFormatTooltip(
                  {
                    data: commonJs.handNumberInt(basePriceD),
                    seriesName: "分配金込基準価額",
                  },
                  "円"
                )}
                ${getFormatTooltip(
                  { data: commonJs.handNumber(captial), seriesName: "純資産" },
                  "億円"
                )}
              `;
              const coordinate = chartObj.captial.priceToCoordinate(captial);
              let shiftedCoordinate = param.point.x - 50;
              if (coordinate === null) {
                return;
              }
              shiftedCoordinate = Math.max(
                0,
                Math.min(el.clientWidth - toolTipWidth, shiftedCoordinate)
              );
              const coordinateY =
                coordinate - toolTipHeight - toolTipMargin > 0
                  ? coordinate - toolTipHeight - toolTipMargin
                  : Math.max(
                      0,
                      Math.min(
                        el.clientHeight - toolTipHeight - toolTipMargin,
                        coordinate + toolTipMargin
                      )
                    );
              toolTip.style.left = shiftedCoordinate + "px";
              toolTip.style.top = coordinateY + "px";
            }
          };

          chartObj.chart.subscribeCrosshairMove(tooltipSubscribe);
        }
        chartObj.captial.setData(chartObj.options.captial);
        chartObj.basePrice.setData(chartObj.options.basePrice);
        chartObj.basePriceD.setData(chartObj.options.basePriceD);
        chartObj.chart.timeScale().fitContent();
        chartObj.chart.timeScale().scrollToPosition(Number.MIN_SAFE_INTEGER);
        chartObj.times--;

        if (chartObj.initPriceLabel === false && el) {
          const chartColumns = el.querySelectorAll("td");
          if (chartColumns.length > 2) {
            const wrapperLeft = chartColumns[0].querySelector("div");
            const priceLabel = el
              .getElementsByClassName("price-label")[0]
              .cloneNode(true);
            const priceLabelText =
              priceLabel.getElementsByClassName("price-label-text")[0];
            priceLabelText.innerHTML = "(円)";

            const wrapperRight = chartColumns[2].querySelector("div");
            const priceLabelRight = el
              .getElementsByClassName("price-label-right")[0]
              .cloneNode(true);

            const priceLabelTextRight = priceLabelRight.getElementsByClassName(
              "price-label-text-right"
            )[0];
            priceLabelTextRight.innerHTML = "(億円)";

            const canvasLeft = chartColumns[0].querySelectorAll("canvas");
            if (canvasLeft.length > 1) {
              canvasLeft[0].style["border-top"] =
                "24px solid rgba(245,245,245,1)";
              canvasLeft[1].style["border-top"] =
                "24px solid rgba(245,245,245,1)";
            }
            const canvasRight = chartColumns[2].querySelectorAll("canvas");
            if (canvasRight.length > 1) {
              canvasRight[0].style["border-top"] =
                "24px solid rgba(245,245,245,1)";
              canvasRight[1].style["border-top"] =
                "24px solid rgba(245,245,245,1)";
            }
            const canvasMiddle = chartColumns[1].querySelectorAll("canvas");
            if (canvasMiddle.length > 1) {
              canvasMiddle[0].style["border-top"] =
                "24px solid rgba(245,245,245,1)";
              canvasMiddle[1].style["border-top"] =
                "24px solid rgba(245,245,245,1)";
            }

            const removeCloneLabel =
              el.getElementsByClassName("price-label")[0];
            const removeCloneLabelRight =
              el.getElementsByClassName("price-label-right")[0];
            removeCloneLabelRight.remove();
            removeCloneLabel.remove();
            wrapperLeft.appendChild(priceLabel);
            wrapperRight.appendChild(priceLabelRight);
            chartObj.initPriceLabel = true;
          }
        }
      }
    },
  },
  watch: {
    dataFundChart: {
      handler: function () {
        this.refreshGraph();
      },
      deep: true,
    },
  },
  methods: {
    updatePeriod(e) {
      this.$emit("updateFundChartPeriod", e.target.value + "");
    },
    refreshGraph() {
      this.chartObj.times++;
      this.chartObj.options = {
        basePrice: [],
        basePriceD: [],
        captial: [],
      };

      if (this.dataFundChart.length > 0) {
        const optionToDays = {
          1: 1,
          2: 3,
          3: 6,
          4: 12,
          5: 36,
        };

        let lastDate = Moment()
          .subtract(optionToDays[this.fund_chart_period], "month")
          .format("YYYY/MM/DD");
        let dateOldest = Moment(new Date(this.dataFundChart[0].date)).format(
          "YYYY/MM/DD"
        );

        while (dateOldest !== lastDate) {
          dateOldest = Moment(dateOldest)
            .subtract(1, "days")
            .format("YYYY/MM/DD");
          const cur = new Date(dateOldest);
          const timestamp = cur.getTime() / 1000 - 60 * cur.getTimezoneOffset();

          this.chartObj.options.basePrice.push({
            time: timestamp,
            value: undefined,
          });
          this.chartObj.options.basePriceD.push({
            time: timestamp,
            value: undefined,
          });
          this.chartObj.options.captial.push({
            time: timestamp,
            value: undefined,
          });
        }
      }

      this.dataFundChart.forEach((data) => {
        const cur = new Date(data.date);
        const timestamp = cur.getTime() / 1000 - 60 * cur.getTimezoneOffset();
        const milionCaptial = new Decimal(+data.capital || 0)
          .dividedBy(100000000)
          .toFixed(2);
        const formatCaptial = commonJs.handNumberFloat(milionCaptial, 2);
        this.chartObj.options.basePrice.push({
          time: timestamp,
          value: +data.base_price,
        });
        this.chartObj.options.basePriceD.push({
          time: timestamp,
          value: +data.base_price_distribution,
        });
        this.chartObj.options.captial.push({
          time: timestamp,
          value: +formatCaptial,
        });
      });

      if (this.dataFundChart.length > 0) {
        let dateNow = Moment().format("YYYY/MM/DD");
        let dateNewest = Moment(
          new Date(this.dataFundChart[this.dataFundChart.length - 1].date)
        ).format("YYYY/MM/DD");

        while (dateNewest !== dateNow) {
          dateNewest = Moment(dateNewest).add(1, "days").format("YYYY/MM/DD");

          const cur = new Date(dateNewest);
          const timestamp = cur.getTime() / 1000 - 60 * cur.getTimezoneOffset();

          this.chartObj.options.basePrice.push({
            time: timestamp,
            value: undefined,
          });
          this.chartObj.options.basePriceD.push({
            time: timestamp,
            value: undefined,
          });
          this.chartObj.options.captial.push({
            time: timestamp,
            value: undefined,
          });
        }
      }
    },
  },
};
