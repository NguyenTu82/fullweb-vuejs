<template>
  <router-link
    :event="id ? 'click' : ''"
    :to="redirectTo(id)"
    :class="['list_card', isSelected ? 'bg--active' : '']"
    v-if="isShowCart(type, otcSelectBrandCls)"
  >
    <div class="list_card__title">
      <h2>{{ brandName || "" }}</h2>
    </div>
    <div class="list_card__subtext">
      <h3>{{ handleBrandCd() }}</h3>
    </div>
    <div class="list_card__detail" v-show="type == 2">
      <div class="list_card__detail-price">
        <p>株価</p>
        <p class="list_card__detail-price">
          <strong>{{ checkNumber(number_format(stockPrice, 0)) }}</strong
          ><small>円</small>
        </p>
      </div>
      <div class="list_card__detail-price">
        <p>前日比（率）</p>
        <p
          :class="[
            'comparison_text--card comparison_text--table',
            percent > 0 ? 'high' : percent < 0 || percent == null ? 'low' : '',
          ]"
          v-if="percent != null"
        >
          {{ ratio > 0 ? "+" : "" }}{{ ratio > 0 || ratio < 0
                      ? handNumberFloat(ratio, 0)
                      : ratio == null
                      ? "-"
                      : "0"
          }}<small>円</small
          ><small>{{
                    `(${
                      ratio > 0
                        ? `+${
                            handNumberFloat(
                              percent,
                              2
                            ) ?? "-"
                          }`
                        : `${
                            handNumberFloat(
                              percent,
                              2
                            ) ?? "-"
                          }`
                    }%)`
                  }}</small>
        </p>
        <p class="comparison_text--card comparison_text--table" v-else>-</p>
      </div>
    </div>
    <div class="list_card__detail" v-show="type == 1">
      <div class="list_card__detail-price">
        <p>参考買値（円）</p>
        <p class="high">
          <strong>{{
            checkNumber(
              !checkLengthNumber(markupAsk)
                ? number_format(markupAsk, checkDecimal(markupAsk))
                : handNumberFloat(markupAsk, checkDecimal(markupAsk))
            )
          }}</strong>
        </p>
      </div>
      <div class="list_card__detail-price">
        <p>参考売値（円）</p>
        <p class="low">
          <strong>{{
            checkNumber(
              !checkLengthNumber(markupBid)
                ? number_format(markupBid, checkDecimal(markupBid))
                : handNumberFloat(markupBid, checkDecimal(markupBid))
            )
          }}</strong>
        </p>
      </div>
      <div class="list_card__detail-price">
        <p>予想配当利回り（年率）</p>
        <p class="list_card__detail-price--black">
          <strong>{{
            checkNumber(handNumber(dividendYield), "%") || "-"
          }}</strong>
        </p>
      </div>
    </div>
  </router-link>
</template>

<script src="@/assets/js/components/common/carts/brandCartJP.js"></script>

<style scoped></style>
