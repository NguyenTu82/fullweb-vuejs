<template>
  <div class="brand__data-item brand__data-item--small card">
    <p class="brand__data-item-unit">単元：{{ boardInfo["trd_unit"] }}</p>
    <div class="base_color_table card">
      <div class="base_color_table__head five_columns">
        <p><strong>売数量</strong></p>
        <p></p>
        <p><strong>値段</strong></p>
        <p></p>
        <p><strong>買数量</strong></p>
      </div>
      <div class="base_color_table__value five_columns">
        <p :class="BINDING_COLOR">{{ boardInfo["mktod_ask_vol"] }}</p>
        <p></p>
        <p :class="BINDING_COLOR">成行</p>
        <p></p>
        <p :class="BINDING_COLOR">{{ boardInfo["mktod_bid_vol"] }}</p>
      </div>
      <div class="base_color_table__value five_columns">
        <p>{{ boardInfo["conb_ask_vol"] }}</p>
        <p></p>
        <p>OVER</p>
        <p></p>
        <p></p>
      </div>
      <div class="base_color_table__value five_columns">
        <p>{{ boardInfo["best_ask_vol_10"] ?? "-" }}</p>
        <p></p>
        <p>{{ boardInfo["best_ask_10"] ?? "-" }}</p>
        <p></p>
        <p></p>
      </div>
      <div class="base_color_table__value five_columns">
        <p>{{ boardInfo["best_ask_vol_9"] ?? "-" }}</p>
        <p></p>
        <p>{{ boardInfo["best_ask_9"] ?? "-" }}</p>
        <p></p>
        <p></p>
      </div>
      <div class="base_color_table__value five_columns">
        <p>{{ boardInfo["best_ask_vol_8"] ?? "-" }}</p>
        <p></p>
        <p>{{ boardInfo["best_ask_8"] ?? "-" }}</p>
        <p></p>
        <p></p>
      </div>
      <div class="base_color_table__value five_columns">
        <p>{{ boardInfo["best_ask_vol_7"] ?? "-" }}</p>
        <p></p>
        <p>{{ boardInfo["best_ask_7"] ?? "-" }}</p>
        <p></p>
        <p></p>
      </div>
      <div class="base_color_table__value five_columns">
        <p>{{ boardInfo["best_ask_vol_6"] ?? "-" }}</p>
        <p></p>
        <p>{{ boardInfo["best_ask_6"] ?? "-" }}</p>
        <p></p>
        <p></p>
      </div>
      <div class="base_color_table__value five_columns">
        <p>{{ boardInfo["best_ask_vol_5"] ?? "-" }}</p>
        <p></p>
        <p>{{ boardInfo["best_ask_5"] ?? "-" }}</p>
        <p></p>
        <p></p>
      </div>
      <div class="base_color_table__value five_columns">
        <p>{{ boardInfo["best_ask_vol_4"] ?? "-" }}</p>
        <p></p>
        <p>{{ boardInfo["best_ask_4"] ?? "-" }}</p>
        <p></p>
        <p></p>
      </div>
      <div class="base_color_table__value five_columns">
        <p>{{ boardInfo["best_ask_vol_3"] ?? "-" }}</p>
        <p></p>
        <p>{{ boardInfo["best_ask_3"] ?? "-" }}</p>
        <p></p>
        <p></p>
      </div>
      <div class="base_color_table__value five_columns">
        <p>{{ boardInfo["best_ask_vol_2"] ?? "-" }}</p>
        <p></p>
        <p>{{ boardInfo["best_ask_2"] ?? "-" }}</p>
        <p></p>
        <p></p>
      </div>
      <div class="base_color_table__value five_columns">
        <p class="text-blue">{{ boardInfo["best_ask_vol_1"] ?? "-" }}</p>
        <p class="text-blue">{{ offsetStrSell }}</p>
        <p class="text-blue">{{ boardInfo["best_ask_1"] ?? "-" }}</p>
        <p></p>
        <p></p>
      </div>
      <div class="base_color_table__value five_columns">
        <p></p>
        <p></p>
        <p class="text-red">{{ boardInfo["best_bid_1"] ?? "-" }}</p>
        <p class="text-red">{{ offsetStrBuy }}</p>
        <p class="text-red">{{ boardInfo["best_bid_vol_1"] ?? "-" }}</p>
      </div>
      <div class="base_color_table__value five_columns">
        <p></p>
        <p></p>
        <p>{{ boardInfo["best_bid_2"] ?? "-" }}</p>
        <p></p>
        <p>{{ boardInfo["best_bid_vol_2"] ?? "-" }}</p>
      </div>
      <div class="base_color_table__value five_columns">
        <p></p>
        <p></p>
        <p>{{ boardInfo["best_bid_3"] ?? "-" }}</p>
        <p></p>
        <p>{{ boardInfo["best_bid_vol_3"] ?? "-" }}</p>
      </div>
      <div class="base_color_table__value five_columns">
        <p></p>
        <p></p>
        <p>{{ boardInfo["best_bid_4"] ?? "-" }}</p>
        <p></p>
        <p>{{ boardInfo["best_bid_vol_4"] ?? "-" }}</p>
      </div>
      <div class="base_color_table__value five_columns">
        <p></p>
        <p></p>
        <p>{{ boardInfo["best_bid_5"] ?? "-" }}</p>
        <p></p>
        <p>{{ boardInfo["best_bid_vol_5"] ?? "-" }}</p>
      </div>
      <div class="base_color_table__value five_columns">
        <p></p>
        <p></p>
        <p>{{ boardInfo["best_bid_6"] ?? "-" }}</p>
        <p></p>
        <p>{{ boardInfo["best_bid_vol_6"] ?? "-" }}</p>
      </div>
      <div class="base_color_table__value five_columns">
        <p></p>
        <p></p>
        <p>{{ boardInfo["best_bid_7"] ?? "-" }}</p>
        <p></p>
        <p>{{ boardInfo["best_bid_vol_7"] ?? "-" }}</p>
      </div>
      <div class="base_color_table__value five_columns">
        <p></p>
        <p></p>
        <p>{{ boardInfo["best_bid_8"] ?? "-" }}</p>
        <p></p>
        <p>{{ boardInfo["best_bid_vol_8"] ?? "-" }}</p>
      </div>
      <div class="base_color_table__value five_columns">
        <p></p>
        <p></p>
        <p>{{ boardInfo["best_bid_9"] ?? "-" }}</p>
        <p></p>
        <p>{{ boardInfo["best_bid_vol_9"] ?? "-" }}</p>
      </div>
      <div class="base_color_table__value five_columns">
        <p></p>
        <p></p>
        <p>{{ boardInfo["best_bid_10"] ?? "-" }}</p>
        <p></p>
        <p>{{ boardInfo["best_bid_vol_10"] ?? "-" }}</p>
      </div>
      <div class="base_color_table__value five_columns">
        <p></p>
        <p></p>
        <p class="text-under">UNDER</p>
        <p></p>
        <p>{{ boardInfo["conb_bid_vol"] ?? "-" }}</p>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/page/transaction/jp/brand/components/boardInfo"></script>

<style scoped></style>
