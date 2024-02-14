<template>
  <main>
    <modal-notice
      :isShow="showModalNotice"
      content="所定の時間に注文が執行されませんでした。価格が更新されます。"
      @confirm="funcHideNoticeModal"
    />
    <section class="order">
      <div class="wrapper">
        <h1 class="title">
          {{
            confirmData.buy_sell_cls == 3 ? "[買] 国内株式" : "[売] 国内株式"
          }}
        </h1>
        <div class="container card">
          <div class="tab_wrapper">
            <p class="order__emphasis">
              ご注文内容をご確認の上、相違なければ注文ボタンをクリックしてください。
            </p>
            <h2
              :class="
                confirmData.buy_sell_cls == 3
                  ? 'detail__title--buy'
                  : 'detail__title--sell'
              "
            >
              {{ stock_name }}<span></span>
            </h2>
            <div class="order__data card card--sphidden">
              <div class="table">
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
                    <p>{{ confirmData.buy_sell_cls == 1 ? "売付" : "買付" }}</p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>注文方法</p>
                  </div>
                  <div class="table__box-value">
                    <p>{{ otc_order_cls }}</p>
                  </div>
                </div>
                <div v-show="confirmData.otc_order_cls != 2" class="table__box">
                  <div class="table__box-title">
                    <p>注文金額</p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{ handNumberInt(confirmData.order_amt)
                      }}<small>円</small>
                    </p>
                  </div>
                </div>
                <div
                  v-show="
                    confirmData.buy_sell_cls == 3 &&
                    confirmData.order_rcve_flg == 2
                  "
                  class="table__box"
                >
                  <div class="table__box-title">
                    <p>買付株価</p>
                  </div>
                  <div class="table__box-value">
                    <p>{{ handNumFloat(markup_ask) }}<small>円</small></p>
                  </div>
                </div>

                <div
                  v-show="
                    confirmData.buy_sell_cls == 1 &&
                    confirmData.order_rcve_flg == 2
                  "
                  class="table__box"
                >
                  <div class="table__box-title">
                    <p>売付株価</p>
                  </div>
                  <div class="table__box-value">
                    <p>{{ handNumFloat(markup_bid) }}<small>円</small></p>
                  </div>
                </div>
                <div
                  v-show="
                    confirmData.buy_sell_cls == 1 &&
                    confirmData.order_rcve_flg == 1
                  "
                  class="table__box"
                >
                  <div class="table__box-title">
                    <p>参考売付株価</p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{
                        `始値 × (1-${this.confirmData.otc_sell_spread * 100}%)`
                      }}
                    </p>
                  </div>
                </div>
                <div v-show="confirmData.otc_order_cls == 2" class="table__box">
                  <div class="table__box-title">
                    <p>売付株数</p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{ handNumberFloat(confirmData.ord_nominal)
                      }}<small>株（口）</small>
                    </p>
                  </div>
                </div>
                <div v-show="confirmData.otc_order_cls == 2" class="table__box">
                  <div class="table__box-title">
                    <p>概算受渡金額</p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{ handNumberInt(confirmData.sold_amt) }}<small>円</small>
                    </p>
                  </div>
                </div>

                <div
                  v-show="
                    confirmData.buy_sell_cls == 3 &&
                    confirmData.order_rcve_flg == 1
                  "
                  class="table__box"
                >
                  <div class="table__box-title">
                    <p>参考買付株価</p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{
                        `始値 × (1+${this.confirmData.otc_buy_spread * 100})%`
                      }}
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>口座区分</p>
                  </div>
                  <div class="table__box-value">
                    <p>{{ confirmData.account_cls_nm }}</p>
                  </div>
                </div>
              </div>
              <div
                v-show="confirmData.order_rcve_flg == 2"
                class="update_progress"
              >
                <p>
                  あと<strong>{{ order_timer_limit }}</strong
                  >秒で{{ confirmData.buy_sell_cls == 1 ? "売" : "買" }}値が更新されます
                </p>
                <div
                  class="update_progress__bar1"
                  v-if="order_timer_limit > 0"
                ></div>
                <div class="update_progress__bar" v-else></div>
              </div>
              <div class="order__confirm_row">
                <button
                  @click="goBack"
                  class="button button__white button__medium"
                >
                  入力画面へ戻る
                </button>
                <button
                  @click="actionExecuteBuy"
                  :class="
                    confirmData.buy_sell_cls == 3
                      ? 'margin-lf-5 button button__secondary button__medium'
                      : 'margin-lf-5 button button__primary button__medium'
                  "
                >
                {{ confirmData.buy_sell_cls == 1 ? "売る" : "買う" }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/stockJP/components/confirm/confirmTentou.js"></script>
