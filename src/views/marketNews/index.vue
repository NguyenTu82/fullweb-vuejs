/* * @Author: VuPV * @Last Modified by: VuPV * @Last Modified time: 2022-06-03 *
@ID Function: A120 * @Description: ニュースの一覧表示 */

<template>
  <main>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <router-link :to="{ name: 'Home' }" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate"><strong>ホーム</strong></a>
        </router-link>
        <div class="topinfo__breadcrumb-img">
          <img src="/assets/images/arrow_gray.png" alt="矢印" />
        </div>
        <router-link
          :to="{ name: 'MarketNews' }"
          v-slot="{ href, navigate }"
          custom
        >
          <a :href="href" @click="navigate">マーケットニュース</a>
        </router-link>
      </nav>
    </TopInfo>
    <div class="wrapper">
      <section class="market_news">
        <TabContent></TabContent>
        <h1 class="title">マーケットニュース</h1>
        <div class="market_news__list card">
          <div class="tab_wrapper">
            <p class="market_news__source">情報元：株式会社時事通信社</p>
            <router-link
              v-for="(item, index) in currentData"
              v-bind:key="index"
              :to="{
                name: 'MarketNewsDetail',
                query: { news: item['NEWS_SEQ_NO'] },
              }"
              class="news"
            >
              <article class="market_news__article">
                <div class="market_news__text">
                  <p class="market_news__date">
                    {{ item["NEWS_DT_D"]
                    }}<small>{{ item["NEWS_DT_T"] }}</small>
                  </p>
                  <p class="market_news__title">
                    {{ item["TITLE"] }}
                    <img src="/assets/images/arrow.png" alt="矢印" />
                  </p>
                </div>
              </article>
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script src="@/assets/js/page/marketNews/index"></script>

<style scoped></style>
