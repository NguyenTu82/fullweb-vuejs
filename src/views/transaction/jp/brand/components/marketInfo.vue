<template>
  <div
    class="table card brand__data-item brand__data-table--jp table-custom-transaction"
  >
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
                ? `${number_format(marketInfo["mkt_cap"], 0)}`
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
          <p>単元株式</p>
        </div>
        <div
          class="table__box-value table__box-value--result table__box-value--small"
        >
          <p>
            {{ marketInfo["trd_unit"] ?? "-"
            }}<small v-if="marketInfo['trd_unit']">株</small>
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
    <div>
      <div class="table__box">
        <div class="table__box-title table__box-title--small">
          <p>年高</p>
        </div>
        <div
          class="table__box-value table__box-value--result table__box-value--small"
        >
          <p>
            {{ isZero(marketInfo["y_high_price"])
            }}<small v-if="marketInfo['y_high_price']">円</small>
          </p>
        </div>
      </div>
      <div class="table__box">
        <div class="table__box-title table__box-title--small">
          <p>年安</p>
        </div>
        <div
          class="table__box-value table__box-value--result table__box-value--small"
        >
          <p>
            {{ isZero(marketInfo["y_low_price"])
            }}<small v-if="marketInfo['y_high_price']">円</small>
          </p>
        </div>
      </div>
      <div class="table__box">
        <div class="table__box-title table__box-title--small">
          <p>上場高</p>
        </div>
        <div
          class="table__box-value table__box-value--result table__box-value--small"
        >
          <p>
            {{ isZero(marketInfo["list_to_high"]) ?? "-"
            }}<small v-if="marketInfo['list_to_high']">円</small>
          </p>
        </div>
      </div>
      <div class="table__box">
        <div class="table__box-title table__box-title--small">
          <p>上場安</p>
        </div>
        <div
          class="table__box-value table__box-value--result table__box-value--small"
        >
          <p>
            {{ isZero(marketInfo["list_to_low"])
            }}<small v-if="marketInfo['list_to_low']">円</small>
          </p>
        </div>
      </div>
      <div class="table__box">
        <div class="table__box-title table__box-title--small">
          <p>歩み値1</p>
        </div>
        <div
          class="table__box-value table__box-value--result table__box-value--small"
        >
          <p>
            {{ isZero(marketInfo["step_price_1"])
            }}<small v-if="marketInfo['step_price_1']">円</small>
          </p>
        </div>
      </div>
      <div class="table__box">
        <div class="table__box-title table__box-title--small">
          <p>歩み値2</p>
        </div>
        <div
          class="table__box-value table__box-value--result table__box-value--small"
        >
          <p>
            {{ isZero(marketInfo["step_price_2"])
            }}<small v-if="marketInfo['step_price_2']">円</small>
          </p>
        </div>
      </div>
      <div class="table__box">
        <div class="table__box-title table__box-title--small">
          <p>歩み値3</p>
        </div>
        <div
          class="table__box-value table__box-value--result table__box-value--small"
        >
          <p>
            {{ isZero(marketInfo["step_price_3"])
            }}<small v-if="marketInfo['step_price_3']">円</small>
          </p>
        </div>
      </div>
      <div class="table__box">
        <div class="table__box-title table__box-title--small">
          <p>歩み値4</p>
        </div>
        <div
          class="table__box-value table__box-value--result table__box-value--small"
        >
          <p>
            {{ isZero(marketInfo["step_price_4"])
            }}<small v-if="marketInfo['step_price_4']">円</small>
          </p>
        </div>
      </div>
    </div>

    <div>
      <div class="table__box">
        <div
          class="table__box-value table__box-value--result table__box-value--small"
          :style="styleBrandDate"
        >
          <p>{{ marketInfo["y_high_price_d"] ?? "-" }}</p>
        </div>
      </div>
      <div class="table__box">
        <div
          class="table__box-value table__box-value--result table__box-value--small"
          :style="styleBrandDate"
        >
          <p>{{ marketInfo["y_low_price_d"] ?? "-" }}</p>
        </div>
      </div>
      <div class="table__box">
        <div
          class="table__box-value table__box-value--result table__box-value--small"
          :style="styleBrandDate"
        >
          <p>{{ marketInfo["list_to_high_d"] ?? "-" }}</p>
        </div>
      </div>
      <div class="table__box">
        <div
          class="table__box-value table__box-value--result table__box-value--small"
          :style="styleBrandDate"
        >
          <p>{{ marketInfo["list_to_low_d"] ?? "-" }}</p>
        </div>
      </div>
      <div class="table__box">
        <div
          class="table__box-value table__box-value--result table__box-value--small"
          :style="styleBrandDate"
        >
          <p>{{ marketInfo["step_price_tm_1"] ?? "-" }}</p>
        </div>
      </div>
      <div class="table__box">
        <div
          class="table__box-value table__box-value--result table__box-value--small"
          :style="styleBrandDate"
        >
          <p>{{ marketInfo["step_price_tm_2"] ?? "-" }}</p>
        </div>
      </div>
      <div class="table__box">
        <div
          class="table__box-value table__box-value--result table__box-value--small"
          :style="styleBrandDate"
        >
          <p>{{ marketInfo["step_price_tm_3"] ?? "-" }}</p>
        </div>
      </div>
      <div class="table__box">
        <div
          class="table__box-value table__box-value--result table__box-value--small"
          :style="styleBrandDate"
        >
          <p>{{ marketInfo["step_price_tm_4"] ?? "-" }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/page/transaction/jp/brand/components/marketInfo"></script>

<style scoped></style>
