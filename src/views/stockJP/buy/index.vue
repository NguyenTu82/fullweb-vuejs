<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <router-link to="/home"><strong>国内株式</strong></router-link>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <router-link :to="{ name: 'StockListJP' }"
          ><strong>銘柄一覧</strong></router-link
        >
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <router-link :to="{ name: 'BuyStockJP' }"
          ><strong>買注文</strong></router-link
        >
      </nav>
    </TopInfo>

    <modalRisk
      :isShow="showModalRisk"
      :content="contentModalRisk"
      :showLinkComplexProducts="showLinkComplexProducts"
      @cancel="onHideModal"
    />
    <modalExpInvest :isShow="showModalExpInvest" @confirm="onHideModal" />
    <section class="order">
      <div class="wrapper">
        <h1 class="title">[買] 国内株式</h1>
        <div class="container card">
          <NavOrder
            :disabled="otc_select_brand_cls == 0"
            :titles="titles"
            :kind="kind"
            @changeKind="changeKind"
          />
          <buyStockItaku
            :resetData="resetData"
            :exchange_cls="this.$route.query.exchange_cls"
            :stock_cd="this.$route.query.stock_cd"
            v-show="kind == 1"
          />
          <buyStockTentou
            :resetData="resetData"
            :stock_cd="this.$route.query.stock_cd"
            v-show="kind == 2"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script src="@/assets/js/page/stockJP/buy/index.js"></script>
