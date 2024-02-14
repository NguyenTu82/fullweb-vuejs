<template>
  <body>
    <main>
      <TopInfo>
        <nav class="topinfo__breadcrumb">
          <div class="topinfo__breadcrumb-head"></div>
          <router-link to="/home" v-slot="{ href, navigate }" custom>
            <a :href="href" @click="navigate"><strong>ホーム</strong></a>
          </router-link>
          <div class="topinfo__breadcrumb-img">
            <img src="/assets/images/arrow_gray.png" alt="矢印" />
          </div>
          <router-link to="/ranking/jp/" v-slot="{ href, navigate }" custom>
            <a :href="href" @click="navigate"><strong>投資信託</strong>></a>
          </router-link>
          <div class="topinfo__breadcrumb-img">
            <img src="/assets/images/arrow_gray.png" alt="矢印" />
          </div>
          <router-link
            to="/ranking/jp/reference?category=ご参考銘柄"
            v-slot="{ href, navigate }"
            custom
          >
            <a :href="href" @click="navigate">ご参考銘柄</a>
          </router-link>
        </nav>
      </TopInfo>

      <section class="ranking">
        <div class="wrapper">
          <TabContent />
          <h1 class="title">ご参考銘柄</h1>
          <div class="container card">
            <div class="l_tab_wrapper">
              <div class="ranking__title">
                <h1 class="detail__title">ご参考銘柄</h1>
                <div class="ranking__title-caution">
                  <a
                    href="https://www.cheer-sec.co.jp/other/app-help/B420.html"
                  >
                    ご注意事項<img src="/assets/images/question.png" alt="?" />
                  </a>
                  <p>{{ currentDateTime() }} 現在</p>
                </div>
              </div>
              <div class="ranking__dummy">
                <iframe :src="urlIframe" width="100%" height="100%"> </iframe>
              </div>
              <router-link
                :to="{ name: 'RankingInvestment' }"
                v-slot="{ href, navigate }"
                custom
              >
                <a
                  class="button button__white button__full"
                  :href="href"
                  @click="navigate"
                  >カテゴリー一覧へ</a
                >
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </main>
  </body>
</template>

<script src="@/assets/js/page/ranking/investment/rankingInvestmentReference"></script>
