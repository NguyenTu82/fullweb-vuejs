<template>
  <div class="order__forms--white card card--sphidden">
    <div class="sp_wrapper">
      <div class="order__forms-button">
        <button
          @click="clickExpand"
          class="button button__white button__small"
          id="accordion"
          ref="clickExpandHide"
        >
          開く
        </button>
      </div>
      <div class="base_color_table card accordion order__forms--hidden">
        <div class="base_color_table__head--black five_columns">
          <p><strong>売数量</strong></p>
          <p></p>
          <p><strong>値段</strong></p>
          <p></p>
          <p><strong>買数量</strong></p>
        </div>
        <div class="base_color_table__value five_columns">
          <p>{{ handNumberInt(conb_ask_vol) }}</p>
          <p></p>
          <p>OVER</p>
          <p></p>
          <p></p>
        </div>
        <div
          v-show="best_ask_vol_10 != 0 && best_ask_vol_10 != null"
          class="base_color_table__value five_columns">
          <p>{{ handNumberInt(best_ask_vol_10) }}</p>
          <p></p>
          <p><u @click="setValueMoney(best_ask_10)">{{ number_format(best_ask_10) }}</u></p>
          <p></p>
          <p></p>
        </div>
        <div
          v-show="best_ask_vol_9 != 0 && best_ask_vol_9 != null"
          class="base_color_table__value five_columns">
          <p>{{ handNumberInt(best_ask_vol_9) }}</p>
          <p></p>
          <p><u @click="setValueMoney(best_ask_9)">{{ number_format(best_ask_9) }}</u></p>
          <p></p>
          <p></p>
        </div>
        <div
          v-show="best_ask_vol_8 != 0 && best_ask_vol_8 != null"
          class="base_color_table__value five_columns">
          <p>{{ handNumberInt(best_ask_vol_8) }}</p>
          <p></p>
          <p><u @click="setValueMoney(best_ask_8)">{{ number_format(best_ask_8) }}</u></p>
          <p></p>
          <p></p>
        </div>
        <div
          v-show="best_ask_vol_7 != 0 && best_ask_vol_7 != null"
          class="base_color_table__value five_columns">
          <p>{{ handNumberInt(best_ask_vol_7) }}</p>
          <p></p>
          <p><u @click="setValueMoney(best_ask_7)">{{ number_format(best_ask_7) }}</u></p>
          <p></p>
          <p></p>
        </div>
        <div
          v-show="best_ask_vol_6 != 0 && best_ask_vol_6 != null"
          class="base_color_table__value five_columns">
          <p>{{ handNumberInt(best_ask_vol_6) }}</p>
          <p></p>
          <p><u @click="setValueMoney(best_ask_6)">{{ number_format(best_ask_6) }}</u></p>
          <p></p>
          <p></p>
        </div>
        <div
          v-show="best_ask_vol_5 != 0 && best_ask_vol_5 != null"
          class="base_color_table__value five_columns">
          <p>{{ handNumberInt(best_ask_vol_5) }}</p>
          <p></p>
          <p><u @click="setValueMoney(best_ask_5)">{{ number_format(best_ask_5) }}</u></p>
          <p></p>
          <p></p>
        </div>
        <div
          v-show="best_ask_vol_4 != 0 && best_ask_vol_4 != null"
          class="base_color_table__value five_columns">
          <p>{{ handNumberInt(best_ask_vol_4) }}</p>
          <p></p>
          <p><u @click="setValueMoney(best_ask_4)">{{ number_format(best_ask_4) }}</u></p>
          <p></p>
          <p></p>
        </div>
        <div
          v-show="best_ask_vol_3 != 0 && best_ask_vol_3 != null"
          class="base_color_table__value five_columns">
          <p>{{ handNumberInt(best_ask_vol_3) }}</p>
          <p></p>
          <p><u @click="setValueMoney(best_ask_3)">{{ number_format(best_ask_3) }}</u></p>
          <p></p>
          <p></p>
        </div>
        <div
          v-show="best_ask_vol_2 != 0 && best_ask_vol_2 != null"
          class="base_color_table__value five_columns">
          <p>{{ handNumberInt(best_ask_vol_2) }}</p>
          <p></p>
          <p><u @click="setValueMoney(best_ask_2)">{{ number_format(best_ask_2) }}</u></p>
          <p></p>
          <p></p>
        </div>
        <div
          v-show="best_ask_vol_1 != 0 && best_ask_vol_1 != null"
          class="base_color_table__value five_columns">
          <p class="low">{{ handNumberInt(best_ask_vol_1) }}</p>
          <p class="low">{{ offsetStrSell }}</p>
          <p class="low"><u @click="setValueMoney(best_ask_1)">{{ number_format(best_ask_1) }}</u></p>
          <p></p>
          <p></p>
        </div>
        <div
          v-show="best_bid_1 != 0 && best_bid_1 != null"
          class="base_color_table__value five_columns">
          <p></p>
          <p></p>
          <p class="high"><u @click="setValueMoney(best_bid_1)">{{ number_format(best_bid_1) }}</u></p>
          <p class="high">{{ offsetStrBuy }}</p>
          <p class="high">{{ handNumberInt(best_bid_vol_1) }}</p>
        </div>
        <div
          v-show="best_bid_2 != 0 && best_bid_2 != null"
          class="base_color_table__value five_columns">
          <p></p>
          <p></p>
          <p><u @click="setValueMoney(best_bid_2)">{{ number_format(best_bid_2) }}</u></p>
          <p></p>
          <p>{{ handNumberInt(best_bid_vol_2) }}</p>
        </div>
        <div
          v-show="best_bid_3 != 0 && best_bid_3 != null"
          class="base_color_table__value five_columns">
          <p></p>
          <p></p>
          <p><u @click="setValueMoney(best_bid_3)">{{ number_format(best_bid_3) }}</u></p>
          <p></p>
          <p>{{ handNumberInt(best_bid_vol_3) }}</p>
        </div>
        <div
          v-show="best_bid_4 != 0 && best_bid_4 != null"
          class="base_color_table__value five_columns">
          <p></p>
          <p></p>
          <p><u @click="setValueMoney(best_bid_4)">{{ number_format(best_bid_4) }}</u></p>
          <p></p>
          <p>{{ handNumberInt(best_bid_vol_4) }}</p>
        </div>
        <div
          v-show="best_bid_5 != 0 && best_bid_5 != null"
          class="base_color_table__value five_columns">
          <p></p>
          <p></p>
          <p><u @click="setValueMoney(best_bid_5)">{{ number_format(best_bid_5) }}</u></p>
          <p></p>
          <p>{{ handNumberInt(best_bid_vol_5) }}</p>
        </div>
        <div
          v-show="best_bid_6 != 0 && best_bid_6 != null"
          class="base_color_table__value five_columns">
          <p></p>
          <p></p>
          <p><u @click="setValueMoney(best_bid_6)">{{ number_format(best_bid_6) }}</u></p>
          <p></p>
          <p>{{ handNumberInt(best_bid_vol_6) }}</p>
        </div>
        <div
          v-show="best_bid_7 != 0 && best_bid_7 != null"
          class="base_color_table__value five_columns">
          <p></p>
          <p></p>
          <p><u @click="setValueMoney(best_bid_7)">{{ number_format(best_bid_7) }}</u></p>
          <p></p>
          <p>{{ handNumberInt(best_bid_vol_7) }}</p>
        </div>
        <div
          v-show="best_bid_8 != 0 && best_bid_8 != null"
          class="base_color_table__value five_columns">
          <p></p>
          <p></p>
          <p><u @click="setValueMoney(best_bid_8)">{{ number_format(best_bid_8) }}</u></p>
          <p></p>
          <p>{{ handNumberInt(best_bid_vol_8) }}</p>
        </div>
        <div
          v-show="best_bid_9 != 0 && best_bid_9 != null"
          class="base_color_table__value five_columns">
          <p></p>
          <p></p>
          <p><u @click="setValueMoney(best_bid_9)">{{ number_format(best_bid_9) }}</u></p>
          <p></p>
          <p>{{ handNumberInt(best_bid_vol_9) }}</p>
        </div>
        <div
          v-show="best_bid_10 != 0 && best_bid_10 != null"
          class="base_color_table__value five_columns">
          <p></p>
          <p></p>
          <p><u @click="setValueMoney(best_bid_10)">{{ number_format(best_bid_10) }}</u></p>
          <p></p>
          <p>{{ handNumberInt(best_bid_vol_10) }}</p>
        </div>
        <div class="base_color_table__value five_columns">
          <p></p>
          <p></p>
          <p>UNDER</p>
          <p></p>
          <p>{{ handNumberInt(conb_bid_vol) ?? "-" }}</p>
        </div>
      </div>
      <div class="base_color_table card accordion order__forms--open">
        <div class="base_color_table__head--black five_columns">
          <p><strong>売数量</strong></p>
          <p></p>
          <p><strong>値段</strong></p>
          <p></p>
          <p><strong>買数量</strong></p>
        </div>
        <div class="order__forms--closed">
          <div
            v-show="best_ask_vol_3 != 0 && best_ask_vol_3 != null"
            class="base_color_table__value five_columns">
            <p>{{ handNumberInt(best_ask_vol_3) }}</p>
            <p></p>
            <p><u @click="setValueMoney(best_ask_3)">{{ number_format(best_ask_3) }}</u></p>
            <p></p>
            <p></p>
          </div>
          <div
            v-show="best_ask_vol_2 != 0 && best_ask_vol_2 != null"
            class="base_color_table__value five_columns">
            <p>{{ handNumberInt(best_ask_vol_2) }}</p>
            <p></p>
            <p><u @click="setValueMoney(best_ask_2)">{{ number_format(best_ask_2) }}</u></p>
            <p></p>
            <p></p>
          </div>
          <div
            v-show="best_ask_vol_1 != 0 && best_ask_vol_1 != null"
            class="base_color_table__value five_columns">
            <p class="low">{{ handNumberInt(best_ask_vol_1) }}</p>
            <p class="low">{{ offsetStrSell }}</p>
            <p class="low"><u @click="setValueMoney(best_ask_1)">{{ number_format(best_ask_1) }}</u></p>
            <p></p>
            <p></p>
          </div>
          <div
            v-show="best_bid_1 != 0 && best_bid_1 != null"
            class="base_color_table__value five_columns">
            <p></p>
            <p></p>
            <p class="high"><u @click="setValueMoney(best_bid_1)">{{ number_format(best_bid_1) }}</u></p>
            <p class="high">{{ offsetStrBuy }}</p>
            <p class="high">{{ handNumberInt(best_bid_vol_1) }}</p>
          </div>
          <div
            v-show="best_bid_2 != 0 && best_bid_2 != null"
            class="base_color_table__value five_columns">
            <p></p>
            <p></p>
            <p><u @click="setValueMoney(best_bid_2)">{{ number_format(best_bid_2) }}</u></p>
            <p></p>
            <p>{{ handNumberInt(best_bid_vol_2) }}</p>
          </div>
          <div
            v-show="best_bid_3 != 0 && best_bid_3 != null"
            class="base_color_table__value five_columns">
            <p></p>
            <p></p>
            <p><u @click="setValueMoney(best_bid_3)">{{ number_format(best_bid_3) }}</u></p>
            <p></p>
            <p>{{ handNumberInt(best_bid_vol_3) }}</p>
          </div>
        </div>
      </div>
      <p v-show="s_text" class="order__forms-text">
        値段をクリックすると注文金額欄に反映されます。
      </p>
    </div>
  </div>
</template>

<script src="@/assets/js/page/stockJP/components/listItemBuySell.js"></script>
