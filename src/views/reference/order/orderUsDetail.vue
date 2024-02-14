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
        <a href="/reference/order/us/"><strong>米国株式</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="">{{ info.stock }}</a>
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
            <div class="reference_order__title">
              <h2 class="detail__title">
                {{ info.stock }}
              </h2>
              <div class="reference_order__title-buttons">
                <a class="button button__main"  style="cursor:pointer;"
                    @click="
                            toStockDetail(
                              currentData.BRAND_ID,
                            )
                            "> 銘柄情報 </a>
              </div>
            </div>
            <p class="detail__exchange">{{ info.company }}</p>
            <div class="reference_order__tags">
              <p
                class="color_tag--main"
                v-if="[0, 1, 2, 11, 12].includes(currentData.ORDER_STATUS)"
              >
                {{ currentData.ORDER_STATUS_DISP }}
              </p>
              <p
                class="color_tag--main"
                v-if="[4].includes(currentData.ORDER_STATUS)"
              >
                {{ currentData.ORDER_STATUS_DISP }}
              </p>
              <p
                class="color_tag--main"
                v-if="[3, 5].includes(currentData.ORDER_STATUS)"
              >
                {{ currentData.ORDER_STATUS_DISP }}
              </p>
              <p
                v-if="
                  currentData.TRADE_TYPE === 2 || currentData.TRADE_TYPE === 1
                "
                :class="{
                  'color_tag--primary': currentData.TRADE_TYPE == 2,
                  'color_tag--secondary': currentData.TRADE_TYPE == 1,
                }"
              >
                {{ tradeTypeBox[currentData.TRADE_TYPE] }}
              </p>
            </div>
            <div class="reference_order__table card card--sphidden">
              <div class="table">
                <list-page :data="infors" />
                <div class="table__box-space"></div>
                <list-page
                  :data="infors2"
                  :failed="[3, 5].includes(currentData.ORDER_STATUS)"
                />
              </div>
              <router-link
                to="/reference/order/us"
                class="button button__white button__medium"
                >注文一覧へ</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import orderUsDetail from "@/assets/js/page/reference/order/orderUsDetail";
export default orderUsDetail;
</script>
