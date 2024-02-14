<template>
  <main>
    <button class="scrollTopButton hidden">
      <img src="/assets/images/topbtn.png" alt="TOP" />
    </button>

    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/reference/condition/"><strong>資産・照会</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/reference/order/jp/"><strong>注文一覧</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/reference/order/jp/"><strong>国内株式</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a>{{ currentData.stock_nm }}</a>
      </nav>
    </TopInfo>

    <section class="reference_order">
      <div class="wrapper">
        <div class="grid_buttons">
          <router-link to="/reference/condition" class="button__square"
            >資産状況</router-link
          >
          <router-link to="/reference/order/jp" class="button__square--selected"
            >注文一覧</router-link
          >
          <router-link to="/reference/contract/jp" class="button__square"
            >約定一覧</router-link
          >
          <router-link to="/reference/deposit" class="button__square"
            >預り金増減</router-link
          >
        </div>
        <h1 class="title">注文明細</h1>
        <div class="container card">
          <div class="tab_wrapper">
            <div class="grid_buttons">
              <a
                @click="orderType = 'detail'"
                :class="
                  orderType == 'detail'
                    ? 'button__square--selected'
                    : 'button__square'
                "
                >注文明細</a
              >
              <a
                @click="orderType = 'record'"
                :class="
                  orderType == 'record'
                    ? 'button__square--selected'
                    : 'button__square'
                "
                >注文履歴</a
              >
            </div>
            <onno-detail
              :infors2="infors2"
              :infors="infors"
              :orderStatusDisplay="orderStatusDisplay"
              :newCanCancel="newCanCancel"
              :currentData="currentData"
              :info="info"
              @eraseOrder="handeleCancel"
              @openPopup="openPopup"
              v-if="orderType == 'detail'"
            ></onno-detail>
            <onno-record
              v-else-if="orderType == 'record'"
              :titleData="currentData"
              :listData="detailsList"
              :info="info"
              :orderStatusDisplay="orderStatusDisplay"
            ></onno-record>
          </div>
        </div>
      </div>
    </section>
  </main>
  <section :class="{ hidden: !showPwdPopup }" class="modal">
    <div class="tab_wrapper">
      <div class="modal__content card">
        <h2>注文取消</h2>
        <h3 class="modal__hint">取引暗証番号をご入力ください。</h3>
        <div class="modal__input_wrap">
          <input
            type="text"
            maxlength="4"
            placeholder="****"
            class="modal__input border_input"
            autocomplete="off"
            @blur="handleBlur"
            v-model="tradepwd"
            onkeyup="value=value.replace(/[^\d０-９]/g,'')"
            oninput="value=value.replace(/[^\d０-９]/g,'');if(value.length>4)value=value.slice(0,4)"
          />
        </div>
        <div class="modal__buttons">
          <button
            class="button button__white button__medium modal__close"
            @click="cancelModal"
          >
            キャンセル
          </button>
          <button
            class="button button__main button__medium"
            :disabled="tradepwd.length != 4"
            :class="tradepwd.length == 4 ? '' : 'btn-disabled'"
            @click="handeleErase"
          >
            注文取消
          </button>
        </div>
      </div>
    </div>
  </section>
  <section :class="{ hidden: !showOptionPanel }" class="modal">
    <div class="tab_wrapper">
      <div class="modal__content card">
        <div class="modal__options">
          <div
            class="modal__option modal__option__first"
            @click="modifyOrder(true)"
          >
            <p>数量を訂正する</p>
            <p>注文株数を変更します。</p>
          </div>
          <div
            class="modal__option modal__option__last"
            @click="modifyOrder(false)"
          >
            <p>価格を訂正する</p>
            <p>価格や執行条件を変えます。</p>
          </div>
        </div>
        <div class="modal__attention__text">
          <p>※有効期限の訂正はできません。</p>
          <p>
            ※有効期限付き(「当日」以外)の指値注文は「成行」に訂正できません。
          </p>
          <p>変更する場合には、注文を取消し、新たに注文をご入力ください</p>
        </div>
        <div class="modal__buttons">
          <button
            class="button button__white button__medium modal__close"
            @click="showOptionPanel = false"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import orderJpDetail from "@/assets/js/page/reference/order/orderJpDetail";
export default orderJpDetail;
</script>
