<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/pages/home/"><strong>米国株式</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/transaction/us/brand/"><strong>銘柄一覧</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/transaction/us/sell/">売注文</a>
      </nav>
    </TopInfo>

    <section class="order">
      <div class="wrapper">
        <h1 class="title">[売] 米国株式</h1>
        <div class="container card">
          <div class="tab_wrapper">
            <p class="order__emphasis">
              ご注文内容をご確認の上、相違なければ注文ボタンをクリックしてください。
            </p>
            <!-- detailクラスはtypographyに記載 -->
            <h2 class="detail__title--sell">
              {{ brandInfo.BRAND_NM_DISP
              }}<span>/ {{ brandInfo.BRAND_NM }}</span>
            </h2>
            <p class="detail__exchange">
              {{ `${brandInfo.BRAND_CD} | ${brandInfo.MARKET_CD}` }}
            </p>
            <!-- <div class="order__reference">
              <div class="order__reference-value">
                <p>参考買値</p>
                <h2>{{ handNumber(principalSell.SELL_PRICE) }}<small>USD</small></h2>
              </div>
              <div class="order__reference-rate">
                <p>参考為替レート</p>
                <h2><small>USD/JPY</small>{{ handNumber(exchangeRate) }}</h2>
              </div>
            </div> -->
            <div class="order__data card card--sphidden">
              <div class="table">
                <div class="table__box">
                  <div class="table__box-title">
                    <p>売値</p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{ handNumber(principalSell.SELL_PRICE)
                      }}<small>USD</small>
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>注文方法</p>
                  </div>
                  <div class="table__box-value">
                    {{
                      orderSellData.selectedMethods == 1
                        ? "金額指定"
                        : "全部売却"
                    }}
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>取引区分</p>
                  </div>
                  <div class="table__box-value">
                    <p>店頭</p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>売買区分</p>
                  </div>
                  <div class="table__box-value">
                    <p>売付</p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>注文金額</p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{ handNumberInt(orderSellData.num) }}<small>円</small>
                    </p>
                  </div>
                </div>

                <div v-if="orderSellData.selectedMethods == 2" class="table__box">
                  <div class="table__box-title">
                    <p>売付株数</p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{ handNumberFloat(orderSellData.sellAbleQty) }}<small>株（口）</small>
                    </p>
                  </div>
                </div>

                <div class="table__box">
                  <div class="table__box-title">
                    <p>口座区分</p>
                  </div>
                  <div class="table__box-value">
                    <p>{{ sellConfirmData.ACCOUNT_TYPE }}</p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>決済方法</p>
                  </div>
                  <div class="table__box-value">
                    <p>{{ sellConfirmData.PAYMENT_ID }}</p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>為替レート</p>
                  </div>
                  <div class="table__box-value">
                    <p class="table__box-value-rate">
                      <small>USD/JPY</small>{{ handNumber(exchangeRate) }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="update_progress">
                <p>
                  あと<strong>{{ order_timer_limit }}</strong
                  >秒で売値が更新されます
                </p>
                <div
                  class="update_progress__bar1"
                  v-if="order_timer_limit > 0"
                ></div>
                <div class="update_progress__bar" v-else></div>
              </div>
              <div class="order__confirm">
                <a
                  @click="
                    $router.push({
                      name: 'UsSell',
                      query: { brandId: brandInfo.BRAND_ID },
                    })
                  "
                  class="button button__white button__medium"
                  >入力画面へ戻る</a
                >
                <a
                  @click="sureSell"
                  class="button button__primary button__medium"
                  >発注する</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Model :show="modelShow">
      <p class="modal__text">
        所定の時間に注文が実行されませんでした。<br />価格・為替レートが更新されます。
      </p>
      <div class="modal__buttons">
        <a @click="closeModal" class="button button__white button__medium">
          閉じる
        </a>
      </div>
    </Model>
  </main>
</template>

<script src="@/assets/js/page/transaction/us/sell/confirm.js"></script>

<style scoped></style>
