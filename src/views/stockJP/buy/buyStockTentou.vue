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
    <modal-notice
      :isShow="showModalNotice"
      :title="titleNotice"
      :content="contentNotice"
      @confirm="onHideModal"
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
        <h2 class="detail__title--buy">{{ stockName }}</h2>
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
          <p>{{ order_rcve_flg == 1 ? "前日終値" : "参考買値" }}</p>
          <h2>{{ order_rcve_flg == 1 ? handNumFloat(priceNow) : handNumFloat(markup_ask) }}<small>円</small></h2>
        </div>
      </div>
      <div class="order__date">
        <p class="order__date-time">{{ getCurrentTime }} 現在</p>
      </div>
      <div class="order__data card card--sphidden">
        <div class="table">
          <div class="table__box">
            <div class="table__box-title">
              <p>引落先</p>
            </div>
            <div class="table__box-value">
              <select
                :disabled="enableBuyButton"
                @change="onChange"
                :class="
                  enableBuyButton
                    ? 'selectbox selectbox__disabled'
                    : 'selectbox selectbox__green'
                "
                v-model="selectedBank"
              >
                <option disabled value="">選択してください</option>
                <option value="default">預り金</option>
                <option
                  v-for="(value, index) in dataBank"
                  :key="value.id"
                  :value="index"
                >
                  {{ value.BANK_NAME }}
                </option>
              </select>
              <p v-show="withdrawByBank" class="order__data--error">
                <img src="/assets/images/exclamation.png" />
                注文に必要な金額を銀行口座から引き落とし預り金へ入金します
              </p>
            </div>
          </div>
          <div v-show="!withdrawByBank" class="table__box">
            <div class="table__box-title">
              <p>概算買付可能額</p>
            </div>
            <div class="table__box-value">
              <p>{{ handNumberInt(buy_available_cash) }} <small>円</small></p>
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
                  :disabled="withdrawByBank"
                  @click="selectMethodOrder(4)"
                  type="button"
                  :class="
                    withdrawByBank
                      ? 'button__square disabled'
                      : methodOrder == 4
                      ? 'button__square--selected'
                      : 'button__square'
                  "
                >
                  預り金全部買付
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
                  :step="withdrawByBank ? dataBank[infoBank].UNIT_AMOUNT : 100"
                  :min="withdrawByBank ? dataBank[infoBank].MIN_AMOUNT : 500"
                  :max="buy_available_cash"
                  :clickFirstPlus="
                    withdrawByBank ? dataBank[infoBank].MIN_AMOUNT : 500
                  "
                  @changeValue="inputMoney"
                  :isDisabled="isDisabledStepper"
                  :withdrawByBank="withdrawByBank"
                />
              </div>
              <p v-show="showOrderDataError" class="order__data--error">
                <img src="/assets/images/exclamation.png" />
                {{
                  withdrawByBank
                    ? handNumberInt(dataBank[infoBank].MIN_AMOUNT)
                    : 500
                }}円以上
                {{
                  withdrawByBank
                    ? handNumberInt(dataBank[infoBank].UNIT_AMOUNT)
                    : 100
                }}円単位
              </p>
            </div>
          </div>
          <div class="boxTerm">
            <input
              type="checkbox"
              id="termBuyTentou"
              value="term"
              v-model="isCheckTerm"
            />
            <label for="termBuyTentou" class="checkbox"
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
                  :disabled="enableBuyButton"
                />
              </div>
              <!--              <p class='order__data&#45;&#45;error'>-->
              <!--                エラーメッセージが入ります。-->
              <!--              </p>-->
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
            :disabled="!checkEnableDepositButton"
            @click="actionDeposit"
            v-show="withdrawByBank"
            type="button"
            :class="
              checkEnableDepositButton
                ? 'button button__main button__medium'
                : 'button button__disabled button__medium'
            "
          >
            注文金額を入金する
          </button>
          <button
            @click="actionOrder"
            :disabled="!isOrderButton"
            type="button"
            :class="
              isOrderButton
                ? 'button button__secondary button__medium'
                : 'button button__disabled button__medium'
            "
          >
            注文内容を確認する
          </button>
        </div>
        <p
          v-show="withdrawByBank"
          class="order__modal-text">
          銀行口座からご注文に必要な金額を引き落とします
        </p>
      </div>
    </div>
    <p class="order__caution">
      本取引は店頭取引です。詳細は
      <button type="button" @click="onShowModalWarning">ご注意事項</button>
      をご確認ください。
    </p>
  </div>
</template>

<script src="@/assets/js/page/stockJP/buy/buyStockTentou.js"></script>
