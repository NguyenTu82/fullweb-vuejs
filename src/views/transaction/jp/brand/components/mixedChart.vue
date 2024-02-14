<template>
  <div class="brand__data--single">
    <h2 class="brand__data-title">チャート</h2>
    <div class="brand__data-item table brand__data-table--chart card">
      <div>
        <div class="table__box">
          <div
            class="table__box-title table__box-custom table__box-title--small"
          >
            <p>前日終値</p>
          </div>
          <div
            class="table__box-value table__box-value--result table__box-value--small"
          >
            <p>
              {{
                chartInfo["todaysBasePrc"]
                  ? `${chartInfo["todaysBasePrc"]} 円`
                  : "-"
              }}
            </p>
          </div>
        </div>
        <div class="table__box">
          <div
            class="table__box-title table__box-custom table__box-title--small"
          >
            <p>始値</p>
          </div>
          <div
            class="table__box-value table__box-value--result table__box-value--small"
          >
            <p>{{ chartInfo["open"] ? `${chartInfo["open"]} 円` : "-" }}</p>
          </div>
        </div>
        <div class="table__box">
          <div
            class="table__box-title table__box-custom table__box-title--small"
          >
            <p>高値</p>
          </div>
          <div
            class="table__box-value table__box-value--result table__box-value--small"
          >
            <p>{{ chartInfo["high"] ? `${chartInfo["high"]} 円` : "-" }}</p>
          </div>
        </div>
        <div class="table__box">
          <div
            class="table__box-title table__box-custom table__box-title--small"
          >
            <p>安値</p>
          </div>
          <div
            class="table__box-value table__box-value--result table__box-value--small"
          >
            <p>{{ chartInfo["low"] ? `${chartInfo["low"]} 円` : "-" }}</p>
          </div>
        </div>
        <div class="table__box">
          <div
            class="table__box-title table__box-custom table__box-title--small"
          >
            <p>出来高</p>
          </div>
          <div
            class="table__box-value table__box-value--result table__box-value--small"
          >
            <p>{{ chartInfo["volume"] ? `${chartInfo["volume"]} 株` : "-" }}</p>
          </div>
        </div>
        <div class="table__box">
          <div
            class="table__box-title table__box-custom table__box-title--small"
          >
            <p>予想PER</p>
          </div>
          <div
            class="table__box-value table__box-value--result table__box-value--small"
          >
            <p>{{ chartInfo["per"] || "-" }}</p>
          </div>
        </div>
        <div class="table__box">
          <div
            class="table__box-title table__box-custom table__box-title--small"
          >
            <p>
              予想配当利回り
              <a
                href="https://www.cheer-sec.co.jp/other/app-help/expected-dividend-jkabu.html"
                target="_blank"
              >
                <img src="/assets/images/question.png" />
              </a>
            </p>
          </div>
          <div
            class="table__box-value table__box-value--result table__box-value--small"
          >
            <p v-if="$route.name === 'ConsignmentTransactions'">
              {{
                `${
                  chartInfo["exp_dividend_yield"]
                    ? `${chartInfo["exp_dividend_yield"]}%`
                    : "-"
                }`
              }}
            </p>
            <p v-else>
              {{
                `${
                  chartInfo["dividend_yield"]
                    ? `${chartInfo["dividend_yield"]}%`
                    : "-"
                }`
              }}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div class="brand__data-dummy--half">
          <iframe
            id="mixed_chart"
            width="100%"
            height="300"
            scrolling="no"
            frameborder="0"
            src=""
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/page/transaction/jp/brand/components/mixedChart"></script>

<style scoped></style>
