<template>
  <div>
    <h1 class="title">カテゴリー一覧</h1>
    <div class="container card">
      <div class="l_tab_wrapper">
        <div class="searchbar">
          <div class="searchbar__top searchbar__top--between">
            <div>
              <div class="searchbar__top">
                <img src="/assets/images/search.png" alt="虫眼鏡" />
                <p>銘柄名・銘柄コードから選択</p>
              </div>
              <div class="searchbar__top-category">
                <input v-model="searchText" maxlength="100" type="search" />
                <button
                  class="button button__main button__chip"
                  @click="search"
                >
                  検索
                </button>
              </div>
            </div>
            <div class="searchbar__top-caution">
              <a
                href="https://www.cheer-sec.co.jp/other/app-help/B320.html"
              >
                ご注意事項<img src="/assets/images/question.png" alt="?" />
              </a>
              <p>{{ currentDateTime() }} 現在</p>
            </div>
          </div>
          <div
            class="grid_list grid_list--four_columns grid_list--sp_two_columns"
          >
            <router-link
              :to="{
                name: 'RankingJpReference',
                query: { category: this.reference },
              }"
            >
              <a class="ranking__category">{{ reference }}</a>
            </router-link>
            <router-link
              v-for="(category, index) in categories"
              v-bind:key="index"
              :to="{
                name: 'RankingJpDetail',
                query: { category: this.categories[index] + 'ランキング' },
              }"
            >
              <a class="ranking__category">{{ category }}<br />ランキング</a>
            </router-link>
            <router-link :to="{ name: 'StockListJP' }">
              <a class="ranking__category">{{ stockList }}</a>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/page/ranking/jp/rankingJp"></script>
