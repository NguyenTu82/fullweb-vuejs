<template>
  <div>
    <div class="swiper__navigation">
      <div class="swiper-prev--single">
        <img src="/assets/images/arrow_swipe.png" alt="矢印" />
      </div>
      <div class="swiper-next--single">
        <img src="/assets/images/arrow_swipe.png" alt="矢印" />
      </div>
    </div>
    <div class="swiper single-row">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in ranking" :key="index">
          <router-link
            v-if="item.name == 'StockListJP'"
            :to="{ name: item.name, query: { typeTransaction: item.query } }"
          >
            <a class="ranking__category" v-html="item.title"></a>
          </router-link>
          <router-link
            v-else-if="item.name == 'StockListUS'"
            :to="{ name: item.name, query: {} }"
          >
            <a class="ranking__category" v-html="item.title"></a>
          </router-link>
          <router-link
            v-else-if="item.name == 'Brand'"
            :to="{ name: item.name, query: {} }"
          >
            <a class="ranking__category" v-html="item.title"></a>
          </router-link>
          <router-link
            v-else
            :to="{ name: item.name, query: { category: item.query } }"
          >
            <a class="ranking__category" v-html="item.title"></a>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="@/assets/js/page/home/rankingItem"></script>
