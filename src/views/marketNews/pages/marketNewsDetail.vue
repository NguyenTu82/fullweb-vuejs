/* * @Author: VuPV * @Last Modified by: VuPV * @Last Modified time: 2022-06-03 *
@ID Function: A121 * @Description: 選択ニュースの本文 */

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
          <a :href="href" @click="navigate"
            ><strong>マーケットニュース</strong></a
          >
        </router-link>
      </nav>
    </TopInfo>
    <div class="market_news">
      <div class="wrapper">
        <h1 class="title">マーケットニュース</h1>
        <section class="market_news__detail card">
          <div class="tab_wrapper">
            <p class="market_news__source">情報元：株式会社時事通信社</p>
            <div class="market_news__detail-date">
              <p>
                {{ NEWS_DT["date"] }} <small>{{ NEWS_DT["time"] }}</small>
              </p>
            </div>
            <h1 class="market_news__detail-title">
              {{ currentData["TITLE"] }}
            </h1>
            <div
              class="market_news__detail-body"
              v-html="currentData['CONTENT']"
            ></div>
          </div>
          <button
            class="button button__white button__full button__back"
            @click="() => $router.push({ name: 'MarketNews' })"
          >
            <img src="/assets/images/arrow_back_g.png" alt="" />
            マーケットニュース一覧へ
          </button>
        </section>
      </div>
    </div>
  </main>
</template>

<script src="@/assets/js/page/marketNews/pages/marketNewsDetail"></script>

<style scoped></style>
