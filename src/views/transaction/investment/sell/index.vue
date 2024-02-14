<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <router-link :to="{ name: 'Home' }" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate"><strong>投資信託</strong></a>
        </router-link>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <router-link :to="{ name: 'Brand' }" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate"><strong>銘柄一覧</strong></a>
        </router-link>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="">
          <span>解約</span>
        </a>
      </nav>
    </TopInfo>
    <section class="order sell-investment">
      <div class="wrapper">
        <h1 class="title">[解約] 投資信託</h1>
        <div class="container card">
          <div class="tab_wrapper order__wrapper" v-if="basicData">
            <h2 class="detail__title--sell">
              {{ basicData.fund_abb_nm }}
            </h2>
            <div class="order__tags">
              <p class="tag" v-if="basicData.fund_attr_cls != 1">
                {{ basicData.fund_attr_cls_nm }}
              </p>
              <p
                class="tag"
                v-for="(item, index) in basicData.fund_type_list"
                :key="index"
              >
                {{ item.fund_type_nm }}
              </p>
            </div>
            <div class="order__reference">
              <div class="order__reference-value--jp">
                <p>基準価額</p>
                <h2>{{ handNumberInt(basicData.price) }}<small>円</small></h2>
              </div>
              <div class="order__reference-rate--jp">
                <p>前日比（率）</p>
                <h2
                  class="comparison_text"
                  :class="basicData.day_before_rate > 0 ? 'high' : basicData.day_before_rate < 0 ? 'low' : ''"
                >
                  <span v-if="basicData.day_before_rate > 0">+</span
                  >{{ handNumberInt(basicData.day_before_rate)
                  }}<small>円</small>
                  <small
                    >(<span v-if="basicData.day_before_rate > 0">+</span
                    >{{ basicData.day_before_ratio }}%)
                  </small>
                </h2>
              </div>
            </div>
            <form class="order__data card card--sphidden">
              <div class="table">
                <div class="table__box">
                  <div class="table__box-title">
                    <p>分配金取扱コース</p>
                  </div>
                  <div class="table__box-value">
                    <div class="order__data-buttons order__data-buttons--full">
                      <a
                        class="button button__square"
                        v-for="(item, index) in tabArr"
                        :key="index"
                        v-show="
                          basicData.dividend_handling_cls == 3 ||
                          basicData.dividend_handling_cls == item.dividend_cls
                        "
                        :class="
                          item.approximate_sellable_amount == 0 &&
                          item.sell_possible_qty == 0
                            ? 'button__square__disabled'
                            : item.active
                            ? 'button__square--selected'
                            : ''
                        "
                        @click="
                          (item.approximate_sellable_amount != 0 ||
                            item.sell_possible_qty != 0) &&
                            handelTab(index)
                        "
                      >
                        {{ item.dividend_cls_nm }}
                      </a>
                    </div>
                  </div>
                </div>

                <div
                  class="table__custom"
                  v-for="(item, index) in tabArr"
                  :key="index"
                >
                  <div class="item-tab" v-if="item.active">
                    <div class="table__box">
                      <div class="table__box-title">
                        <p>概算売却可能額</p>
                      </div>
                      <div class="table__box-value">
                        <p>
                          {{ handNumberInt(item.approximate_sellable_amount)
                          }}<small>円</small>
                        </p>
                      </div>
                    </div>
                    <div class="table__box">
                      <div class="table__box-title">
                        <p>売却可能口数</p>
                      </div>
                      <div class="table__box-value">
                        <p>
                          {{ handNumberInt(item.sell_possible_qty)
                          }}<small>口</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table__box">
                  <div class="table__box-title">
                    <p>注文方法</p>
                  </div>
                  <div class="table__box-value">
                    <div class="order__data-buttons order__data-buttons--full">
                      <a
                        class="button button__square"
                        v-for="(item, index) in methodsArr"
                        :key="index"
                        :class="item.active ? 'button__square--selected' : ''"
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
                      <button
                        class="counter__button"
                        :class="getDisabled(0) ? 'num-btn-disable' : ''"
                        v-on:click.prevent="handleRduceNum"
                      >
                        ー
                      </button>
                      <input
                        v-if="focused"
                        placeholder="0"
                        type="text"
                        pattern="[0-9]*"
                        @input="numChange"
                        @blur="inputNumBlur"
                        class="counter__number"
                        :value="
                          (this.selectMethod.id == 2 || (this.idMethodPayment && this.idMethodPayment != 1))
                            ? cashFormatter(
                                this.selectAccount.approximate_sellable_amount
                              )
                            : num
                        "
                        :readonly="selectMethod.id == 2"
                        :disabled="selectMethod.id == 2"
                        onkeyup="value=value.replace(/[^\d０-９]/g,'')"
                        oninput="value=value.replace(/[^\d０-９]/g,'');if(value.length>10)value=value.slice(0,10)"
                        v-set-focus="focused"
                      />
                      <input
                        class="counter__number"
                        v-else
                        type="text"
                        placeholder="0"
                        pattern="[0-9]*"
                        :value="valueFormatter()"
                        @focus="focused = true"
                      />
                      <button
                        class="counter__button"
                        :class="getDisabled(1) ? 'num-btn-disable' : ''"
                        v-on:click.prevent="handleAddNum"
                      >
                        ＋
                      </button>
                    </div>
                    <p v-show="showOrderDataError" class="order__data--error" v-if="!allSold">
                      <img src="/assets/images/exclamation.png" alt="!" />
                      {{ basicData.min_sell_amount }}円以上{{
                        basicData.sell_amount_unit
                      }}円単位
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
                        <input
                          pattern="[0-9]*"
                          type="password"
                          v-model="tradepwd"
                          class="order__data-input"
                          autocomplete="off"
                          onkeyup="value=value.replace(/[^\d０-９]/g,'')"
                          oninput="value=value.replace(/[^\d０-９]/g,'');if(value.length>4)value=value.slice(0,4)"
                          placeholder="****"
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
                  class="button button__medium"
                  :class="
                    canSell ? 'button__primary' : 'button__square__disabled'
                  "
                  v-on:click.prevent="handleSellOrderConfirmation()"
                >
                  注文内容を確認する
                </button>
              </div>
            </form>
          </div>
          <p class="order__caution">
            お取引きの詳細については<a
              class="caution_note"
              @click="handleShowCaution()"
              >ご注意事項</a
            >をご確認ください。
          </p>
        </div>
      </div>
    </section>
    <section v-if="modelShow">
      <!-- C710-7 -->
      <section class="modal modal_pdf" v-if="initDefaultModalShow[0]">
        <div class="tab_wrapper">
          <div class="modal__content card doc_pdf">
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
              <a
                @click="modalCancelClick(2)"
                class="button button__white button__medium"
              >
                キャンセル
              </a>
              <a
                :class="
                  pdfList.filter((it) => !it.delivery_dt).length
                    ? 'button__disabled'
                    : 'button__main'
                "
                @click="modalConfirm(1)"
                class="button button__medium"
              >
                同意する
              </a>
            </div>
          </div>
        </div>
      </section>
      <section class="modal" v-if="initDefaultModalShow[1]">
        <div class="tab_wrapper">
          <div class="modal__content card">
            <h2>売買不可情報</h2>
            <p class="modal__text">
              {{ prospeResContent }}
            </p>
            <div class="modal__buttons">
              <a
                @click="modalConfirm(2)"
                class="button button__main button__medium"
              >
                OK
              </a>
            </div>
          </div>
        </div>
      </section>
      <section class="modal" v-if="initDefaultModalShow[2]">
        <div class="tab_wrapper">
          <div class="modal__content card">
            <h2 class="red-title"> <span> 受付済のご注文があります。</span></h2>
            <p class="modal__text algin-left">
              同じ取引日に同じ銘柄を複数注文することはできません。注文<br />
              明細から受け付け済みのご注文を取り消して新たにご注文<br />
              いただくか、当日扱いの注文締切時間以降にご注文下さい。
            </p>
            <div class="modal__buttons">
              <a
                @click="modalCancelClick(2)"
                class="button button__white button__medium"
              >
                キャンセル
              </a>
              <a
                class="button button__main button__medium"
                @click="modalConfirm(3)"
              >
                注文一覧へ
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="modal" v-if="cautionModal">
        <div class="tab_wrapper">
          <div class="modal__content card">
            <h2>ご注意事項</h2>
            <div class="modal__buttons">
              <a
                @click="modalCancelClick(2)"
                class="button button__main button__medium"
              >
                閉じる
              </a>
            </div>
          </div>
        </div>
      </section>
    </section>
  </main>
</template>

<script src="@/assets/js/page/transaction/investment/sell/index.js"></script>
<style scoped></style>
