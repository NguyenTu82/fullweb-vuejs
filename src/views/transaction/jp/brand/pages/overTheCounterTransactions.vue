<template>
  <main>
    <TopInfoItem></TopInfoItem>
    <BuyModal
      v-if="buyModal"
      @closeBuyModal="closeBuyModal()"
      :brandInfor="stockBrand()['DATA']"
    ></BuyModal>
    <SellModal
      v-if="sellModal"
      @closeSellModal="closeSellModal()"
      :brandInfor="stockBrand()['DATA']"
    ></SellModal>
    <section class="brand">
      <div class="wrapper">
        <h1 class="title">{{ title }}</h1>
        <div class="container card">
          <div class="l_tab_wrapper">
            <div class="brand__title">
              <div class="brand__title--jp">
                <h1 class="detail__title">{{ stockPriceDetail.stockTitle }}</h1>
              </div>
            </div>
            <div class="brand__tags">
              <p class="tag">{{ stockPriceDetail.exchangeNm }}</p>
              <p :class="`tag--${transLimitFlg > 0 ? 'red' : 'black'}`">
                {{ transLimitText }}
              </p>
              <p class="tag--black">店頭取引</p>
            </div>
            <div class="brand__reference">
              <div class="brand__reference-value--jp">
                <p>参考買値</p>
                <!--                <h2 class="high">{{ stockPriceDetail.last || '-' }}<small>&nbsp;円</small></h2>-->
                <h2 class="high">
                  {{ stockBrandJp.markup_ask }}<small>&nbsp;円</small>
                </h2>
              </div>
              <div class="brand__reference-rate--jp">
                <p>参考売値</p>
                <h2
                  :class="`comparison_text ${
                    stockBrandJp.markup_bid > 0 ? 'high' : 'low'
                  }`"
                >
                  <!--                  <span v-if="stockPriceDetail.dayBeforeRate >= 0">+</span>-->
                  {{ stockBrandJp.markup_bid }}<small>円</small>
                  <!--                  <small>{{-->
                  <!--                      `(${stockPriceDetail.dayBeforeRatio > 0-->
                  <!--                          ? `+${this.handNumberFloat(stockPriceDetail.dayBeforeRatio, 2) ?? ''}`-->
                  <!--                          : `${this.handNumberFloat(stockPriceDetail.dayBeforeRatio, 2) ?? ''}`}%)`-->
                  <!--                    }}</small>-->
                </h2>
              </div>
            </div>
            <div class="brand__date">
              <p class="brand__date-time">
                {{ DATE.date }}<span>{{ DATE.time }}</span
                >現在
              </p>
            </div>
            <div class="brand__data--jp card card--sphidden">
              <MixedChart
                :chartInfo="chartInfo"
                :chart="MIXED_CHART"
              ></MixedChart>
              <div>
                <h2 class="brand__data-title">市況情報</h2>
                <MarketInfoOverCounterTrans
                  :marketInfo="marketInfo"
                ></MarketInfoOverCounterTrans>
              </div>
              <div class="column-chart-transaction">
                <h2 class="brand__data-title">業績状況</h2>
                <div class="brand__data-item card">
                  <ColumnChart
                    :credit="false"
                    :listResultInfo="listResultInfo"
                  ></ColumnChart>
                  <ColumnChartInfo
                    :listResultInfo="listResultInfo"
                  ></ColumnChartInfo>
                </div>
              </div>
              <p class="brand__data-provider">提供元：株式会社時事通信社</p>
            </div>
          </div>
          <div class="brand__modal">
            <button
              @click="openBuyModal()"
              class="button button__secondary button__medium"
            >
              買注文
            </button>
            <button
              :disabled="this.soldQuantity <= 0"
              @click="openSellModal()"
              :style="styleDisabled"
              class="button button__primary button__medium"
            >
              売注文
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/transaction/jp/brand/pages/overTheCounterTransactions"></script>

<style scoped></style>
