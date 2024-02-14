<template>
  <div class="table card brand__data-item brand__data-table--jp">
    <div>
      <div class="table__box">
        <div class="table__box-title table__box-title--small">
          <p>出来高</p>
        </div>
        <div
          class="table__box-value table__box-value--result table__box-value--small"
        >
          <p>{{ marketInfo["volume"] ?? "-" }}</p>
        </div>
      </div>
      <div class="table__box">
        <div class="table__box-title table__box-title--small">
          <p>時価総額</p>
        </div>
        <div
          class="table__box-value table__box-value--result table__box-value--small"
        >
          <p>
            {{
              marketInfo["mkt_cap"]
                ? `${mathFloor(marketInfo["mkt_cap"] / 1000000)}`
                : "-"
            }}
            <small v-if="marketInfo['mkt_cap']">百万円</small>
          </p>
        </div>
      </div>
      <div class="table__box">
        <div class="table__box-title table__box-title--small">
          <p>PER</p>
        </div>
        <div
          class="table__box-value table__box-value--result table__box-value--small"
        >
          <p>{{ marketInfo["per"] ?? "-" }}</p>
        </div>
      </div>
      <div class="table__box">
        <div class="table__box-title table__box-title--small">
          <p>配当</p>
        </div>
        <div
          class="table__box-value table__box-value--result table__box-value--small"
        >
          <p>
            {{ marketInfo["dividend"] }}
            <small
              v-if="
                marketInfo['dividend'] !== '-' && marketInfo['dividend'] !== ''
              "
              >円</small
            >
          </p>
        </div>
      </div>
      <div class="table__box">
        <div class="table__box-title table__box-title--small">
          <p>売買代金</p>
        </div>
        <div
          class="table__box-value table__box-value--result table__box-value--small"
        >
          <p class="non-whitespace">
            {{
              marketInfo["trd_prc"]
                ? `${handNumberInt(mathFloor(marketInfo["trd_prc"] / 1000000))}`
                : "-"
            }}
            <small v-if="marketInfo['trd_prc']">百万円</small>
          </p>
        </div>
      </div>
      <div class="table__box">
        <div class="table__box-title table__box-title--small">
          <p>VWAP</p>
        </div>
        <div
          class="table__box-value table__box-value--result table__box-value--small"
        >
          <p class="non-whitespace">{{ marketInfo["vwap"] ?? "-" }}</p>
        </div>
      </div>
      <div class="table__box">
        <div class="table__box-title table__box-title--small">
          <p>PBR</p>
        </div>
        <div
          class="table__box-value table__box-value--result table__box-value--small"
        >
          <p>{{ marketInfo["pbr"] ?? "-" }}</p>
        </div>
      </div>
      <div class="table__box">
        <div class="table__box-title table__box-title--small">
          <p>配当落日</p>
        </div>
        <div
          class="table__box-value table__box-value--result table__box-value--small"
        >
          <p>{{ marketInfo["ex_divid_d"] ?? "-" }}</p>
        </div>
      </div>
      <div class="table__box">
        <div class="table__box-title table__box-title--small">
          <p>決算発表日</p>
        </div>
        <div
          class="table__box-value table__box-value--result table__box-value--small"
        >
          <p>{{ marketInfo["fin_res_d"] ?? "-" }}</p>
        </div>
      </div>
      <div class="table__box">
        <div class="table__box-title table__box-title--small">
          <p>権利落日</p>
        </div>
        <div
          class="table__box-value table__box-value--result table__box-value--small"
        >
          <p>{{ marketInfo["ex_rights_d"] ?? "-" }}</p>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script src="@/assets/js/page/transaction/jp/brand/components/marketInfoOverCounterTrans"></script>

<style scoped></style>
