<template>
  <main>
    <button class="scrollTopButton hidden">
      <img src="/assets/images/topbtn.png" alt="TOP" />
    </button>
    <TopInfo>
      <nav class="topinfo__breadcrumb">
        <div class="topinfo__breadcrumb-head"></div>
        <router-link to="/home" v-slot="{ href, navigate }" custom>
          <a :href="href" @click="navigate"><strong>ホーム</strong></a>
        </router-link>
      </nav>
    </TopInfo>
    <div class="wrapper">
      <section class="dashboard">
        <div class="dashboard__item card">
          <h2 class="dashboard__title">資産合計<small>TOTAL ASSETS</small></h2>
          <div class="dashboard__item--chart">
            <div class="chart">
              <div class="chart__head" v-if="isShowData">
                <p>{{ currDateTime }}現在</p>
                <span
                  ><img src="/assets/images/icon_reload.png" @click="reload"
                /></span>
              </div>
              <div class="chart__head" v-else>{{ "\xa0" }}</div>
              <div 
                class="chart__pie chart__pie--multi" 
                :style="{ backgroundImage: [
                  `radial-gradient(#fff 60%, transparent 61%), conic-gradient(#eb6a6a 0% ${RedPercen}, #002e9a ${RedPercen} ${BluePercen}, #43deb1 ${BluePercen} ${GreenPercen}, #cbcbcb ${GreenPercen} ${GrayPercen})`] }"
              >
                <label for="switch" class="switch">
                  <input
                    type="checkbox"
                    id="switch"
                    checked
                    @click="switchType"
                  />
                  <div class="switch__base"></div>
                  <div class="switch__circle"></div>
                </label>
                <p class="chart__title">資産合計</p>
                <div v-if="isShowData">
                  <p class="chart__sum">
                    {{ handNumberInt(totalAssetsAmount) }}<small>円</small>
                  </p>
                  <p
                    class="chart__comparison comparison_text"
                    :class="
                      parseInt(totalProfitAmount) > 0
                        ? 'high'
                        : parseInt(totalProfitAmount) < 0
                        ? 'low'
                        : ''
                    "
                  >
                    <!-- <span>+</span> -->
                    {{ showMoney(totalProfitAmount) }} 円<small
                      >({{
                        showMoneyFloat(totalAssetsAmountRate * 100)
                      }}%)</small
                    >
                  </p>
                </div>
                <div v-else>
                  <p class="chart__comparison comparison_text">
                    <img src="/assets/images/lock.png" />
                    非表示中
                  </p>
                </div>
              </div>
            </div>
            <div class="dashboard__item-list">
              <a
                @click="$router.push({name:'trend'})"
                style="cursor: pointer"
                class="dashboard__item-list-card card"
              >
                <p>買付余力T+2（国内株式）</p>
                <p v-if="isShowData">
                  <strong>{{
                    handNumberInt(
                      cash_bal == null || cash_bal.buy_available_capacity || 0
                    )
                  }}</strong
                  ><small>円</small>
                </p>
                <p v-else><strong>非表示</strong></p>
                <img src="/assets/images/arrow.png" alt="" />
              </a>
              <a
                href="/payment/deposit"
                class="button button__main button__full"
                v-if="parseInt(totalAssetsAmount) == 0"
                >入金する
                <img src="/assets/images/arrow_black_s.png" alt="" />
              </a>
              <a
                href="/transaction/jp/brand"
                class="button button__main button__full"
                v-if="parseInt(totalAssetsAmount) == 0"
                >買う
                <img src="/assets/images/arrow_black_s.png" alt="" />
              </a>
              <a
                @click="$router.push({name:'condition'})"
                class="button button__main button__full"
                style="cursor: pointer"
                v-if="parseInt(totalAssetsAmount) != 0"
                >資産状況
                <img src="/assets/images/arrow_black_s.png" alt="" />
              </a>
              <a
                style="cursor: pointer"
                @click="$router.push({name:'conditionJp'})"
                class="button button__main button__full"
                v-if="parseInt(totalAssetsAmount) != 0"
                >保有銘柄
                <img src="/assets/images/arrow_black_s.png" alt="" />
              </a>
            </div>
          </div>
        </div>
        <div class="dashboard__item-list-card--sp card">
          <div>
            <p>買付余力T+2（国内株式）</p>
            <p v-if="isShowData">
              <strong>{{
                handNumberInt(
                  cash_bal == null || cash_bal.buy_available_capacity || 0
                )
              }}</strong
              ><small>円</small>
            </p>
            <p v-else><strong>非表示</strong></p>
          </div>
          <a
            href="/reference/trend/"
            class="button button__main button__full"
            >余力詳細を見る
            <img src="/assets/images/arrow_black_s.png" alt="" />
          </a>
        </div>
        <ranking />
        <div class="dashboard__item card">
          <h2 class="dashboard__title">
            市況状況<small>MARKET INFORMATION</small>
          </h2>
          <div class="condition">
            <div class="tab_wrapper">
              <div class="condition__container condition__container--two">
                <div
                  class="card condition__item"
                  v-for="(item, index) in marketPrice"
                  :key="index"
                  @click="
                    conditionDetail(
                      item.INDEX_TYPE,
                      item.INDEX_ID || item.INDEX_CD
                    )
                  "
                >
                  <div class="condition__item-title">
                    <p>{{ item.INDEX_NAME }}</p>
                    <img :src="item.ICON_URL" alt="日本" />
                  </div>
                  <p class="condition__item-date">{{ "\xa0" }}</p>
                  <p class="condition__item-price">
                    {{
                      `${
                        (item.CURRENT_PRICE || item.CURRENT_PRICE == 0)
                          ? number_format2(item.CURRENT_PRICE)
                          : "-"
                      }`
                    }}
                  </p>
                  <div
                    class="condition__item-comparison comparison_text"
                    :class="
                      (item.CHANGE_VALUE && item.CHANGE_VALUE != 0)
                        ? parseFloat(item.CHANGE_VALUE) > 0
                          ? 'high'
                          : 'low'
                        : ''
                    "
                  >
                    <p>
                      {{
                        `${
                          (item.CHANGE_VALUE || item.CHANGE_VALUE == 0)
                            ? showMoneyFloat(item.CHANGE_VALUE)
                            : "-"
                        }`
                      }}<small
                        >({{
                          (item.CHANGE_RATE || item.CHANGE_RATE == 0)
                            ? showMoneyFloat(item.CHANGE_RATE)
                            : "-"
                        }}%)</small
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <router-link :to="{ name: 'MarketCondition' }">
              <a class="button button__main button__full"> 市況状況一覧 </a>
            </router-link>

            <a
              href="https://www.bloomberg.co.jp/markets/stocks"
              target="_blank"
              rel="noopener noreferrer"
              class="condition__text--link"
              >株価指数一覧(外部サイト)</a
            >
          </div>
        </div>
        <div class="dashboard__item card">
          <h2 class="dashboard__title">
            マーケットニュース<small>MARKET NEWS</small>
          </h2>
          <div class="dashboard__news">
            <router-link
              :to="{
                name: 'MarketNewsDetail',
                query: { news: item.NEWS_SEQ_NO },
              }"
              v-slot="{ href, navigate }"
              custom
              v-for="(item, index) in marketNews"
              :key="index"
            >
              <a :href="href" @click="navigate">
                <article class="dashboard__news-article">
                  <p
                    class="dashboard__news-date"
                    v-html="showNewTime(item.NEWS_DT)"
                  ></p>
                  <p class="dashboard__news-title">
                    {{ item.TITLE }}
                    <img src="/assets/images/arrow.png" alt="矢印" />
                  </p>
                </article>
              </a>
            </router-link>
            <a href="/market/news" class="button button__main button__full"
              >マーケットニュース一覧</a
            >
          </div>
        </div>
        <div class="dashboard__item card">
          <h2 class="dashboard__title">
            キャンペーン情報<small>CAMPAIGN</small>
          </h2>
          <div class="swiper__navigation">
            <div class="swiper-prev">
              <img src="/assets/images/arrow_swipe.png" alt="矢印" />
            </div>
            <div class="swiper-next">
              <img src="/assets/images/arrow_swipe.png" alt="矢印" />
            </div>
          </div>
          <div class="swiper double-rows">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="swiper__dummy">1</div>
                <div class="swiper__dummy">2</div>
              </div>
              <div class="swiper-slide">
                <div class="swiper__dummy">3</div>
                <div class="swiper__dummy">4</div>
              </div>
              <div class="swiper-slide">
                <div class="swiper__dummy">5</div>
                <div class="swiper__dummy">6</div>
              </div>
              <div class="swiper-slide">
                <div class="swiper__dummy">7</div>
                <div class="swiper__dummy">8</div>
              </div>
              <div class="swiper-slide">
                <div class="swiper__dummy">9</div>
                <div class="swiper__dummy">10</div>
              </div>
            </div>
          </div>
        </div>
        <div class="dashboard__item card">
          <h2 class="dashboard__title">
            お知らせ・メッセージ<small>NEWS & MESSAGE</small>
          </h2>
          <div class="dashboard__message">
            <router-link
              :to="
                item.SEND_TYPE == 1
                  ? {
                      name: 'NoticeDetail',
                      query: { notice: item.SEQ_NO, tab: `customer` },
                    }
                  : {
                      name: 'NoticeDetail',
                      query: { notice: item.SEQ_NO, tab: `company` },
                    }
              "
              v-slot="{ href, navigate }"
              custom
              v-for="(item, index) in publicNotice"
              :key="index"
            >
              <a :href="href" @click="navigate">
                <article class="dashboard__message-article">
                  <div class="dashboard__message-text">
                    <p
                      class="dashboard__message-date"
                      v-html="showNewTime(item.OPEN_DT)"
                    ></p>
                    <p class="dashboard__message-title">
                      {{ item.TITLE }}
                    </p>
                  </div>
                  <img src="/assets/images/arrow.png" alt="矢印" />
                </article>
              </a>
            </router-link>
            <a
              href="/notices?tab=customer"
              class="button button__main button__full"
            >
              お知らせ・メッセージ一覧
              <img src="/assets/images/arrow_black.png" alt="矢印" />
            </a>
          </div>
        </div>
      </section>
      <section class="dashboard card"></section>
      <section class="dashboard"></section>
      <section class="dashboard"></section>
    </div>
  </main>
</template>
<script src="@/assets/js/page/home/home"></script>
