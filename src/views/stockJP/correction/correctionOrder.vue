<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <router-link to="/home"><strong>国内株式</strong></router-link>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <router-link :to="{ name: 'StockListJP' }"
          ><strong>銘柄一覧</strong></router-link
        >
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <router-link
          :to="{ name: buy_sell_cls == 3 ? 'BuyStockJP' : 'SellStockJP' }"
        >
          <strong>{{
            buy_sell_cls == 3 ? "買注文" : "売注文"
          }}</strong></router-link
        >
      </nav>
    </TopInfo>

    <modal-regulation
      :isShow="showModalRegulation"
      @confirm="onHideModal"
      :content="contentRegulation"
    />
    <modalIframe :isShow="showModalWarning" @confirm="onHideModal" />
    <section class="order">
      <div class="wrapper">
        <h1 class="title">
          {{ buy_sell_cls == 3 ? "[買]" : "[売]" }} 国内株式
        </h1>
        <div class="container card">
          <NavOrder :disabled="true" :titles="titles" :kind="1" />

          <div class="container card-no-shadow" style="padding: 0px">
            <div class="l_tab_wrapper order__wrapper">
              <div class="order__title">
                <div class="order__title--jp">
                  <h2
                    :class="
                      buy_sell_cls == 3
                        ? 'detail__title--buy'
                        : 'detail__title--sell'
                    "
                  >
                    {{ stockName }}
                  </h2>
                </div>
              </div>
              <div class="order__tags">
                <p class="tag">東証</p>
                <button
                  @click="this.showModalRegulation = true"
                  :disabled="!checkFlag"
                  type="button"
                  :class="checkFlag ? 'tag--red' : 'tag--black'"
                >
                  {{ checkFlag ? "取引規制あり" : "取引規制なし" }}
                </button>
              </div>
              <div class="order__reference">
                <div class="order__reference-value--jp">
                  <p>現在値</p>
                  <h2>
                    {{ cashFormatter(dataStockPriceInfo.last, 1)
                    }}<small>円</small>
                  </h2>
                </div>
                <div class="order__reference-rate--jp">
                  <p>前日比（率）</p>
                  <h2
                    class="comparison_text"
                    :class="
                      dataStockPriceInfo.day_before_rate > 0
                        ? 'high'
                        : dataStockPriceInfo.day_before_rate < 0
                        ? 'low'
                        : ''
                    "
                  >
                    {{
                      dataStockPriceInfo.day_before_rate > 0
                        ? `\+${handNumberInt(
                            dataStockPriceInfo.day_before_rate
                          )}`
                        : handNumberInt(dataStockPriceInfo.day_before_rate)
                    }}<small>円</small
                    ><small
                      >({{
                        day_before_ratio > 0
                          ? `\+${day_before_ratio}`
                          : day_before_ratio
                      }}%)</small
                    >
                  </h2>
                </div>
              </div>
              <div class="order__date">
                <p class="order__date-time">{{ getCurrentTime }} 現在</p>
              </div>
              <div class="order__grid">
                <form class="order__forms--white card card--sphidden">
                  <div class="table">
                    <div
                      v-show="isChangeAmount==2"
                      class="table__box">
                      <div class="table__box-title">
                        <p>当初注文数量</p>
                      </div>
                      <div class="table__box-value">
                        <p>
                          {{ firstQuantity ? handNumberInt(firstQuantity) : "-"
                          }}<small>株</small>
                        </p>
                      </div>
                    </div>
                    <div class="table__box">
                      <div class="table__box-title">
                        <p>数量</p>
                      </div>
                      <div class="table__box-value">
                        <div class="order__data-flex">
                          <cStepper
                            v-show="isChangeAmount != 1"
                            :quantity="quantity"
                            :step="
                              (dataBrandInfo && dataBrandInfo.trading_unit) ||
                              100
                            "
                            :min="0"
                            :max="firstQuantity"
                            @changeValue="inputQuantity"
                          />
                          <p
                            v-show="isChangeAmount != 1"
                            class="order__data-counter-text"
                          >
                            単位株数：{{
                              dataBrandInfo && dataBrandInfo.trading_unit
                            }}株
                          </p>
                          <p v-show="isChangeAmount == 1">
                            {{ quantity }}<small>株</small>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="table__box">
                      <div class="table__box-title">
                        <p>注文方法</p>
                      </div>
                      <div class="table__box-value">
                        <div class="order__data-buttons">
                          <button
                            @click="selectMethodOrder(2)"
                            v-show="showOptSetPrice"
                            type="button"
                            :class="
                              methodOrder == 2
                                ? 'button__square--selected'
                                : 'button__square'
                            "
                          >
                            指値
                          </button>
                          <button
                            @click="selectMethodOrder(1)"
                            v-show="showOptMarket"
                            type="button"
                            :class="
                              methodOrder == 1
                                ? 'button__square--selected'
                                : expirationDate == 1
                                ? 'button__square'
                                : 'button__square disabled'
                            "
                          >
                            成行
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="table__box">
                      <div class="table__box-title">
                        <p>訂正前価格</p>
                      </div>
                      <div class="table__box-value">
                        <p>
                          {{ firstPrice ? handNumberInt(firstPrice) : "-"
                          }}<small>円</small>
                        </p>
                      </div>
                    </div>
                    <div v-show="isChangeAmount == 1" class="table__box">
                      <div class="table__box-title">
                        <p>価格</p>
                      </div>
                      <div class="table__box-value">
                        <cStepperMoney
                          :money="money"
                          :step="priceStep"
                          :min="min_price_width"
                          :max="max_price_width"
                          @changeValue="inputMoney"
                          :isDisabled="methodOrder == 1"
                        />
                      </div>
                    </div>
                    <div v-show="isChangeAmount == 1" class="table__box">
                      <div class="table__box-title">
                        <p>値幅制限</p>
                      </div>
                      <div class="table__box-value">
                        <p>
                          {{ handNumFloat(min_price_width) }}<small>円</small> -
                          {{ handNumFloat(max_price_width) }}<small>円</small>
                        </p>
                      </div>
                    </div>
                    <div class="table__box">
                      <div class="table__box-title">
                        <p>執行条件</p>
                      </div>
                      <div class="table__box-value">
                        <div class="order__data-buttons--three">
                          <button
                            @click="selectCondition(0)"
                            type="button"
                            :class="
                              executionConditions == 0
                                ? 'button__square--selected'
                                : 'button__square'
                            "
                          >
                            なし
                          </button>
                          <button
                            @click="selectCondition(2)"
                            type="button"
                            :class="
                              executionConditions == 2
                                ? 'button__square--selected'
                                : methodOrder == 1
                                ? 'button__square'
                                : 'button__square disabled'
                            "
                          >
                            引け
                          </button>
                          <button
                            @click="selectCondition(3)"
                            type="button"
                            :class="
                              executionConditions == 3
                                ? 'button__square--selected'
                                : methodOrder == 2 && expirationDate == 1
                                ? 'button__square'
                                : 'button__square disabled'
                            "
                          >
                            不成
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="table__box">
                      <div class="table__box-title">
                        <p>有効期限</p>
                      </div>
                      <div class="table__box-value">
                        <div class="order__data-buttons--three">
                          <button
                            type="button"
                            :class="
                              expirationDate == 1
                                ? 'button__square--selected'
                                : 'button__square disabled'
                            "
                          >
                            当日
                          </button>
                          <button
                            type="button"
                            :class="
                              expirationDate == 2
                                ? 'button__square--selected'
                                : 'button__square disabled'
                            "
                          >
                            今週中
                          </button>
                          <button
                            type="button"
                            :class="
                              expirationDate == 3
                                ? 'button__square--selected'
                                : 'button__square disabled'
                            "
                          >
                            {{
                              valueDate !== "期間指定"
                                ? valueDate.slice(5)
                                : valueDate
                            }}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="table__box">
                      <div class="table__box-title">
                        <p>市場</p>
                      </div>
                      <div class="table__box-value">
                        <p>{{ exchange_cls_nm }}</p>
                      </div>
                    </div>

                    <div class="table__box">
                      <div class="table__box-title">
                        <p>概算約定代金</p>
                      </div>
                      <div class="table__box-value">
                        <p>{{ handNumberInt(totalAmount) }}<small>円</small></p>
                      </div>
                    </div>
                    <div class="table__box">
                      <div class="table__box-title">
                        <p>概算税込手数料</p>
                      </div>
                      <div class="table__box-value">
                        <p>{{ handNumberInt(commonFee) }}<small>円</small></p>
                      </div>
                    </div>
                    <div class="table__box">
                      <div class="table__box-title">
                        <p>概算受渡代金</p>
                      </div>
                      <div class="table__box-value">
                        <p>{{ handNumberInt(totalFee) }}<small>円</small></p>
                      </div>
                    </div>
                    <div class="table__box">
                      <div class="table__box-title">
                        <p>当初概算受渡代金</p>
                      </div>
                      <div class="table__box-value">
                        <p>-<small>円</small></p>
                      </div>
                    </div>

                    <div class="table__box table__box--password">
                      <div class="table__box-title">
                        <p>取引暗証番号</p>
                      </div>
                      <div class="table__box-value">
                        <div class="order__data-pass">
                          <input
                            type="password"
                            class="order__data-input order__data-input"
                            placeholder="****"
                            maxlength="4"
                            @input="inputPassword"
                            :value="transactionPw"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="order__modal">
                    <button
                      type="button"
                      class="button button__white button__medium"
                    >
                      キャンセル
                    </button>
                    <button
                      @click="actionEditOrder"
                      type="button"
                      :class="
                        !flagOrder
                          ? 'button button__disabled button__medium'
                          : 'button button__main button__medium'
                      "
                    >
                      訂正内容を確認する
                    </button>
                  </div>
                </form>
                <listItemBuySell
                  :s_text="this.$route.query.change_amount == 1"
                  @setValueMoney="setValueMoney"
                />
              </div>
              <p class="order__caution">
                お取引にあたり
                <button type="button" @click="onShowModalWarning">
                  ご注意事項
                </button>
                をご確認ください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/stockJP/correction/correctionOrder.js"></script>
