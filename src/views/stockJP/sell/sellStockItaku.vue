<template>
  <div class="container card-no-shadow" style="padding: 0px">
    <modalShowDay
      :dataArr="businessDayList"
      :isShow="showModalGetDay"
      @hideModal="onHideModal"
      @selectValue="selectValueDate"
    />
    <modal-p-d-f
      :dataPDF="dataPDF"
      :isShow="showModalPDF"
      @cancel="onHideModal"
    />

    <modal-regulation
      :isShow="showModalRegulation"
      @confirm="onHideModal"
      :content="contentRegulation"
    />
    <modalIframe :isShow="showModalWarning" @confirm="onHideModal" />
    <div class="l_tab_wrapper order__wrapper">
      <p v-show="otc_select_brand_cls == 0">店頭取引の取り扱いはございません。</p>
      <div class="order__title">
        <div class="order__title--jp">
          <h2 class="detail__title--sell">
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
          <h2>{{ priceNow }}<small>円</small></h2>
        </div>
        <div class="order__reference-rate--jp">
          <p>前日比（率）</p>
          <h2
            class="comparison_text"
            :class="
              day_before_rate > 0 ? 'high' : day_before_rate < 0 ? 'low' : ''
            "
          >
            {{
              day_before_rate > 0
                ? `\+${handNumberInt(day_before_rate)}`
                : handNumberInt(day_before_rate)
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
            <div class="table__box">
              <div class="table__box-title">
                <p>売却可能数量</p>
              </div>
              <div class="table__box-value">
                <p>{{ handNumberFloat(sold_quantity) }}<small>株（口）</small></p>
              </div>
            </div>
            <div class="table__box">
              <div class="table__box-title">
                <p>数量</p>
              </div>
              <div class="table__box-value">
                <div class="order__data-flex">
                  <cStepper
                    :quantity="quantity"
                    :step="trading_unit || 100"
                    :min="trading_unit"
                    :max="sold_quantity - (sold_quantity % (trading_unit || 100))"
                    @changeValue="inputQuantity"
                  />
                  <p class="order__data-counter-text">
                    単位株数：{{ trading_unit }}株
                  </p>
                </div>
                <!--                      <p class="order__data&#45;&#45;error">-->
                <!--                        エラーメッセージが入ります-->
                <!--                      </p>-->
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
                    type="button"
                    :class="
                      methodOrder == 1
                        ? 'button__square--selected'
                        : 'button__square'
                    "
                  >
                    成行
                  </button>
                </div>
                <!--                      <p class="order__data&#45;&#45;error">-->
                <!--                        エラーメッセージが入ります-->
                <!--                      </p>-->
              </div>
            </div>
            <div class="table__box">
              <div class="table__box-title">
                <p>価格</p>
              </div>
              <div class="table__box-value">
                <cStepperMoney
                  :money="money"
                  :step="priceStep"
                  :min="min_price_width"
                  :max="max_price_width"
                  :clickFirstPlus="min_price_width"
                  @changeValue="inputMoney"
                  :isDisabled="methodOrder == 1"
                />
                <!--                      <p class="order__data&#45;&#45;error">-->
                <!--                        エラーメッセージが入ります-->
                <!--                      </p>-->
              </div>
            </div>
            <div class="table__box">
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
                <p>概算約定代金</p>
              </div>
              <div class="table__box-value">
                <p>{{ methodOrder == 1 ? "-" : totalFee }}<small>円</small></p>
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
                      methodOrder == 2
                        ? 'button__square disabled'
                        : executionConditions == 2
                        ? 'button__square--selected'
                        : 'button__square'
                    "
                    :disabled="methodOrder == 2"
                  >
                    引け
                  </button>
                  <button
                    @click="selectCondition(3)"
                    type="button"
                    :class="
                      methodOrder == 1
                        ? 'button__square disabled'
                        : executionConditions == 3
                        ? 'button__square--selected'
                        : 'button__square'
                    "
                    :disabled="methodOrder == 1"
                  >
                    不成
                  </button>
                </div>
                <!--                      <p class="order__data&#45;&#45;error">-->
                <!--                        エラーメッセージが入ります-->
                <!--                      </p>-->
              </div>
            </div>
            <div class="table__box">
              <div class="table__box-title">
                <p>有効期限</p>
              </div>
              <div class="table__box-value">
                <div class="order__data-buttons--three">
                  <button
                    @click="selectExpirationDate(1)"
                    type="button"
                    :class="
                      expirationDate == 1
                        ? 'button__square--selected'
                        : 'button__square'
                    "
                  >
                    当日
                  </button>
                  <button
                    @click="selectExpirationDate(2)"
                    type="button"
                    :class="
                      methodOrder == 1 || executionConditions == 3
                        ? 'button__square disabled'
                        : expirationDate == 2
                        ? 'button__square--selected'
                        : 'button__square'
                    "
                    :disabled="methodOrder == 1 || executionConditions == 3"
                  >
                    今週中
                  </button>
                  <button
                    @click="selectExpirationDate(3)"
                    type="button"
                    :class="
                      methodOrder == 1 || executionConditions == 3
                        ? 'button__square disabled'
                        : expirationDate == 3
                        ? 'button__square--selected'
                        : 'button__square'
                    "
                    :disabled="methodOrder == 1 || executionConditions == 3"
                  >
                    {{
                      valueDate != "期間指定" ? valueDate.slice(5) : valueDate
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
                <p>口座区分</p>
              </div>
              <div class="table__box-value">
                <p>{{ account_cls_nm }}</p>
              </div>
            </div>
            <div class="boxTerm">
              <input
                type="checkbox"
                id="term"
                value="term"
                v-model="isCheckTerm"
              />
              <label for="term" class="checkbox"
                >インサイダー取引、その他の法令等に違反する取引ではありません。</label
              >
              <a
                target="_blank"
                href="https://www.cheer-sec.co.jp/other/app-help/insider.html"
              >
                <img src="/assets/images/question.png" />
              </a>
            </div>
            <div class="table__box table__box--password password">
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
              @click="actionBack"
              type="button"
              class="button button__white button__medium"
            >
              キャンセル
            </button>
            <button
              :disabled="!flagOrder"
              @click="actionOrder"
              type="button"
              :class="
                !flagOrder
                  ? 'button button__disabled button__medium'
                  : 'button button__primary button__medium'
              "
            >
              注文内容を確認する
            </button>
          </div>
        </form>
        <listItemBuySell @setValueMoney="setValueMoney" />
      </div>
      <p class="order__caution">
        お取引にあたり
        <button type="button" @click="onShowModalWarning">ご注意事項</button>
        をご確認ください。
      </p>
    </div>
  </div>
</template>

<script src="@/assets/js/page/stockJP/sell/sellStockItaku.js"></script>
