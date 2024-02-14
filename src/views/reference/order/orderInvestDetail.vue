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
        <a href="/reference/order/invest"><strong>投資信託</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="">ひふみプラス</a>
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
            <!-- detailクラスはtypographyに記載 -->
            <div class="reference_order__title">
              <h2 class="detail__title">
                {{ currentData.fund_nm_short }}
                <template v-if="currentData.fund_nickname">
                  ({{ currentData.fund_nickname }})
                </template>
              </h2>
              <div class="reference_order__title-buttons">
                <a class="button button__main"  style="cursor:pointer;"
                    @click="
                              toStockDetail(
                                currentData.inv_trust_assoc_cd,
                              )
                              "> 銘柄情報 </a>
              </div>
            </div>
            <div class="reference_order__tags--between">
              <div class="reference_order__tags">
                <p class="tag">
                  {{ currentData.order_dividend_handling_cls_nm }}
                </p>
                <p class="tag" v-if="currentData.fund_attr_cls != 1">
                  {{ currentData.fund_attr_cls_nm }}
                </p>
                <p
                  class="tag"
                  v-for="(item, index) in currentData.fund_type_list"
                  :key="index"
                >
                  {{ item.fund_type_nm }}
                </p>
              </div>
              <div class="reference_order__tags">
                <p
                  class="color_tag--main"
                  v-if="ord_sts_cdArr.includes(currentData.order_sts)"
                >
                  {{ currentData.order_sts_nm }}
                </p>
                <p
                  :class="{
                    'color_tag--primary': currentData.sell_buy_cls == 1,
                    'color_tag--secondary': currentData.sell_buy_cls == 3,
                  }"
                >
                  {{ currentData.sell_buy_cls_nm }}
                </p>
              </div>
            </div>
            <div class="reference_order__table card card--sphidden">
              <div class="table">
                <list-page :data="infors" />
                <div
                  class="reference_order__modal"
                  v-show="![0, 1, 11, 12].includes(currentData.order_sts)"
                ></div>
                <div v-show="[0, 1, 11, 12].includes(currentData.order_sts)">
                  <template v-if="showConfirm">
                    <div class="reference_order_tips">
                      注文取消<br />上記の注文を取消します。
                    </div>
                    <div class="reference_order__modal">
                      <a
                        class="button button__white button__medium ly_button"
                        @click="showConfirm = false"
                      >
                        キャンセル
                      </a>
                      <a
                        class="button button__primary button__medium ly_button"
                        @click="showPwdPopup = true"
                        >注文取消</a
                      >
                    </div>
                  </template>
                  <template v-else>
                    <div class="reference_order__modal">
                      <a
                        class="button button__primary button__medium ly_button"
                        @click="showConfirm = true"
                        >注文を取り消す</a
                      >
                    </div>
                  </template>
                </div>
                <list-page
                  :data="infors2"
                  :failed="[3, 5].includes(currentData.ORDER_STATUS)"
                />
              </div>
              <router-link
                to="/reference/order/invest"
                class="button button__white button__medium"
                >注文一覧へ</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--  注文取消 -->
    <section :class="{ hidden: !showPwdPopup }" class="modal">
      <div class="tab_wrapper">
        <div class="modal__content card">
          <h2>注文取消</h2>
          <h3 class="modal__hint">取引暗証番号をご入力ください。</h3>
          <div class="modal__input_wrap">
            <input
              type="text"
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
              @click="btnCancel"
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
  </main>
</template>

<script>
import orderInvestDetail from "@/assets/js/page/reference/order/orderInvestDetail";
export default orderInvestDetail;
</script>
