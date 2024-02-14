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
              <p :class="`tag--${transLimitFlg ? 'red' : 'black'}`">
                {{ transLimitText }}
              </p>
            </div>
            <div class="brand__reference">
              <div class="brand__reference-value--jp">
                <p>現在値</p>
                <h2>
                  {{ stockPriceDetail.last || "-" }}<small>&nbsp;円</small>
                </h2>
              </div>
              <div class="brand__reference-rate--jp">
                <p>前日比（率）</p>
                <h2
                  class="comparison_text"
                  :class="`${
                    stockPriceDetail.dayBeforeRatio > 0 
                        ? 'high'
                        : stockPriceDetail.dayBeforeRatio < 0 || stockPriceDetail.dayBeforeRatio == null
                        ? 'low'                        
                        : ''
                  }`"
                >
                  <span
                    v-if="
                      stockPriceDetail.dayBeforeRate &&
                      stockPriceDetail.dayBeforeRate >= 0
                    "
                    >+</span
                  >
                  {{
                    stockPriceDetail.dayBeforeRate > 0 || stockPriceDetail.dayBeforeRate < 0
                      ? handNumberFloat(stockPriceDetail.dayBeforeRate, 1)
                      : stockPriceDetail.dayBeforeRate == null
                      ? "-"
                      : "0"
                      
                  }}<small>円</small>
                  <small>{{
                    `(${
                      stockPriceDetail.dayBeforeRatio > 0
                        ? `+${
                            handNumberFloat(
                              stockPriceDetail.dayBeforeRatio,
                              2
                            ) ?? "-"
                          }`
                        : `${
                            handNumberFloat(
                              stockPriceDetail.dayBeforeRatio,
                              2
                            ) ?? "-"
                          }`
                    }%)`
                  }}</small>
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
              <MixedChart :chartInfo="chartInfo"></MixedChart>
              <div>
                <h2 class="brand__data-title">市況情報</h2>
                <MarketInfo :marketInfo="marketInfo"></MarketInfo>
              </div>
              <div>
                <h2 class="brand__data-title">板情報</h2>
                <BoardInfo
                  :boardInfo="boardInfo"
                  :offsetStrSell="offsetStrSell"
                  :offsetStrBuy="offsetStrBuy"
                ></BoardInfo>
              </div>
              <div class="brand__data--single column-chart-transaction">
                <h2 class="brand__data-title">業績情報</h2>
                <div
                  class="brand__data-item card brand__data-table--performance"
                >
                  <ColumnChartInfo
                    :listResultInfo="listResultInfo"
                  ></ColumnChartInfo>
                  <ColumnChart :listResultInfo="listResultInfo"></ColumnChart>
                </div>
              </div>
              <p class="brand__data-provider custom">
                提供元：株式会社時事通信社
              </p>
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

<script src="@/assets/js/page/transaction/jp/brand/pages/consignmentTransactions"></script>

<style scoped></style>
