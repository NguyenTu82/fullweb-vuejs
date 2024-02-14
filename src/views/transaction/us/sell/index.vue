<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/pages/home/"><strong>米国株式</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <router-link :to="{ name: 'StockListUS' }"
          ><strong>銘柄一覧</strong></router-link
        >
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a>売注文</a>
      </nav>
    </TopInfo>
    <section class="order">
      <div class="wrapper">
        <h1 class="title">[売] 米国株式</h1>
        <div class="container card">
          <div class="tab_wrapper">
            <!-- detailクラスはtypographyに記載 -->
            <h2 class="detail__title--sell">
              {{ brandInfo.BRAND_NM_DISP
              }}<span>/ {{ brandInfo.BRAND_NM }}</span>
            </h2>
            <p class="detail__exchange">
              {{ `${brandInfo.BRAND_CD} | ${brandInfo.MARKET_CD}` }}
            </p>
            <div class="order__reference">
              <div class="order__reference-value">
                <p>参考売値</p>
                <h2>
                  {{ handNumber(principalSell.SELL_PRICE) }}<small>USD</small>
                </h2>
              </div>
              <div class="order__reference-rate">
                <p>参考為替レート</p>
                <h2>
                  <small>USD/JPY</small>{{ handNumber(sellExchangeRate) }}
                </h2>
              </div>
            </div>
            <div class="order__date">
              <p class="order__date-time">{{ `${getCurrentTime()} 現在` }}</p>
            </div>
            <div class="order__data card card--sphidden">
              <div class="table">
                <div class="table__box">
                  <div class="table__box-title">
                    <p>概算売却可能額</p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{ handleNumberInt(principalSell.SELL_ORDER_AMOUNT)
                      }}<small>円</small>
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>売却可能数量</p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{ handNumberFloat(principalSell.SELLABLE_QTY)
                      }}<small>株（口）</small>
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>注文方法</p>
                  </div>
                  <div class="table__box-value">
                    <div class="order__data-buttons">
                      <a
                        v-for="(item, index) in methodsArr"
                        :key="index"
                        class="pointer"
                        :class="{
                          'button button__square button__square--selected':
                            item.active,
                          'button button__square button__square': !item.active,
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
                        :step="parseInt(principalSell.UNIT_AMOUNT || 0)"
                        :min="parseInt(principalSell.MIN_AMOUNT || 0)"
                        :max="parseInt(principalSell.SELL_ORDER_AMOUNT)"
                        :clickFirstPlus="firstPlus"
                        @changeValue="inputHandle"
                        :isCheck="true"
                        :isDisabled="inSuccess || selectedMethods == 2"
                      />
                    </div>
                    <p class="order__data--error">
                      <img
                        src="/assets/images/exclamation.png"
                        alt="!"
                        v-if="selectedMethods == 1"
                      />
                      {{
                        selectedMethods == 1
                          ? `${handleNumberInt(
                              principalSell.MIN_AMOUNT || 500
                            )}円以上${handleNumberInt(
                              principalSell.UNIT_AMOUNT || 100
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
                  class="button button__white button__medium"
                  >キャンセル</a
                >
                <a
                  @click="handleConfirmClick"
                  class="button button__medium"
                  :class="btnsetStyle"
                  >注文内容確認する</a
                >
              </div>
            </div>
          </div>
          <p class="order__caution pointer">
            この取引は店頭取引です。詳細は<a @click="goMatters">ご注意事項</a
            >をご確認ください。
          </p>
        </div>
      </div>
    </section>
    <Model :show="mattersIsShow">
      <h2>ご注意事項</h2>
      <div class="modal__list">
        <ul>
          <li>
            米国株式は、店頭取引（当社との相対取引）でのお取扱いとなります。
          </li>
          <li>
            「参考売値」、「参考為替レート」には、店頭取引における取引コストが減算されております。
          </li>
          <li>
            この画面に表示されている参考売値及び参考為替レートは、表示時点における最新の売値及び為替レートを表示しており実際にお取引可能な売値及び為替レートとは異なる場合があります。
          </li>
          <li>
            詳細は<a
              class="pointer"
              href="https://www.cheer-sec.co.jp/other/app-help/C320-1.html"
              >取引ルール</a
            >や<a
              class="pointer"
              href="https://www.cheer-sec.co.jp/other/app-help/C320-2.html"
              >リスク・手数料等</a
            >についてのページをご覧ください。
          </li>
        </ul>
      </div>
      <div class="modal__buttons">
        <a @click="closeMatter" class="button button__white button__medium">
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
  </main>
</template>

<script src="@/assets/js/page/transaction/us/sell/index.js"></script>

<style scoped></style>
