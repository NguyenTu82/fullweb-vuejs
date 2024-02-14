<template>
  <main>
    <section class="order">
      <div class="wrapper">
        <h1 class="title">{{ confirmData.buy_sell_cls == 1 ? "[売]" : "[買]" }} 国内株式</h1>
        <div class="container card">
          <div class="tab_wrapper order__wrapper">
            <p class="order__emphasis">
              ご注文内容をご確認の上、相違なければ注文ボタンをクリックしてください。
            </p>
            <div class="order__title">
              <h2
                :class="
                  confirmData.buy_sell_cls == 3
                    ? 'detail__title--buy'
                    : 'detail__title--sell'
                "
              >
                {{ name_stock }}
              </h2>
            </div>
            <div class="order__data card card--sphidden">
              <div class="table">
                <div class="table__box">
                  <div class="table__box-title">
                    <p>取引区分</p>
                  </div>
                  <div class="table__box-value">
                    <p>委託</p>
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
                    <p>
                      {{
                        confirmData.buy_sell_cls == 1 ? "売付株価" : "買付株価"
                      }}
                      <span v-show="isEditAmount" class="table__box-title-fix"
                        >訂正</span
                      >
                    </p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{
                        confirmData.price_cls == 1
                          ? "成行"
                          : `\ 指値/${handNumberInt(confirmData.ord_price)}`
                      }}<small>{{
                        confirmData.price_cls == 1 ? "" : "円"
                      }}</small>
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>
                      {{
                        confirmData.buy_sell_cls == 1 ? "売付株数" : "買付株数"
                      }}
                      <span v-show="isEditQuantity" class="table__box-title-fix"
                        >訂正</span
                      >
                    </p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{ handNumberInt(confirmData.ord_nominal)
                      }}<small>株</small>
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>
                      執行条件<span
                        v-show="isEditExecution"
                        class="table__box-title-fix"
                        >訂正</span
                      >
                    </p>
                  </div>
                  <div class="table__box-value">
                    <p>{{ exec_cond_cd }}</p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>有効期限</p>
                  </div>
                  <div class="table__box-value">
                    <p>{{ order_duration_cls }}</p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>
                      概算約定代金<span
                        v-show="isEditAmount || isEditQuantity"
                        class="table__box-title-fix"
                        >訂正</span
                      >
                    </p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{
                        exec_cond_cd == "不成" || confirmData.price_cls == 1
                          ? "-"
                          : handNumberInt(
                              confirmData.ord_nominal * confirmData.ord_price
                            )
                      }}
                      <small>{{
                        exec_cond_cd == "不成" || confirmData.price_cls == 1
                          ? ""
                          : "円"
                      }}</small>
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>概算税込手数料</p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{
                        exec_cond_cd == "不成" || confirmData.price_cls == 1
                          ? "-"
                          : handNumberInt(resAPI.fee)
                      }}
                      <small>{{
                        exec_cond_cd == "不成" || confirmData.price_cls == 1
                          ? ""
                          : "円"
                      }}</small>
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>概算受渡代金</p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{
                        exec_cond_cd == "不成" || confirmData.price_cls == 1
                          ? "-"
                          : handNumberInt(resAPI.app_net_amt)
                      }}
                      <small>{{
                        exec_cond_cd == "不成" || confirmData.price_cls == 1
                          ? ""
                          : "円"
                      }}</small>
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>市場</p>
                  </div>
                  <div class="table__box-value">
                    <p>{{ confirmData.exchange_cls_nm }}</p>
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
              <div class="order__modal">
                <button
                  @click="goBack"
                  type="button"
                  class="button button__white button__medium"
                >
                  入力画面へ戻る
                </button>
                <button
                  @click="actionExecute"
                  type="button"
                  :class="
                  isEditQuantity || isEditAmount || isEditExecution ? 'button button__main button__medium' :
                    confirmData.buy_sell_cls == 3
                      ? 'button button__secondary button__medium'
                      : 'button button__primary button__medium'
                  "
                >
                  {{ textBtn }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/stockJP/components/confirm/confirmItaku.js"></script>
