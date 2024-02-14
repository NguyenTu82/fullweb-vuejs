<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <router-link to="/home"><strong>米国株式</strong></router-link>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <router-link :to="{ name: 'StockListUS' }"
          ><strong>銘柄一覧</strong></router-link
        >
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a>買注文</a>
      </nav>
    </TopInfo>

    <section class="order">
      <div class="wrapper">
        <h1 class="title">[買] 米国株式</h1>
        <div class="container card">
          <div class="tab_wrapper">
            <!-- detailクラスはtypographyに記載 -->
            <h2 class="detail__title--buy">
              {{ brandInfo.BRAND_NM_DISP
              }}<span>/ {{ brandInfo.BRAND_NM }}</span>
            </h2>
            <p class="detail__exchange">
              {{ `${brandInfo.BRAND_CD ?? ""} | ${brandInfo.MARKET_CD ?? ""}` }}
            </p>
            <div class="order__reference">
              <div class="order__reference-value">
                <p>参考買値</p>
                <h2>
                  {{ handNumber(principalBuy.BUY_PRICE) }}<small>USD</small>
                </h2>
              </div>
              <div class="order__reference-rate">
                <p>参考為替レート</p>
                <h2><small>USD/JPY</small>{{ handNumber(buyExchangeRate) }}</h2>
              </div>
            </div>
            <div class="order__date">
              <p class="order__date-time">{{ `${getCurrentTime()} 現在` }}</p>
            </div>
            <div class="order__data card card--sphidden">
              <div class="table">
                <div class="table__box">
                  <div class="table__box-title">
                    <p>引落先</p>
                  </div>
                  <div class="table__box-value">
                    <select
                      class="selectbox selectbox__green pointer"
                      name="account"
                      v-model="initPayment"
                      id=""
                      v-on:change="handelSelectBank($event)"
                    >
                      <!-- <option value="">選択してください</option> -->
                      <option
                        v-for="(item, index) in bankArr"
                        :value="item.PAYMENT_ID"
                        :key="index"
                        :disabled="!item.active"
                      >
                        {{ item.BANK_NAME }}
                      </option>
                    </select>
                    <p
                      class="order__data-text"
                      v-if="currentPayment.PAYMENT_ID && currentPayment.PAYMENT_ID != 1"
                    >
                      注文に必要な金額を銀行口座から引き落とし、預り金へ入金します。
                    </p>
                  </div>
                </div>
                <!-- 引落先が銀行の場合削除 -->
                <div class="table__box" v-if="currentPayment.PAYMENT_ID == 1">
                  <div class="table__box-title">
                    <p>概算買付可能額</p>
                  </div>
                  <div class="table__box-value">
                    <p class="order__data-price">
                      {{ handleNumberInt(principalBuy.BUYABLE_CASH)
                      }}<small>円</small>
                    </p>
                  </div>
                </div>
                <!-- 引落先が銀行の場合削除ここまで -->
                <div class="table__box">
                  <div class="table__box-title">
                    <p>注文方法</p>
                  </div>
                  <div class="table__box-value">
                    <div class="order__data-buttons">
                      <!-- <a
                          class="button button__square button__square--selected"
                          href=""
                      >金額指定</a
                      >
                      <a class="button button__square button__square" href=""
                      >預り金全部買付</a
                      > -->
                      <a
                        v-for="(item, index) in methodsArr"
                        :key="index"
                        class="pointer"
                        :class="{
                          'button button__square button__square--selected':
                            item.active,
                          'button button__square button__square': !item.active,
                          disabled:
                            item.id == 2 && currentPayment.PAYMENT_ID != 1,
                        }"
                        @click="handelMethods(item)"
                      >
                        {{ item.title }}
                      </a>
                    </div>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>価格</p>
                  </div>
                  <div class="table__box-value">
                    <div class="counter order__data-counter">
                      <cStepperMoney
                        :money="num"
                        :step="parseInt(currentPayment.UNIT_AMOUNT || 100)"
                        :min="parseInt(currentPayment.MIN_AMOUNT || 500)"
                        :max="
                          parseInt(principalBuy.BUYABLE_CASH) > 0
                            ? parseInt(principalBuy.BUYABLE_CASH)
                            : 999999999
                        "
                        :clickFirstPlus="
                          parseInt(currentPayment.MIN_AMOUNT || 500)
                        "
                        @changeValue="inputHandle"
                        :isCheck="true"
                        :isDisabled="inSuccess || (currentPayment.PAYMENT_ID && selectedMethods != 1)"
                        :withdrawByBank="currentPayment.PAYMENT_ID && currentPayment.PAYMENT_ID != 1"
                      />
                    </div>
                    <p class="order__data--error" v-if="selectedMethods == 1">
                      <img src="/assets/images/exclamation.png" alt="!" />
                      {{
                        selectedMethods == 1
                          ? `${handleNumberInt(
                              currentPayment.MIN_AMOUNT || 500
                            )}円以上${handleNumberInt(
                              currentPayment.UNIT_AMOUNT || 100
                            )}円単位`
                          : ""
                      }}
                    </p>
                  </div>
                </div>
                <div class="table__box table__box--password">
                  <div class="table__box-title">
                    <p>取引暗証番号</p>
                  </div>
                  <div class="table__box-value">
                    <div class="order__data-pass">
                      <!-- class="order__data-input order__data-input--error" -->
                      <input
                        type="password"
                        class="order__data-input order__data-input"
                        placeholder="****"
                        maxlength="4"
                        pattern="[0-9]*"
                        v-model="tradepwd"
                        autocomplete="off"
                        onkeyup="value=value.replace(/[^\d０-９]/g,'')"
                        oninput="value=value.replace(/[^\d０-９]/g,'');if(value.length>4)value=value.slice(0,4)"
                      />
                    </div>
                    <!-- <p class="order__data--error">
                      エラーメッセージが入ります。
                    </p> -->
                  </div>
                </div>
              </div>
              <div class="order__modal">
                <a
                  @click="actionBack"
                  class="button button__white button__medium pointer"
                  >キャンセル</a
                >
                <button
                  v-if="currentPayment.PAYMENT_ID && currentPayment.PAYMENT_ID != 1"
                  class="button button__medium"
                  :class="btnsetStyle"
                  @click="handleInClick"
                >
                  注文金額を入金する
                </button>
                <button
                  @click="handleConfirmClick"
                  class="button button__medium"
                  :class="btnsetStyle1"
                >
                  注文内容を確認する
                </button>
                <!-- 引落先が預り金の場合は、以下に変更をお願いします。上は削除 -->
                <!-- <a
                  href="/transaction/us/buy/confirm.html"
                  class="button button__secondary button__medium"
                  >注文内容確認</a
                > -->
              </div>
              <!-- 引落先が預り金の場合は削除 -->
              <p
                class="order__modal-text"
                v-if="currentPayment.PAYMENT_ID && currentPayment.PAYMENT_ID != 1"
              >
                銀行口座からご注文に必要な金額を引き落とします
              </p>
              <!-- 引落先が預り金の場合は削除 ここまで -->
            </div>
          </div>
          <p class="order__caution">
            この取引は店頭取引です。詳細は<a @click="goMatters">ご注意事項</a
            >をご確認ください。
          </p>
        </div>
      </div>
    </section>
    <Model :show="modelShow">
      <h2>エラー</h2>
      <p class="modal__text">{{ modelContentShow }}</p>
      <div class="modal__buttons">
        <a @click="closeModal" class="button button__white button__medium">
          閉じる
        </a>
      </div>
    </Model>
    <Model :show="bankInErrShow">
      <p class="modal__text">
        引落先に銀行口座を選択されている場合は、預り金全部買付を選択できません。
      </p>
      <div class="modal__buttons">
        <a
          @click="closeBankIn"
          class="button button__main button__medium pointer"
        >
          OK
        </a>
      </div>
    </Model>
    <Model :show="inBuyShow">
      <div v-if="inBuyType == 'success'">
        <h2>入金完了</h2>
        <p class="modal__text">{{ inBuyInfoTipText }}</p>
        <div class="modal__buttons">
          <a
            @click="confirmInBuy('success')"
            class="button button__main button__medium pointer"
          >
            OK
          </a>
        </div>
      </div>
      <div v-else>
        <h2>入金できませんでした。</h2>
        <p class="modal__text">{{ inBuyInfoTipText }}</p>
        <div class="modal__buttons">
          <a
            @click="confirmInBuy('failure')"
            class="button button__main button__medium pointer"
          >
            OK
          </a>
        </div>
      </div>
    </Model>
    <Model :show="mattersIsShow">
      <h2>ご注意事項</h2>
      <div class="modal__list">
        <ul>
          <li>
            米国株式は、店頭取引（当社との相対取引）でのお取扱いとなります。
          </li>
          <li>
            「参考買値」、「参考為替レート」には、店頭取引における取引コストが加算されております。
          </li>
          <li>
            この画面に表示されている参考買値及び参考為替レートは、表示時点における最新の買値及び為替レートを表示しており実際にお取引可能な買値及び為替レートとは異なる場合があります。
          </li>
          <li>
            詳細は<a
              class="pointer"
              href="https://www.cheer-sec.co.jp/service/us-stock.html#detail"
              target="_blank"
              >取引ルール</a
            >や<a
              class="pointer"
              href="https://www.cheer-sec.co.jp/rule/risk.html#us-stock"
              target="_blank"
              >リスク・手数料等</a
            >についてのページをご覧ください。
          </li>
        </ul>
      </div>
      <div class="modal__buttons">
        <a
          @click="closeMatter"
          class="button button__main button__medium button__pointer"
        >
          閉じる
        </a>
      </div>
    </Model>
    <Model :show="showAgreementModal">
      <h2>同意</h2>
      <p
        class="modal__text"
        style="text-align: left"
        v-html="htmlText(agreementMessage)"
      ></p>
      <div class="modal__buttons">
        <a
          @click="closeAgreement"
          class="button button__white button__medium pointer"
        >
          キャンセル
        </a>
        <a
          @click="goAgreement"
          class="button button__main button__medium pointer"
        >
          確認
        </a>
      </div>
    </Model>
    <Model :show="showRiskModal">
      <h2>投資目的</h2>
      <p class="modal__text left" v-html="riskMessage"></p>
      <div class="modal__buttons">
        <a
          @click="closeRisk"
          class="button button__white button__medium pointer"
        >
          キャンセル
        </a>
        <a
          @click="confirmRisk"
          class="button button__main button__medium pointer"
        >
          確認
        </a>
      </div>
    </Model>
  </main>
</template>

<script src="@/assets/js/page/transaction/us/buy/index.js"></script>

<style scoped></style>
