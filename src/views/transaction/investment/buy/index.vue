<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/home/"><strong>投資信託</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <router-link to="/transaction/investment/brand/"
          ><strong>銘柄一覧</strong></router-link
        >
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a>購入</a>
      </nav>
    </TopInfo>
    <section class="order investment-order">
      <div class="wrapper">
        <h1 class="title">[購入] 投資信託</h1>
        <div class="container card">
          <div class="tab_wrapper order__wrapper" v-if="dataInvestBuy">
            <!-- detailクラスはtypographyに記載 -->
            <h2 class="detail__title--buy">
              {{ dataInvestBuy.fund_nm_short }}{{ dataInvestBuy.fund_nickname ? "(" + dataInvestBuy.fund_nickname + ")" : "" }}
            </h2>
            <div class="order__tags">
              <p class="order__tags-number">
                {{ dataInvestBuy.inv_trust_assoc_cd }}
              </p>
              <p class="tag" v-if="dataInvestBuy.fund_attr_cls != 1">
                {{ dataInvestBuy.fund_attr_cls_nm }}
              </p>
              <p
                class="tag"
                v-for="(item, index) in dataInvestBuy.fund_type_list"
                :key="index"
              >
                {{ item.fund_type_nm }}
              </p>
            </div>
            <div class="order__reference">
              <div class="order__reference-value--jp">
                <p>
                  参考基準価額（{{
                    dataInvestBuy.base_price_current_dt
                      ? dataInvestBuy.base_price_current_dt.substring(0, 10)
                      : ""
                  }}）
                </p>
                <h2>
                  {{ handNumberInt(dataInvestBuy.base_price) }}<small>円</small>
                </h2>
              </div>
            </div>
            <!-- <div class="order__date">
                <p class="order__date-text">基準日</p>
                <p class="order__date-time">2021/12/20</p>
              </div> -->
            <form class="order__data card card--sphidden">
              <div class="table">
                <div class="table__box">
                  <div class="table__box-title">
                    <p>分配金受取コース</p>
                  </div>
                  <div class="table__box-value">
                    <div
                      v-if="dividendHandlingCls === '3'"
                      class="order__data-buttons order__data-buttons--full"
                    >
                      <li
                        v-for="(item, index) in tabArr"
                        class="button button__square"
                        :class="item.active ? 'button__square--selected' : ''"
                        :key="index"
                        @click="handelClickTab(item)"
                      >
                        {{ item.title }}
                      </li>
                    </div>
                    <div
                      v-else-if="
                        dividendHandlingCls === '1' ||
                        dividendHandlingCls === '2'
                      "
                      class="order__data-buttons order__data-buttons--full"
                    >
                      <li
                        v-for="(item, key) in tabArr"
                        v-show="item.active"
                        :style="[
                          { 'margin-left': item.active ? 'unset' : '1rem' },
                        ]"
                        class="button button__square"
                        :class="item.active ? 'button__square--selected' : ''"
                        :key="key"
                      >
                        {{ item.title }}
                      </li>
                    </div>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>引落先</p>
                  </div>
                  <div class="table__box-value">
                    <!-- selectbox--error  -->
                    <select
                      class="selectbox selectbox__green"
                      name="account"
                      v-on:change="handelSelectBank($event)"
                    >
                      <option
                        value=""
                        disabled
                        :selected="selectedBankMethods == null"
                      >
                        選択してください
                      </option>
                      <option
                        v-for="(item, index) in bankArr"
                        :key="index"
                        :value="item.PAYMENT_ID"
                        :name="item.BANK_NAME"
                      >
                        {{ item.BANK_NAME }}
                      </option>
                    </select>
                    <p
                      class="order__data-text"
                      v-if="selectedBankMethods == '2'"
                    >
                      注文に必要な金額を銀行口座から引き落とし、預り金へ入金します。
                    </p>
                  </div>
                </div>
                <div class="table__box" v-if="selectedBankMethods == '1'">
                  <div class="table__box-title">
                    <p>概算買付可能額</p>
                  </div>
                  <div class="table__box-value">
                    <p>
                      {{ handNumberInt(dataInvestBuy.buying_power)
                      }}<small>円</small>
                    </p>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>注文方法</p>
                  </div>
                  <div class="table__box-value">
                    <div class="order__data-buttons">
                      <li
                        v-for="(item, index) in methodsArr"
                        :key="index"
                        class="button button__square"
                        :class="item.active ? 'button__square--selected' : ''"
                        @click="
                          handelMethods(item)
                        "
                      >
                        {{ item.title }}
                      </li>
                    </div>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>価格</p>
                  </div>
                  <div class="table__box-value">
                    <div class="counter order__data-counter">
                      <button
                        class="counter__button"
                        :class="showReduceBtn ? '' : 'button__disabled'"
                        v-on:click.prevent="handdelReduce()"
                      >
                        ー
                      </button>
                      <input
                        class="counter__number"
                        v-if="focused"
                        placeholder="0"
                        pattern="[0-9]*"
                        type="number"
                        :disabled="inSuccess || selectedMethods == 2"
                        :value="num"
                        onkeyup="value=value.replace(/[^\d０-９]/g,'')"
                        oninput="value=value.replace(/[^\d０-９]/g,'')"
                        @input="handelInputNum"
                        @blur="inputNumBlur"
                        v-set-focus="focused"
                      />
                      <input
                        v-else
                        class="counter__number"
                        type="text"
                        placeholder="0"
                        pattern="[0-9]*"
                        :value="valueFormatter()"
                        @focus="focused = true"
                      />
                      <button
                        class="counter__button"
                        :class="showAddBtn ? '' : 'button__disabled'"
                        v-on:click.prevent="handdelAdd()"
                      >
                        ＋
                      </button>
                    </div>
                    <p v-show="showOrderDataError" class="order__data--error">
                      <img src="/assets/images/exclamation.png" alt="!" />
                      {{ dataInvestBuy.min_buy_amt }}円以上<span
                        v-show="showBuyUnitAmt"
                        >{{ dataInvestBuy.buy_unit_amt }}円単位</span
                      >
                    </p>
                  </div>
                </div>
                <div class="table__box table__box--password">
                  <div class="table__box-title">
                    <p>取引暗証番号</p>
                  </div>
                  <div class="table__box-value">
                    <div class="order__data-pass">
                      <form>
                        <!-- order__data-input--error -->
                        <input
                          type="password"
                          class="order__data-input"
                          placeholder="****"
                          maxlength="4"
                          pattern="[0-9]*"
                          v-model="tradepwd"
                          autocomplete
                          onkeyup="value=value.replace(/[^\d０-９]/g,'')"
                          oninput="value=value.replace(/[^\d０-９]/g,'');if(value.length>4)value=value.slice(0,4)"
                        />
                      </form>
                    </div>
                    <!-- <p class="order__data--error">
                        エラーメッセージが入ります。
                      </p> -->
                  </div>
                </div>
              </div>
              <div class="order__modal">
                <button
                  @click="handleBackUsDetail()"
                  class="button button__white button__medium"
                >
                  キャンセル
                </button>
                <button
                  v-if="selectedBankMethods == '2'"
                  :class="canChargeMoney ? 'button__main' : 'button__disabled'"
                  class="button button__medium"
                  v-on:click.prevent="
                    canChargeMoney && handleChargeMoneyFromBank()
                  "
                >
                  注文金額を入金する
                </button>
                <button
                  :class="canInBuy ? 'button__secondary' : 'button__disabled'"
                  class="button button__medium"
                  v-on:click.prevent="canInBuy && handleBuyStockOrder()"
                >
                  注文内容を確認する
                </button>
              </div>
              <p class="order__modal-text" v-if="selectedBankMethods == '2'">
                銀行口座からご注文に必要な金額を引き落とします
              </p>
            </form>
          </div>
          <p class="order__caution">
            お取引きにあたり<a class="caution_note" @click="handleShowCaution()"
              >ご注意事項</a
            >をご確認ください。
          </p>
        </div>
      </div>
      <PopupShowMessage
        ref="mychild"
        :showPopup="showModalBankResult"
        @hidePopup="hidePopup"
        :dataPopup="dataPopup"
      />
      <section v-if="modelShow">
        <!-- C610-1 - 購入画面（書面同意） -->
        <section class="modal modal_pdf" v-if="initDefaultModalShow[0]">
          <div class="tab_wrapper">
            <div class="modal__content card">
              <p class="modal__text">
                お取引頂く前に、以下の書面をご確認ください。
              </p>
              <div class="modal__pdfs" v-if="pdfList">
                <div
                  class="modal__pdfs-item"
                  v-for="(item, index) in pdfList"
                  :key="index"
                >
                  <a
                    :href="item.doc_pdf_path"
                    @click="goRead(item, index)"
                    target="_blank"
                  >
                    <img
                      v-if="item.delivery_dt"
                      src="/assets/images/icon_pdf_read.png"
                      :alt="item.doc_pdf_path"
                      class="icon_pdf"
                    />
                    <img
                      v-else
                      src="/assets/images/icon_pdf.png"
                      :alt="item.doc_pdf_path"
                      class="icon_pdf"
                    />
                  </a>
                  <a
                    target="_blank"
                    @click="goRead(item, index)"
                    :href="item.doc_pdf_path"
                    ><p>{{ item.doc_nm }}</p></a
                  >
                </div>
              </div>
              <p class="modal__text">書面をよく読み十分に理解しました。</p>
              <div class="modal__buttons">
                <button
                  @click="modalCancelClick(2)"
                  class="button button__white button__medium"
                >
                  キャンセル
                </button>
                <button
                  :disabled="pdfList.filter((it) => !it.delivery_dt).length"
                  :class="
                    pdfList.filter((it) => !it.delivery_dt).length
                      ? 'button__disabled'
                      : 'button__main'
                  "
                  @click="modalConfirm(1)"
                  class="button button__medium"
                >
                  同意する
                </button>
              </div>
            </div>
          </div>
        </section>

        <!--  ■【C610-3】目論見書改版 -->
        <section class="modal" v-if="initDefaultModalShow[1]">
          <div class="tab_wrapper">
            <div class="modal__content card">
              <h2>売買不可情報</h2>
              <p class="modal__text">
                {{ prospeResContent }}
              </p>
              <div class="modal__buttons">
                <a
                  @click="modalCancelClick(2)"
                  class="button button__main button__medium"
                >
                  OK
                </a>
              </div>
            </div>
          </div>
        </section>
        <section class="modal" v-if="cautionModal">
          <div class="tab_wrapper">
            <div class="modal__content card">
              <h2>ご注意事項</h2>
                <p class="matters-content">
                  <iframe class="matters-content-item" src="https://www.cheer-sec.co.jp/other/app-help/C610.html" title=""></iframe>
                </p>
              <div class="modal__buttons">
                <a
                  @click="modalCancelClick(1)"
                  class="button button__main button__medium btn_close"
                >
                  閉じる
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- // ■【C610-5】同銘柄注文 -->
        <section class="modal" v-if="initDefaultModalShow[5]">
          <div class="tab_wrapper">
            <div class="modal__content card">
              <h2 class="red-title"> <span> 受付済のご注文があります。</span></h2>
              <p class="modal__text">
                同じ取引日に同じ銘柄を複数注文することはできません。<br />
                注文明細から受け付け済みのご注文を取り消して新たにご注文いただくか、<br />
                当日扱いの注文締切時間以降にご注文下さい。
              </p>
              <div class="modal__buttons">
                <a
                  @click="modalCancelClick(2)"
                  class="button button__white button__medium"
                >
                  キャンセル
                </a>
                <a
                  @click="goOrderInvestClick()"
                  class="button button__main button__medium"
                >
                  注文一覧へ
                </a>
              </div>
            </div>
          </div>
        </section>
        <!-- ■【C610-4】投資目的 [E74006_0019] -->
        <section class="modal" v-if="initDefaultModalShow[4]">
          <div class="tab_wrapper">
            <div class="modal__content card">
              <p class="modal__text">
                このファンドは、価格変動リスク等が非常に高く、投資目的が「積極的値上がり益重視」のお客さま向けとしております。次の説明をよくお読みいただき、お客様ご自身のリスク許容度及び投資目的をご確認ください。
              </p>
              <div class="modal__link modal__text">
                <a
                  target="_blank"
                  href="https://www.cheer-sec.co.jp/rule/risk.html"
                  ><p>リスク・手数料等について</p></a
                >
              </div>
              <div class="modal__buttons">
                <a
                  @click="modalCancelClick(2)"
                  class="button button__white button__medium"
                >
                  キャンセル
                </a>
                <a
                  @click="accountConfirmClick()"
                  class="button button__main button__medium"
                >
                  確認する
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- ■【C610-4】投資目的 [E74006_0018] -->
        <section class="modal" v-if="initDefaultModalShow[2]">
          <div class="tab_wrapper">
            <div class="modal__content card">
              <p class="modal__text">
                このファンドは、価格変動リスク等が非常に高く、投資目的が「値上がり益重視」または「積極的値上がり益重視」のお客さま向けとしております。次の説明をよくお読みいただき、お客様ご自身のリスク許容度及び投資目的をご確認ください。
              </p>
              <div class="modal__link modal__text">
                <a
                  target="_blank"
                  href="https://www.cheer-sec.co.jp/rule/risk.html"
                  ><p>リスク・手数料等について</p></a
                >
              </div>
              <div class="modal__buttons">
                <a
                  @click="modalCancelClick(2)"
                  class="button button__white button__medium"
                >
                  キャンセル
                </a>
                <a
                  @click="accountConfirmClick()"
                  class="button button__main button__medium"
                >
                  確認する
                </a>
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  </main>
</template>

<script src="@/assets/js/page/transaction/investment/buy/index.js"></script>
<style scoped></style>
