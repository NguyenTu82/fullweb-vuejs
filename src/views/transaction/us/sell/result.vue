<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <a href="/pages/home/"><strong>米国株式</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/transaction/us/brand/"><strong>銘柄一覧</strong></a>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <a href="/transaction/us/buy/">売注文</a>
      </nav>
    </TopInfo>
    <section class="order">
      <div class="wrapper">
        <h1 class="title">[売] 米国株式</h1>
        <div class="container card">
          <div class="l_tab_wrapper">
            <h2 class="detail__title--sell">
              {{ brandInfo.BRAND_NM_DISP
              }}<span>/ {{ brandInfo.BRAND_NM }}</span>
            </h2>
            <p class="detail__exchange">
              {{ `${brandInfo.BRAND_CD} | ${brandInfo.MARKET_CD}` }}
            </p>
          </div>
          <div class="result result--trade">
            <h2 class="result__title">注文を受け付けました</h2>
            <div class="result__image">
              <!-- <div class="result__image-status">
                <img src="/assets/images/check.png" alt="" />
              </div>
              <img src="/assets/images/phone.png" alt="" /> -->
            </div>
            <a
              @click="$router.push({name: 'orderUs'})"
              class="button button__main button__full"
            >
              注文一覧へ
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/transaction/us/sell/result.js"></script>

<style scoped></style>
