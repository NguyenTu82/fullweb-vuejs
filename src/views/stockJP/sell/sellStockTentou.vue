<template>
  <div class="container card-no-shadow" style="padding-top: 0px">
    <modalIframe :isShow="showModalWarning" @confirm="onHideModal" />
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
    <modal-after-trading
      :isShow="showModalAfterTrading"
      @confirm="onHideModal"
    />
    <div class="tab_wrapper order__wrapper">
      <p v-show="order_rcve_flg == 1" class="order__emphasis--time">
        予約注文受付時間
      </p>
      <div class="order__title">
        <h2 class="detail__title--sell">{{ stockName }}</h2>
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
          <p>{{ order_rcve_flg == 1 ? "前日終値" : "参考売値" }}</p>
          <h2>{{ order_rcve_flg == 1 ? handNumFloat(priceNow) : handNumFloat(markup_bid) }}<small>円</small></h2>
        </div>
      </div>
      <div class="order__date">
        <p class="order__date-time">{{ getCurrentTime }} 現在</p>
      </div>
      <div class="order__data card card--sphidden">
        <div class="table">
          <div class="table__box">
            <div class="table__box-title">
              <p>概算売却可能額</p>
            </div>
            <div class="table__box-value">
              <p>{{ handNumberInt(sold_amt) }} <small>円</small></p>
            </div>
          </div>
          <div class="table__box">
            <div class="table__box-title">
              <p>売却可能数量</p>
            </div>
            <div class="table__box-value">
              <p>{{ handNumFloat(sold_quantity) }} <small>株</small></p>
            </div>
          </div>
          <div class="table__box">
            <div class="table__box-title">
              <p>注文方法</p>
            </div>
            <div class="table__box-value">
              <div class="order__data-buttons order__data-buttons--full">
                <button
                  @click="selectMethodOrder(1)"
                  type="button"
                  :class="
                    methodOrder == 1
                      ? 'button__square--selected'
                      : 'button__square'
                  "
                >
                  金額指定
                </button>
                <button
                  @click="selectMethodOrder(2)"
                  type="button"
                  :class="
                    methodOrder == 2
                      ? 'button__square--selected'
                      : 'button__square'
                  "
                >
                  全部売却
                </button>
              </div>
            </div>
          </div>
          <div class="table__box">
            <div class="table__box-title">
              <p>価格</p>
            </div>
            <div class="table__box-value">
              <div class="order__data-flex">
                <cStepperMoney
                  :money="money"
                  :step="100"
                  :min="500"
                  :max="sold_amt"
                  :clickFirstPlus="500"
                  @changeValue="inputMoney"
                  :isDisabled="isDisabledStepper"
                />
              </div>
              <p v-show="showOrderDataError" class="order__data--error">
                <img src="/assets/images/exclamation.png" />
                500円以上100円単位
              </p>
            </div>
          </div>
          <div class="boxTerm">
            <input
              type="checkbox"
              id="termSellTentou"
              value="term"
              v-model="isCheckTerm"
            />
            <label for="termSellTentou" class="checkbox"
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
                  class="order__data-input"
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
            @click="actionOrder"
            :disabled="!isOrderButton"
            type="button"
            :class="
              isOrderButton
                ? 'button button__primary button__medium'
                : 'button button__disabled button__medium'
            "
          >
            注文内容を確認する
          </button>
        </div>
      </div>
    </div>
    <p class="order__caution">
      本取引は店頭取引です。詳細は
      <button type="button" @click="onShowModalWarning">ご注意事項</button>
      をご確認ください。
    </p>
  </div>
</template>

<script src="@/assets/js/page/stockJP/sell/sellStockTentou.js"></script>
